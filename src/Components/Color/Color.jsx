import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDeleteColor }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleConfirmDelete() {
    onDeleteColor(color.id);
  }

  return (
    <div
      className="color-card"
      style={{ backgroundColor: color.hex, color: color.contrastText }}
    >
      <p>{color.hex}</p>
      <p>{color.role}</p>
      <p>{color.contrastText}</p>
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
          onClick={()=>setShowConfirmation(true) }
          style={{ backgroundColor: color.contrastText, color: color.hex }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
