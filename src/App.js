import { useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  function AddItem(item) {
    //u can't just use items.push(item), the array is immutable,
    //so u have to return a new array with all items from the previous one + new item
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
    // console.log(items);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={AddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggle}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏖️ pack away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    //creating new object when submitting
    const newItem = { description, amount, packed: false, id: Date.now() };
    onAddItems(newItem);
    //resetting
    setAmount(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for you next trip? ✈️</h3>
      <select
        value={amount}
        onChange={(event) => setAmount(Number(event.target.value))}
      >
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="item..."
        required
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  //we use slice because we can't change items array and we make a copy of it with .slice()
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a,b) => Number(a.packed) - Number(b.packed))


  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by the description</option>
          <option value="packed">Sort by the packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.amount} {item.description}
      </span>
      <button className="remove-btn" onClick={() => onDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return <footer className="stats">Start packing! 🤗 🚞</footer>;
  }

  const size = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const packedPercentage = size >= 1 ? (packedItems / size) * 100 : 0;

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "Ready to go! Have a nice trip!"
          : `👀 You have ${size} items on your list, and you already packed ${packedItems} (${packedPercentage.toFixed(
              0
            )}%) of your list`}
      </em>
    </footer>
  );
}
