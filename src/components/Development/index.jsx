import { Link } from 'react-router-dom';
import Arrow from '../../images/arrow_2.svg?react';

import Dev1 from '../../images/dev_1.png'
import Dev2 from '../../images/dev_2.png'
import Dev3 from '../../images/dev_3.png'
import Dev4 from '../../images/dev_4.png'

export default function Development() {
    return (<section id="desenvolvimento">

        <div className="width-limiter">

            <div className="inner-title-box desenvolvimento">
                <div className="left-side">Desenvolvimento</div>
                <div className="right-side"></div>
            </div>

            <div className="desenvolvimento-thumbs">
                <img src={Dev1} alt="Figura Descritiva" />
                <img src={Dev2} alt="Figura Descritiva" />
                <img src={Dev3} alt="Figura Descritiva" />
                <img src={Dev4} alt="Figura Descritiva" />
            </div>
            <div className="button-more-wrapper">
                <div>
                    <Link to={``}>
                        <button className="button-more">
                            <div>Rede de colaboradores e fomento</div>
                            <div className="icon">
                                <Arrow />
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </section >)
}