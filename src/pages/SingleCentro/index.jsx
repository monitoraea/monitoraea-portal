import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./style.scss";
/* import { Link } from 'react-router-dom';  */
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import objective_icon from "../../images/single-project/objective.png";
import description_icon from "../../images/single-project/description.png";
import audience_icon from "../../images/single-project/audience.png";
import period_icon from "../../images/single-project/period.png";
import partners_icon from "../../images/single-project/partners.png";
import auto_check_icon from "../../images/single-project/auto_check.png";
import fale_icon from "../../images/single-project/fale.png";

import Geo from "../../components/Geo";

import TimelineSingle from "../../components/TimelineSingle";
import Development from "../../components/Development";

import Modal from "../../components/Modal";
import styles from "./styles.module.scss";

function Single({ staleTime = 3600000 /* 1h */ }) {
  const params = useParams();

  const [loading, _loading] = useState(false);
  const [pas, _pas] = useState(null);
  const [bounds, _bounds] = useState(null);

  const [showParticipateDialog, _showParticipateDialog] = useState(false);

  const [name, _name] = useState("");
  const [email, _email] = useState("");
  const [message, _message] = useState("");

  const { data } = useQuery(["single_proj", { id: params.id }], {
    queryFn: async () =>
      (await axios.get(`${import.meta.env.VITE_SERVER}cne/${params.id}`)).data,
    staleTime,
  });

  useEffect(() => {
    _showParticipateDialog(false);
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
        `${import.meta.env.VITE_SERVER}cne/${params.id}/atuacoes`,
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

  const mutations = {
    send: useMutation(() =>
      axios.post(
        `${import.meta.env.VITE_SERVER}cne/${params.id}/send_contact`,
        { email, name, message },
      ),
    ),
  };

  if (!data) return <></>;

  const handleSend = async () => {
    if (!name.length || !email.length || !message.length) return;

    await mutations.send.mutateAsync();

    _showParticipateDialog(false);
    _name("");
    _email("");
    _message("");
  };

  return (
    <>
      <Header />

      <div className={`${styles.section} ${styles.main}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div>
              <div className={styles.initiative}>{data.nome}</div>
              <div className={styles.institution}>
                {data.intitutions_it && (
                  <div>
                    {data.intitutions_it.map((i) => i.nome_inst).join(", ")}
                  </div>
                )}
                <div
                  className={styles.fale}
                  onClick={() => _showParticipateDialog(true)}
                >
                  <div>Fale com o moderador</div>
                  <img src={fale_icon} />
                </div>
              </div>
            </div>
            <div className={styles["button-wrapper"]}>
              <button
                onClick={() =>
                  (window.location = `${import.meta.env.VITE_PPZCM_URL}colabora/participate/cne/${params.id}`)
                }
              >
                Solicitar acesso a esta comunidade
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Geo loading={loading} pas={pas} bounds={bounds} />
      </div>

      {/* <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}><img src={description_icon} /></div>
              <div className={styles.title}>Descrição</div>
            </div>

            <div className={styles.text}>
              {breakItems(data.aspectos_gerais_txt)}
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}><img src={audience_icon} /></div>
              <div className={styles.title}>Públicos</div>
            </div>

            <div className={styles.text}>
              {breakItems(data.publico_txt)}
            </div>
          </div>
        </div>
      </div> */}

      <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={period_icon} />
              </div>
              <div className={styles.title}>Data de criação</div>
            </div>

            <div className={styles.text}>
              {data.data_criacao && (
                <>{dayjs(data.data_criacao).format("MM/YYYY")}</>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={period_icon} />
              </div>
              <div className={styles.title}>Data de Institucionalização</div>
            </div>

            <div className={styles.text}>
              {data.data_inst && <>{dayjs(data.data_inst).format("MM/YYYY")}</>}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={description_icon} />
              </div>
              <div className={styles.title}>
                Estratégia de sustentabilidade do centro
              </div>
            </div>

            <div className={styles.text}>
              {data.estrategia_link && (
                <a href={data.estrategia_link} target="_blank">
                  Clique aqui para baixar
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={objective_icon} />
              </div>
              <div className={styles.title}>Principais resultados</div>
            </div>

            <div className={`${styles.text} ${styles.outcomes}`}>
              {data.outcomes_it &&
                data.outcomes_it.map((o, i) => (
                  <div key={i} className={styles.each_outcome}>
                    <div>
                      {o.resultado_data && (
                        <>[{dayjs(o.resultado_data).format("MM/YYYY")}]</>
                      )}
                    </div>
                    <div>{o.resultado_tipo}</div>
                    {o.resultado_link && (
                      <>
                        (
                        <a href={data.resultado_link} target="_blank">
                          clique aqui para baixar
                        </a>
                        )
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.titled}`}>
        <div className="width-limiter">
          <div className={styles.content}>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src={auto_check_icon} />
              </div>
              <div className={styles.title}>Autoavaliação</div>
            </div>

            <div className={styles.text}>
              {data.published && (
                <>Publicado em {dayjs(data.published).format("DD/MM/YYYY")}</>
              )}
            </div>
          </div>
        </div>
      </div>

      <TimelineSingle entity_name="cne" entity_id={params.id} />

      <div className={styles.last}></div>

      <Development />

      {/*<section>
        <div className="width-limiter">
          <div className="project-body">
            <div className="content">
              <b>Objetivo</b>
              <br />
              <p>
                {breakItems(data.objetivos_txt)}
              </p>
              <br /><br />
              <b>Aspectos Gerais</b>
              <br />

              <p>
                {breakItems(data.aspectos_gerais_txt)}
              </p>
            </div>
            <div className="project-info">
              <div className="row">
                <div className="info-item">
                  <div className="label">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
                        <path d="M10.0455 12.2274V10.9546C10.0455 10.2795 9.77727 9.63209 9.29991 9.15473C8.82254 8.67736 8.1751 8.40918 7.5 8.40918H3.04545C2.37036 8.40918 1.72291 8.67736 1.24555 9.15473C0.768181 9.63209 0.5 10.2795 0.5 10.9546V12.2274" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.27299 5.86386C6.67881 5.86386 7.81845 4.72422 7.81845 3.3184C7.81845 1.91259 6.67881 0.772949 5.27299 0.772949C3.86718 0.772949 2.72754 1.91259 2.72754 3.3184C2.72754 4.72422 3.86718 5.86386 5.27299 5.86386Z" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.6816 5.86404L11.9544 7.13676L14.4998 4.59131" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Autoavaliação
                  </div>
                  <div className="value">
                    {!!status && <>{status === 'incomplete' ? 'Incompleta' : 'Completa'}</>}
                    {!status && <>Verificando...</>}
                  </div>
                </div>
                <div className="info-item">
                  <div className="label">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                        <path d="M0.5 5.4L6.8 0.5L13.1 5.4V13.1C13.1 13.4713 12.9525 13.8274 12.69 14.0899C12.4274 14.3525 12.0713 14.5 11.7 14.5H1.9C1.5287 14.5 1.1726 14.3525 0.91005 14.0899C0.6475 13.8274 0.5 13.4713 0.5 13.1V5.4Z" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.7002 14.5V7.5H8.9002V14.5" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Instituição
                  </div>
                  <div className="value">{data.instituicao_nome}</div>
                </div>
              </div>
              <div className="row">
                <div className="info-item">
                  <div className="label">
                    <div className="icon">
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7 1.90039H1.9C1.1268 1.90039 0.5 2.52719 0.5 3.30039V13.1004C0.5 13.8736 1.1268 14.5004 1.9 14.5004H11.7C12.4732 14.5004 13.1 13.8736 13.1 13.1004V3.30039C13.1 2.52719 12.4732 1.90039 11.7 1.90039Z" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.59961 0.5V3.3" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 0.5V3.3" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M0.5 6.09961H13.1" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Período
                  </div>
                  <div className="value">
                    {breakItems(data.periodo_txt)}
                  </div>
                </div>
                <div className="info-item">
                  <div className="label">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M7.5 14.5C11.366 14.5 14.5 11.366 14.5 7.5C14.5 3.63401 11.366 0.5 7.5 0.5C3.63401 0.5 0.5 3.63401 0.5 7.5C0.5 11.366 3.63401 14.5 7.5 14.5Z" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.50078 11.6998C9.82038 11.6998 11.7008 9.8194 11.7008 7.4998C11.7008 5.18021 9.82038 3.2998 7.50078 3.2998C5.18119 3.2998 3.30078 5.18021 3.30078 7.4998C3.30078 9.8194 5.18119 11.6998 7.50078 11.6998Z" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.49961 8.89961C8.27281 8.89961 8.89961 8.27281 8.89961 7.49961C8.89961 6.72641 8.27281 6.09961 7.49961 6.09961C6.72641 6.09961 6.09961 6.72641 6.09961 7.49961C6.09961 8.27281 6.72641 8.89961 7.49961 8.89961Z" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Público
                  </div>
                  <div className="value">
                    {breakItems(data.publico_txt)}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="info-item">
                  <div className="label">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none">
                        <path d="M12.9444 14.5002V12.9446C12.9444 12.1195 12.6167 11.3282 12.0332 10.7447C11.4498 10.1613 10.6585 9.8335 9.83333 9.8335H3.61111C2.78599 9.8335 1.99467 10.1613 1.41122 10.7447C0.827777 11.3282 0.5 12.1195 0.5 12.9446V14.5002" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.72244 6.72222C8.44066 6.72222 9.83355 5.32933 9.83355 3.61111C9.83355 1.89289 8.44066 0.5 6.72244 0.5C5.00422 0.5 3.61133 1.89289 3.61133 3.61111C3.61133 5.32933 5.00422 6.72222 6.72244 6.72222Z" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.6117 14.4996V12.9441C17.6111 12.2548 17.3817 11.5851 16.9594 11.0403C16.5371 10.4955 15.9458 10.1064 15.2783 9.93408" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.167 0.600586C12.8362 0.771931 13.4294 1.16113 13.8529 1.70683C14.2765 2.25252 14.5064 2.92368 14.5064 3.61447C14.5064 4.30527 14.2765 4.97643 13.8529 5.52212C13.4294 6.06782 12.8362 6.45702 12.167 6.62836" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.9444 14.5002V12.9446C12.9444 12.1195 12.6167 11.3282 12.0332 10.7447C11.4498 10.1613 10.6585 9.8335 9.83333 9.8335H3.61111C2.78599 9.8335 1.99467 10.1613 1.41122 10.7447C0.827777 11.3282 0.5 12.1195 0.5 12.9446V14.5002" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.72244 6.72222C8.44066 6.72222 9.83355 5.32933 9.83355 3.61111C9.83355 1.89289 8.44066 0.5 6.72244 0.5C5.00422 0.5 3.61133 1.89289 3.61133 3.61111C3.61133 5.32933 5.00422 6.72222 6.72244 6.72222Z" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.6117 14.4996V12.9441C17.6111 12.2548 17.3817 11.5851 16.9594 11.0403C16.5371 10.4955 15.9458 10.1064 15.2783 9.93408" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.167 0.600586C12.8362 0.771931 13.4294 1.16113 13.8529 1.70683C14.2765 2.25252 14.5064 2.92368 14.5064 3.61447C14.5064 4.30527 14.2765 4.97643 13.8529 5.52212C13.4294 6.06782 12.8362 6.45702 12.167 6.62836" stroke="#1D49A7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    Parceiros
                  </div>
                  <div className="value">
                    {breakItems(data.parceiros_txt)}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>*/}
      <Modal
        open={showParticipateDialog}
        onClose={() => _showParticipateDialog(false)}
        title="Enviar mensagem para o responsável"
        onSend={handleSend}
      >
        <div className={styles.fields}>
          <div className={styles["field-wrap"]}>
            <label>E-mail</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => _email(e.target.value)}
            />
          </div>
          <div className={styles["field-wrap"]}>
            <label>Nome</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => _name(e.target.value)}
            />
          </div>
          <div className={styles["field-wrap"]}>
            <label>Mensagem</label>
            <textarea
              rows={4}
              name="message"
              value={message}
              onChange={(e) => _message(e.target.value)}
            />
          </div>
        </div>
      </Modal>
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
