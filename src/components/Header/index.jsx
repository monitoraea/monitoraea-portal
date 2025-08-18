import Nav from "../nav/nav";

import bg from "../../images/bg_top.jpg";
import miolo from "../../images/logo_top.png";
import instagram from "../../images/instagram.png";

import styles from './index.module.scss'

export default function Header() {
  return (
    <>
      <div className={styles.banner}>
        <img className={styles.bg} src={bg} alt="" />
        <div className={styles.backdrop}></div>
        <div className={styles.content}>
          <div className={styles.title}>
            <img src={miolo} alt="" />
            <div className={styles.text}>Sistema Brasileiro de Monitoramento e Avaliação em <strong>Educação Ambiental</strong></div>
          </div>

          <div className={styles.right}>
            <div className={styles['social-media']}>
              <a
                href="https://www.instagram.com/anppea_monitoraea/"
                target="_blank"
              >
                <img src={instagram} alt="" />
              </a>
            </div>
            <button
              onClick={() => (window.location.href = "/colabora")}
              className={styles.login}
            >
              Acessar
            </button>
          </div>
          
        </div>
      </div>
      <Nav />
    </>
  );
}
