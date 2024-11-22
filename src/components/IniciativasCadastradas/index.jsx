import { useState, createRef } from 'react';

import ICLeft from '../../images/ic-left.svg?react';
import ICRight from '../../images/ic-right.svg?react';
import ICanppea from '../../images/ic-anppea.png';
import ICmmaa from '../../images/ic-mma.png';
import ICciea from '../../images/ic-ciea.png';
import ICcoral from '../../images/ic-coral.png';
import ICicmbio from '../../images/ic-icmbio.png';
import ICterramar from '../../images/ic-terramar.png';
import { useEffect } from 'react';

const logosRef = createRef()
const MOVE_FACTOR = 150;

export default function IniciativaCadastradas() {

    const [xPos, _xPos] = useState(0)
    const [xLimit, _xLimit] = useState(null)

    useEffect(() => {
        if (logosRef.current) {
            _xLimit(logosRef.current.scrollWidth - logosRef.current.clientWidth)
        }
    }, [logosRef.current])

    const move = (factor) => () => {
        let newXPos = xPos + (factor * MOVE_FACTOR)

        if (newXPos > 0) newXPos = 0
        if (Math.abs(newXPos) > xLimit) newXPos = -xLimit

        _xPos(newXPos)
    }

    return (<div className="iniciativas-cadastradas">
        <div className="width-limiter">

            <div className="ic-title">
                Instituições com iniciativas cadastradas no Sistema MonitoraEA
            </div>

            <div className='ic-loop'>

                <div className="ic-left" onClick={move(1)}><ICLeft /></div>

                <div className="ic-logos" ref={logosRef}>
                    <div className="ic-logos-miolo" style={{ left: `${xPos}px` }}>
                        <div>
                            <a href="/novidade-single/1">
                                <div className="ic-item" >
                                    <img src={ICanppea} alt="Figura Descritiva" className="image" />
                                </div>
                            </a>
                        </div>

                        <div>
                            <a href="/novidade-single/1">
                                <div className="ic-item" >
                                    <img src={ICmmaa} alt="Figura Descritiva" className="image" />
                                </div>
                            </a>
                        </div>

                        <div>
                            <a href="/novidade-single/1">
                                <div className="ic-item" >
                                    <img src={ICciea} alt="Figura Descritiva" className="image" />
                                </div>
                            </a>
                        </div>

                        <div>
                            <a href="/novidade-single/1">
                                <div className="ic-item" >
                                    <img src={ICcoral} alt="Figura Descritiva" className="image" />
                                </div>
                            </a>
                        </div>

                        <div>
                            <a href="/novidade-single/1">
                                <div className="ic-item" >
                                    <img src={ICicmbio} alt="Figura Descritiva" className="image" />
                                </div>
                            </a>
                        </div>

                        <div>
                            <a href="/novidade-single/1">
                                <div className="ic-item" >
                                    <img src={ICterramar} alt="Figura Descritiva" className="image" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="ic-right" onClick={move(-1)}><ICRight /></div>

            </div>
        </div>
        <div className="ending-bar"></div>
    </div>)
}