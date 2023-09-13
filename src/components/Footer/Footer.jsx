import styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.container_img}>
                <img src={"/hospital_logo.png"} className={styles.img} alt='Logo'/>
            </div>
            <div className={styles.footer}>
                <div className={styles.sede}>
                    <p className={styles.subtitulo}>SEDES</p>
                    <p className={styles.text}>José Baigorrí 111 <br/> Av. General Paz 222</p>
                </div>
                <div className={styles.contacto}>
                    <p className={styles.subtitulo}>CONTACTO</p>
                    <p className={styles.text}>0810 222 2563 (5223) <br/>info@laboratotioanalisisclinicos.com</p>
                </div>
                <div className={styles.horario}>
                    <p className={styles.subtitulo}>HORARIO</p>
                    <p className={styles.text}>Lunes a viernes de 7.00 h a 19.00 h. <br/>
                        Sábados de 7.00 h a 10.30 h. <br/>
                        Domingos de 8.00 a 11.30 h.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer