
import {useState} from 'react'

export default function Form({ onAddItems }) {
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