import { useState } from "react";

const GroceryItem = ({ item, onDelete, onUpdate, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(item.text);

  const startEdit = () => {
    setDraft(item.text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(item.text);
    setIsEditing(false);
  };

  const saveEdit = () => {
    onUpdate(item.id, draft);
    setIsEditing(false);
  };

  return (
    <div className="gItem">
      <div className="left">
        <span className="badge">#{index + 1}</span>

        {isEditing ? (
          <input
            className="editInput"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <span className="text">{item.text}</span>
        )}
      </div>

      <div className="actions">
        {isEditing ? (
          <>
            <button type="button" className="smallBtn" onClick={saveEdit}>
              Save
            </button>
            <button type="button" className="smallBtn ghost" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" className="smallBtn" onClick={startEdit}>
            Edit
          </button>
        )}

        <button
          type="button"
          className="smallBtn danger"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GroceryItem;
