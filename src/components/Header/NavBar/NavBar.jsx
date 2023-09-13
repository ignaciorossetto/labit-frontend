import { Link } from 'react-router-dom'
import './navBar.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import {  LOGOUT_PROCESS } from '../../../types/types'
import Swal from 'sweetalert2'

const NavBar = () => {
    const {user, dispatch} = useContext(AuthContext)
    const [showSignUpBtn, setshowSignUpBtn] = useState(true)

    const handleShowSignUpBtn = (e) => {
        if(e.target.id === 'signUpLink'){
            setshowSignUpBtn(false)
        } else {
            setshowSignUpBtn(true)
        }
    }
    const logOutBtn = () => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            timerProgressBar: true,
            timer: 2500,
            icon: 'success',
            showConfirmButton: false,
            title: `Nos vemos pronto!`
        })   
        localStorage.setItem('labUser', JSON.stringify(null))
        dispatch({type: LOGOUT_PROCESS.SUCCESS})
    }

  return (
    <div className='navBarContainer'>
        <Link to={'/'} className='navBarImgCont'>
            <img src="/hospital_logo.png" alt="lab-logo" />
        </Link>
        <div className='navBarLinksCont'>
            <Link to={'/'}>
                <span className='navBarLinksRegBtns navBarLinksRegBtns_inicio' onClick={handleShowSignUpBtn}>
                    Inicio
                </span>
            </Link>
            <Link  to={'/estudios'}>
                <span className='navBarLinksRegBtns' onClick={handleShowSignUpBtn}>
                Estudios
                </span>
            </Link>
            <Link to={'/nosotros'}>
                <span className='navBarLinksRegBtns' onClick={handleShowSignUpBtn}>
                    Nosotros
                </span>
            </Link>
            {
                !user ? 
                <>
                { showSignUpBtn &&
                    <Link to={'/sign-up'} >
                        <span className='navBarSignUpBtn' id='signUpLink' onClick={handleShowSignUpBtn}>
                            Registrarse
                        </span>    
                    </Link>
                }
                <Link to={'/login'}>
                    <span className='navBarLogInBtn' onClick={handleShowSignUpBtn} >
                        Login
                    </span>
                </Link> 
                </>
            : 
            <>
            <Link to={'/user'}>
                <FontAwesomeIcon className='navBarUserBtn' icon={faUser} size='lg'/>
            </Link>
            <FontAwesomeIcon className='navBarLogOutBtn' onClick={logOutBtn} icon={faRightFromBracket} size='xl'/>
            </>

            }
        </div>
    </div>
  )
}

export default NavBar