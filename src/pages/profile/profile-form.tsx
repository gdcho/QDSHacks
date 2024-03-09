import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import {
  AccountCircle,
  School,
  Book,
  Terminal,
  Article,
  Email,
} from "@mui/icons-material";
import {
  coursesByTerm,
  term,
  optionsLabels,
  TermData,
} from "@/components/data/profile-data";
import Modal from "@mui/material/Modal";
import { useSession } from "next-auth/react";
import { Button, Typography } from "@mui/material";
import CourseRatingModal from "./course-rating-modal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourseForRating, setSelectedCourseForRating] = useState("");
  const [courseRatings, setCourseRatings] = React.useState({});

  const handleOpenModal = (course: React.SetStateAction<string>) => () => {
    setSelectedCourseForRating(course);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

  useEffect(() => {
    setSelectedCourses(availableCourses);
  }, [availableCourses]);

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const saveCourseRating = (courseName: any, rating: any) => {
    setCourseRatings((prevRatings) => ({
      ...prevRatings,
      [courseName]: rating,
    }));
  };

  // Handler to save form data
  const saveForm = () => {
    const userProfileUpdate = {
      name: session?.user?.name,
      email:
        (document.getElementById("profile-email") as HTMLInputElement)?.value ||
        "",
      program: "Computer Systems Technology",
      term: selectedTerm,
      option: selectedOption,
      courses: selectedCourses.map((course) => ({
        courseName: course,
        rating: courseRatings[course as keyof typeof courseRatings] || null,
      })),
    };
    // updateProfile(userProfileUpdate).then(() => {
    //   console.log('Profile updated successfully');
    // }).catch((error) => {
    //   console.error('Error updating profile', error);
    // });

    setIsEditMode(false);
    console.log(userProfileUpdate);
  };

  return (
    <div className="flex flex-col items-center justify-around text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-3">
      <Box
        className="flex flex-col"
        sx={{
          "& > :not(style)": { m: 1, ...formControlWidth, textAlign: "left" },
          gap: 1,
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
        <FormControl variant="standard">
          <InputLabel htmlFor="profile-email">Email</InputLabel>
          <Input
            id="profile-email"
            defaultValue={session ? session.user?.email : ""}
            disabled={!isEditMode}
            startAdornment={
              <InputAdornment position="start">
                <Email />
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
          disabled={!isEditMode}
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
              disabled={!isEditMode}
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
        <div>
          <Typography variant="caption" color="gray">
            Course Rating
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {availableCourses.map((course) => (
              <Chip
                key={course}
                icon={<Book />}
                label={course}
                onClick={handleOpenModal(course)}
                disabled={!isEditMode}
                color={selectedCourses.includes(course) ? "primary" : "default"}
              />
            ))}
          </Box>
          <Modal
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CourseRatingModal
              isOpen={modalOpen}
              onClose={handleCloseModal}
              courseName={selectedCourseForRating}
              currentRating={
                courseRatings[
                  selectedCourseForRating as keyof typeof courseRatings
                ] || ""
              }
              saveRating={saveCourseRating}
            />
          </Modal>
        </div>
        <Box sx={{ display: "flex", pt: 2, gap: 2 }}>
          <Button
            onClick={toggleEditMode}
            variant="outlined"
            sx={{ borderRadius: 10 }}
            fullWidth
          >
            {isEditMode ? "Cancel" : "Edit"}
          </Button>
          <Button
            onClick={saveForm}
            variant="outlined"
            disabled={!isEditMode}
            sx={{ borderRadius: 10 }}
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
}
