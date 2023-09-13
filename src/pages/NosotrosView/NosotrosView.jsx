import './nosotrosView.css'

const NosotrosView = () => {
  return (
    <main className="nosotrosViewMainContainer">
     <div>
        <h1>¿Quienes somos?</h1>
        <h1>HISTORIA</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h1>POLÍTICA DE CALIDAD</h1>
        <p>
        En el Laboratorio de Análisis Clínicos  todos los integrantes asumimos el compromiso y la responsabilidad por:
        </p>
        <div className='nosotrosFiveStepsResp'>
            <div>
                <div>01.</div>
                <hr/>
                <p>Brindar cordialidad y eficacia en la atención personalizada.</p>
            </div>
            <div>
                <div>02.</div>
                <hr/>
                <p>Garantizar la realización de los análisis clínicos solicitados.</p>
            </div>
            <div>
                <div>03.</div>
                <hr/>
                <p>Entregar resultados confiables en el tiempo y la forma acordada.</p>
            </div>
            <div>
                <div>04.</div>
                <hr/>
                <p>Asegurar el liderazgo profesional.</p>
            </div>
            <div>
                <div>05.</div>
                <hr/>
                <p>Lograr la satisfacción de nuestros pacientes y de las Instituciones que remiten muestras a nuestro laboratorio.</p>
            </div>
        </div>
        <hr/>
        <p>
        En cumplimiento de lo exigido por la Norma ISO 9001:2008 en el  LAC nos comprometemos a la mejora continua de nuestros procesos.
        </p>
    </div>
    </main>

  )
}

export default NosotrosView