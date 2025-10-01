import { useState, useEffect, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer, ZoomControl } from 'react-leaflet';
import makeAnimated from 'react-select/animated';

import axios from 'axios';
import { useQuery } from 'react-query';

import {
    reactSelectClassNamePrefix,
    StyledReactSelect,
    StyledAsyncReactSelect,
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

const initialFieldsState = { /* TODO */
    linhas_acao: null,
    regioes: null,
    ufs: null,
    municipios: null,
    instituicao_segmento: null,
    instituicao: null,
    id: null,
}

const initialTogglersState = { /* TODO */
    linhas_acao: false,
    regioes: false,
    ufs: false,
    municipios: false,
    instituicao_segmento: false,
    instituicao: false,
    id: false,
};

export default function GeneralMap({ config, onFiltersChange }) {
    const [iniciativas, _iniciativas] = useState(null);
    const [iniciativas_ids, _iniciativas_ids] = useState(null);

    const [loading, _loading] = useState(true);

    const [limit] = useState(6);
    const [page, _page] = useState(1);

    const [consultas_open, _consultas_open] = useState(false);
    const [tab, _tab] = useState('filters');

    const [filters, _filters] = useState({});
    const [fields, _fields] = useState(initialFieldsState);
    const [togglers, _togglers] = useState(initialTogglersState);

    const [bbox, _bbox] = useState(null)
    const [selected, _selected] = useState(null)

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

    const { data } = useQuery(
        [
            `map_data_${config.perspective}`,
            {
                limit,
                page,
                filters,
                togglers,
            },
        ],
        {
            queryFn: async () =>
                (
                    await axios.get(
                        `${import.meta.env.VITE_SERVER}${config.entity}/?limit=${limit}&page=${page}${prepareFilters(filters, togglers)}`,
                    )
                ).data,
            staleTime: 3600000,
        },
    );

    useEffect(() => {
        if (data) {
            _iniciativas(data);
            _loading(false);
        }
    }, [data]);

    useEffect(() => {
        _page(1);
        //_showPop(null);

        async function fetchGeoData() {
            if (Object.keys(filters).filter(k => !!filters[k]).length === 0) {
                _iniciativas_ids(null);
                return;
            }

            const { data } = await axios.get(`${import.meta.env.VITE_SERVER}${config.entity}/geo/?${prepareFilters(filters, togglers)}`);

            _iniciativas_ids(data);
        }

        /* reset zoom and position */
        mapRef && mapRef.current && mapRef.current.leafletElement.setView(position, zoom);
        fetchGeoData(filters);

        onFiltersChange(prepareFilters(filters, togglers))
    }, [filters, togglers]);

    useEffect(() => {
        console.log({ filters, pFilters: prepareFilters(filters, togglers) })
    }, [filters])

    useEffect(() => {
        if (!selected) return;
    }, [selected])

    const handleSelect = (p) => {
        _selected(p.id)
        _bbox(p.bbox)
    }

    const onFilterChange = (type, selectedOption, isMulti = true) => {
        _page(1);

        let newFilters;
        let newFields = { ...fields, [type]: selectedOption };

        if (selectedOption && ((isMulti && selectedOption.length) || (!isMulti && selectedOption.value))) {
            newFilters = {
                ...filters,
                [type]: isMulti ? selectedOption.map(s => s.value).join(',') : selectedOption.value,
            };
            _togglers(togglers => ({ ...togglers, [type]: true }));
        } else {
            newFilters = { ...filters, [type]: null };
            _togglers(togglers => ({ ...togglers, [type]: false }));
        }

        if (type !== 'id') {   /* TODO: reset ufs (fields and filters) */
            newFields.id = null;
            newFilters.id = null;
        }

        if (type === 'regioes') { /* TODO: reset ufs (fields and filters) */
            newFields.ufs = null;
            newFilters.ufs = null;
        }
        if (['regioes', 'ufs'].includes(type)) { /* TODO: reset municipios (fields and filters)  */
            newFields.municipios = null;
            newFilters.municipios = null;
        }

        _fields(newFields);
        _filters(newFilters);
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
                srs: 'EPSG:4326',
                transparent: true,
                version: '1.1.1',
                format: 'image/png',
                bbox: _map.getBounds().toBBoxString(),
                height: size.y,
                width: size.x,
                layers: 'pppzcm:zcm_atuacao',
                query_layers: 'pppzcm:zcm_atuacao',
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
                        const ids = data.features.map(f => f.properties[config.geo.field]);

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

        console.log({ ids })

        _tab('clicked');
        _consultas_open(true);
        _filters({ ids: ids.join(',') });
    };

    const closeClickedTab = () => {
        _filters({});
        _fields(initialFieldsState);
        _togglers(initialTogglersState);
        _tab('filters');
    }

    return (<>

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
                            layers={config.geo.layer}
                            format="image/png"
                            transparent={true}
                            opacity={0.8}
                            cql_filter={iniciativas_ids ? `${config.geo.field} in (${iniciativas_ids.join(',')})` : `${config.geo.field}>0`}
                        />

                        {!!selected && <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers={config.geo.layer}
                            format="image/png"
                            transparent={true}
                            opacity={0.7}
                            styles="ppea-feature"
                            cql_filter={`${config.geo.field}=${selected ? selected : 0}`}
                        />}

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

                            {config.fields.map(f => <div key={f.key} className={styles.each}>
                                <div><Toggler checked={togglers[f.key]} onToggle={(checked) => handleToggle(f.key)(checked)} /></div>
                                <div>{f.title}</div>
                                <div>
                                    {f.options && <>
                                        {f.type === 'select' && <div>
                                            <StyledReactSelect
                                                classNamePrefix={reactSelectClassNamePrefix}
                                                {...selectDefaults}
                                                onChange={selectedOption => onFilterChange(f.key, selectedOption)}
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti={f.isMulti}
                                                options={f.options}
                                                value={fields[f.key]}
                                            />
                                        </div>}

                                        {f.type === 'async_select' && <div>
                                            <div>
                                                <StyledAsyncReactSelect
                                                    classNamePrefix={reactSelectClassNamePrefix}
                                                    {...selectDefaults}
                                                    placeholder="digite..."
                                                    onChange={selectedOption => onFilterChange(f.key, selectedOption)}
                                                    closeMenuOnSelect={false}
                                                    loadOptions={f.options}
                                                    isClearable
                                                    isMulti={f.isMulti}
                                                    value={fields[f.key]}
                                                />
                                            </div>
                                        </div>}
                                    </>}
                                </div>
                            </div>)}                            
                        </>}

                        <div className={styles['list-header']}>
                            <div>PPEA Selecionadas</div>
                            <div>Organização</div>
                            <div>Região</div>
                            <div>Conecte-se</div>
                        </div>

                        {!loading && !!iniciativas && iniciativas.entities.map(p => <div key={p.id} className={styles['list-item']}>
                            <div>{p.nome}</div>
                            <div>{p.instituicao_nome}</div>
                            <div>{p.regioes.filter(r => !!r).join(',')}</div>
                            <div>
                                <img onClick={() => handleSelect(p)} src={Mapa} />
                                <img onClick={() => window.open(`/iniciativa/pppzcm/${p.id}`, '_blank')} src={Acesso} />
                            </div>
                        </div>)}

                        {loading && [1, 2, 3, 4, 5].map(m => <div key={`mock_${m}`} className={`${styles['list-item']} ${styles['mock']}`}>
                            <div></div>
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
