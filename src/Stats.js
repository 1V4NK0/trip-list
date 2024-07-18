

export default function Stats({ items }) {
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