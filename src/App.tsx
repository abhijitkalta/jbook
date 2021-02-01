import * as esbuild from "esbuild-wasm";
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const ref = useRef<any>();
  const iframe = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.36/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleClick = async () => {
    if (!ref.current) {
      return;
    }
    iframe.current.srcdoc = html;
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
  <html><body>
    <div id="root"></div>
    <script>window.addEventListener('message', (event) => {
       try {
         eval(event.data);
       } catch (error) {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4> Runtime error: </h4>' + error + '</div>'
       }
    }, false)</script>
  </body></html>
  `;

  return (
    <div className="App">
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></textarea>

      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <iframe
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframe}
        title="iframe-result"
      />
    </div>
  );
};

export default App;
