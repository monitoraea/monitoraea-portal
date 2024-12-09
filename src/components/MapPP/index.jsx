import { useState, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';

// import L from 'leaflet';

import ToggleOn from '../../components/icons/check-circle.svg?react';
import ToggleOff from '../../components/icons/slash.svg?react';

import DashExample from '../../images/ppea-dash-example.png'

import styles from './styles.module.scss';

const mapRef = createRef();
const position = [-15.559793, -62.58506];
const zoom = 5;

export default function MapPP() {
    const [recortes, _recortes] = useState([
        'uf',
        'municipio',
        'bairro',
        'u_conservacao',
        'p_urbano',
        'bacia',
    ])

    const doToggle = (id) => {
        if (recortes.includes(id)) _recortes(r => r.filter(r => r !== id));
        else _recortes([...recortes, id]);
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
                            layers="pppzcm:published_ppeas_special"
                            format="image/png"
                            transparent={true}
                            opacity={0.8}
                            cql_filter={recortes ? `recorte in (${recortes.map(r => `'${r}'`).join(',')})` : ''}
                        />

                        <ZoomControl position="bottomright" />
                    </Map>
                </div>

                <div className={`p-4 ${styles.filter_panel}`}>

                    <div className="row">
                        <div className={`col-md-4 ${styles.chooser}`}>
                            {[
                                ['uf', 'Unidades Federativas'],
                                ['municipio', 'Municípios'],
                                ['p_urbano', 'Perímetros Urbanos'],
                                ['bairro', 'Bairros'],
                                ['u_conservacao', 'Unidades de Conservação'],
                                ['bacia', 'Outros recortes'],
                            ].map(r => <Toggler key={r[0]} title={r[1]} on={recortes.includes(r[0])} onToggle={() => doToggle(r[0])} />)}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>)

}

function Toggler({ title, on, onToggle }) {
    return (<div onClick={() => onToggle()}>
        <div>{title}</div>
        {on && <ToggleOn />}
        {!on && <ToggleOff />}
    </div>)
}