import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import imgplaceholder from './placeholder.png';

import DynamicContent from '../../components/DynamicContent';
import ContentByType from '../../components/ContentByType';
import Faq from '../../components/Faq';

import Loop from '../../components/LoopFacilitators';

import { content_types } from '../../utils';

import MapZCM from '../../components/MapZCM';

import styles from './styles.module.scss'

import imageLogo from '../../images/pppzcm/image-logo.png';
import image2 from '../../images/pppzcm/image2.png'
import download from '../../images/download.png';

import terramar from '../../images/pppzcm/comite/terramar.png';
import anppea from '../../images/pppzcm/comite/anppea.png';
import gef_mar from '../../images/pppzcm/comite/gef-mar.png';
import germany from '../../images/pppzcm/comite/germany.png';
import iki from '../../images/pppzcm/comite/iki.png';
import giz from '../../images/pppzcm/comite/giz.png';
import banco_mundial from '../../images/pppzcm/comite/banco-mundial.png';
import gef from '../../images/pppzcm/comite/gef.png';
import funbio from '../../images/pppzcm/comite/funbio.png';
import governos from '../../images/pppzcm/comite/governos.png';
import ibama from '../../images/pppzcm/comite/ibama.png';
import icmbio from '../../images/pppzcm/comite/icmbio.png';
import mam from '../../images/pppzcm/comite/mam.png';

import mock_photo from '../../images/pppzcm/comite/mock-circle.png'

import mock_map_facilitadores from '../../images/pppzcm/mock-map-facilitadores.png'

function PPPZCM() {
  // Adicione 3 slides de preenchimento com conteúdo padrão

  return (
    <>
      <Header />

      <section className={styles.section}>
        <div className="width-limiter">
          <div className={styles.about}>
            <div><div className={styles.image}><img src={imageLogo} /></div></div>
            <div className={styles.text}>
              <div>
                O Projeto Político Pedagógico da Zona Costeira e Marinha do Brasil
                (PPPZCM) é um instrumento de gestão de processos educativos da Zona
                Costeira e Marinha do Brasil com o foco no uso sustentável e
                conservação da biodiversidade.
              </div>
              <div className={styles.part2}>
                O MonitoraEA PPPZCM é o espaço de cadastro,
                mapeamento e monitoramento de iniciativas
                vinculados à implementação do PPPZCM.
              </div>
              <div>
                <div className={styles['button-wrapper']}>
                  <button>
                    Cadastre uma iniciativa associada ao PPPZCM
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.download}>
              <div className={styles['button-wrapper']}>
                <button>
                  <div className={styles.image}><img src={download} /></div> Baixe o documento do PPPZCM
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapZCM />

      <div className={styles['more-content']}>

        <div className={styles.inner}>
          <div className="width-limiter">

            <div className={styles['title-box']}>
              Como o PPPZCM foi construído?
            </div>

            <div className={styles.texto}>
              <div>
                <div><DynamicContent keyRef="pppzcm.how" /></div>
              </div>

              <div>
                <div className={styles.assista}>Assista ao vídeo e saiba mais</div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/kEJQ2uG_Bco?si=h_tlWnF9i1755Tin" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>

            <div className={styles.box}>
              A missão do Projeto Político Pedagógico da Zona Costeira e Marinha do Brasil
              (PPPZCM) é ser um instrumento político-pedagógico dinâmico, vivo, emancipatório, crítico, científico e popular - de gestão de processos educativos com foco no uso sustentável e conservação da biodiversidade da Zona Costeira e Marinha.
            </div>
          </div>
        </div>

      </div>

      <div className={`${styles['more-content']} ${styles['type2']}`}>

        <div className={styles.inner}>
          <div className="width-limiter">

            <div className={styles['title-box']}>
              Rede de Comunidades de Aprendizagem do PPPZCM
            </div>

            <div className={styles.texto}>
              Lançada em 2021, a Rede de Comunidades de Aprendizagens do PPPZCM se alinha às estruturas de redes horizontais e informais pautadas na confiança e cooperação entre seus elos e com objetivos comuns de desenvolver processos críticos e estruturantes de capacitação e educação ambiental que contribuam para o uso sustentável e conservação da biodiversidade da ZCM.
            </div>

            <div className={styles.texto}>
              <div>
                <p>A Rede é formada por:</p>

                <p><span>Elos da Rede:</span> Todas as pessoas e organizações que alinharam suas iniciativas às diretrizes do PPPZCM e registraram suas ações na Plataforma MonitoraEA-PPPZCM.</p>

                <p><span>Grupo de Facilitação da Rede:</span> Cerca de 50 pessoas (organizações/pessoas) participantes diretamente da gestão e governança do PPPZCM junto ao Comitê Gestor. Atuam no enraizamento e capilaridade da rede nos territórios.</p>

                <p><span>Comitê Gestor da Rede:</span> Instituições que atuam na gestão e governança da rede.</p>
              </div>
              <div>
                <div className={styles.image}><img src={image2} /></div>
              </div>
            </div>

            <div className={styles.box}>
              A Rede objetiva ser um espaço e movimento de conexões, diálogos, cooperação, articulações, formação, autoformação, monitoramento e avaliação, promovendo o fortalecimento e a incidência em políticas públicas, bem como promover a governança da implementação do Projeto Político Pedagógico da Zona Costeira e Marinha; e contribuir para materializar as diretrizes e objetivos do PPPZCM.
            </div>
          </div>
        </div>

      </div>

      <div className={styles['more-content']}>

        <div className={styles.inner}>
          <div className="width-limiter">

            <div className={`${styles['title-box']} ${styles['title2']}`}>
              Comitê Gestor
            </div>

            <div className={styles.texto}>
              <div>
                <div>
                  O Comitê Gestor atua na estruturação, fortalecimento e consolidação da Rede de
                  Comunidades de Aprendizagens do PPPZCM e desenvolve processos metodológicos
                  formativos e de co-criação diretamente junto ao grupo de facilitação da Rede.
                </div>
              </div>
            </div>

            <div className={styles.icones}>
              <div className={styles.line1}>
                <div className={styles.image}><img src={terramar} /></div>
                <div className={styles.image}><img src={anppea} /></div>
                <div className={styles.image}><img src={gef_mar} /></div>
              </div>
              <div className={styles.line2}>
                <div className={styles.image}><img src={germany} /></div>
                <div className={styles.image}><img src={iki} /></div>
                <div className={styles.image}><img src={giz} /></div>
                <div className={styles.image}><img src={banco_mundial} /></div>
                <div className={styles.image}><img src={gef} /></div>
                <div className={styles.image}><img src={funbio} /></div>
                <div className={styles.image}><img src={governos} /></div>
                <div className={styles.image}><img src={ibama} /></div>
              </div>
              <div className={styles.line3}>
                <div className={styles.image}><img src={icmbio} /></div>
                <div className={styles.image}><img src={mam} /></div>
              </div>
            </div>

            <div className={styles.people}>

              <div className={styles.person}>
                <div className={styles.photo}><img src={mock_photo} /></div>
                <div className={styles.info}>
                  <div>Nome</div>
                  <div>Organização</div>
                  <div>Contato</div>
                  <div>Estado</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={mock_photo} /></div>
                <div className={styles.info}>
                  <div>Nome</div>
                  <div>Organização</div>
                  <div>Contato</div>
                  <div>Estado</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={mock_photo} /></div>
                <div className={styles.info}>
                  <div>Nome</div>
                  <div>Organização</div>
                  <div>Contato</div>
                  <div>Estado</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={mock_photo} /></div>
                <div className={styles.info}>
                  <div>Nome</div>
                  <div>Organização</div>
                  <div>Contato</div>
                  <div>Estado</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={mock_photo} /></div>
                <div className={styles.info}>
                  <div>Nome</div>
                  <div>Organização</div>
                  <div>Contato</div>
                  <div>Estado</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={mock_photo} /></div>
                <div className={styles.info}>
                  <div>Nome</div>
                  <div>Organização</div>
                  <div>Contato</div>
                  <div>Estado</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={mock_photo} /></div>
                <div className={styles.info}>
                  <div>Nome</div>
                  <div>Organização</div>
                  <div>Contato</div>
                  <div>Estado</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={mock_photo} /></div>
                <div className={styles.info}>
                  <div>Nome</div>
                  <div>Organização</div>
                  <div>Contato</div>
                  <div>Estado</div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      <div className={`${styles['more-content']} ${styles['type3']}`}>

        <div className={styles.inner}>
          <div className="width-limiter">

            <div className={`${styles['title-box']} ${styles['title2']}`}>
              Facilitadores regionais do PPPZCM
            </div>

            <div className={styles.texto}>
              <div>
                <div>
                  Os facilitadores atuam na materialização das diretrizes, missão e objetivos do PPPZCM nos territórios da Zona Costeira e Marinha do Brasil e na gestão e governança da implementação do PPPZCM, a partir de processos de formação, mobilização, articulação, educomunicação e planejamento, em articulação com os demais Elos da Rede. Encontre o facilitador mais próximo de você e entre em contato.
                </div>
              </div>
              <div>
                <div className={styles.assista}>Assista ao vídeo e
                  conheça os facilitadores</div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/YTvA_DfhJXc?si=EZkiexfjLua4iZdN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>

            <div className={styles.facilitadores}>
              <div className={styles.map}><img src={mock_map_facilitadores} /></div>
              <div className={styles.people}>

                <div className={styles.person}>
                  <div className={styles.photo}><img src={mock_photo} /></div>
                  <div className={styles.info}>
                    <div>Nome</div>
                    <div>Organização</div>
                    <div>Contato</div>
                    <div>Estado</div>
                  </div>
                </div>

                <div className={styles.person}>
                  <div className={styles.photo}><img src={mock_photo} /></div>
                  <div className={styles.info}>
                    <div>Nome</div>
                    <div>Organização</div>
                    <div>Contato</div>
                    <div>Estado</div>
                  </div>
                </div>

                <div className={styles.person}>
                  <div className={styles.photo}><img src={mock_photo} /></div>
                  <div className={styles.info}>
                    <div>Nome</div>
                    <div>Organização</div>
                    <div>Contato</div>
                    <div>Estado</div>
                  </div>
                </div>

                <div className={styles.person}>
                  <div className={styles.photo}><img src={mock_photo} /></div>
                  <div className={styles.info}>
                    <div>Nome</div>
                    <div>Organização</div>
                    <div>Contato</div>
                    <div>Estado</div>
                  </div>
                </div>

                <div className={styles.person}>
                  <div className={styles.photo}><img src={mock_photo} /></div>
                  <div className={styles.info}>
                    <div>Nome</div>
                    <div>Organização</div>
                    <div>Contato</div>
                    <div>Estado</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {['news'/* , 'learning' */].map(c => <ContentByType
        key={c}
        id={content_types[c][2]}
        contentType={c}
        title={content_types[c][1]}
        moreText={content_types[c][3]}
        portal="pppzcm"
      />)}

      {/* <section>
        <div className="width-limiter">
          <div className="section-header">
            <div className="section-title">Facilitadores</div>
            <Link to='/facilitadores'>
              <button className="btn-link">
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                    <path d="M7.05566 9.94455L11.5001 5.50011L7.05566 1.05566" stroke="#599559" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.4997 5.5H0.833008" stroke="#599559" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                Ver todas
              </button>
            </Link>
          </div>
          <p><DynamicContent keyRef="pppzcm.facilitators" /></p>
          <Loop staleTime={0} simple={true} />
        </div>
      </section> */}

      <Faq portal="pppzcm" />

    </>
  );
}

export default PPPZCM;
