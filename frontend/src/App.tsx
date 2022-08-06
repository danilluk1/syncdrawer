import React from "react";
import { Provider } from "react-redux";
import Header from "./components/Header";
import WorkingArea from "./components/WorkingArea";

function App() {
  return (
    <div>
      <Header />
      <WorkingArea />
    </div>
  );
}

export default App;
