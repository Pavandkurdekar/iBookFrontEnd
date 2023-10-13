import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DarkMode from "./DarkMode.jpg";
import LightMode2 from "./LightMode2.jpg";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [alert, setAlert] = useState(null);

  const [mode, setMode] = useState("light");

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
//Function to set dark mode and light mode
  const togglemode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundImage = `url(${DarkMode})`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
    } else {
      setMode("light");
      document.body.style.backgroundImage = `url(${LightMode2})`;
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
    }
  };
  return (
    <div className="App">
      <Navbar mode={mode} togglemode={togglemode} />
      <div className="my-4" style={{marginTop:"70px"}}><Alert alert={alert} /></div>
      
      <Routes>
        <Route
          path="/signup"
          element={<Signup mode={mode} showAlert={showAlert} />}
        ></Route>

        <Route
          path="/login"
          element={<Login mode={mode} showAlert={showAlert} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
