import { useState } from "react";
import ColorForm from "../ColorForm/colorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import ContrastChecker from "../ContrastChecker/ContrastChecker";
import "./Color.css";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleConfirmDelete() {
    onDeleteColor(color.id);
  }
  function handleUpdate(updatedColor) {
    onEditColor({
      ...color,
      ...updatedColor,
    });
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div
        className="color-card"
        style={{ backgroundColor: color.hex, color: color.contrastText }}
      >
        <ColorForm
          initialData={color}
          onSubmitColor={handleUpdate}
          buttonText="UPDATE CHANGES"
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div
      className="color-card"
      style={{ backgroundColor: color.hex, color: color.contrastText }}
    >
      <p>{color.role}</p>
      <p htmlFor="hex-color">
        {color.hex} <CopyToClipboard text={color.hex} />
      </p>

      <p>{color.contrastText}</p>
      <ContrastChecker hex={color.hex} contrastText={color.contrastText} />
      {showConfirmation ? (
        <div>
          <p className="color-card-hightlight">
            Are you sure you want to delete this color?
          </p>
          <button
            type="button"
            className="confirm-button"
            onClick={() => setShowConfirmation(false)}
            style={{ backgroundColor: color.contrastText, color: color.hex }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="confirm-button"
            onClick={handleConfirmDelete}
            style={{ backgroundColor: color.contrastText, color: color.hex }}
          >
            Yes, Delete
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="delete-button"
          onClick={() => setShowConfirmation(true)}
          style={{ backgroundColor: color.contrastText, color: color.hex }}
        >
          Delete
        </button>
      )}

      <button
        type="button"
        className="delete-button"
        onClick={() => setIsEditing(true)}
        style={{ backgroundColor: color.contrastText, color: color.hex }}
      >
        Edit
      </button>
    </div>
  );
}
