import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import FallBack from "./pages/FallBack"
import Navbar from "./components/NavBar"
import AdminPage from "./pages/AdminPage.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/*" element={<FallBack />} />
      </Routes>
    </>
  )
}

export default App