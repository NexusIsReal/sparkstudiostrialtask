import { useState, useEffect } from 'react';
import './App.css';

interface Item {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/items');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Items List</h1>
      </header>
      <main>
        {loading && <p className="loading">Loading items...</p>}
        
        {error && <p className="error">{error}</p>}
        
        {!loading && !error && (
          <div className="items-container">
            {items.length === 0 ? (
              <p>No items found.</p>
            ) : (
              <ul className="items-list">
                {items.map((item) => (
                  <li key={item.id} className="item-card">
                    <span className="item-id">#{item.id}</span>
                    <span className="item-name">{item.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
      <footer>
        <p>Simple Full-Stack Web Application</p>
      </footer>
    </div>
  );
}

export default App; 