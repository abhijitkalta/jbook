import React, { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundler from "../bundler";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleClick = async () => {
    const result = await bundler(input);
    setCode(result);
  };

  return (
    <div>
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

export default CodeCell;
