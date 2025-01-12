import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Explore, Game, Home, Level, Levels, MyLands, Temp } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/land/:id" element={<Game />} />
          <Route path="/levels" element={<Level />} />
          <Route path="/levels/:id" element={<Levels />} />
          <Route path="/my-lands" element={<MyLands />} />
          <Route path="/temp" element={<Temp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
