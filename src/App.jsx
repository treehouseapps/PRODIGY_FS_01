import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Signup from './pages/signup';
import Welcome from './pages/welcome';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
