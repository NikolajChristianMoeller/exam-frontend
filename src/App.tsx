import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import FallBack from "./pages/FallBack"
import TestPage from "./pages/TestPage"
import Navbar from "./components/NavBar"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/*" element={<FallBack />} />
      </Routes>
    </>
  )
}

export default App