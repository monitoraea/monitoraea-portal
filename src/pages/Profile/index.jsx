

import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

import styles from "./styles.module.scss";

export default function Profile({ staleTime = 3600000 /* 1h */ }) {

    const params = useParams();

    const { data } = useQuery(["profile", { id: params.identifier }], {
        queryFn: async () =>
            (await axios.get(`${import.meta.env.VITE_SERVER}user/profile/${params.identifier}`)).data, // TODO: identifier pode ser ID ou identifier
        staleTime,
    });

    return (<>
        <Header />

        <TheProfile data={data} />
    </>)
}

function TheProfile({ data }) {

    if (data === undefined) return <>Carregando...</>;

    if (data === null) return <div className={styles.noprofile}>Perfil inexistente!</div>;

    if (!data.filledProfile) return <div className={styles.noprofile}>Este usuário ainda não preencheu seu perfil!</div>

    return (<>

        <section className={styles.section}>
            <div className="width-limiter">
                <div className={styles.profile}>
                    {data.hasAvatar && <div className={styles.avatar}>
                        <img src={`${import.meta.env.VITE_SERVER}user/${data.id}/thumb/?ts=${'1768896882106'}"`/* TODO */} />
                    </div>}

                    <div class={styles['data-grid']}>
                        <div class={styles['data-grid__title']}>Nome:</div>
                        <div class={styles['data-grid__value']}>{data.name}</div>
                        <div class={styles['data-grid__title']}>Apresentação:</div>
                        <div class={styles['data-grid__value']}>{data.apresentacao}</div>

                        {data.contatos && data.contatos.length && <>
                        <div class={styles['data-grid__title']}>Contatos:</div>
                        <div class={styles['data-grid__value']}>
                            <ul>
                                {data.contatos.map((l, idx) => <li key={idx}>{l.contato_info} ({l.contato_descricao})</li>)}
                            </ul>
                        </div>
                        </>}

                        {data.links && data.links.length && <>
                        <div class={styles['data-grid__title']}>Links:</div>
                        <div class={styles['data-grid__value']}>
                            <ul>
                                {data.links.map((l, idx) => <li key={idx}>{l.link_info} ({l.link_descricao})</li>)}
                            </ul>
                        </div>
                        </>}
                    </div>
                </div>
            </div>
        </section>

    </>)
}