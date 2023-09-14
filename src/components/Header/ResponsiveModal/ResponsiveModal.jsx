import { faRightFromBracket, faUser, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import './responsiveModal.css'
import {  LOGOUT_PROCESS } from '../../../types/types'
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"



const ResponsiveModal = ({handleMenuClick}) => {
  const {user, dispatch} = useContext(AuthContext)
  const logOutBtn = () => {
    dispatch({type: LOGOUT_PROCESS.SUCCESS})
}
  return (
    <div className='respNavModalCont'>
          <div className='respNavModalLinksMainCont'>
            <div>
              <div className='respNavModalLinksContLogo'>
                <div>
                <img src="hospital_logo.png" alt="lab-logo" />
                <div>LABIT</div>
                </div>
                <FontAwesomeIcon icon={faX} size='xl' className='respNavModalCrossIcon' onClick={handleMenuClick}/>
              </div>
              <div className='respNavModalLinksCont'>
                <Link to={'/'}>Inicio</Link>
                <Link to={'/estudios'}>Estudios</Link>
                <Link to={'/nosotros'}>Nosotros</Link>
              </div>
            </div>
            <div className='respNavModalAuthCont'>
              {
                user ?
                <>
                <Link to={'/user'} className='respNavModalAuthCont_user_a'>
                    <FontAwesomeIcon className='respNavModalAuthCont_user' icon={faUser} size='lg'/>
                </Link>
                <FontAwesomeIcon className='respNavModalAuthCont_logout' onClick={logOutBtn} icon={faRightFromBracket} size='2xl'/>
              </>
                :
                <>
                <Link to={'/sign-up'} className='respNavModalAuthCont_signup'>Registrarse</Link>
                <Link to={'/login'}  className='respNavModalAuthCont_login'>Login</Link>
                </>
              }
            </div>
          </div>
          <div className='respNavBarInvToggle' onClick={handleMenuClick}> 
          </div>
        </div>
  )
}


export default ResponsiveModal