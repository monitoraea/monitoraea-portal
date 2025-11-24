import { useState } from "react";

import axios from "axios";
import { useQuery } from "react-query";

import Header from "../../components/Header";

import ContentByType from "../../components/ContentByType";
import Faq from "../../components/Faq";

import { useMediaQuery } from "react-responsive";

import { content_types } from "../../utils";

import Dash from "../../components/DashCECSA";
import Map from "../../components/Map";

import download from "../../images/download.png";

import "./style.scss";
import styles from "./styles.module.scss";

import cecsa from "./cecsa.png";
import cecsa_mobile from "./cecsa_mobile.png";

function CECSA() {
  const isMobile = useMediaQuery({ maxWidth: 500 });

  const [filtersString, _filtersString] = useState("");

  const { data: regioes } = useQuery(["regioes"], {
    queryFn: async () =>
      (await axios.get(`${import.meta.env.VITE_SERVER}cne/options`)).data,
    staleTime: 3600000,
  });

  const { data: ufs } = useQuery(["ufs", { filtersString }], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}cne/ufs?${filtersString}`,
        )
      ).data,
    staleTime: 3600000,
  });

  const loadNameOptions =
    (url = "cne/list/") =>
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

      <div className={styles.logo}>
        <div className="width-limiter">
          <div>
            <img src={!isMobile ? cecsa : cecsa_mobile} />
          </div>
        </div>
      </div>

      <section className={styles["about-section"]}>
        <div className="width-limiter">
          <div className={styles.about}>
            <div>
              <div className={styles.title}>
                O que são os Centros de Educação e Cooperação Socioambiental?
              </div>

              <div className={styles["about-text"]}>
                <div className={styles.column}>
                  <p>
                    Os Centros são espaços de cooperação, articulação,
                    elaboração estratégica, formação e desenvolvimento de
                    organizações e pessoas engajadas em temas como as mudanças
                    do clima, agroecologia, economias solidárias, bioeconomias,
                    educação socioambiental, erradicação da pobreza, cidades e
                    comunidades sustentáveis, consumo e produção sustentável,
                    água e outros temas relacionados aos Objetivos de
                    Desenvolvimento Sustentável - ODS.
                  </p>
                  <p>
                    De forma permanente e continuada,{" "}
                    <span>articulam pessoas, instituições e recursos</span>,
                    para incidirem em políticas públicas que ampliem a escala de
                    suas atuações, no tempo e no espaço.
                  </p>
                </div>

                <div className={styles.column}>
                  <p>
                    São espaços demonstrativos e experimentais que funcionam
                    como “oásis” de vida, como pontos de acolhimento da
                    diversidade humana e de outras espécies.
                  </p>
                  <p>
                    Propiciam bons encontros que fomentam a potência de agir por
                    um mundo melhor.
                  </p>
                  <p>
                    <span>
                      Acolhem e potencializam a atuação educadora e cooperativa
                    </span>{" "}
                    de outras instituições. Idealmente têm personalidade
                    jurídica própria e gestão compartilhada.
                  </p>
                  <p>
                    Buscam articular e dar continuidade às políticas públicas
                    desenvolvidas juntos aos seus territórios relacionais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <div className={styles["button-wrapper"]}>
              <button
                onClick={() => (window.location.href = "/colabora/minha_area")}
              >
                Cadastre um Centro de Educação e Cooperação Socioambiental
              </button>
            </div>

            <div className={styles.download}>
              <div className={styles["button-wrapper"]}>
                <button
                  onClick={() =>
                    window.open(
                      "https://pppzcm-files.s3.us-east-2.amazonaws.com/Centros.Nucelos.e.Equipamentos.de.Educacao.e.Cooperacao.Socioambiental.pdf",
                      "_blank",
                    )
                  }
                >
                  <div className={styles.image}>
                    <img src={download} />
                  </div>{" "}
                  Baixe o documento de Centros, Núcelos e Equipamentos de
                  Educação e Cooperação Socioambiental
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dash />

      <Map
        config={{
          perspective: "cecsa",
          entity: "cne",
          geo: {
            layer: "pppzcm:cecsa",
            field: "cne_id",
            cql_field: "cne_id",
          },
          resultsTable: {
            headers: ["Centros Selecionados", "Organização", "Região"],
            singleUrl: "/iniciativa/cecsa",
            singleField: "cne_id",
            data: (results) => [
              results.nome,
              results.instituicao_nome,
              results.nm_regiao,
            ],
          },
          fields: [
            {
              key: "regioes",
              initialFieldState: null,
              initialToggleState: false,
              title: "Regiões",
              type: "select",
              options: regioes,
              isMulti: true,
              reset: ["id", "ufs", "municipios"],
            },
            {
              key: "ufs",
              initialFieldState: null,
              initialToggleState: false,
              title: "Estado",
              type: "select",
              options: ufs,
              isMulti: true,
              reset: ["id", "municipios"],
            },
            {
              key: "municipios",
              initialFieldState: null,
              initialToggleState: false,
              title: "Município",
              type: "async_select",
              options: (inputValue, callback) => {
                axios
                  .get(
                    `${import.meta.env.VITE_SERVER}cne/municipios/?nome=${inputValue}${filtersString}`,
                  )
                  .then(function ({ data }) {
                    callback(data);
                  });
              },
              isMulti: true,
              reset: ["id"],
            },
            {
              key: "instituicao",
              initialFieldState: null,
              initialToggleState: false,
              title: "Nome da organização",
              type: "async_select",
              options: loadNameOptions("cne/instiuicao/list/"),
              isMulti: true,
              reset: ["id"],
            },
            {
              key: "id",
              initialFieldState: null,
              initialToggleState: false,
              title: "Nome do centro",
              type: "async_select",
              options: loadNameOptions(),
            },
          ],
        }}
        onFiltersChange={_filtersString}
      />

      {["news" /* ,'learning' */].map((c) => (
        <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
          portal="cne"
        />
      ))}

      <Faq portal="cne" />
    </>
  );
}

export default CECSA;
