import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Auth from "./screens/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth /> }/>
      </Routes>
    </Router>
  );
}


export default App;
