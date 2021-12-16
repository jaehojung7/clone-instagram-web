import { useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState();
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  useEffect(() => {
    console.log("Search for", keyword);
  }, [keyword]);

  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click here</button>
    </div>
  );
}
