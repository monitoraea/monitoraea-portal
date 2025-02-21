import axios from 'axios';
import { useQuery } from 'react-query';

import Header from '../../components/Header';
import download from '../../images/download2.png';
import { useState } from 'react';

import styles from './styles.module.scss';

export default function Publications({ staleTime = 3600000 /* 1h */ }) {

    const [filters, _filters] = useState('');
    const [tipo, _tipo] = useState(-1);
    const [titulo, _titulo] = useState('');
    const [ano, _ano] = useState(-1);

    const { data: tipos } = useQuery(['publication_tipos'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}publication/tipos`)).data,
        staleTime,
    });


    const { data: anos } = useQuery(['publication_anos'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}publication/anos`)).data,
        staleTime,
    });


    const { data } = useQuery(['publications', { filters }], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}publication/?${filters}`)).data,
        staleTime,
    });

    const handleFilters = () => {
        let newFilters = '';

        if(tipo !== '-1') newFilters = `${newFilters}&tipo=${tipo}`;
        
        if(titulo !== '') newFilters = `${newFilters}&titulo=${titulo}`;

        if(ano !== '-1') newFilters = `${newFilters}&ano=${ano}`;

        // console.log({ newFilters })

        _filters(newFilters);
    }

    return (<>
        <Header />

        <div className={styles.filter}>

            <div className="width-limiter">
                <div className={styles.fields}>
                    <div>
                        <select onChange={(e)=>_tipo(e.target.value)} value={tipo}>
                            <option value={-1}>Tipo</option>
                            {tipos && tipos.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder="Título" value={titulo} onChange={(e)=>_titulo(e.target.value)} />
                    </div>
                    <div>

                        <select onChange={(e)=>_ano(e.target.value)} value={ano}>
                            <option value={-1}>Ano</option>
                            {anos && anos.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <button onClick={handleFilters}>Buscar</button>
                    </div>
                </div>
            </div>
        </div>

        {data && <div className={styles.section}>

            {data.list.cat_1?.length && <div className={styles.category}>
                <div className="width-limiter">
                    <div className={styles.title}>Publicações do Sistema MonitoraEA</div>

                    <div className={styles.items}>

                        {data.list.cat_1.map(i => <div key={i.id} className={styles.each}>
                            <div className={styles.first_line}>
                                <div className={styles.year}>{i.year}</div>
                                <div className={styles.type}>{i.tipo}</div>
                            </div>
                            <div className={styles.second_line}>
                                <div className={styles.space}></div>
                                <div className={styles.name}>{i.name}</div>
                                <div className={styles.access}><button onClick={()=>window.open(i.link,'_blank')}><img src={download} /></button></div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>}

            {data.list.cat_2?.length && <div className={`${styles.category} ${styles.middle}`}>
                <div className="width-limiter">
                    <div className={styles.title}>Publicações de Referência</div>

                    <div className={styles.items}>

                        {data.list.cat_2.map(i => <div key={i.id} className={styles.each}>
                            <div className={styles.first_line}>
                                <div className={styles.year}>{i.year}</div>
                                <div className={styles.type}>{i.tipo}</div>
                            </div>
                            <div className={styles.second_line}>
                                <div className={styles.space}></div>
                                <div className={styles.name}>{i.name}</div>
                                <div className={styles.access}><button onClick={()=>window.open(i.link,'_blank')}><img src={download} /></button></div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>}

            {data.list.cat_3?.length && <div className={styles.category}>
                <div className="width-limiter">
                    <div className={styles.title}>Material de Apoio</div>

                    <div className={styles.items}>

                        {data.list.cat_3.map(i => <div key={i.id} className={styles.each}>
                            <div className={styles.first_line}>
                                <div className={styles.year}>{i.year}</div>
                                <div className={styles.type}>{i.tipo}</div>
                            </div>
                            <div className={styles.second_line}>
                                <div className={styles.space}></div>
                                <div className={styles.name}>{i.name}</div>
                                <div className={styles.access}><button onClick={()=>window.open(i.link,'_blank')}><img src={download} /></button></div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>}

        </div>}
    </>)
}