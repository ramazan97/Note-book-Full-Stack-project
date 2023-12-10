import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { kullanici } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-1400 mx-auto py-3 px-20">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
            <Route
              path="/"
              element={kullanici ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!kullanici ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!kullanici ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
