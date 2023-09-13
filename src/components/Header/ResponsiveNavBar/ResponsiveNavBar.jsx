import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './responsiveNavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ResponsiveNavBar = (props) => {
  return (
    <div className='responseNavBarContainer'>
        <Link to='/' className='respNavImgCont'>
          <img src="/hospital_logo.png" alt="lab-logo" />
        </Link>
        <div className='respNavIconCont' onClick={props.handleMenuClick}>
          <FontAwesomeIcon icon={faBars} size='2xl'/>
        </div>
    </div>
  )
}

export default ResponsiveNavBar