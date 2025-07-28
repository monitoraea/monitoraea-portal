import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./style.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import description_icon from "../../images/single-project/description.png";
import auto_check_icon from "../../images/single-project/auto_check2.png";
import fale_icon from "../../images/single-project/educom.png";
import midias_icon from "../../images/single-project/midias.png";
import etnica_icon from "../../images/single-project/etnica.png";
import genero_icon from "../../images/single-project/genero.png";
import idade_icon from "../../images/single-project/idade.png";


import Geo from "../../components/Geo";

import Development from "../../components/Development";

import styles from "./styles.module.scss";

function Single({ staleTime = 3600000 /* 1h */ }) {
  const params = useParams();

  const [loading, _loading] = useState(false);
  const [pas, _pas] = useState(null);
  const [bounds, _bounds] = useState(null);


  const [name, _name] = useState("");
  const [email, _email] = useState("");
  const [message, _message] = useState("");

  const [status, _status] = useState(null);
  const [published, _published] = useState(false);

  const { data } = useQuery(["single_proj", { id: params.id }], {
    queryFn: async () =>
      (await axios.get(`${import.meta.env.VITE_SERVER}educom_clima/${params.id}`)).data,
    staleTime,
  });

  useEffect(() => {
    _name("");
    _email("");
    _message("");
  }, []);

  useEffect(() => {
    async function fetchData() {
      // carrega todas as atuacoes para este projeto
      _loading(true);

      const {
        data: { atuacoes, bbox },
      } = await axios.get(
        `${import.meta.env.VITE_SERVER}educom_clima/${params.id}/atuacoes`,
      );

      _loading(false);
      _pas(atuacoes);

      if (bbox && bbox.y1 && bbox.x1 && bbox.y2 && bbox.x2)
        _bounds([
          [bbox.y1, bbox.x1],
          [bbox.y2, bbox.x2],
        ]);
    }
    if (params.id) fetchData();
  }, [params.id]);

  if (!data) return <></>;

  return (
    <>
      <Header />

      <div className={`${styles.section} ${styles.main}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div>
              <div className={styles.initiative}>{data.nome}</div>

              {data.ufs && data.ufs.length && <div className={styles.ufs}>{data.ufs.join(', ')}</div>}

              {data?.nivel?.length && <div className={styles.modal}>
                <span>Nível territorial em que atua: </span>
                <span>
                  {data?.nivel.join(', ')}
                </span>
              </div>}
              {data?.definicao && <div className={styles.modal}>
                <span>Tipo de Organização: </span>
                <span>
                  {data?.definicao}
                </span>
              </div>}
            </div>

            {data?.redes_sociais && <div className={styles.canais}>
              <div className={styles.title}>Acessar canais da organização</div>
              <div>{data.redes_sociais}</div>
            </div>}

          </div>
        </div>
      </div>

      <div>
        <Geo loading={loading} pas={pas} bounds={bounds} />
      </div>

      {data?.faixa_etaria?.length && <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={idade_icon} />
              </div>
              <div className={styles.title}>Idade dos Participantes</div>
            </div>

            <div className={styles.text}>
              {data.faixa_etaria.join(', ')}
            </div>
          </div>
        </div>
      </div>}

      {data?.participantes_genero?.length && <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={genero_icon} />
              </div>
              <div className={styles.title}>Relação Sexo/Gênero participantes</div>
            </div>

            <div className={styles.text}>
              {data.participantes_genero.join(', ')}
            </div>
          </div>
        </div>
      </div>}

      {data?.racas_etnias?.length && <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={etnica_icon} />
              </div>
              <div className={styles.title}>Relação étnica dos Participantes</div>
            </div>

            <div className={styles.text}>
              {data.racas_etnias.join(', ')}
            </div>
          </div>
        </div>
      </div>}

      {data?.midias?.length && <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={midias_icon} />
              </div>
              <div className={styles.title}>Mídias e canais usados</div>
            </div>

            <div className={styles.text}>
              {data.midias}
            </div>
          </div>
        </div>
      </div>}      

      {data?.estrategias_educativas?.length && <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={fale_icon} />
              </div>
              <div className={styles.title}>Estratégias educomunicativas</div>
            </div>

            <div className={styles.text}>
              {data.estrategias_educativas}
            </div>
          </div>
        </div>
      </div>}   

      {(data?.apresentacao?.length || data?.materiais_didaticos.length) && <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={auto_check_icon} />
              </div>
              <div className={styles.title}>Para saber mais sobre o trabalho</div>
            </div>

            <div className={styles.text}>
              {data.apresentacao}
              {data.apresentacao && data.materiais_didaticos && <>, </>}
              {data.materiais_didaticos}
            </div>
          </div>
        </div>
      </div>} 

      <div className={styles.last}></div>

      <Development />

    </>
  );
}

/* Aux functions */
function breakItems(txt) {
  if (!txt) return "";
  return txt
    .split("\n")
    .filter((txt) => txt.length)
    .join(", ")
    .replace("null", "");
}

export default Single;
