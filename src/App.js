import { useState } from "react";
import "./index.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 8, packed: false },
//   { id: 3, description: "Laptop", quantity: 1, packed: false },
//   { id: 4, description: "Underwear", quantity: 4, packed: false },
//   { id: 5, description: "Sunscreen", quantity: 1, packed: false },
//   { id: 6, description: "$", quantity: 2000, packed: false },
//   { id: 7, description: "Powerbank", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function AddItem(item) {
    //u can't just use items.push(item), the array is immutable,
    //so u have to return a new array with all items from the previous one + new item
    setItems(items => [...items,item])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={AddItem}/>
      <PackingList items={items}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏖️ Far away 🧳</h1>;
}

function Form({onAddItems}) {

  

  function handleSubmit(event) {
    event.preventDefault();
  
    //creating new object when submitting
    const newItem = {description, amount, packed: false, id: Date.now()}
    onAddItems(newItem);
    //resetting 
    setAmount(1);
    setDescription('');
  }

  

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(1);

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for you next trip? ✈️</h3>
      <select value={amount} onChange={(event) => setAmount(Number(event.target.value))}>
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num} >
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="item..." required value={description} onChange={(event) => {setDescription(event.target.value) 
       }}/>
      <button>Add</button>
    </form>
  );
}

function PackingList({items}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.amount} {item.description}
      </span>
      <button className="remove-btn">❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        👀 You have X items on your list, and you already packed X (X%) of your
        list;
      </em>
    </footer>
  );
}
