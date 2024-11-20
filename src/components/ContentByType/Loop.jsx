import { Link } from 'react-router-dom';
import { portals } from '../../utils';
import imgplaceholder from './placeholder.png';

import './style.scss';

export default function Loop({ data, portal = 'main' }) {
    return (
        <>
            <div className="loop">
                {data.map((item) => (
                    <Link to={`/novidade-single/${item.id}`} key={item.id}>
                        {/* <div className="loop-item">
                            {!!item.featured_images && <img src={item.featured_images} alt="" />}
                            {!item.featured_images && <img src={imgplaceholder} alt="" />}
                            <div className="backdrop"></div>
                            <div className="content">
                                <div className="title">{item.title}</div>
                                {portal === 'main' && item.portal !== 'main' && <div className={`tag ${item.portal}`}>{portals[item.portal][1]}</div>}
                            </div>
                        </div> */}
                        <div className="loop-item" >
                            {!!item.featured_images && <img src={item.featured_images} alt="Figura Descritiva" className="image" />}
                            {!item.featured_images && <img src={imgplaceholder} alt="Figura Descritiva" className="image" />}
                        </div>
                        {/* <div className="info-box">                            
                            <div className="right-section"><div className={`left-section ${item.portal}`}>{portals[item.portal][0]}</div> Outubro | 2024</div>
                        </div> */}

                        <div className="info-box">
                            <div className={`left-side ${item.portal}`}>{portals[item.portal][0]}</div>
                            <div className="right-side">Outubro | 2024</div>
                        </div>

                        {/* Texto fixo em negrito abaixo do infobox */}
                        <div className="fixed-text">{item.title}</div>
                        {/* Breve descrição abaixo do texto fixo */}
                        <div className="description-text">
                            <strong>Breve descrição</strong><br />
                            XXXXXXXX XXXXXXXXXXXXXXX XXXXXXXXX XXXXXXXXX XXXXXXXXX XX XXXXXXXXX XXXXXXX XX XXXXXXXX XXXXXX
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}