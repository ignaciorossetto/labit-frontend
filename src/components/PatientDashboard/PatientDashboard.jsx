import { faArrowLeft, faCamera, faPencil, faUser } from '@fortawesome/free-solid-svg-icons'
import './patientDashboard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const PatientDashboard = () => {
    const {user} = useContext(AuthContext)
    const [person, setPerson] = useState(null)
    useEffect(()=> {
         const fetchPerson = async() => {
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/persons/id/${user.person_id}`)
                setPerson(data.payload)
                
            } catch (error) {
                console.log(error)
            }
         }
         fetchPerson()
    }, [user])
  return (
    <div className='patientDashboardContainer'>
        <div className='pdWidth pdInfo'>
            <div className='pdInfoHeader'>
                <FontAwesomeIcon className='pdInfoHeaderArrowIcon' icon={faArrowLeft} size='2xl'/>
                <div>PACIENTE</div>
            </div>
            <div className='pdInfoFirst'>
                <div className='pdInfoFirstIconCont'>
                    <FontAwesomeIcon className='pdInfoFirstUserIcon' icon={faUser} size='2xl' />
                    <FontAwesomeIcon className='pdInfoFirstCamIcon' icon={faCamera} size='lg'/>
                </div>
                <div className='pdInfoFirstDetails'>
                    <div className='pdInfoDetTitlecont'>
                        <div className='pdInfoDetTitle'>{person?.first_name.toUpperCase()} {person?.last_name.toUpperCase()}</div>
                        <FontAwesomeIcon className='pdInfoDetTitle_icon' icon={faPencil} size='lg' />
                    </div>
                    <div className='pdInfoDetailsCont'>
                        <div className='pdInfoDetailsLabel'>DNI</div>
                        <div className='pfInfoDetailsData'>{person?.dni}</div>
                    </div>
                    <div className='pdInfoDetailsCont'>
                        <div className='pdInfoDetailsLabel'>Fecha Nacimiento</div>
                        <div className='pfInfoDetailsData'>{person?.birth_date.split('T')[0]}</div>
                    </div>
                </div>
            </div>
            <div className='pdInfoSecond'>
                <div className='pdInfSecGroupCont'>
                    <div className='pdInfSecGrpLabel'>E-mail</div>
                    <div className='pdInfSecGrpData'>{user?.email}</div>
                </div>
                <div className='pdInfSecGroupCont'>
                    <div className='pdInfSecGrpLabel'>Teléfono</div>
                    <div className='pdInfSecGrpData'>{person?.phone_number}</div>
                </div>
                <div className='pdInfSecGroupCont'>
                    <div className='pdInfSecGrpLabel'>Domicilio</div>
                    <div className='pdInfSecGrpData'>{person?.address}</div>
                </div>
                <div className='pdInfSecGroupCont'>
                    <div className='pdInfSecGrpLabel'>Obra social</div>
                    <div className='pdInfSecGrpData'>OSDE</div>
                </div>
                <div className='pdInfSecGroupCont'>
                    <div className='pdInfSecGrpLabel'>Nº de afiliado</div>
                    <div className='pdInfSecGrpData'>{person?.affiliate_number ?? '-'}</div>
                </div>

            </div>
        </div>
        <div className='pdDivider'></div>
        <div className='pdWidth pdServices'>
            <div className='pdServicesTitle'>SERVICIOS</div>
            <div className='pdServicesBtnsCont'>
                <div className='pdServicesGetAppmnt'>SOLICITAR TURNO</div> 
                <div className='pdServicesGetInfo'>MIS TURNOS</div> 
                <div className='pdServicesGetInfo'>MIS ANALISIS</div> 
            </div>
        </div>
    </div>
  )
}

export default PatientDashboard