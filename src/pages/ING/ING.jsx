import Header from "../../components/Header";
//import imgplaceholder from './placeholder.png';
//import bg from './bg.png';

//import DynamicContent from "../../components/DynamicContent";
import ContentByType from "../../components/ContentByType";
import Faq from "../../components/Faq";

import { content_types } from "../../utils";

import MapING from '../../components/MapING';

import "./style.scss";
import styles from "./styles.module.scss";

import pa_sep from "../../images/pa-sep.png";
import d1 from "../../images/diagram-iniciativas.png";
//import d1 from "../../images/diagram-1.png";
//import d2 from "../../images/diagram-2.png";
//import d3 from "../../images/diagram-3.png";

function Iniciativas() {
  return (
    <>
      <Header />

      <section id="sobre">
        <div className="width-limiter">
          <div className="iniciativas-about">
            <div className="pa-left">
              <div className="pa-title">
                Iniciativas<br />(não governamentais) de Educação Ambiental
              </div>
              <div>
                <p>
                  No âmbito do Sistema MonitoraEA, iniciativas são definidas
                  como programas, projetos e ações - desenvolvidos em contextos
                  educativos formais, não formais ou informais - por atores não
                  governamentais.
                </p>
              </div>
            </div>

            <div className="pa-sep">
              <img src={pa_sep} />
            </div>

            <div className="pa-right">
              <p>
                Dada suas características e especificidades, as iniciativas de
                Educação Ambiental são avaliadas por um{" "}
                <span>conjunto de indicadores próprios</span> que, embora
                compartilhem o mesmo marco referencial dos indicadores de
                avaliação de políticas públicas, abarcam de maneira mais
                ajustada a realidade dos programas, projetos e ações realizados
                pela pluralidade de atores não governamentais que realizam a
                educação ambiental nos mais diversos territórios do Brasil.
              </p>
              <p>
                <ul>
                  <li>Organizações não governamentais da sociedade civil</li>
                  <li>Coletivos educadores, redes e movimentos sociais</li>
                  <li>Escolas e instituições de ensino superior</li>
                  <li>Comitês de bacia hidrográfica</li>
                  <li>Organizações privadas</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>

      <MapING />

      <div className={styles["diagrams"]}>
        <div className={styles.d3}>
          <div className="width-limiter">
            <div className={styles["title-box"]}>
              Indicadores de Monitoramento e Avaliação de Iniciativas de
              Educação Ambiental
            </div>

            <div className={styles.texto}>
              <p>
                Os indicadores de monitoramento e avaliação de iniciativas de
                educação ambiental foram propostos partindo dos indicadores de
                monitoramento e avaliação de PPEA, em um processo de evolução do
                sistema, reconhecendo aspectos que garantem especificidade às
                iniciativas.
              </p>
              <p>
                A descrição completa do processo metodológico de construção e
                validação dos indicadores pode ser encontrada no{" "}
                <span>
                  Caderno de Indicadores de M&A de Iniciativas de Educação
                  Ambiental.
                </span>
              </p>
              <p>
                Os indicadores são organizados também a partir de 8 dimensões -
                que constituem o marco referencial de monitoramento e avaliação
                das iniciativas. O atendimento à cada dimensão é verificado pelo
                conjunto de indicadores à elas associados.
              </p>
            </div>

            <div className={styles.diagrama}>
              <img src={d1} />
            </div>
          </div>
        </div>
      </div>

      {/* eleições - ["news" ].map((c) => (
        <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
          portal="ing"
        />
      ))*/ /* ,'learning' */}

      <Faq portal="ing" />
    </>
  );
}

export default Iniciativas;
