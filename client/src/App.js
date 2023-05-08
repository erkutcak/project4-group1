import React, { useEffect, useState } from "react";
import { Switch, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  
  return(
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  )

}

export default App;
