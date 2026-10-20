import { useState } from "react";
import { nanoid } from "nanoid";
import { initialColors } from "./lib/colors";
import ColorForm from "./Components/ColorForm/colorForm";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);
  function handleAddColor(newColor) {
    const colorWithId = {
      id: nanoid(),
      ...newColor,
    };

    setColors((currentColors) => [colorWithId, ...currentColors]);
  }
  function handelDeleteColor(toDelete) {
    setColors((currentColors) =>
      currentColors.filter((color) => color.id !== toDelete),
    );
  }
  function handleEditColor(updatedColor){
    setColors((colors)=>
    colors.map((color)=> color.id === updatedColor.id ? updatedColor : color));
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onSubmitColor={handleAddColor} />
      {colors.length === 0 ? (
        <p className="color-card-hightlight">no matching color</p>
      ) : (
        <div className="color-container">
          {colors.map((color) => (
            <Color
              key={color.id}
              color={color}
              onDeleteColor={handelDeleteColor}
              onEditColor={handleEditColor}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
