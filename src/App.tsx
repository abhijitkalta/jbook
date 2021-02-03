import React, { useState } from "react";
import "./App.css";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundler from "./bundler";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleClick = async () => {
    const result = await bundler(input);
    setCode(result);
  };

  return (
    <div className="App">
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default App;
