import "./App.css";
import { BeanHead } from "beanheads";
import { useWindowSize } from "./hooks/useWindowSize";

function App() {
  const { activeAvatar } = useWindowSize("Avatars");

  return (
    <div className="App">
      <BeanHead {...activeAvatar} />
    </div>
  );
}

export default App;
