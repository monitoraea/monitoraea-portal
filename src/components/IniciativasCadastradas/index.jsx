import { useState, createRef } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';

import ICLeft from '../../images/ic-left.svg?react';
import ICRight from '../../images/ic-right.svg?react';
import { useEffect } from 'react';

const logosRef = createRef()
const MOVE_FACTOR = 150;

export default function IniciativaCadastradas({ staleTime = 3600000, /* 1h */ }) {

    const [xPos, _xPos] = useState(0)
    const [xLimit, _xLimit] = useState(null)

    const { data } = useQuery(['institution-home'], { 
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}institution-home`)).data,
        staleTime,
    });

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

            {!data && <div className='ic-loading'>Carregando...</div>}

            {data && <div className='ic-loop'>

                <div className="ic-left" onClick={move(1)}><ICLeft /></div>

                <div className="ic-logos" ref={logosRef}>
                    <div className="ic-logos-miolo" style={{ left: `${xPos}px` }}>

                        {data.list.map(ic => <div key={ic.id}>
                            <a href={ic.link} target='blank'>
                                <div className="ic-item" >
                                    <img src={ic.logo} alt={ic.name} className="image" />
                                </div>
                            </a>
                        </div>)}

                    </div>
                </div>

                <div className="ic-right" onClick={move(-1)}><ICRight /></div>

            </div>}
        </div>
        <div className="ending-bar"></div>
    </div>)
}