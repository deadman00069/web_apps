import Home from "./screens/Home/Home";
import "./App.css";
import React from "react";

export const UserContext = React.createContext("Yolo");

function App() {
  return (
    <>
      <UserContext.Provider value="Yolo">
        <Home />
      </UserContext.Provider>
    </>
  );
}

export default App;
