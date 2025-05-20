import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

import Arrow from '../../images/arrow.svg?react';

import Loop from './Loop';

import './style.scss';

export default function ContentByType({ id, title, portal = "main", className, contentType, moreText = 'Ver todos', staleTime = 3600000, /* 1h */ }) {

    const { data } = useQuery(['news', { portal, contentType }], { /* TODO: tudo que pode variar: limit, offset */
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}content/by_type/${contentType}?portal=${portal}&limit=3&offset=0`)).data, /* TODO: se nao vou reaproveitar, fixar limit e offset? */
        staleTime,
    });

    if(!data || !data.entities?.length) return <></>

    return (<section id={id} className={className}>

        <div className="width-limiter">

            <div className="title-box">
                <div className="left-side">{title}</div>
                <div className="right-side"></div>
            </div>

            {!!data && <Loop data={data.entities} portal={portal} />}
        </div>

        <div className="button-more-wrapper">
            {!!contentType && <div>
                <Link to={`/novidades/${contentType}${portal !== 'main' ? `/${portal}` : ''}`}>
                    <button className="button-more">
                        {moreText}
                        <div className="icon">
                            <Arrow />
                        </div>
                    </button>
                </Link>
            </div>}
        </div>
    </section>)
}