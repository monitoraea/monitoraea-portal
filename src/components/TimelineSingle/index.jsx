import axios from "axios";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import styles from "./styles.module.scss";

export default function TimelineSingle({
  entity_name,
  entity_id,
  staleTime = 3600000 /* 1h */,
}) {
  const { data } = useQuery(["na-midia"], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}${entity_name}/${entity_id}/draft/timeline`,
        )
      ).data,
    staleTime,
  });

  if (!data?.length) return <></>;

  return (
    <section className={styles.timeline_main}>
      {!data && <div className="ic-loading">Carregando...</div>}

      {data && (
        <div className="width-limiter">
          <div
            className={`${styles["inner-title-box"]} ${styles["inner-timeline"]}`}
          >
            <div className={styles["left-side"]}>Linha do tempo</div>
            <div className={styles["right-side"]}></div>
          </div>

          <div className={styles.timeline}>
            {data.map((tl) => (
              <div key={tl.id} className={styles["timeline-each"]}>
                <div className={styles["timeline-each-date"]}>
                  <div className={styles["timeline-each-date-miolo"]}>
                    <div className={styles["left-side"]}>
                      {dayjs(tl.date).format("MMM YYYY")}
                    </div>
                    <div className={styles["right-side"]}></div>
                  </div>
                </div>
                <div className={styles["timeline-each-thumb"]}>
                  <div className={styles["timeline-each-thumb-image"]}>
                    {tl.timeline_arquivo && (
                      <img src={tl.timeline_arquivo} alt="imagem de timeline" />
                    )}
                  </div>
                </div>
                <div className={styles["timeline-each-text"]}>{tl.texto}</div>
              </div>
            ))}

            <div className={styles["timeline-each"]}>
              <div></div>
              <div className={styles["timeline-each-thumb"]}></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
