import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BookDemo from "./Pages/BookDemo";
import HomeScreen from "./Pages/HomeScreen";
import LandingPage from "./Pages/LandingPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ViewSlots from "./Pages/ViewSlots";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LandingPage />
        <Routes>
          <Route path="/bookDemo" element={<BookDemo />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/viewSlots" element={<ViewSlots />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
