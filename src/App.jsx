import { useMemo, useState } from "react";
import "./App.css";
import GroceryItem from "./components/GroceryItem";

const App = () => {

  // State: stores all grocery items
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), text: "Milk" },// generate diff id so react can identify it correctly 
    { id: crypto.randomUUID(), text: "Eggs" },
    { id: crypto.randomUUID(), text: "Bread" },
  ]);

  // stores current input value
  const [newItem, setNewItem] = useState("");


  //  Add / Insert New Item 
  const handleAdd = (e) => {
    e.preventDefault(); // stop page refresh on form submit


    const trimmed = newItem.trim(); // remove extra spaces
    if (!trimmed) return; // ignore empty input

    // add new item at the beginning of list
    setItems((prev) => [{ id: crypto.randomUUID(), text: trimmed }, ...prev]);

    setNewItem(""); // clear input after adding
  };

  // Delete item 
  const handleDelete = (id) => {
    // keep all items except the one clicked
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update / Edit item (uses map) 
  const handleUpdate = (id, updatedText) => {
    const trimmed = updatedText.trim();
    if (!trimmed) return;

    // replace only the matching item
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text: trimmed } : item
      )
    );
  };  //updating items without changing

  // Clear all items 
  const handleClearAll = () => {
    setItems([]); // reset the item state to empty array
  };

  // counts total number of characters in all grocery items
  const totalChars = useMemo(() => {// useMemo saves the calculation and run it when needed
    return items.reduce((sum, item) => sum + item.text.length, 0);// item.reduce = combine all item in one value
  }, [items]);// 0 the starting value of the total
    //ui

  return (
    <div className="page">
      <h1 className="title">Grocery List App</h1>
      <p className="subtext">
        Add, edit, and delete grocery items .
      </p>

      {/* Input Form */}
      <form className="form" onSubmit={handleAdd}>
        <label className="label" htmlFor="groceryInput"> 
          New Item
        </label>

        <div className="formRow">
          <input
            id="groceryInput"
            className="input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)} // update input state
            placeholder="e.g., Rice, Apples, Chicken..."
            autoComplete="on"
            name="groceryInput"
          />
          <button className="primaryBtn" type="submit">
            Add
          </button>
        </div>
      </form>

      {/* Stats Section */}
      <div className="stats">
        <button className="clearBtn" onClick={handleClearAll}>
          Clear All
        </button>

        <p>
          <strong>Total items:</strong> {items.length}
        </p>

        <p>
          <strong>Total characters:</strong> {totalChars}
        </p>
      </div>

      {/* shows when list is empty*/}
      {items.length === 0 ? (
        <p className="empty">No items yet. Add your first grocery item!</p>
      ) : (
        <ul className="list">
          {/* map() creates a GroceryItem component for each item */}
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
