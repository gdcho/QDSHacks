import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {
  AccountCircle,
  School,
  Book,
  Terminal,
  Article,
} from "@mui/icons-material";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import {
  coursesByTerm,
  term,
  optionsLabels,
  TermData,
} from "@/components/data/profile-data";
import { useSession } from "next-auth/react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function isTermData(termCourses: string[] | TermData): termCourses is TermData {
  return (
    !Array.isArray(termCourses) &&
    typeof termCourses === "object" &&
    "options" in termCourses
  );
}

export default function ProfileForm() {
  const { data: session } = useSession();
  const [selectedTerm, setSelectedTerm] = useState("1");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  

  // Standard width for all form controls
  const formControlWidth = { width: 300 };

  useEffect(() => {
    const termCourses = coursesByTerm[selectedTerm];
    if (Array.isArray(termCourses)) {
      setAvailableCourses(termCourses);
    } else if (
      isTermData(termCourses) &&
      termCourses.options &&
      selectedOption
    ) {
      setAvailableCourses([
        ...(termCourses.options[selectedOption] || []),
        ...(termCourses.all || []),
      ] as string[]);
    } else if (isTermData(termCourses)) {
      setAvailableCourses(termCourses.all || []);
    }
  }, [selectedTerm, selectedOption]);

  const handleTermChange = (event: { target: { value: any } }) => {
    const newTerm = event.target.value;
    setSelectedTerm(newTerm);
    setSelectedOption("");
    // Reset courses selection on term change
    setSelectedCourses([]);
  };

  const handleOptionChange = (event: { target: { value: any } }) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  };

  const handleCourseChange = (event: { target: { value: any } }) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    // Whenever availableCourses changes, update selectedCourses to include all available courses
    setSelectedCourses(availableCourses);
  }, [availableCourses]);

  return (
    <div className="flex flex-col items-center justify-around text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-1">
      <Box
        className="flex flex-col"
        sx={{
          "& > :not(style)": { m: 1, ...formControlWidth, textAlign: "left" },
        }}
      >
        <FormControl variant="standard">
          <InputLabel htmlFor="profile-name">Name</InputLabel>
          <Input
            id="profile-name"
            defaultValue={session ? session.user?.name : ""}
            disabled
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ ...formControlWidth, textAlign: "left" }}
        >
          <InputLabel htmlFor="profile-program">Program</InputLabel>
          <Input
            id="profile-program"
            defaultValue="Computer Systems Technology"
            disabled
            startAdornment={
              <InputAdornment position="start">
                <School />
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          id="profile-term"
          select
          label="Term"
          value={selectedTerm}
          onChange={handleTermChange}
          variant="standard"
          sx={{ width: 300, textAlign: "left" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Article />
              </InputAdornment>
            ),
          }}
        >
          {term.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {typeof coursesByTerm[selectedTerm] !== "undefined" &&
          "options" in coursesByTerm[selectedTerm] && (
            <TextField
              id="profile-option"
              select
              label="Option"
              value={selectedOption}
              onChange={handleOptionChange}
              variant="standard"
              sx={{ width: 300, textAlign: "left", mt: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Terminal />
                  </InputAdornment>
                ),
              }}
            >
              {Object.entries(
                (coursesByTerm[selectedTerm] as TermData)?.options || {}
              ).map(([key]) => (
                <MenuItem key={key} value={key}>
                  {optionsLabels[key]}
                </MenuItem>
              ))}
            </TextField>
          )}
        {/* Courses Selection */}
        <FormControl variant="standard" sx={{ width: "100%", mt: 2 }} disabled>
          <InputLabel>Courses</InputLabel>
          <Select
            multiple
            value={selectedCourses}
            onChange={handleCourseChange}
            input={
              <Input
                id="select-multiple-chip"
                startAdornment={
                  <InputAdornment position="start">
                    <Book />
                  </InputAdornment>
                }
              />
            }
            renderValue={(selected: any[]) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            disabled
          >
            {availableCourses.map((course) => (
              <MenuItem key={course} value={course}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
