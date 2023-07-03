import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <>
      <Router>
        <Container>
          <Header />
          <Routes>
            <Route path='/' element={ <Dashboard /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/login' element={ <Login /> } />
          </Routes>
          <Footer />
        </Container>
      </Router>
      <ToastContainer />
    </>
    
  );
}

export default App;
