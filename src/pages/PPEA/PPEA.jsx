import Header from '../../components/Header';
import imgplaceholder from './placeholder.png';
import bg from './bg.png';

import DynamicContent from '../../components/DynamicContent';
import ContentByType from '../../components/ContentByType';
import Faq from '../../components/Faq';

import { content_types } from '../../utils';

import MapPPEA from '../../components/MapPP';

import './style.scss';
import styles from './styles.module.scss'

import pa_sep from '../../images/pa-sep.png';
import d1 from '../../images/diagram-1.png';
import d2 from '../../images/diagram-2.png';
import d3 from '../../images/diagram-3.png';

function PPEA() {

  return (
    <>
      <Header />

      <section id="sobre">
        <div className="width-limiter">

          <div className="ppea-about">

            <div className="pa-left">
              <div className='pa-title'>Politicas Públicas de Educação Ambiental</div>
              <div>
                <p>
                  O Sistema MonitoraEA adota a abordagem de políticas públicas <span>policêntricas, multicêntricas ou redes de políticas</span>, as quais são frutos de regras institucionais (arranjos institucionais) que envolvem a diversidade de atores para a resolução de um problema público comum que deve ser enfrentado pela coletividade.
                </p>
                <p>
                  Nesta abordagem, o ator protagonista de uma política pública pode ser tanto o <span>governo</span>, como a <span>sociedade civil</span> ou <span>setor privado</span> que juntos formulam e implementam políticas públicas defendendo o que traz benefícios para todos sem excluir ninguém.
                </p>

              </div>
            </div>

            <div className='pa-sep'><img src={pa_sep} /></div>

            <div className="pa-right">
              <p>
                Com essa abordagem de políticas públicas são considerados os diversos centros de tomadas de decisão capilarizados nos territórios, no entanto, os atores são interdependentes já que nenhum deles possui recursos ou autoridade por completo para resolver sozinho o problema público.
              </p>
              <p>
                É preciso <span>diálogo e cooperação em rede</span> o que exige o desafio da coordenação entre os participantes e governança democrática, participativa e colaborativa.
              </p>
            </div>
          </div>

        </div>

      </section >

      <MapPPEA />

      <div className={styles['diagrams']}>
        <div className={styles.d1}>
          <img src={d1} />
        </div>
        <div className={styles.d2}>
          <img src={d2} />
        </div>

        <div className={styles.d3}>
          <div className="width-limiter">

            <div className={styles['title-box']}>
              Indicadores de Monitoramento e Avaliação de PPEA
            </div>

            <div className={styles.texto}>
              <p>
                Os indicadores de monitoramento e avaliação de políticas públicas de educação ambiental (PPEA) foram construídos de maneira participativa entre os anos de 2016 a 2019, em um processo que envolveu atores do campo da EA de todas as regiões do Brasil, e de todos os segmentos de atuação.
                A descrição completa do processo metodológico de construção e validação dos indicadores pode ser encontrada no <span>caderno de Indicadores de M&A de PPEA</span> e no livro <span>Avaliação e monitoramento de políticas públicas de educação ambiental no Brasil: transição para sociedades sustentáveis.</span>
              </p>
              <p>
                Os indicadores são organizados a partir de 8 dimensões - que constituem o marco referencial de monitoramento e avaliação de PPEA. O atendimento à cada dimensão é verificado pelo conjunto de indicadores à elas associados.
              </p>
            </div>

            <div className={styles.diagrama}>
              <img src={d3} />
            </div>
          </div>
        </div>

      </div>


      {
        ['news'/* ,'learning' */].map(c => <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
          portal="pp"
        />)
      }

      <Faq portal="pp" />

    </>
  );
}

export default PPEA;
