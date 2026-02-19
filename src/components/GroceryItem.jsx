import { useMemo, useState } from "react";
import "./App.css";
import GroceryItem from "./components/GroceryItem";

const App = () => {
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), text: "Milk" },
    { id: crypto.randomUUID(), text: "Eggs" },
    { id: crypto.randomUUID(), text: "Bread" },
  ]);

  const [newItem, setNewItem] = useState("");

  // Add/Insert New Item
  const handleAdd = (e) => {
    e.preventDefault();

    const trimmed = newItem.trim();
    if (!trimmed) return;

    setItems((prev) => [{ id: crypto.randomUUID(), text: trimmed }, ...prev]);
    setNewItem("");
  };

  // Delete/Remove Existing Item (filter)
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update Existing Item (map)
  const handleUpdate = (id, updatedText) => {
    const trimmed = updatedText.trim();
    if (!trimmed) return;

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: trimmed } : item))
    );
  };

  // Reduce example (helps rubric)
  const totalChars = useMemo(() => {
    return items.reduce((sum, item) => sum + item.text.length, 0);
  }, [items]);

  return (
    <div className="page">
      <h1 className="title">Grocery List App</h1>
      <p className="subtext">
        Add, edit, and delete grocery items (map / filter / reduce).
      </p>

      <form className="form" onSubmit={handleAdd}>
        <label className="label" htmlFor="groceryInput">
          New Item
        </label>

        <div className="formRow">
          <input
            id="groceryInput"
            className="input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="e.g., Rice, Apples, Chicken..."
          />
          <button className="primaryBtn" type="submit">
            Add
          </button>
        </div>
      </form>

      <div className="stats">
        <p>
          <strong>Total items:</strong> {items.length}
        </p>
        <p>
          <strong>Total characters:</strong> {totalChars}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="empty">No items yet. Add your first grocery item!</p>
      ) : (
        <ul className="list">
          {items.map((item, index) => (
            <li key={item.id} className="listItem">
              <GroceryItem
                item={item}
                index={index}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
