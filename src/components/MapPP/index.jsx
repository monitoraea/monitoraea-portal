import { useState, useEffect, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';

// import L from 'leaflet';

import axios from 'axios';
import { useQuery } from 'react-query';

import ToggleLeft from '../../components/icons/toggle-left.svg?react';
import ToggleRight from '../../components/icons/toggle-right.svg?react';

import DashExample from '../../images/ppea-dash-example.png'
import Consultas from '../../images/consultas.png'
import ConsultasR from '../../images/consultas_reverse.png'

import Mapa from '../../images/mapa.png'
import Acesso from '../../images/acesso.png'

import styles from './styles.module.scss';

const mapRef = createRef();
const position = [-15, -42];
const zoom = 5;

export default function MapPP() {
    const [ppea_uf, _ppea_uf] = useState(false)
    const [ppea_mun, _ppea_mun] = useState(false)
    const [ppea_reg, _ppea_reg] = useState(false)
    const [ppea_uc, _ppea_uc] = useState(false)
    const [ppea_ch, _ppea_ch] = useState(false)
    const [ppea_sc, _ppea_sc] = useState(false)
    const [ppea_cr, _ppea_cr] = useState(false)
    const [ppea_eu, _ppea_eu] = useState(false)
    const [ppea_sp, _ppea_sp] = useState(false)
    const [ppea_ou, _ppea_ou] = useState(false)
    const [ppea_nom, _ppea_nom] = useState(false)

    const [limit] = useState(6)
    const [page, _page] = useState(1)
    const [enquads, _enquads] = useState(null)

    const [consultas_open, _consultas_open] = useState(false)
    const [politicas, _politicas] = useState(null)

    const [bbox, _bbox] = useState(null)
    const [selected, _selected] = useState(null)

    /*  
    - value: 0
      label: 'Poder Público - Nível Federal'
    - value: 1
      label: 'Poder Público - Nível Estadual'
    - value: 2
      label: 'Poder Público - Nível Municipal'
    - value: 3
      label: 'Organização da Sociedade Civil'
    - value: 4
      label: 'Escolas e Universidades'
    - value: 5
      label: 'Comitê gestor de Unidade de Conservação'
    - value: 6
      label: 'Bacia Hidrogrãfica'
    - value: 7
      label: 'Coletivos e Redes'
    - value: 8
      label: 'Setor Privado e outros'
    - value: 9
      label: 'Outro'
    */

    const { data } = useQuery(['news', { limit, page, enquads }], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}ppea/?limit=${limit}&page=${page}${enquads ? `&enquads=${enquads.join(',')}` : ''}`)).data,
        staleTime: 3600000,
    })

    const { data: iniciatives } = useQuery(['ppea-initiatives'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}adm/statistics/iniciatives_in_perspectives/politica`)).data,
        staleTime: 3600000,
    })

    const { data: institutions } = useQuery(['ppea-institutions'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}ppea/statistics/institutions`)).data,
        staleTime: 3600000,
    })

    useEffect(() => {
        if (data) _politicas(data)
    }, [data])

    useEffect(() => {
        if (!bbox) return;

        //console.log({ bbox })

        const bounds = [
            [bbox.y1, bbox.x1],
            [bbox.y2, bbox.x2],
        ];
        //console.log('focus on', bounds);
        mapRef && mapRef.current && mapRef.current.leafletElement.flyToBounds(bounds); //fitBounds

        setTimeout(()=>_bbox(null), 1000)
    }, [bbox])

    useEffect(() => {
        _enquads(getEnquads())

    }, [ppea_reg, ppea_uf, ppea_mun, ppea_uc, ppea_ch, ppea_sc, ppea_cr, ppea_eu, ppea_ou, ppea_nom])
    // TODO: melhorar estes states, vide zcm recortes

    const getEnquads = () => {
        let enquads = []

        if (ppea_reg) enquads.push(0);
        if (ppea_uf) enquads.push(1);
        if (ppea_mun) enquads.push(2);
        if (ppea_sc) enquads.push(3);
        if (ppea_eu) enquads.push(4);
        if (ppea_uc) enquads.push(5);
        if (ppea_ch) enquads.push(6);
        if (ppea_cr) enquads.push(7);
        if (ppea_sp) enquads.push(8);
        if (ppea_ou) enquads.push(9);

        return enquads
    }

    const getCQL = () => {
        const enquads = getEnquads()

        let cql_filter
        if (!enquads.length) cql_filter = { cql_filter: `id > 0` }
        else cql_filter = { cql_filter: `enquadramento in (${enquads.join(',')})` }

        return cql_filter
    }

    const handleSelect = (p) => {
        _selected(p.politica_id)
        _bbox(p.bbox)
    }


    return (<>
        <section className={styles['ppea-dash']}>

            <div className="width-limiter">

                <div className={styles['ppea-dash-inner']}>

                    <div className={styles.left}>
                        <div className={styles['title']}>Políticas Públicas de<br />Educação Ambiental no Brasil</div>

                        <div className={styles['big-numbers']}>
                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']} ${styles['box-1']}`}>
                                    {!iniciatives && <div className={styles.number}>...</div>}
                                    {iniciatives && <div className={styles.number}>{iniciatives}</div>}
                                    <div className={styles.text}>Políticas Públicas de EA</div>
                                </div>
                            </div>

                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']}`}>
                                    {!institutions && <div className={styles.number}>...</div>}
                                    {institutions && <div className={styles.number}>{institutions}</div>}
                                    <div className={styles.text}>Instituições</div>
                                </div>
                            </div>

                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']}`}>
                                    <div className={styles.number}>272</div>
                                    <div className={styles.text}>Pessoas</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.right}>
                        <img src={DashExample} />
                    </div>

                </div>

            </div>
        </section>

        <section id="mapa">

            <div className={styles.container}>
                <div className={styles['map-container']}>
                    <Map center={position} zoomControl={false} zoom={zoom} ref={mapRef} maxZoom={18} minZoom={3} scrollWheelZoom={false} /*  onClick={handleMapClick} */>
                        <TileLayer
                            attribution='<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers="pppzcm:ppea-staging"
                            format="image/png"
                            transparent={true}
                            opacity={0.8}
                            {...getCQL()}
                        />

                        {!!selected && <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers="pppzcm:ppea-staging"
                            format="image/png"
                            transparent={true}
                            opacity={0.7}
                            styles="ppea-feature"
                            cql_filter={`id=${selected ? selected : 0}`}
                        />}

                        <ZoomControl position="bottomright" />
                    </Map>
                </div>

                <div className={`p-4 ${styles.filter_panel} ${consultas_open ? styles.open : styles.closed}`}>

                    <div className={`row ${styles.filters}`}>

                        <div className={styles.title}>
                            <div></div>
                            <div>Filtros de Busca</div>
                        </div>

                        <div className={styles.each}>
                            <div><Toggler checked={ppea_uf} onToggle={_ppea_uf} /></div>
                            <div>PPEA Estaduais</div>
                            <div><input type="text" placeholder='Digite' /></div>
                        </div>

                        <div className={styles.each}>
                            <div><Toggler checked={ppea_mun} onToggle={_ppea_mun} /></div>
                            <div>PPEA Municipais</div>
                            <div><input type="text" placeholder='Digite' /></div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={ppea_reg} onToggle={_ppea_reg} /></div>
                            <div>PPEA Regionais ou Federais</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={ppea_uc} onToggle={_ppea_uc} /></div>
                            <div>PPEA a partir de UC</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={ppea_ch} onToggle={_ppea_ch} /></div>
                            <div>PPEA a partir de CBH</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={ppea_sc} onToggle={_ppea_sc} /></div>
                            <div>PPEA a partir de Sociedade Civil Org.</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={ppea_cr} onToggle={_ppea_cr} /></div>
                            <div>PPEA a partir de coletivos e redes</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={ppea_eu} onToggle={_ppea_eu} /></div>
                            <div>PPEA a partir de escolas e universidades</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={ppea_sp} onToggle={_ppea_sp} /></div>
                            <div>PPEA a partir de setor privado</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={ppea_ou} onToggle={_ppea_ou} /></div>
                            <div>Outras PPEA</div>
                        </div>

                        <div className={styles.each}>
                            <div><Toggler checked={ppea_nom} onToggle={_ppea_nom} /></div>
                            <div>Nome da PPEA</div>
                            <div><input type="text" placeholder='Digite' /></div>
                        </div>

                        <div className={styles['list-header']}>
                            <div>PPEA Selecionadas</div>
                            <div>Organização</div>
                            <div>Região</div>
                            <div>Conecte-se</div>
                        </div>

                        {!!politicas && politicas.entities.map(p => <div key={p.id} className={styles['list-item']}>
                            <div>{p.nome}</div>
                            <div>{p.instituicao_nome}</div>
                            <div>-</div>
                            <div>
                                <img onClick={() => handleSelect(p)} src={Mapa} />
                                <img src={Acesso} />
                            </div>
                        </div>)}

                        {politicas && <div className={styles['list-pag']}>
                            <div onClick={() => { if (politicas.hasPrevious) _page(page - 1) }} className={`${politicas.hasPrevious ? styles.active : ''}`}>{'<'}</div>
                            <div>página</div>
                            <div>{page}</div>
                            <div>/</div>
                            <div>{politicas.pages}</div>
                            <div onClick={() => { if (politicas.hasNext) _page(page + 1) }} className={`${politicas.hasNext ? styles.active : ''}`}>{'>'}</div>
                        </div>}

                    </div>

                    <div className={styles['open-close']} onClick={() => _consultas_open(!consultas_open)}>
                        <div className={styles.label}>
                            {!consultas_open && <img src={ConsultasR} />}
                            {consultas_open && <img src={Consultas} />}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>)

}

function Toggler({ checked, onToggle }) {
    return (<div className={styles.toggler} onClick={() => onToggle(!checked)}>
        {!checked && <ToggleLeft className={styles['toggle-left']} />}
        {checked && <ToggleRight className={styles['toggle-right']} />}
    </div>)
}