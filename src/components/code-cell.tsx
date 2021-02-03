import React, { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundler from "../bundler";
import Resizable from "./resizable";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleClick = async () => {
    const result = await bundler(input);
    setCode(result);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <div>
          <button onClick={handleClick}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
