import "bulmaswatch/superhero/bulmaswatch.min.css";
import "./App.css";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";
import { Provider } from "react-redux";
import { store } from "./state";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <TextEditor />
        <CodeCell />
      </div>
    </Provider>
  );
};

export default App;
