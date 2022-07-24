import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router >
        <Routes>
          {/* <Route
            exact
            path="/"
            render={< Login />}
          /> */}
          <Route exact path="/" element={<Login replace to="/login" />} />
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
        </Routes>
      </Router >
    </div>
  );
}

export default App;
