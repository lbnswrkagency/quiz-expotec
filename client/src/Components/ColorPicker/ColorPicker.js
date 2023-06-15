import React, { useState } from "react";
import { SketchPicker } from "react-color";
import axios from "axios";

function ColorPicker({ quizId, setRefetch, refetch }) {
  const [color, setColor] = useState("#000000");

  const handleChangeComplete = async (color) => {
    setColor(color.hex);

    try {
      const response = await axios.post(
        "https://quiz-mxtc.onrender.com/api/color",
        {
          leadingColor: color.hex,
          quizId,
        }
      );

      // Here you could do something with the response, like show a success message
      console.log("Color set successfully:", response.data);
      setRefetch(!refetch);
    } catch (error) {
      console.error("Error setting color:", error);
      // Here you could handle the error, like show an error message
    }
  };

  return (
    <div>
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
    </div>
  );
}

export default ColorPicker;
