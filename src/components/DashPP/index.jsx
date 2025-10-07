import { useState, useEffect } from "react";

// import L from 'leaflet';

import axios from "axios";
import { useQuery } from "react-query";

import styles from "./styles.module.scss";

export default function Dash({ filtersString }) {
  const [ppea_uf, _ppea_uf] = useState(false);
  const [ppea_mun, _ppea_mun] = useState(false);
  const [ppea_reg, _ppea_reg] = useState(false);
  const [ppea_uc, _ppea_uc] = useState(false);

  const [enquads, _enquads] = useState(null);

  const { data: iniciatives } = useQuery(
    [
      "ppea-initiatives",
      {
        filtersString
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
        filtersString,
      },
    ],
    {
      queryFn: async () =>
        (
          await axios.get(
            `${import.meta.env.VITE_SERVER}ppea/statistics/institutions/?${filtersString}`,
          )
        ).data,
      staleTime: 3600000,
    },
  );

  const { data: members } = useQuery(
    [
      "ppea-members",
      {
        filtersString,
      },
    ],
    {
      queryFn: async () =>
        (
          await axios.get(
            `${import.meta.env.VITE_SERVER}ppea/statistics/members/?${filtersString}`,
          )
        ).data,
      staleTime: 3600000,
    },
  );

  return (
    <>
      <section className={styles["ppea-dash"]}>
        <div className="width-limiter">
          <div className={styles["ppea-dash-inner"]}>
            <div className={styles.left}>
              <div className={styles["title"]}>
                Políticas Públicas de
                <br />
                Educação Ambiental no Brasil
              </div>
            </div>
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
                    <div className={styles.text}>Políticas Públicas de EA</div>
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
    </>
  );
}
