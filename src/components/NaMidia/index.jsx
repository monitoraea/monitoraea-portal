import axios from 'axios';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import MoreTip from '../../images/more_timeline_tip.svg?react'

export default function NaMidia({ staleTime = 3600000, /* 1h */ }) {
    const { data } = useQuery(['na-midia'], { 
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}na-midia`)).data,
        staleTime,
    });

    return (<section id="monitoraea_midia">
        <div className="inner-title-box na-midia">
            <div className="left-side">MonitoraEA na mídia</div>
            <div className="right-side"></div>
        </div>

        {!data && <div className='ic-loading'>Carregando...</div>}

        {data && <div className="width-limiter">
            <div className="timeline">
                <div className="timeline-each">
                    <div></div>
                    <div className="timeline-each-thumb empty"></div>
                </div>
                
                {data.list.map(nm => <div key={nm.id} className="timeline-each">
                    <div className="timeline-each-date">
                        <div className="timeline-each-date-miolo">
                            <div className="left-side">{dayjs(nm.publishedAt).format('DD MMM YYYY')}</div>
                            <div className="right-side"></div>
                        </div>
                    </div>
                    <div className="timeline-each-thumb">
                        <div className="timeline-each-thumb-image">
                            <img src={nm.thumb} alt="imagem de timeline" />
                        </div>
                    </div>
                    <div className="timeline-each-text">{nm.text}</div>
                </div>)}
                
                <div className="timeline-each">
                    <div></div>
                    <div className="timeline-each-thumb"></div>
                </div>
                <div className="timeline-each">
                    <div></div>
                    <div className="end">
                        <MoreTip />                        
                    </div>
                    <div className="timeline-each-more"><a href="">Mais</a></div>
                </div>
            </div>
        </div>}
    </section>)
}