import { useState, useEffect, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';

// import L from 'leaflet';

import axios from 'axios';
import { useQuery } from 'react-query';

import ToggleLeft from '../../components/icons/toggle-left.svg?react';
import ToggleRight from '../../components/icons/toggle-right.svg?react';

import Consultas from '../../images/consultas.png'
import ConsultasR from '../../images/consultas_reverse.png'

import Mapa from '../../images/mapa.png'
import Acesso from '../../images/acesso.png'

import styles from './styles.module.scss';

const mapRef = createRef();
const position = [-15, -42];
const zoom = 5;

export default function MapPP() {
    const [cne_uf, _cne_uf] = useState(false)
    const [cne_mun, _cne_mun] = useState(false)
    const [cne_reg, _cne_reg] = useState(false)
    const [cne_uc, _cne_uc] = useState(false)
    const [cne_ch, _cne_ch] = useState(false)
    const [cne_sc, _cne_sc] = useState(false)
    const [cne_cr, _cne_cr] = useState(false)
    const [cne_eu, _cne_eu] = useState(false)
    const [cne_sp, _cne_sp] = useState(false)
    const [cne_ou, _cne_ou] = useState(false)
    const [cne_nom, _cne_nom] = useState(false)

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

    const { data } = useQuery(['news', { limit, page, enquads, cne_reg, cne_uf, cne_mun, cne_uc, cne_ch, cne_sc, cne_cr, cne_eu, cne_ou, cne_nom, cne_sp }], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}ppea/?limit=${limit}&page=${page}${enquads ? `&enquads=${enquads.join(',')}` : ''}`)).data,
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

        setTimeout(() => _bbox(null), 1000)
    }, [bbox])

    useEffect(() => {
        _enquads(getEnquads())

    }, [cne_reg, cne_uf, cne_mun, cne_uc, cne_ch, cne_sc, cne_cr, cne_eu, cne_ou, cne_nom, cne_sp])
    // TODO: melhorar estes states, vide zcm recortes

    const getEnquads = () => {
        let enquads = []

        if (cne_reg) enquads.push(0);
        if (cne_uf) enquads.push(1);
        if (cne_mun) enquads.push(2);
        if (cne_sc) enquads.push(3);
        if (cne_eu) enquads.push(4);
        if (cne_uc) enquads.push(5);
        if (cne_ch) enquads.push(6);
        if (cne_cr) enquads.push(7);
        if (cne_sp) enquads.push(8);
        if (cne_ou) enquads.push(9);

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
        <section className={styles['cne-dash']}>

            <div className="width-limiter">

                <div className={styles['cne-dash-inner']}>

                    <div className={styles['title']}>Conheça as CIEA do Brasil</div>                    

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
                            layers="pppzcm:cne-staging"
                            format="image/png"
                            transparent={true}
                            opacity={0.8}
                            {...getCQL()}
                        />

                        {!!selected && <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers="pppzcm:cne-staging"
                            format="image/png"
                            transparent={true}
                            opacity={0.7}
                            styles="cne-feature"
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

                        {/* <div className={styles.each}>
                            <div><Toggler checked={cne_uf} onToggle={_cne_uf} /></div>
                            <div>cne Estaduais</div>
                            <div><input type="text" placeholder='Digite' /></div>
                        </div>

                        <div className={styles.each}>
                            <div><Toggler checked={cne_mun} onToggle={_cne_mun} /></div>
                            <div>cne Municipais</div>
                            <div><input type="text" placeholder='Digite' /></div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={cne_reg} onToggle={_cne_reg} /></div>
                            <div>cne Regionais ou Federais</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={cne_uc} onToggle={_cne_uc} /></div>
                            <div>cne a partir de UC</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={cne_ch} onToggle={_cne_ch} /></div>
                            <div>cne a partir de CBH</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={cne_sc} onToggle={_cne_sc} /></div>
                            <div>cne a partir de Sociedade Civil Org.</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={cne_cr} onToggle={_cne_cr} /></div>
                            <div>cne a partir de coletivos e redes</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={cne_eu} onToggle={_cne_eu} /></div>
                            <div>cne a partir de escolas e universidades</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={cne_sp} onToggle={_cne_sp} /></div>
                            <div>cne a partir de setor privado</div>
                        </div>

                        <div className={`${styles.each} ${styles.full}`}>
                            <div><Toggler checked={cne_ou} onToggle={_cne_ou} /></div>
                            <div>Outras cne</div>
                        </div> */}

                        <div className={styles.each}>
                            <div><Toggler checked={cne_nom} onToggle={_cne_nom} /></div>
                            <div>Nome do centro</div>
                            <div><input type="text" placeholder='Digite' /></div>
                        </div>

                        <div className={styles['list-header']}>
                            <div>Centros Selecionados</div>
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