
import axios from 'axios';
import { useQuery } from 'react-query';

import Accordeon from '../../components/accordeon/accordeon';

export default function Faq({ portal = 'main', staleTime = 3600000 /* 1h */ }) {

    const { data } = useQuery(['faq', { portal }], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}content/faq/?portal=${portal}`)).data,
        staleTime,
    });

    return (
        <div className="width-limiter">
            <div className="section-header center" style={{ width: 'calc(50%)' }}>
                {/* <div className="section-title">Perguntas frequentes</div>*/}
                <div className="left-section" style={{ backgroundColor: '#2d8bba' }}>Perguntas Frequentes</div>
                <div className='right-section'> </div>
            </div>
            {!!data && <Accordeon items={data.map(({ title, text }) => ({ title, content: text.replace(/<[^>]*>/g, '') }))} />}
        </div>
    )
}