import { useState, useEffect } from "react";

import Chart from "react-apexcharts";

import axios from "axios";
import { useQuery } from "react-query";

import styles from "./styles.module.scss";

import { useMediaQuery } from "react-responsive";

export default function Dash({ filtersString }) {
  const isMobile = useMediaQuery({ maxWidth: 500 });

  const [linhas, _linhas] = useState(null);

  const { data: iniciatives } = useQuery(["zcm-initiatives", filtersString], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}adm/statistics/iniciatives_in_perspectives/projeto?${filtersString}`,
        )
      ).data,
    staleTime: 3600000,
  });

  const { data: institutions } = useQuery(["zcm-institutions", filtersString], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}project/total_institutions?${filtersString}`,
        )
      ).data,
    staleTime: 3600000,
  });

  const { data: members } = useQuery(["zcm-members", filtersString], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}gt/perspectives/2/members?${filtersString}`,
        )
      ).data,
    staleTime: 3600000,
  });

  const { data: linhas_data } = useQuery(["zcm-linhas", filtersString], {
    queryFn: async () =>
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}project/statistics/linhas?${filtersString}`,
        )
      ).data,
    staleTime: 3600000,
  });

  useEffect(() => {
    if (linhas_data) {
      _linhas({
        series: [
          {
            data: linhas_data,
          },
        ],
        options: {
          chart: {
            type: "treemap",
            toolbar: {
              show: false,
            },
            animations: {
              enabled: false,
            },
          },
          colors: ["#2d8bba"],
          title: {
            show: false,
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: "12px",
            },
            formatter: function (text, op) {
              return [text, op.value];
            },
            offsetY: -4,
          },
        },
      });
    }
  }, [linhas_data]);

  return (
    <>
      <section className={styles["ppea-dash"]}>
        <div className="width-limiter">
          <div className={styles["ppea-dash-inner"]}>
            {!isMobile && (
              <div className={styles["title"]}>
                Conheça as iniciativas
                <br />
                vinculadas à<br />
                implementação do
                <br />
                PPPZCM
              </div>
            )}

            {isMobile && (
              <div className={styles["title"]}>
                Conheça as iniciativas vinculadas à implementação do PPPZCM
              </div>
            )}

            {!isMobile && (
              <div className={styles["big-numbers"]}>
                <div className={styles["box-with-image"]}>
                  <div className={`${styles["box"]} ${styles["box-1"]}`}>
                    {!iniciatives && <div className={styles.number}>...</div>}
                    {iniciatives && (
                      <div className={styles.number}>{iniciatives}</div>
                    )}
                    <div className={styles.text}>
                      iniciativas de
                      <br />
                      Educação
                      <br />
                      Ambiental
                    </div>
                  </div>
                </div>

                <div className={styles.second}>
                  <div className={styles["box-with-image"]}>
                    <div className={`${styles["box"]}`}>
                      {!institutions && (
                        <div className={styles.number}>...</div>
                      )}
                      {institutions && (
                        <div className={styles.number}>{institutions}</div>
                      )}
                      <div className={styles.text}>organizações</div>
                    </div>
                  </div>

                  <div className={styles["box-with-image"]}>
                    <div className={`${styles["box"]}`}>
                      {!members && <div className={styles.number}>...</div>}
                      {members && (
                        <div className={styles.number}>{members}</div>
                      )}
                      <div className={styles.text}>membros de comunidades</div>
                    </div>
                  </div>
                </div>

                <div>
                  {linhas && (
                    <Chart
                      options={linhas.options}
                      series={linhas.series}
                      type="treemap"
                      width="500"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
