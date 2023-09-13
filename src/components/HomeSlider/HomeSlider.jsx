import { useState } from "react"
import './homeSlider.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const filesArray = [
    {
        filePath: '/home/slider/img1.png'
    },
    {
        filePath: '/home/slider/img2.png'
    },
    {
        filePath: '/home/slider/img3.png'
    }
]

const HomeSlider = () => {
  const [index, setIndex] = useState(0)
  const handleArrowRightClick = () => {
    setIndex((prev)=>{
        if (prev === filesArray.length - 1) {
            return 0
        }
        return prev + 1
    })
  }
  const handleArrowLeftClick = () => {
    setIndex((prev)=>{
        if (prev === 0) {
            return filesArray.length - 1
        }
        return prev - 1
    })
  }
  return (
    <div className="homeSliderContainer">
        <div onClick={handleArrowLeftClick} className="homeSliderArrow homeSliderArrowLeft"><FontAwesomeIcon icon={faArrowLeft} size="2xl"/></div>
            <img src={filesArray[index].filePath} alt={'home-slider'} className="homeSliderImg"/>
        <div onClick={handleArrowRightClick} className="homeSliderArrow homeSliderArrowRight"><FontAwesomeIcon icon={faArrowRight} size="2xl"/></div>
    </div>
  )
}

export default HomeSlider