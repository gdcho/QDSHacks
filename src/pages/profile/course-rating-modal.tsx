import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Rating from "@mui/material/Rating"; 
import { Typography } from "@mui/material";

interface CourseRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  saveRating: (courseName: string, rating: string) => void;
  currentRating: string; // Make sure this is a number to work with Rating
}

export default function CourseRatingModal({
  isOpen,
  onClose,
  courseName,
  saveRating,
  currentRating,
}: CourseRatingModalProps) {
  // Convert currentRating to a number as Rating component works with numbers
  const [rating, setRating] = React.useState<number>(Number(currentRating));

  React.useEffect(() => {
    // Update rating state when currentRating changes, converting to number
    setRating(Number(currentRating));
  }, [currentRating]);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    const newRating = newValue?.toString() || "0"; // Convert the rating back to string if needed
    setRating(Number(newRating));
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
          width: 280,
          height: 230,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
          border: "1px solid #e0e0e0",
          textAlign: "center",
        }}
      >
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend" className="mb-3">
            {courseName}
          </FormLabel>
          {/* Use Rating component here */}
          <Typography variant="body1" gutterBottom textAlign="center">
            Rate your knowledge / comfortability for this class
          </Typography>
          <div className="mt-3">
            <Rating
              name="course-rating"
              value={rating}
              onChange={handleChange}
              size="large"
            />
          </div>
        </FormControl>
      </Box>
    </Modal>
  );
}
