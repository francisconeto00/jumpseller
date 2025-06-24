import { Routes, Route, Navigate } from "react-router-dom";
import Search from "./pages/Search";
import SunInCity from "./pages/SunInCity";
import "./App.css";
import "@mantine/core/styles.css";
function App() {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/sun-in-city/:id" element={<SunInCity />} />

      {/* fallback / default redirect */}
      <Route path="*" element={<Navigate to="/search" replace />} />
    </Routes>
  );
}

export default App;
