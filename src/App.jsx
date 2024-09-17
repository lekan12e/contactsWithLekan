import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginForm from './login/login';
import Dashboard from './login/Dashbord';
import SignUp from './login/signup';

function App() {
  const token = localStorage.getItem('token');
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
