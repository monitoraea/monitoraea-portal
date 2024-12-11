import { useState, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';

// import L from 'leaflet';

import ToggleLeft from '../../components/icons/toggle-left.svg?react';
import ToggleRight from '../../components/icons/toggle-right.svg?react';

import DashExample from '../../images/ppea-dash-example.png'
import Consultas from '../../images/consultas.png'
import ConsultasR from '../../images/consultas_reverse.png'

import Mapa from '../../images/mapa.png'
import Acesso from '../../images/acesso.png'

import styles from './styles.module.scss';

const mapRef = createRef();
const position = [-15, -45];
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

    const [consultas_open, _consultas_open] = useState(false)

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

    const getCQL = () => {
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

        let cql_filter
        if (!enquads.length) cql_filter = { cql_filter: `id > 0` }
        else cql_filter = { cql_filter: `enquadramento in (${enquads.join(',')})` }

        return cql_filter
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
                                    <div className={styles.number}>228</div>
                                    <div className={styles.text}>Políticas Públicas de EA</div>
                                </div>
                            </div>

                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']}`}>
                                    <div className={styles.number}>XXX</div>
                                    <div className={styles.text}>Instituições</div>
                                </div>
                            </div>

                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']}`}>
                                    <div className={styles.number}>XXX</div>
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

                        <div className={styles['list-item']}>
                            <div>Ação Parque dos Abrolhos 40 anos</div>
                            <div>Instituto Coral Vivo</div>
                            <div>Nordeste</div>
                            <div>
                                <img src={Mapa} />
                                <img src={Acesso} />
                            </div>
                        </div>

                        <div className={styles['list-item']}>
                            <div>Ação Parque dos Abrolhos 40 anos</div>
                            <div>Instituto Coral Vivo</div>
                            <div>Nordeste</div>
                            <div>
                                <img src={Mapa} />
                                <img src={Acesso} />
                            </div>
                        </div>

                        <div className={styles['list-item']}>
                            <div>Ação Parque dos Abrolhos 40 anos</div>
                            <div>Instituto Coral Vivo</div>
                            <div>Nordeste</div>
                            <div>
                                <img src={Mapa} />
                                <img src={Acesso} />
                            </div>
                        </div>

                        <div className={styles['list-item']}>
                            <div>Ação Parque dos Abrolhos 40 anos</div>
                            <div>Instituto Coral Vivo</div>
                            <div>Nordeste</div>
                            <div>
                                <img src={Mapa} />
                                <img src={Acesso} />
                            </div>
                        </div>

                        <div className={styles['list-item']}>
                            <div>Ação Parque dos Abrolhos 40 anos</div>
                            <div>Instituto Coral Vivo</div>
                            <div>Nordeste</div>
                            <div>
                                <img src={Mapa} />
                                <img src={Acesso} />
                            </div>
                        </div>

                        <div className={styles['list-item']}>
                            <div>Ação Parque dos Abrolhos 40 anos</div>
                            <div>Instituto Coral Vivo</div>
                            <div>Nordeste</div>
                            <div>
                                <img src={Mapa} />
                                <img src={Acesso} />
                            </div>
                        </div>

                        <div className={styles['list-pag']}>
                            <div>{'<'}</div>
                            <div>página</div>
                            <div>1</div>
                            <div>/</div>
                            <div>3</div>
                            <div>{'>'}</div>
                        </div>

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