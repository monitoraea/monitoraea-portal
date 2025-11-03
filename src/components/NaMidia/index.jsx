import axios from 'axios';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { useMediaQuery } from 'react-responsive';

import MoreTip from '../../images/more_timeline_tip.svg?react'

import styles from './styles.module.scss';
import './style.scss';

export default function NaMidia({ staleTime = 3600000, /* 1h */ }) {
    const isMobile = useMediaQuery({ maxWidth: 991 });

    const { data } = useQuery(['na-midia'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}na-midia`)).data,
        staleTime,
    });

    if (isMobile) return <section className={styles['monitoraea_midia']}>
        {!data && <div className='ic-loading'>Carregando...</div>}

        {data && <div className={styles['width-limiter']}>

            <div className={styles['title-box']}>
                <div className={styles['left-side']}>MonitoraEA na mídia</div>
                <div className={styles['right-side']}></div>
            </div>

            <div className={styles.timeline}>
                <div className={styles['timeline-each']}>
                    <div></div>
                    <div className={`${styles['timeline-each-thumb']} ${styles.empty}`}></div>
                </div>

                {data.list.map(nm => <div key={nm.id} className={styles['timeline-each']}>

                    <div className={styles['timeline-each-thumb']}>
                        <div className={styles['timeline-each-thumb-image']}>
                            <img src={nm.thumb} alt="imagem de timeline" />
                        </div>
                    </div>
                    <div className={styles['timeline-each-date']}>
                        <div className={styles['timeline-each-date-miolo']}>
                            {dayjs(nm.publishedAt).format('DD MMM YYYY')}
                        </div>
                    </div>
                    <div className={styles['timeline-each-text']}>{nm.text}</div>

                </div>)}

                <div className={styles['timeline-each']}>
                    <div></div>
                    <div className={styles['timeline-each-thumb']}></div>
                </div>
                <div className={styles['timeline-each']}>
                    <div></div>
                    <div className={styles.end}>
                        <MoreTip />
                    </div>
                    <div className={styles['timeline-each-more']}><a href="">Mais</a></div>
                </div>
            </div>

        </div>}
    </section>

    return (<section id="monitoraea_midia">

        {!data && <div className='ic-loading'>Carregando...</div>}

        {data && <div className="width-limiter">

            <div className="inner-title-box na-midia">
                <div className="left-side">MonitoraEA na mídia</div>
                <div className="right-side"></div>
            </div>

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
