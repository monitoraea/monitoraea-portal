import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { portals } from '../../utils';
import imgplaceholder from './placeholder.png';

import './style.scss';

export default function Loop({ data, portal = 'main' }) {
    return (
        <>
            <div className="loop">
                {data.map((item) => (
                    <Link to={`/novidade-single/${item.id}`} key={item.id}>

                        <div className="loop-item" >
                            {!!item.featured_images && <img src={item.featured_images} alt="Figura Descritiva" className="image" />}
                            {!item.featured_images && <img src={imgplaceholder} alt="Figura Descritiva" className="image" />}
                        </div>

                        <div className="info-box">
                            <div className={`left-side ${item.portal}`}>{portals[item.portal][0]}</div>
                            <div className="right-side">{dayjs(item.publishedAt).format('MMM')} | {dayjs(item.publishedAt).format('YYYY')}</div>
                        </div>

                        {/* Texto fixo em negrito abaixo do infobox */}
                        <div className="fixed-text">{item.title}</div>
                        {/* Breve descrição abaixo do texto fixo */}
                        <div className="description-text">
                            {item.intro}
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
