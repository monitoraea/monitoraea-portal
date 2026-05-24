import axios from "axios";
import { useQuery } from "react-query";

import { useMediaQuery } from "react-responsive";

import styles from "./styles.module.scss";

export default function MapPP() {
  const isMobile = useMediaQuery({ maxWidth: 500 });

  const { data: iniciatives } = useQuery(["cne-initiatives"], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}adm/statistics/iniciatives_in_perspectives/cne`,
        )
      ).data,
    staleTime: 3600000,
  });

  const { data: institutions } = useQuery(["cne-institutions"], {
    queryFn: async () =>
      (await axios.get(`${import.meta.env.VITE_SERVER}cne/statistics/cnes`))
        .data,
    staleTime: 3600000,
  });

  const { data: members } = useQuery(["cne-members"], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}gt/perspectives/5/members`,
        )
      ).data,
    staleTime: 3600000,
  });

  return (
    <>
      <section className={styles["cne-dash"]}>
        <div className="width-limiter">
          <div className={styles["cne-dash-inner"]}>
            <div className={styles["title"]}>
              Conheça os Centros de Educação Ambiental em
              atuação no Brasil
            </div>

            <div className={styles["big-numbers"]}>
              <div
                className={`${styles["box-with-image"]} ${isMobile ? "" : styles["large-box"]}`}
              >
                <div className={`${styles["box"]} ${styles["box-1"]}`}>
                  {!iniciatives && <div className={styles.number}>...</div>}
                  {iniciatives && (
                    <div className={styles.number}>{iniciatives}</div>
                  )}
                  <div className={styles.text}>Centros</div>
                </div>
              </div>

              <div className={styles["box-v-group"]}>
                <div className={styles["box-with-image"]}>
                  <div className={`${styles["box"]}`}>
                    {!institutions && <div className={styles.number}>...</div>}
                    {institutions && (
                      <div className={styles.number}>{institutions}</div>
                    )}
                    <div className={styles.text}>Organizações envolvidas</div>
                  </div>
                </div>

                <div className={styles["box-with-image"]}>
                  <div className={`${styles["box"]}`}>
                    {!members && <div className={styles.number}>...</div>}
                    {members && <div className={styles.number}>{members}</div>}
                    <div className={styles.text}>Pessoas envolvidas</div>
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
