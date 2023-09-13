import { useState } from 'react'
import NavBar from './NavBar/NavBar'
import ResponsiveNavBar from './ResponsiveNavBar/ResponsiveNavBar'
import './header.css'
import ResponsiveModal from './ResponsiveModal/ResponsiveModal'

const Header = () => {
  const [showModal, setShowModal] = useState(false)
  const handleMenuClick = () => {
    setShowModal((prev)=>!prev)
  }
  return (
    <div className='headerContainer'>
        <NavBar/>
        <ResponsiveNavBar handleMenuClick={handleMenuClick}/> 
        {
          showModal && 
          <ResponsiveModal handleMenuClick={handleMenuClick}/>
        }
    </div>
  )
}

export default Header