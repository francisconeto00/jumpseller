import { Routes, Route, Navigate } from "react-router-dom";
import Search from "./pages/Search";
import SunInCity from "./pages/SunInCity";
import "./App.css";
import "@mantine/core/styles.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/sun-in-city/:id" element={<SunInCity />} />

        {/* fallback / default redirect */}
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </>
  );
}

export default App;
