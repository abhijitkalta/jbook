import "bulmaswatch/superhero/bulmaswatch.min.css";
import "./App.css";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

const App: React.FC = () => {
  return (
    <div className="App">
      <TextEditor />
      <CodeCell />
    </div>
  );
};

export default App;
