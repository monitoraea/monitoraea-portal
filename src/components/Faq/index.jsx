
import axios from 'axios';
import { useQuery } from 'react-query';

import Accordeon from '../../components/accordeon/accordeon';

export default function Faq({ portal = 'main', bg = 'default', staleTime = 3600000 /* 1h */ }) {

    const { data } = useQuery(['faq', { portal }], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}content/faq/?portal=${portal}`)).data,
        staleTime,
    });

    return (
        <section id="perguntas_frequentes" className={bg}>

            <div className="width-limiter">

                <div className="inner-title-box faq">
                    <div className="left-side">Perguntas Frequentes</div>
                    <div className="right-side"></div>
                </div>
                
                {!!data && <Accordeon bg={bg} items={data.map(({ title, text }) => ({ title, content: text.replace(/<[^>]*>/g, '') }))} />}
            </div>
        </section>)
}