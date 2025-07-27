import { useState, useEffect, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';
//import { GestureHandling } from "leaflet-gesture-handling";
import makeAnimated from 'react-select/animated';

import { Legend } from '../Legend';

// import L from 'leaflet';

import axios from 'axios';
/* import { useQuery } from 'react-query'; */

import {
    reactSelectClassNamePrefix,
    StyledReactSelect,
    /* StyledAsyncReactSelect, */
} from '../../components/StyledReactSelect';

import ToggleLeft from '../../components/icons/toggle-left.svg?react';
import ToggleRight from '../../components/icons/toggle-right.svg?react';

import Consultas from '../../images/consultas.png'
import ConsultasR from '../../images/consultas_reverse.png'

import Mapa from '../../images/mapa.png'
import Acesso from '../../images/acesso.png'

import styles from './styles.module.scss';

const animatedComponents = makeAnimated();

const mapRef = createRef();
const position = [-15, -42];
const zoom = 5;

const selectDefaults = {
    placeholder: 'Selecione...',
    noOptionsMessage: () => 'Nenhuma opção encontrada!',
    loadingMessage: () => 'Carregando...',
};

function prepareFilters(filters, togglers) {
    let preparedFilters = '';

    for (let filter in filters) {
        if (filter === 'ids' || (filters[filter] && togglers[filter])) preparedFilters = `${preparedFilters}&f_${filter}=${filters[filter]}`;
    }

    return preparedFilters;
}

async function getRegioes(urlFilters) {
    const { data } = await axios.get(`${import.meta.env.VITE_SERVER}educom_clima/regions?${urlFilters}`);

    return data;
}

async function getUFs(urlFilters) {
    const { data } = await axios.get(`${import.meta.env.VITE_SERVER}educom_clima/ufs?${urlFilters}`);

    return data;
}

const initialFieldsState = {
  regioes: null,
  ufs: null,
  id: null,
}

const initialTogglersState = {
  regioes: false,
  municipios: false,
  id: false,
};

export default function MapPP() {
    const [iniciativas, _iniciativas] = useState(null);
    const [uf_ids, _uf_ids] = useState(null);
    const [clicked_ufs, _clicked_ufs] = useState(null);

    const [regioes, _regioes] = useState(null);
    const [ufs, _ufs] = useState(null);
    const [loading, _loading] = useState(true);

    const [page, _page] = useState(1);
    const [limit, _limit] = useState(6);

    const [consultas_open, _consultas_open] = useState(false);
    const [tab, _tab] = useState('filters');

    const [filters, _filters] = useState({});
    const [fields, _fields] = useState({
        regioes: null,
        ufs: null,
    });
    const [togglers, _togglers] = useState({
        regioes: false,
        ufs: false,
    });
    const [isFiltered, _isFiltered] = useState(false);

    const [bbox, _bbox] = useState(null)
    const [selected, _selected] = useState(null)

    const [urlFilters, _urlFilters] = useState('');

    useEffect(() => {
        console.log({ uf_ids });
    }, [uf_ids]);

    // useEffect(() => {
    //    if(mapRef.current?.leafletElement) {
    //         mapRef.current.leafletElement.addHandler("gestureHandling", GestureHandling);
    //         mapRef.current.leafletElement.gestureHandling.enable();
    //    }
    // }, [mapRef]);

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
        // _urlFilters
        _urlFilters(prepareFilters(filters, togglers))
    }, [filters, togglers])

    useEffect(() => {
        let isFiltered = false;
        for (let f of Object.values(filters)) {
            if (!!f) {
                isFiltered = true;
                break;
            }
        }
        _isFiltered(isFiltered)
    }, [filters])

    useEffect(() => {
        async function fetchData(page = 1) {

            _loading(true);
            const {
                data,
            } = await axios.get(`${import.meta.env.VITE_SERVER}educom_clima/formap/?limit=${limit}&page=${page}?${urlFilters}`);
            _loading(false);

            _iniciativas(data);
        }

        fetchData(page);
    }, [page, urlFilters]);

    useEffect(() => {
        _page(1);
        //_showPop(null);

        async function fetchGeoData() {
            if (Object.keys(filters).filter(k => !!filters[k]).length === 0) {
                _uf_ids(null);
                return;
            }

            const { data } = await axios.get(`${import.meta.env.VITE_SERVER}educom_clima/geo/?${urlFilters}`);

            _uf_ids(data);
        }

        /* reset zoom and position */
        mapRef && mapRef.current && mapRef.current.leafletElement.setView(position, zoom);
        fetchGeoData(filters);
    }, [urlFilters]);

    useEffect(() => {
        async function fetchRegioes() {
            _regioes(await getRegioes(urlFilters));
        }
        async function fetchUFs() {
            _ufs(await getUFs(urlFilters));
        }

        fetchRegioes();
        fetchUFs();
    }, [urlFilters]);

    useEffect(() => {
        if (!selected) return;
    }, [selected])

    /* useEffect(() => {
        console.log({ filters, fields })
    }, [filters, fields])
 */
    const handleSelect = (p) => {
        _selected(p.id)
        _bbox(p.bbox)

        console.log(p.bbox)
    }

    const onFilterChange = (type, selectedOption) => {
        _page(1);

        let newFilters;
        let newFields = { ...fields, [type]: selectedOption, id: null };

        if (selectedOption && selectedOption.length) {
            newFilters = {
                ...filters,
                [type]: selectedOption.map(s => s.value).join(','),
                id: null,
            };
            _togglers(togglers => ({ ...togglers, [type]: true }));
        } else {
            newFilters = { ...filters, [type]: null, id: null };
            _togglers(togglers => ({ ...togglers, [type]: false }));
        }

        if (type === 'regioes') {
            newFields.ufs = null;
            newFilters.ufs = null;
        }
        if (['regioes', 'ufs'].includes(type)) {
            newFields.municipios = null;
            newFilters.municipios = null;
        }

        _fields(newFields);
        _filters(newFilters);
    };

    const onFilterMunicipioChange = selectedOption => {
        _fields({ ...fields, municipios: selectedOption });

        if (selectedOption && selectedOption.length) {
            const municipios = selectedOption.map(s => s.value);
            _filters({ ...filters, municipios });
            _togglers(togglers => ({ ...togglers, municipios: true }));
        } else {
            _filters({ ...filters, municipios: null });
            _togglers(togglers => ({ ...togglers, municipios: false }));
        }
    };

    const onFilterInstNameChange = selectedOption => {
        _fields({ ...fields, instituicao: selectedOption });

        if (selectedOption && selectedOption.length) {
            _filters({ ...filters, instituicao: selectedOption.map(o => o.value) });
            _togglers(togglers => ({ ...togglers, instituicao: true }));
        } else {
            _filters({ ...filters, instituicao: null });
            _togglers(togglers => ({ ...togglers, instituicao: false }));
        }
    };

    const onFilterNameChange = selectedOption => {
        _fields({ ...fields, id: selectedOption });

        if (selectedOption) {
            _filters({ ...filters, id: selectedOption.value });
            _togglers(togglers => ({ ...togglers, id: true }));
        } else {
            _filters({ ...filters, id: null });
            _togglers(togglers => ({ ...togglers, id: false }));
        }
    };

    const handleToggle = (filter) => (checked) => {
        _togglers(togglers => ({ ...togglers, [filter]: checked }))
    }

    async function getClickedFeatureId(_map, latlng) {
        const _url = import.meta.env.VITE_GEOSERVER_URL;

        // Construct a GetFeatureInfo request URL given a point
        var point = _map.latLngToContainerPoint(latlng, _map.getZoom()),
            size = _map.getSize(),
            params = {
                request: 'GetFeatureInfo',
                service: 'WMS',
                srs: 'EPSG:4674',
                transparent: true,
                version: '1.1.1',
                format: 'image/png',
                bbox: _map.getBounds().toBBoxString(),
                height: size.y,
                width: size.x,
                layers: 'pppzcm:educom_clima_count',
                query_layers: 'pppzcm:educom_clima_count',
                info_format: 'application/json',
                x: Math.round(point.x),
                y: Math.round(point.y),
                feature_count: 20,
            };

        const getFeatureInfoURL = _url + L.Util.getParamString(params, _url, true);

        /* console.log(getFeatureInfoURL) */

        return await new Promise((resolve, reject) =>
            fetch(getFeatureInfoURL)
                .then(response => response.json())
                .then(data => {
                    const err = typeof data === 'object' ? null : data;
                    if (err) reject(err);
                    else if (!data.features.length) resolve(null);
                    else {
                        const [table] = data.features[0].id.split('.');
                        const ids = data.features.map(f => f.properties.cd_uf);

                        resolve({
                            table,
                            ids: [...new Set(ids)], // remove duplicates,
                        });
                    }
                }),
        );
    }

    const handleMapClick = async e => {
        const data = await getClickedFeatureId(mapRef.current.leafletElement, e.latlng);

        if (!data) {
            return;
        }

        const { ids } = data;

        // /* filtrar pelos projetos ativos */ ?????????????????????????????????????
        // const projectsToSee = projects_ids ? ids.filter(id => projects_ids.includes(id)) : ids;

        console.log({ ids })

        _tab('clicked');
        _consultas_open(true);
        _filters({ ids: ids.join(',') });
        _clicked_ufs(ids)
    };

    const closeClickedTab = () => {
        _filters({});
        _clicked_ufs(null)
        _fields(initialFieldsState);
        _togglers(initialTogglersState);
        _tab('filters');
    }

    return (<>
        <section className={styles['ciea-dash']}>

            <div className="width-limiter">

                <div className={styles['ciea-dash-inner']}>
                    <div className={styles['title']}>
                        Conheça as Iniciativas do Educom&Clima
                    </div>

                </div>

            </div>
        </section>

        <section id="mapa">

            <div className={styles.container}>
                <div className={styles['map-container']}>
                    <Map center={position} zoomControl={false} zoom={zoom} ref={mapRef} maxZoom={18} minZoom={3} scrollWheelZoom={false} onClick={handleMapClick}>
                        <TileLayer
                            attribution='<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers="pppzcm:educom_clima_count"
                            format="image/png"
                            transparent={true}
                            opacity={1}
                            cql_filter={clicked_ufs ? `cd_uf in (${clicked_ufs.join(',')})` : uf_ids ? `cd_uf in (${uf_ids.join(',')})` : 'cd_uf>0'}
                        />

                        {!!selected && <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers="pppzcm:educom_clima"
                            format="image/png"
                            transparent={true}
                            opacity={0.7}
                            styles="ppea-feature"
                            cql_filter={`id=${selected ? selected : 0}`}
                        />}

                        <Legend />

                        <ZoomControl position="bottomright" />
                    </Map>
                </div>

                <div className={`p-4 ${styles.filter_panel} ${consultas_open ? styles.open : styles.closed}`}>

                    <div className={`row ${styles.filters}`}>

                        {tab === 'clicked' && <>
                            <div className={styles.title}>
                                <div></div>
                                <div>Lista de iniciativas selecionadas no mapa</div>
                                <div className={styles.back2filters} onClick={closeClickedTab}>« voltar aos filtros</div>
                            </div>
                        </>}

                        {tab === 'filters' && <>
                            <div className={styles.title}>
                                <div></div>
                                <div>Filtros de Busca</div>
                            </div>

                            {/* <div className={styles.each}>
                                <div><Toggler checked={togglers['regioes']} onToggle={(checked) => handleToggle('regioes')(checked)} /></div>
                                <div>Regiões</div>
                                <div>
                                    {regioes && (
                                        <div>
                                            <StyledReactSelect
                                                classNamePrefix={reactSelectClassNamePrefix}
                                                {...selectDefaults}
                                                onChange={selectedOption => onFilterChange('regioes', selectedOption)}
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={regioes}
                                                value={fields['regioes']}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div> */}

                            <div className={styles.each}>
                                <div><Toggler checked={togglers['ufs']} onToggle={(checked) => handleToggle('ufs')(checked)} /></div>
                                <div>Estado</div>
                                <div>
                                    {ufs && (
                                        <div>
                                            <StyledReactSelect
                                                classNamePrefix={reactSelectClassNamePrefix}
                                                {...selectDefaults}
                                                onChange={selectedOption => onFilterChange('ufs', selectedOption)}
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={ufs}
                                                value={fields['ufs']}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>}

                        <div className={styles['list-header']}>
                            <div>Iniciativa Selecionadas</div>
                            <div>Região</div>
                            <div>Conecte-se</div>
                        </div>

                        {!loading && !!iniciativas && iniciativas.entities.map(p => <div key={p.id} className={styles['list-item']}>
                            <div>{p.nome}</div>
                            <div>{p.regioes?.filter(r => !!r).map(r => r.toUpperCase()).join(',')}</div>
                            <div>
                                <img onClick={() => handleSelect(p)} src={Mapa} />
                                <img onClick={() => window.open(`/iniciativa/educom_clima/${p.iniciativa_id}`, '_blank')} src={Acesso} />
                            </div>
                        </div>)}

                        {loading && [1, 2, 3, 4, 5].map(m => <div key={`mock_${m}`} className={`${styles['list-item']} ${styles['mock']}`}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>)}

                        {iniciativas && <div className={styles['list-pag']}>
                            <div onClick={() => { if (iniciativas.hasPrevious) _page(page - 1) }} className={`${iniciativas.hasPrevious ? styles.active : ''}`}>{'<'}</div>
                            <div>página</div>
                            <div>{page}</div>
                            <div>/</div>
                            <div>{iniciativas.pages}</div>
                            <div onClick={() => { if (iniciativas.hasNext) _page(page + 1) }} className={`${iniciativas.hasNext ? styles.active : ''}`}>{'>'}</div>
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
