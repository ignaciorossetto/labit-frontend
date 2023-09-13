import { useContext, useState } from 'react'
import './loginForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { LOGIN_PROCESS } from '../../types/types'
import Swal from 'sweetalert2'

const LoginForm = () => {
    const [user, setUser] = useState({
      email: '',
      password: ''
    });
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const handleSubmitClick = async(e) => {
        e.preventDefault();
        setLoading(true)
          authContext.dispatch({type: LOGIN_PROCESS.START})
          try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, user)
          setLoading(false)
          authContext.dispatch({type: LOGIN_PROCESS.SUCCESS, payload: response.data.payload})
          console.log(response.data.payload)
          Swal.fire({
            toast: true,
            position: 'top-end',
            timerProgressBar: true,
            timer: 2500,
            showConfirmButton: false,
            icon: 'success',
            title: `Bienvenido!`
        })   
          navigate('/')
        } catch (error) {
          authContext.dispatch({type: LOGIN_PROCESS.FAILED})
          setError(error.response.data.payload.message)
          setLoading(false)
        } finally {
          setUser({
            email: '',
            password: ''
          })
        }

      };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUser({...user, [name]: value });
    }

  return (
    <div className='login_container'>
          <h1 className="login_form_title">{loading ? 'Ingresando...' : 'Ingreso'}</h1>
        <form className='login_form' onSubmit={handleSubmitClick}>
            {
              loading ? <FontAwesomeIcon icon={faSpinner} spin size='2xl'className='login_form_spinner' /> :
              <>
          <div className='login_form_inputs_container'>
                <div className='login_form_inputLabel_container'>
                  <label>Email</label>
                  <input required type="email" placeholder='juan@email.com' name='email' className={`login_form_input ${error && 'errorInputBorder'}`}  onChange={handleInputChange}/>
                </div>
                <div className='login_form_inputLabel_container'>
                  <label>Contraseña</label>
                  <input required minLength={8} type="password" name='password' className={`login_form_input ${error && 'errorInputBorder'}`}  onChange={handleInputChange}/>
                </div>  
            </div>
            {error && <span className='login_form_error' >{error}</span>}
            <button className="login_form_submitBtn">Iniciar sesión</button>
            <span to='#'className='login_form_signUpLink' >¿Olvidaste la contraseña? <Link className='login_form_signUpSpan' to={''}>Click aquí</Link></span>
            <span to='#'className='login_form_signUpLink' >¿No estás registrado? <Link className='login_form_signUpSpan' to={'/sign-up '}>Regístrate</Link></span>
            
            </>
          }
        </form>
    </div>
  )
}

export default LoginForm