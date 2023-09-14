import './customSpinner.css'
const CustomSpinner = (props) => {
  return (
    <div>
        <img className="customSpinner" src={props.src} alt="spinner" />
    </div>
  )
}

export default CustomSpinner