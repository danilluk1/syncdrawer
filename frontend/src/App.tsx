import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import WorkingArea from "./components/WorkingArea";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:room"
          element={
            <div>
              <Header />
              <WorkingArea />
            </div>
          }
        />
        <Route
          path="*"
          element={<Navigate to={`f${(+new Date()).toString(16)}`} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
