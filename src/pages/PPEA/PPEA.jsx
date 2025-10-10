import { useState, useEffect, createRef } from "react";

import { useMediaQuery } from "react-responsive";

import axios from "axios";
import { useQuery } from "react-query";

import Header from "../../components/Header";
import ContentByType from "../../components/ContentByType";
import Faq from "../../components/Faq";

import { content_types } from "../../utils";

import Map from "../../components/Map";
import Dash from "../../components/DashPP";

import "./style.scss";
import styles from "./styles.module.scss";

import pa_sep from "../../images/pa-sep.png";
import d1 from "../../images/diagram-1.png";
import { options } from "sanitize-html";

function PPEA() {
  const isMobile =
    useMediaQuery({ maxWidth: 991 }) && import.meta.env.MODE === "development";

  const [ppea_uf, _ppea_uf] = useState(false);
  const [ppea_mun, _ppea_mun] = useState(false);
  const [ppea_reg, _ppea_reg] = useState(false);
  const [ppea_uc, _ppea_uc] = useState(false);
  const [enquads, _enquads] = useState(null);

  const [ufs, _ufs] = useState(null);

  const [filtersString, _filtersString] = useState("");

  /* TODO: ZCM -> PPEA */

  const { data: iniciatives } = useQuery(
    [
      "ppea-initiatives",
      {
        filtersString,
      },
    ],
    {
      queryFn: async () =>
        (
          await axios.get(
            `${import.meta.env.VITE_SERVER}ppea/statistics/iniciatives/?${filtersString}`,
          )
        ).data,
      staleTime: 3600000,
    },
  );

  const { data: institutions } = useQuery(
    [
      "ppea-institutions",
      {
        enquads,
        ppea_reg,
        ppea_uf,
        ppea_mun,
        ppea_uc,
      },
    ],
    {
      queryFn: async () =>
        (
          await axios.get(
            `${import.meta.env.VITE_SERVER}ppea/statistics/institutions/?${enquads ? `&enquads=${enquads.join(",")}` : ""}`,
          )
        ).data,
      staleTime: 3600000,
    },
  );

  const { data: members } = useQuery(
    [
      "ppea-members",
      {
        enquads,
        ppea_reg,
        ppea_uf,
        ppea_mun,
        ppea_uc,
      },
    ],
    {
      queryFn: async () =>
        (
          await axios.get(
            `${import.meta.env.VITE_SERVER}ppea/statistics/members/?${enquads ? `&enquads=${enquads.join(",")}` : ""}`,
          )
        ).data,
      staleTime: 3600000,
    },
  );

  const { data: ufsRaw } = useQuery(["ufs", { filtersString }], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}project/ufs_options?${filtersString}` /* TODO: ZCM -> PPEA */,
        )
      ).data,
    staleTime: 3600000,
  });

  useEffect(() => {
    _enquads(getEnquads());
  }, [ppea_reg, ppea_uf, ppea_mun, ppea_uc]);
  // TODO: melhorar estes states, vide zcm recortes

  useEffect(() => {
    if (ufsRaw) _ufs(ufsRaw);
  }, [ufsRaw]);

  const getEnquads = () => {
    let enquads = [];

    if (ppea_reg) enquads.push(0);
    if (ppea_uf) enquads.push(1);
    if (ppea_mun) enquads.push(2);
    if (ppea_uc) enquads.push(5);

    return enquads;
  };

  const loadNameOptions =
    (url = `project/list/` /* TODO: ZCM -> PPEA */) =>
    (inputValue, callback) => {
      axios
        .get(
          `${import.meta.env.VITE_SERVER}${url}?nome=${inputValue}${filtersString}`,
        )
        .then(function ({ data }) {
          callback(data);
        });
    };

  return (
    <>
      <Header />

      {isMobile && (
        <>
          <section className={styles.sobre}>
            <div className={styles["width-limiter"]}>
              <div className={styles.content}>
                <div className={styles.title}>
                  Politicas Públicas de Educação Ambiental
                </div>
                <div>
                  <p>
                    O Sistema MonitoraEA adota a abordagem de políticas públicas{" "}
                    <span>
                      policêntricas, multicêntricas ou redes de políticas
                    </span>
                    , as quais são frutos de regras institucionais (arranjos
                    institucionais) que envolvem a diversidade de atores para a
                    resolução de um problema público comum que deve ser
                    enfrentado pela coletividade.
                  </p>
                  <p>
                    Nesta abordagem, o ator protagonista de uma política pública
                    pode ser tanto o <span>governo</span>, como a{" "}
                    <span>sociedade civil</span> ou <span>setor privado</span>{" "}
                    que juntos formulam e implementam políticas públicas
                    defendendo o que traz benefícios para todos sem excluir
                    ninguém.
                  </p>

                  <p>
                    Com essa abordagem de políticas públicas são considerados os
                    diversos centros de tomadas de decisão capilarizados nos
                    territórios, no entanto, os atores são interdependentes já
                    que nenhum deles possui recursos ou autoridade por completo
                    para resolver sozinho o problema público.
                  </p>
                  <p>
                    É preciso <span>diálogo e cooperação em rede</span> o que
                    exige o desafio da coordenação entre os participantes e
                    governança democrática, participativa e colaborativa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles["dash"]}>
            <div className={styles["width-limiter"]}>
              <div className={styles["dash-inner"]}>
                {/* <div className={styles.left}>
                <div className={styles["title"]}>
                  Políticas Públicas de
                  <br />
                  Educação Ambiental no Brasil
                </div>
              </div> */}
                <div className={styles.right}>
                  <div className={styles["big-numbers"]}>
                    <div className={styles["box-with-image"]}>
                      <div className={`${styles["box"]} ${styles["box-1"]}`}>
                        {!iniciatives && iniciatives !== 0 && (
                          <div className={styles.number}>...</div>
                        )}
                        {iniciatives !== null && (
                          <div className={styles.number}>{iniciatives}</div>
                        )}
                        <div className={styles.text}>
                          Políticas Públicas de EA
                        </div>
                      </div>
                    </div>

                    <div className={styles["box-with-image"]}>
                      <div className={`${styles["box"]}`}>
                        {!institutions && institutions !== 0 && (
                          <div className={styles.number}>...</div>
                        )}
                        {institutions !== null && (
                          <div className={styles.number}>{institutions}</div>
                        )}
                        <div className={styles.text}>Instituições</div>
                      </div>
                    </div>

                    <div className={styles["box-with-image"]}>
                      <div className={`${styles["box"]}`}>
                        {!members && members !== 0 && (
                          <div className={styles.number}>...</div>
                        )}
                        {members !== null && (
                          <div className={styles.number}>{members}</div>
                        )}
                        <div className={styles.text}>Pessoas</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <>TODO: same map</>
        </>
      )}

      {!isMobile && (
        <>
          <section id="sobre">
            <div className="width-limiter">
              <div className="ppea-about">
                <div className="pa-left">
                  <div className="pa-title">
                    Politicas Públicas de Educação Ambiental
                  </div>
                  <div>
                    <p>
                      O Sistema MonitoraEA adota a abordagem de políticas
                      públicas{" "}
                      <span>
                        policêntricas, multicêntricas ou redes de políticas
                      </span>
                      , as quais são frutos de regras institucionais (arranjos
                      institucionais) que envolvem a diversidade de atores para
                      a resolução de um problema público comum que deve ser
                      enfrentado pela coletividade.
                    </p>
                    <p>
                      Nesta abordagem, o ator protagonista de uma política
                      pública pode ser tanto o <span>governo</span>, como a{" "}
                      <span>sociedade civil</span> ou <span>setor privado</span>{" "}
                      que juntos formulam e implementam políticas públicas
                      defendendo o que traz benefícios para todos sem excluir
                      ninguém.
                    </p>
                  </div>
                </div>

                <div className="pa-sep">
                  <img src={pa_sep} />
                </div>

                <div className="pa-right">
                  <p>
                    Com essa abordagem de políticas públicas são considerados os
                    diversos centros de tomadas de decisão capilarizados nos
                    territórios, no entanto, os atores são interdependentes já
                    que nenhum deles possui recursos ou autoridade por completo
                    para resolver sozinho o problema público.
                  </p>
                  <p>
                    É preciso <span>diálogo e cooperação em rede</span> o que
                    exige o desafio da coordenação entre os participantes e
                    governança democrática, participativa e colaborativa.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <Dash filtersString={filtersString} />
          <Map
            config={{
              perspective: "ppea",
              entity: "ppea",
              geo: {
                layer: "pppzcm:ppea",
                field: "politica_id",
              },
              resultsTable: {
                headers: ["PPEA Selecionadas", "Organização"],
                singleUrl: "/iniciativa/ppea",
                singleField: "politica_id",
                data: (results) => [results.nome, results.instituicao_nome],
              },
              fields: [
                {
                  key: "ppea_uf",
                  initialFieldState: false,
                  initialToggleState: false,
                  title: "PPEA Estaduais",
                  type: "toggle",
                },
                {
                  key: "ppea_mun",
                  initialFieldState: false,
                  initialToggleState: false,
                  title: "PPEA Municipais",
                  type: "toggle",
                },
                {
                  key: "ppea_reg",
                  initialFieldState: false,
                  initialToggleState: false,
                  title: "PPEA Regionais ou Federais",
                  type: "toggle",
                },
                {
                  key: "ppea_uc",
                  initialFieldState: false,
                  initialToggleState: false,
                  title: "PPEA a partir de UC",
                  type: "toggle",
                },
              ],
            }}
            onFiltersChange={_filtersString}
          />
        </>
      )}

      <div className={styles["diagrams"]}>
        <div className={styles.d3}>
          <div className={styles["width-limiter"]}>
            <div className={styles["title-box"]}>
              Indicadores de Monitoramento e Avaliação de PPEA
            </div>

            <div className={styles.texto}>
              <p>
                Os indicadores de monitoramento e avaliação de políticas
                públicas de educação ambiental (PPEA) foram construídos de
                maneira participativa entre os anos de 2016 a 2019, em um
                processo que envolveu atores do campo da EA de todas as regiões
                do Brasil, e de todos os segmentos de atuação. A descrição
                completa do processo metodológico de construção e validação dos
                indicadores pode ser encontrada no{" "}
                <span>caderno de Indicadores de M&A de PPEA</span> e no livro{" "}
                <span>
                  Avaliação e monitoramento de políticas públicas de educação
                  ambiental no Brasil: transição para sociedades sustentáveis.
                </span>
              </p>
              <p>
                Os indicadores são organizados a partir de 8 dimensões - que
                constituem o marco referencial de monitoramento e avaliação de
                PPEA. O atendimento à cada dimensão é verificado pelo conjunto
                de indicadores à elas associados.
              </p>
            </div>

            {isMobile && (
              <div className={styles.dimensoes}>
                <div className={styles.dimensao}>
                  <div className={styles.title}>Dimensão Diagnóstica</div>
                  <div className={styles.indicador}>
                    <div>01.</div>
                    <div>Realização de diagnóstico participativo</div>
                  </div>
                </div>

                <div className={styles.dimensao}>
                  <div className={styles.title}>
                    Dimensão de Governança Participativa e Adaptativa
                  </div>
                  <div className={styles.indicador}>
                    <div>02.</div>
                    <div>Mobilização Social</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>03.</div>
                    <div>
                      Instâncias e/ou colegiados para diálogos, construção e
                      tomadas de decisão coletiva
                    </div>
                  </div>
                  <div className={styles.indicador}>
                    <div>04.</div>
                    <div>Transparência</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>05.</div>
                    <div>Mecanismos para lidar com a imprevisibilidade</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>06.</div>
                    <div>Instrumento pedagógico participativo</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>07.</div>
                    <div>Monitoramento e Avaliação</div>
                  </div>
                </div>

                <div className={styles.dimensao}>
                  <div className={styles.title}>
                    Dimensão da Formação Dialógica
                  </div>
                  <div className={styles.indicador}>
                    <div>08.</div>
                    <div>Desenvolvimento do processo formativo</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>09.</div>
                    <div>Diversidade de públicos envolvidos</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>10.</div>
                    <div>Educadores ambientais formados</div>
                  </div>
                </div>

                <div className={styles.dimensao}>
                  <div className={styles.title}>
                    Dimensão da Subjetividade do Indivíduo
                  </div>
                  <div className={styles.indicador}>
                    <div>11.</div>
                    <div>Elevação da autoestima</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>12.</div>
                    <div>Laços e vínvulos comunitários e sociais</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>13.</div>
                    <div>
                      Ações educativas ambientais articuladas com os aspectos
                      culturais
                    </div>
                  </div>
                </div>

                <div className={styles.dimensao}>
                  <div className={styles.title}>
                    Dimensão da Intervenção Socioambiental
                  </div>
                  <div className={styles.indicador}>
                    <div>14.</div>
                    <div>Intervenções socioambientais geradas</div>
                  </div>
                </div>

                <div className={styles.dimensao}>
                  <div className={styles.title}>Dimensão da Complexidade</div>
                  <div className={styles.indicador}>
                    <div>15.</div>
                    <div>Articulação temática</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>16.</div>
                    <div>Articulação de redes, movimentos e coletivos</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>17.</div>
                    <div>
                      Conexão com referências e documentos internacionais
                    </div>
                  </div>
                  <div className={styles.indicador}>
                    <div>18.</div>
                    <div>Ações afirmativas</div>
                  </div>
                </div>
                <div className={styles.dimensao}>
                  <div className={styles.title}>Dimensão Institucional</div>
                  <div className={styles.indicador}>
                    <div>19.</div>
                    <div>Instrumento legal</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>20.</div>
                    <div>
                      Gestão racional dos bens naturais, patrimoniais e públicos
                    </div>
                  </div>
                  <div className={styles.indicador}>
                    <div>21.</div>
                    <div>Suporte orçamentário</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>22.</div>
                    <div>
                      Nível da PPEA na estrutura organizacional/administrativa
                    </div>
                  </div>
                </div>

                <div className={styles.dimensao}>
                  <div className={styles.title}>Dimensão da Comunicação</div>
                  <div className={styles.indicador}>
                    <div>23.</div>
                    <div>Plano e ferramentas de comunicação</div>
                  </div>
                  <div className={styles.indicador}>
                    <div>24.</div>
                    <div>Educomunicação / Comunicação Social</div>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.diagrama}>
              {!isMobile && <img src={d1} />}
            </div>
          </div>
        </div>
      </div>

      {["news" /* ,'learning' */].map((c) => (
        <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
          portal="pp"
        />
      ))}

      <Faq portal="pp" />
    </>
  );
}

export default PPEA;
