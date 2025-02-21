import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import imgplaceholder from './placeholder.png';

import DynamicContent from '../../components/DynamicContent';
import ContentByType from '../../components/ContentByType';
import Faq from '../../components/Faq';

/* import Loop from '../../components/LoopFacilitators'; */

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

import mock_photo from '../../images/pppzcm/comite/mock-circle.png';
import betania from '../../images/pppzcm/comite/people/betania.png';
import jakeline from '../../images/pppzcm/comite/people/jakeline.png';
import thais from '../../images/pppzcm/comite/people/thais.png';
import hugo from '../../images/pppzcm/comite/people/hugo.png';
import erika from '../../images/pppzcm/comite/people/erika.png';
import rachel from '../../images/pppzcm/comite/people/rachel.png';
import evandro from '../../images/pppzcm/comite/people/evandro.png';
import henriqueta from '../../images/pppzcm/comite/people/henriqueta.png';
import paulo from '../../images/pppzcm/comite/people/paulo.png';
import maressa from '../../images/pppzcm/comite/people/maressa.png';

import {
  reactSelectClassNamePrefix,
  StyledReactSelect,
} from '../../components/StyledReactSelect2';

import axios from 'axios';
import { useQuery } from 'react-query';
import makeAnimated from 'react-select/animated';
import { useState } from 'react';

const animatedComponents = makeAnimated();

const selectDefaults = {
  placeholder: 'Selecione...',
  noOptionsMessage: () => 'Nenhuma opção encontrada!',
  loadingMessage: () => 'Carregando...',
};

function PPPZCM() {

  const [uf_selected, _uf_selected] = useState({ value: "-1", label: "Todos" })

  const { data: ufs } = useQuery(['ufs'], {
    queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}project/facilitators_states`)).data,
    staleTime: 3600000,
  })

  const { data: facilitators } = useQuery(['facilitators', { uf_selected: uf_selected?.label }], {
    queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}project/facilitators/?${uf_selected && uf_selected.value !== '-1' ? `&uf=${uf_selected.value}` : ''}`)).data,
    staleTime: 3600000,
  })

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
                  <button onClick={() => window.location.href = '/colabora/minha_area'}>
                    Cadastre uma iniciativa associada ao PPPZCM
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.download}>
              <div className={styles['button-wrapper']}>
                <button onClick={() => window.open('https://pppzcm-files.s3.us-east-2.amazonaws.com/PPPZCM.pdf', '_blank')}>
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
                <iframe width="560" height="315" src="https://www.youtube.com/embed/kEJQ2uG_Bco?si=h_tlWnF9i1755Tin" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
                <div className={styles.image}><a href="https://antigo.mma.gov.br/gestao-territorial/projeto-terramar.html" target="blank"><img src={terramar} /></a></div>
                <div className={styles.image}><a href="https://www.monitoraea.org.br/" target="blank"><img src={anppea} /></a></div>
                <div className={styles.image}><a href="https://www.gov.br/mma/pt-br/assuntos/biodiversidade-e-biomas/areas-protegidas/programas-e-projetos/gef-mar-1" target="blank"><img src={gef_mar} /></a></div>
              </div>
              <div className={styles.line2}>
                <div className={styles.image}><a href="" target="blank"><img src={germany} /></a></div>
                <div className={styles.image}><a href="" target="blank"><img src={iki} /></a></div>
                <div className={styles.image}><a href="https://www.giz.de/en/html/index.html" target="blank"><img src={giz} /></a></div>
                <div className={styles.image}><a href="https://www.worldbank.org/pt/country/brazil" target="blank"><img src={banco_mundial} /></a></div>
                <div className={styles.image}><a href="" target="blank"><img src={gef} /></a></div>
                <div className={styles.image}><a href="https://www.funbio.org.br/" target="blank"><img src={funbio} /></a></div>
                <div className={styles.image}><a href="" target="blank"><img src={governos} /></a></div>
                <div className={styles.image}><a href="https://www.ibama.gov.br/index.php" target="blank"><img src={ibama} /></a></div>
              </div>
              <div className={styles.line3}>
                <div className={styles.image}><a href="https://www.gov.br/icmbio/pt-br" target="blank"><img src={icmbio} /></a></div>
                <div className={styles.image}><a href="https://www.gov.br/mma/pt-br" target="blank"><img src={mam} /></a></div>
              </div>
            </div>

            <div className={styles.people}>

              <div className={styles.person}>
                <div className={styles.photo}><img src={betania} /></div>
                <div className={styles.info}>
                  <div>Betânia Santos Fichino</div>
                  <div>DAP/MMA</div>
                  <div>betania.fichino@mma.gov.br</div>
                  <div>DF</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={jakeline} /></div>
                <div className={styles.info}>
                  <div>Jakeline Borges de Souza</div>
                  <div>Ibama</div>
                  <div>jakeline.souza@ibama.gov.br</div>
                  <div>DF</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={thais} /></div>
                <div className={styles.info}>
                  <div>Thaís Ferraresi Pereira</div>
                  <div>DEA/MMA</div>
                  <div>thais.ferraresi@mma.gov.br</div>
                  <div>DF</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={hugo} /></div>
                <div className={styles.info}>
                  <div>Hugo Garcês</div>
                  <div>GIZ</div>
                  <div>hugo.garces@giz.de</div>
                  <div>DF</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={erika} /></div>
                <div className={styles.info}>
                  <div>Érika de Almeida</div>
                  <div>ICMBio</div>
                  <div>akiregustavo27@gmail.com</div>
                  <div>DF</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={rachel} /></div>
                <div className={styles.info}>
                  <div>Rachel A. Trovarelli</div>
                  <div>ANPPEA</div>
                  <div>rachel.trovarelli@alumni.usp.br</div>
                  <div>SP</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={evandro} /></div>
                <div className={styles.info}>
                  <div>Evandro A. Branco</div>
                  <div>ANPPEA</div>
                  <div>evandro.albiach@inpe.br</div>
                  <div>SP</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={henriqueta} /></div>
                <div className={styles.info}>
                  <div>Maria Henriqueta A. Raymundo</div>
                  <div>ANPPEA</div>
                  <div>henriquetasss@gmail.com</div>
                  <div>SP</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={paulo} /></div>
                <div className={styles.info}>
                  <div>Paulo Russo</div>
                  <div>ICMBio</div>
                  <div>paulo.russo@icmbio.gov.br</div>
                  <div>SP</div>
                </div>
              </div>

              <div className={styles.person}>
                <div className={styles.photo}><img src={maressa} /></div>
                <div className={styles.info}>
                  <div>Maressa Amaral</div>
                  <div>ICMBio</div>
                  <div>maressa.amaral@icmbio.gov.br</div>
                  <div>SP</div>
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
                <iframe width="560" height="315" src="https://www.youtube.com/embed/YTvA_DfhJXc?si=EZkiexfjLua4iZdN" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
            </div>

            <div className={styles.search}>

              <div>Estado</div>
              <div className={styles.search_field}>
                {ufs && (
                  <div>
                    <StyledReactSelect
                      classNamePrefix={reactSelectClassNamePrefix}
                      {...selectDefaults}
                      onChange={selectedOption => _uf_selected(selectedOption)}
                      /* closeMenuOnSelect={false} */
                      components={animatedComponents}
                      /* isMulti */
                      options={[
                        { value: "-1", label: "Todos" },
                        ...ufs
                      ]}
                      value={uf_selected}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.facilitadores}>

              <div className={styles.people}>

                {facilitators && facilitators.map(f=><div key={f.id} className={styles.person}>
                  <div className={styles.photo}><img src={f.photo || mock_photo} /></div>
                  <div className={styles.info}>
                    <div>{f.name}</div>
                    {/* <div className={styles.cut}>{f.institution}</div> */}
                    <div className={styles.email}><a href={`mailto:${f.email}`}>{f.email}</a></div>
                    <div>{f.state}</div>
                  </div>
                </div>)}

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
