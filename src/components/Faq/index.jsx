
import axios from 'axios';
import { useQuery } from 'react-query';

import Accordeon from '../../components/accordeon/accordeon';

export default function Faq({ portal = 'main', staleTime = 3600000 /* 1h */ }) {

    const { data } = useQuery(['faq', { portal }], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}content/faq/?portal=${portal}`)).data,
        staleTime,
    });

    return (
        <section id="perguntas_frequentes">
            <div className="inner-title-box faq">
                <div className="left-side">Perguntas Frequentes</div>
                <div className="right-side"></div>
            </div>

            <div className="width-limiter">
                {!!data && <Accordeon items={data.map(({ title, text }) => ({ title, content: text.replace(/<[^>]*>/g, '') }))} />}
            </div>
        </section>)
}