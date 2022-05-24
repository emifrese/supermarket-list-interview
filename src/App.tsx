import type {Item} from "./types";

import {useEffect, useState} from "react";

import styles from "./App.module.scss";
import api from "./api";

function App() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  function deleteTask (e: any) {
    const newItems:Item[] | undefined = items?.filter(item => item.id.toString() !== e.target.id)
    if(newItems !== undefined) {
      setItems(newItems)
    }
  }

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input autoFocus name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li key={item.id} className={item.completed ? styles.completed : ""}>
            {item.text} <button id={item.id.toString()} onClick={deleteTask}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
