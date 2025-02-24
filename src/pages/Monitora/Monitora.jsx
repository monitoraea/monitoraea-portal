import Header from '../../components/Header';

import axios from 'axios';
import { useQuery } from 'react-query';

import './style.scss';

import Faq from '../../components/Faq';

import styles from './styles.module.scss'

import ArrowBlue from '../../images/about/arrow_blue.png';
import Sep from '../../images/about/sep.png';
import download from '../../images/download3.png';
import diagram from '../../images/about/diagram.png';
import inpe from '../../images/about/inpe.png';
import anppea from '../../images/about/anppea.png';

import eca from '../../images/about/logos/eca.png';
import unirio from '../../images/about/logos/unirio.png';
import uea from '../../images/about/logos/uea.png';
import uesb from '../../images/about/logos/uesb.png';
import ufp from '../../images/about/logos/ufp.png';
import univali from '../../images/about/logos/univali.png';
import unb from '../../images/about/logos/unb.png';
import ufabc from '../../images/about/logos/ufabc.png';
import rebea from '../../images/about/logos/rebea.png';
import ufms from '../../images/about/logos/ufms.png';
import cemaden from '../../images/about/logos/cemaden.png';
import funbea from '../../images/about/logos/funbea.png';
import peregum from '../../images/about/logos/peregum.png';
import cnpq from '../../images/about/logos/cnpq.png';
import mam from '../../images/about/logos/mam.png';
import giz from '../../images/about/logos/giz.png';
import funbio from '../../images/about/logos/funbio.png';

import mockPerson from '../../images/about/woman.png';

function Monitora() {

  const { data } = useQuery(['team'], {
    queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}equipe`)).data,
    staleTime: 3600000,
  })

  return (
    <>
      <Header />

      <section className={styles.about}>
        <div className="width-limiter">

          <div className={styles.title}>O Sistema MonitoraEA</div>

          <div className={styles.bar}>
            <img className={styles.arrow} src={ArrowBlue} />
            <div>O Sistema MonitoraEA teve seu desenvolvimento iniciado em <span>2016</span>, por iniciativa da <span>ANPPEA</span>, a Articulação Nacional de Políticas Públicas de Educação Ambiental.</div>
            <div><img src={Sep} /></div>
            <div>Seu <span>objetivo</span> é oferecer um arcabouço conceitual e instrumental para suportar processos de <span>mapeamento, avaliação e monitoramento</span> da diversidade de iniciativas de educação ambiental em todo o território nacional.</div>
          </div>

          <div>
            Neste sentido, viabiliza <span>processos colaborativos</span> de <span>construção incremental</span> de
            um amplo <span>sistema de informações</span> sobre a educação ambiental no Brasil, em linha com os preceitos da PNEA.
          </div>

          <div className={styles.bar}>
            <img className={styles.arrow} src={ArrowBlue} />
            <div>O Sistema MonitoraEA está ancorado no <span className={styles.link}>ProNEA</span> <button onClick={() => window.open('https://pppzcm-files.s3.us-east-2.amazonaws.com/Pronea-Digital-final.pdf', '_blank')}><img src={download} /></button> (Programa Nacional de Educação Ambiental), em sua versão de 2018, na Linha e estratégia de ação nº 5 – M&A de Políticas, Programas e Projetos de EA.</div>
          </div>

        </div>
      </section>

      <section className={styles.diagram}>
        <div className="width-limiter">

          <div className={styles.bar}>
            <img className={styles.arrow} src={ArrowBlue} />
            <div className={styles.diagram_text}>
              O Sistema é estruturado a partir de um conjunto de <span>estratégias metodológicas</span> que são implementadas de maneira articulada.
            </div>
            <div><img className={styles.diagram_image} src={diagram} /></div>
          </div>

        </div>
      </section>

      <section className={styles.fundamentos}>

        <div className="width-limiter">

          <div className={styles.main_title}>
            Fundamentos do Sistema MonitoraEA
          </div>

          <div className={styles.intro}>Todos os processos propostos pelo Sistema MonitoraEA estão baseados em fundamentos que orientam seu desenvolvimento.</div>

          <div className={styles.topic}>
            <div className={styles.title}>
              <div className={styles.number}>1.</div>
              <div className={styles.text}>Aderência à PNEA e ao Tratado de EA para Sociedades Sustentáveis e Responsabilidade Global</div>
            </div>

            <div className={styles.content}>
              <p>
                O Sistema MonitoraEA está em consonância com os princípios básicos de uma educação ambiental comprometida com a construção de sociedades sustentáveis. Partindo do princípio que fazer EA, seja por meio de projetos ou políticas públicas, implica em acompanhar, monitorar e avaliar as respectivas ações com resultados e impactos, o Sistema MonitoraEA incorporou de forma dialógica, participativa e plural as concepções que são essenciais tanto no Tratado de EA para Sociedades Sustentáveis e Responsabilidade Global (link para o doc) como na lei federal 9795/1999 que instituiu a Política Nacional de Educação Ambiental (PNEA)      (link para o doc).
              </p>
              <p>
                Portanto, o MonitoraEA representa uma concepção de monitoramento e avaliação mergulhada na práxis local-global que estimula e fortalece o agir-refletir-agir local conectado ao global, em uma contextualização histórica e crítica de compreensão ambiental integrada e articulada, na qual seja possível problematizar a realidade nos aspectos diversos das relações que ocorrem em um território. Em sintonia com a PNEA e o Tratado de EA, o MonitoraEA apresenta indicadores e ferramentas digitais que necessitam do engajamento individual e coletivo para o enfrentamento dos problemas socioambientais, assim como a apropriação do “bem comum” e dos benefícios oriundos das ações desenvolvidas.
              </p>
            </div>
          </div>

          <div className={styles.topic}>
            <div className={styles.title}>
              <div className={styles.number}>2.</div>
              <div className={styles.text}>Articulação de múltiplas iniciativas para governança em rede de políticas públicas</div>
            </div>

            <div className={styles.content}>
              <p>
                Uma das necessidades fundamentais para enfrentar as mudanças climáticas é a governança policêntrica das políticas públicas de modo geral. A governança policêntrica se estabelece por meio de mecanismos que incluem governos, organizações da sociedade civil, instituições acadêmicas, movimentos sociais, setor empresarial, cidadãos de forma geral entre outros grupos interessados no processo de tomada de decisões. Este tipo de governança abrange múltiplos centros de poder e decisão, que embora atuem de forma independente estão interligados, ampliando a transparência e propiciando que as políticas públicas reflitam os anseios, demandas e perspectivas da pluralidade de atores e da população.
              </p>
              <p>
                A Educação Ambiental também precisa ter uma governança estabelecida a partir de suas políticas públicas de esferas nacionais, estaduais, municipais, regionais, assim como das iniciativas de EA que são realizadas pela diversidade de atores da sociedade e setor privado. No contexto das mudanças climáticas, a adoção de uma governança policêntrica se mostra fundamental. Esse modelo prevê uma coordenação, cria uma rede de ações educadoras ambientais climáticas e evita a sobreposição de esforços, ampliando a cooperação e assegurando a realização de diversas ações simultâneas nos territórios, ao mesmo tempo em que favorece a troca de saberes, informações, recursos e experiências positivas entre os distintos centros de decisão.
              </p>
              <p>
                Neste sentido, o Sistema MonitoraEA dispõe de i) ferramentas digitais: que permitem a comunicação, conexão, mapeamentos e transparência;  ii) indicadores que orientam um caminho a seguir objetivo e confiável; iii) análises de redes que mapeiam as relações da diversidade de atores, ações sobrepostas, cooperação, colaboração, fluxos de informações e recursos, potenciais sinergias territoriais e institucionais; iv) os processos educadores ambientais que vão contribuir para que a participação  seja qualificada e empoderada na compreensão sobre as questões em pauta.              </p>
            </div>
          </div>

          <div className={styles.topic}>
            <div className={styles.title}>
              <div className={styles.number}>3.</div>
              <div className={styles.text}>Fomento à ação coletiva, articulação e a lógica de comunidades</div>
            </div>

            <div className={styles.content}>
              <p>
                É premissa básica do Sistema MonitoraEA o fomento à ação coletiva e articulada, sempre em busca da geração de impactos positivos significativos nos territórios.
              </p>
              <p>
                Neste sentido, o Sistema MonitoraEA está integralmente estruturada a partir da lógica de comunidades, ou seja, sempre que uma iniciativa é cadastrada no sistema, é gerada uma comunidade. Esta comunidade funciona como um espaço virtual ou um grupo de trabalho. Sua composição é livre (pode ser formada por um único indivíduo ou conter quantos membros se entender necessário) e as regras internas são definidas livremente pelos seus membros.
              </p>
              <p>
                Parte-se da ideia de que a realização de processos de auto-avaliação coletivamente pode gerar reflexões e trocas que mobilizem novos olhares sobre a iniciativa e suas possibilidades de articulação.
              </p>
            </div>
          </div>

          <div className={styles.topic}>
            <div className={styles.title}>
              <div className={styles.number}>4.</div>
              <div className={styles.text}>Fomento à cultura de monitoramento e aprendizagem social</div>
            </div>

            <div className={styles.content}>
              <p>
                O objetivo do Sistema MonitoraEA é disponibilizar instrumentos para subsidiar processos coletivos, descentralizados, porém estruturados de mapeamento, auto-avaliação e monitoramento de iniciativas em EA.
              </p>
              <p>
                Neste sentido, fomenta o desenvolvimento à  cultura de monitoramento, à compreensão do papel dos indicadores e da necessidade de viabilizar formas de demonstrar a robustez da diversidade de iniciativas de EA em todo o Brasil.
              </p>
              <p>
                Mais do que um sistema de avaliação, o MonitoraEA possibilita processos coletivos de auto-avaliação o que gera efetivamente a aprendizagem.
              </p>
            </div>
          </div>

          <div className={styles.topic}>
            <div className={styles.title}>
              <div className={styles.number}>5.</div>
              <div className={styles.text}>Pensar espacialmente e agir a partir do território</div>
            </div>

            <div className={styles.content}>
              <p>
                Mapear a diversidade de iniciativas em EA no Brasil depende de um esforço - que não é trivial - de pensar espacialmente a abrangência de políticas públicas, projetos e ações.
              </p>
              <p>
                Qual o raio de influência de um projeto? Há algum elemento ou parâmetro que pode ajudar a definir estes limites?
              </p>
              <p>
                Exercitar esta reflexão espacial, além de permitir localizar com precisão a iniciativa no mapa, contribui para ampliar a leitura do território, do conjunto de públicos que podem ser envolvidos e de elementos que devem ser considerados no desenvolvimento da iniciativa.
              </p>
            </div>
          </div>

        </div>

      </section>

      <section className={styles.articulacao}>

        <div className="width-limiter">

          <div className={styles.main_title}>
            Articulação para o desenvolvimento
          </div>

          <div>O Sistema MonitoraEA é co-desenvolvido pela Anppea e pelo INPE, além de uma constelação de instituições colaboradoras.</div>
          <div className={styles.bar}>
            <img src={inpe} />
            <div>O INPE, por meio de seu Laboratório de Análise e Desenvolvimento de Indicadores para a Sustentabilidade (LADIS), ancora institucionalmente os desenvolvimentos do sistema e suporta os processos de construção de indicadores, desenvolvimentos de tecnologias e análise de redes.</div>
          </div>
          <div className={styles.bar2}>
            <div>A Anppea, enquanto uma articulação nacional, atua na mobilização e na composição de arranjos entre instituições e indivíduos em prol do Sistema MonitoraEA, realiza processos formativos em todo o território nacional no âmbito do sistema, e atua na advocacy da EA no Brasil.</div>
            <img src={anppea} />
          </div>
          <div>A partir da coordenação ANPPEA-INPE, são articuladas um conjunto de instituições e indivíduos que colaboram com o desenvolvimento do Sistema MonitoraEA, em todo o território nacional.</div>
        </div>

      </section>

      <section className={styles.logos}>
        <div className="width-limiter">

          <div className={styles.main_title}>
            Instituições colaboradoras
          </div>

          <div className={styles.items}>
            <img src={eca} />
            <img src={unirio} />
            <img src={uea} />
            <img src={uesb} />
            <img src={ufp} />
            <img src={univali} />
            <img src={unb} />
            <img src={ufabc} />
            <img src={rebea} />
            <img src={ufms} />
            <img src={cemaden} />
          </div>

        </div>
      </section>

      <section className={styles.logos}>
        <div className="width-limiter">

          <div className={styles.main_title}>
            Usuários apoiadores
          </div>

          <div className={styles.items}>
            <img src={funbea} />
            <img src={peregum} />
          </div>

        </div>
      </section>

      <section className={styles.logos}>
        <div className="width-limiter">

          <div className={styles.main_title}>
            Fomento
          </div>

          <div className={`${styles.items} ${styles.fomento}`}>
            <img src={cnpq} />
            <img src={mam} />
            <img src={giz} />
            <img src={funbio} />
          </div>

        </div>
      </section>

      <section className={styles.logos}>
        <div className="width-limiter">

          <div className={styles.main_title}>
            Usuários apoiadores
          </div>

          <div className={styles.items}>
            <img src={funbea} />
            <img src={peregum} />
          </div>

        </div>
      </section>

      {data && <section className={styles.team}>
        <div className="width-limiter">

          <div className={styles.main_title}>
            Equipe
          </div>

          <>
            <div className={styles.sub_title}>
              Coordenação
            </div>

            <div className={styles.items}>

              {data.list.cat_coordenacao && data.list.cat_coordenacao.map(i => <div key={i.id} className={styles.each}>
                <div className={styles.photo}>
                  <img src={i.photo ? i.photo : 'https://pppzcm-files.s3.us-east-2.amazonaws.com/team/no-photo.png'} />
                </div>
                <div className={styles.info}>
                  <div className={styles.nome}>{i.name}</div>
                  <div className={styles.instituicao}>{i.institution}</div>
                </div>
              </div>)}

            </div>
          </>

          <>
            <div className={styles.sub_title}>
              Equipe CIEA e Riscos Climáticos
            </div>

            <div className={styles.items}>

              {data.list.cat_ciea_riscos && data.list.cat_ciea_riscos.map(i => <div key={i.id} className={styles.each}>
                <div className={styles.photo}>
                  <img src={i.photo ? i.photo : 'https://pppzcm-files.s3.us-east-2.amazonaws.com/team/no-photo.png'} />
                </div>
                <div className={styles.info}>
                  <div className={styles.nome}>{i.name}</div>
                  <div className={styles.instituicao}>{i.institution}</div>
                </div>
              </div>)}

            </div>
          </>

          <>
            <div className={styles.sub_title}>
              Equipe de desenvolvedores
            </div>

            <div className={styles.items}>

              {data.list.cat_dev && data.list.cat_dev.map(i => <div key={i.id} className={styles.each}>
                <div className={styles.photo}>
                  <img src={i.photo ? i.photo : 'https://pppzcm-files.s3.us-east-2.amazonaws.com/team/no-photo.png'} />
                </div>
                <div className={styles.info}>
                  <div className={styles.nome}>{i.name}</div>
                  <div className={styles.instituicao}>{i.institution}</div>
                </div>
              </div>)}

            </div>
          </>

        </div>
      </section >}

      <Faq portal="monitoraea" bg="white" />

    </>
  );
}

export default Monitora;
