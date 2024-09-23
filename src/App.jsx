import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';
import { GraphProvider } from './context/GraphContext';

import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import FixedCostsPage from './pages/FixedCostsPage2';
import RangeCostsPage from './pages/RangeCostsPage';
import GraphsPage from './pages/GraphsPage';
import ChatBotPage from './pages/ChatBotPage';

function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <GraphProvider>
          <BrowserRouter>
          <NavBar/>

            <Routes>

              <Route path='/' element={ <HomePage/> } />
              <Route path='/register' element={ <RegisterPage/> } />
              <Route path='/login' element={ <LoginPage/> } />

              <Route element={ <ProtectedRoute/> }>
                <Route path='/fixedCosts' element={ <FixedCostsPage/> } />
                <Route path='/rangeCosts' element={ <RangeCostsPage/> } />
                <Route path='/graphs' element={ <GraphsPage/> } />
                <Route path='/chatbot' element={ <ChatBotPage/> } />
              </Route>
              
            </Routes>
            
          </BrowserRouter>
        </GraphProvider>
      </FinanceProvider>
    </AuthProvider>
    
  )
}

export default App;
