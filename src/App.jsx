import { useState } from "react";
import { nanoid } from "nanoid";
import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/colorForm"


import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  const[colors, setColors] = useState(initialColors);
   function handleAddColor(newColor) {
    const colorWithId = {
      id: nanoid(),
      ...newColor,
    };

    setColors((currentColors) => [
      colorWithId,
      ...currentColors,
    ]);
  }
  return (
    <>
    <h1>Theme Creator</h1>
   
      <ColorForm onSubmitColor={handleAddColor}/>
      <div className="color-container">
        {colors.map((color) => (
          <Color key={color.id} color={color} />
        ))}
      </div>
    </>
  );
}

export default App;
