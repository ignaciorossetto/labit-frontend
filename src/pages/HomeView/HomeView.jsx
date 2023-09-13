import HomeSlider from '../../components/HomeSlider/HomeSlider'
import './homeView.css'

const HomeView = () => {
  return (
    <>
        <HomeSlider/>
        <div className='homeGroupContainer'>
                <div className='homeFirstGroupBtn sacarTurnoBtn'>SACAR TURNO</div>
                <div className='homeFirstGroupBtn verRtdoBtn'>VER RESULTADOS</div>
        </div>
        <div className='homeGroupContainer'>
                <div className='homeSecondGroupBtn'>
                        <p>
                                ANALISIS
                        </p>
                        <img className='scienceImg' src={'/home/groups/science.png'} alt={'group-foto'} />
                </div>
                <div className='homeSecondGroupBtn'>
                        <p>
                                PROFESIONALES
                        </p>
                        <img className='' src={'/home/groups/person.png'} alt={'group-foto'} />
                </div>
                <div className='homeSecondGroupBtn'>
                        <p>
                                INSTITUCIÓN
                        </p>
                        <img className='' src={'/home/groups/institution.png'} alt={'group-foto'} />
                </div>
        </div>
        <div className='homeGroupContainer'>
                <button className='homeThirdGroupBtn'>PREGUNTAS FRECUENTES</button>
        </div>

        </>
  )
}

export default HomeView