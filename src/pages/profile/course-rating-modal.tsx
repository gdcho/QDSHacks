import React from "react";
import {
  Modal,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

interface CourseRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  saveRating: (courseName: string, rating: string) => void;
  currentRating: string;
}

export default function CourseRatingModal({
  isOpen,
  onClose,
  courseName,
  saveRating,
  currentRating,
}: CourseRatingModalProps) {
  const [rating, setRating] = React.useState(currentRating);

  React.useEffect(() => {
    // Update rating state when currentRating changes
    setRating(currentRating);
  }, [currentRating]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = event.target.value;
    setRating(newRating);
    saveRating(courseName, newRating);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="course-rating-modal-title"
      aria-describedby="course-rating-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
          border: "1px solid #e0e0e0",
        }}
      >
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend" className="mb-3">
            {courseName}
          </FormLabel>
          <RadioGroup
            aria-label="rating"
            name="radio-buttons-group"
            value={rating}
            onChange={handleChange}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="1 - Least Confident"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="2 - Somewhat Confident"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="3 - Moderately Confident"
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="4 - Confident"
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="5 - Most Confident"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Modal>
  );
}
