import {Routes, Route} from 'react-router-dom'
import LoginView from './pages/LoginView/LoginView'
import HomeView from './pages/HomeView/HomeView'
import EstudiosView from './pages/EstudiosView/EstudiosView'
import Footer from './components/Footer/Footer'
import NosotrosView from './pages/NosotrosView/NosotrosView'
import Header from './components/Header/Header'
import SignUpView from './pages/SignUpView/SignUpView'
import PatientDashboardView from './pages/UsersDashboards/PatientDashboardView/PatientDashboardView'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={!user ? <HomeView/> : <PatientDashboardView/>}/>
      <Route path='/login' element={<LoginView/>}/>
      <Route path='/sign-up' element={<SignUpView/>}/>
      <Route path='/estudios' element={<EstudiosView/>}/>
      <Route path='/nosotros' element={<NosotrosView/>}/>
      <Route path='/patient' element={<PatientDashboardView/>}/>
    </Routes>
    <Footer />
    </>

  )
}

export default App