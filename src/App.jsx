import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import { nanoid } from "nanoid";
import ColorForm from "./Components/ColorForm/colorForm";
import { initialThemes } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  const [isEditingTheme, setIsEditingTheme] = useState(false);
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [selectedThemeId, setSelectedThemeId] = useState("t1");

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);

  const handleChange = (event) => setSelectedThemeId(event.target.value);

  function handleCreateTheme() {
    const newTheme = {
      id: nanoid(),
      name: `Theme ${themes.length}`,
      colors: [],
    };
    setThemes((currentThemes) => [...currentThemes, newTheme]);
    setSelectedThemeId(newTheme.id);
  }

  const [newThemeName, setNewThemeName] = useState(" ");
  function handleRenameTheme() {
    if (!newThemeName.trim()) return;

    setThemes((currentThemes) =>
      currentThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, name: newThemeName.trim() }
          : theme,
      ),
    );

    setIsEditingTheme(false);
  }

  function handleDeleteTheme() {
    setThemes((currentThemes) =>
      currentThemes.filter((theme) => theme.id !== selectedThemeId),
    );
    setSelectedThemeId("t1");
  }
  function handleAddColor({ newColor }) {
    const colorWithId = {
      id: nanoid(),
      ...newColor,
    };
    setThemes((currentThemes) =>
      currentThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: [colorWithId, ...theme.colors] }
          : theme,
      ),
    );
  }
  function handelDeleteColor(toDelete) {
    setThemes((currentThemes) =>
      currentThemes.map((theme) =>
        theme.id === selectedThemeId
          ? {
              ...theme,
              colors: theme.colors.filter((color) => color.id !== toDelete),
            }
          : theme,
      ),
    );
  }
  function handleEditColor(updatedColor) {
    setThemes((currentThemes) =>
      currentThemes.map((theme) =>
        theme.id === selectedThemeId
          ? {
              ...theme,
              colors: theme.colors.map((color) =>
                color.id === updatedColor.id ? updatedColor : color,
              ),
            }
          : theme,
      ),
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <section className="theme-controls">
        <label htmlFor="theme-select">
          {isEditingTheme ? (
            <input
              id="theme-select"
              value={newThemeName}
              onChange={(event) => setNewThemeName(event.target.value)}
            />
          ) : (
            <select
              id="theme-select"
              value={selectedThemeId}
              onChange={handleChange}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          )}
        </label>

        <button type="button" onClick={handleCreateTheme}>
          ADD
        </button>

        <button
          type="button"
          disabled={selectedThemeId === "t1"}
          onClick={() => {
            if (isEditingTheme) {
              handleRenameTheme();
            } else {
              setNewThemeName(selectedTheme.name);
              setIsEditingTheme(true);
            }
          }}
        >
          {isEditingTheme ? "Save" : "Edit"}
        </button>

        <button
          type="button"
          disabled={selectedThemeId === "t1"}
          onClick={handleDeleteTheme}
        >
          Delete
        </button>
      </section>
      <ColorForm onSubmitColor={handleAddColor} />
      {selectedTheme.colors.length === 0 ? (
        <p className="color-card-hightlight">no matching color</p>
      ) : (
        <div className="color-container">
          {selectedTheme.colors.map((color) => (
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
