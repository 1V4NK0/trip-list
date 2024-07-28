import {useState} from 'react'
import Item from './Item';

export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
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
        .sort((a, b) => Number(a.packed) - Number(b.packed));
  
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
          <button onClick={onClearList}>Clear list</button>
        </div>
      </div>
    );
  }