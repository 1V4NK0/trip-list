import { useState } from "react";
import "./index.css";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function handleClearList() {
    let choice = window.confirm("Do you want to delete all items?");
    console.log(choice);
    if (choice) setItems([]);
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
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
