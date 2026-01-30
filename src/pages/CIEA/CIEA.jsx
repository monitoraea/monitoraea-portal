import { useState } from "react";

import Header from "../../components/Header";

import DynamicContent from "../../components/DynamicContent";
import ContentByType from "../../components/ContentByType";
import Faq from "../../components/Faq";

import axios from "axios";
import { useQuery } from "react-query";

import { content_types } from "../../utils";

import Map from "../../components/Map";

// import './style.scss';
import styles from "./styles.module.scss";

function CIEA() {
  const [filtersString, _filtersString] = useState("");

  const { data: regioes } = useQuery(["regioes"], {
    queryFn: async () =>
      (await axios.get(`${import.meta.env.VITE_SERVER}commission/options`))
        .data,
    staleTime: 3600000,
  });

  const { data: ufs } = useQuery(["ufs", { filtersString }], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}commission/ufs?${filtersString}`,
        )
      ).data,
    staleTime: 3600000,
  });

  return (
    <>
      <Header />

      <section id="sobre" className={styles["about-section"]}>
        <div className="width-limiter">
          <p className="p-xl">
            <DynamicContent keyRef="ciea.intro" />
          </p>
        </div>
      </section>

      <section className={styles["ciea-dash"]}>
        <div className="width-limiter">
          <div className={styles["ciea-dash-inner"]}>
            <div className={styles["title"]}>Conheça os Colegiados de PPEA do Brasil</div>
          </div>
        </div>
      </section>

      <Map
        config={{
          perspective: "ciea",
          entity: "commission",
          geo: {
            layer: "pppzcm:ufs-staging",
            field: "id",
            cql_field: "uf",
          },
          resultsTable: {
            headers: ["CIEA Selecionadas", "Região"],
            singleUrl: "/iniciativa/colegiados",
            data: (results) => [
              results.nome,
              "", // TODO
              // results.regioes.filter((r) => !!r).join(","),
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
              reset: ["id", "ufs"],
            },
            {
              key: "ufs",
              initialFieldState: null,
              initialToggleState: false,
              title: "Estado",
              type: "select",
              options: ufs,
              isMulti: true,
              reset: ["id"],
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
          portal="ciea"
        />
      ))}

      <Faq portal="ciea" />
    </>
  );
}

export default CIEA;
