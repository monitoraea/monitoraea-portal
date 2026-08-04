import bg from "../../images/bg_top.jpg";
import miolo from "../../images/logo_top.png";
import logomonitoraea from "../../images/logo.png";

import styles from '../../components/Header/index.module.scss'
import homeStyles from './styles.module.scss'

function Home() {
  return (<div className={homeStyles.page}>
    <div className={`${styles.banner} ${homeStyles.banner}`}>
      <img className={styles.bg} src={bg} alt="" />
      <div className={styles.backdrop}></div>
      <div className={styles.content}>
        <div className={styles.title}>
          <img src={miolo} alt="" />
          <div className={styles.text}>Sistema Brasileiro de Monitoramento e Avaliação em <strong>Educação Ambiental</strong></div>
        </div>

        <div className={styles.right}>
          <div className={styles['social-media']}>
            {/* <a
              href="https://www.instagram.com/anppea_monitoraea/"
              target="_blank"
            >
              <img src={instagram} alt="" />
            </a> */}
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

    <section className={homeStyles.comunicado}>
      <h2>COMUNICADO</h2>
      <p>Em razão do período de defeso eleitoral, parte dos conteúdos da área pública do Sistema MonitoraEA foi temporariamente indisponibilizada, em observância à legislação eleitoral.</p>
      <p>As funcionalidades do sistema permanecem normalmente disponíveis, incluindo o cadastro de novos usuários, o acesso à área logada (botão “Acessar”) e todas as operações relacionadas ao registro, monitoramento e autoavaliação das iniciativas.</p>
      <p>Os conteúdos da área pública serão restabelecidos após o encerramento do período de restrição eleitoral.</p>
    </section>

    <footer className={homeStyles.footer}>
      <div className={`${homeStyles['width-limiter']} ${homeStyles.inner}`}>
        <img src={logomonitoraea} alt="MonitoraEA" />
        <div className={homeStyles.contato}>
          <div>Fale conosco:</div>
          <a href="mailto:portal.monitoraea@gmail.com">portal.monitoraea@gmail.com</a>
        </div>
      </div>
    </footer>

  </div>)
}

export default Home;
