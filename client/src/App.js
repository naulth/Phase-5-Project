import React from "react"
import {Routes, Route} from "react-router-dom"

import Home from "./Components/Home"
import Signup from "./Components/Signup"

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
