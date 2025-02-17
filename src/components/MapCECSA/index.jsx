import { useState, useEffect, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';
//import { GestureHandling } from "leaflet-gesture-handling";
import makeAnimated from 'react-select/animated';

// import L from 'leaflet';

import axios from 'axios';
import { useQuery } from 'react-query';

import {
    reactSelectClassNamePrefix,
    StyledReactSelect,
    StyledAsyncReactSelect,
} from '../../components/StyledReactSelect';

import ToggleLeft from '../../components/icons/toggle-left.svg?react';
import ToggleRight from '../../components/icons/toggle-right.svg?react';

import DashExample from '../../images/pppzcm/mock-view.png'
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
        if (filters[filter] && togglers[filter]) preparedFilters = `${preparedFilters}&f_${filter}=${filters[filter]}`;
    }

    return preparedFilters;
}

async function getUFs(filters, togglers) {
    const { data } = await axios.get(`${import.meta.env.VITE_SERVER}cne/ufs?none=1${prepareFilters(filters, togglers)}`);

    return data;
}

export default function MapPP() {
    const [iniciativas, _iniciativas] = useState(null);
    const [iniciativas_ids, _iniciativas_ids] = useState(null);

    const [regioes, _regioes] = useState(null);
    const [ufs, _ufs] = useState(null);
    const [loading, _loading] = useState(true);

    const [page, _page] = useState(1);

    const [consultas_open, _consultas_open] = useState(false);

    const [filters, _filters] = useState({});
    const [fields, _fields] = useState({
        regioes: null,
        ufs: null,
        municipios: null,
        instituicao: null,
        id: null,
    });
    const [togglers, _togglers] = useState({
        regioes: false,
        ufs: false,
        municipios: false,
        instituicao: false,
        id: false,
    });
    const [isFiltered, _isFiltered] = useState(false);

    const [bbox, _bbox] = useState(null)
    const [selected, _selected] = useState(null)

    const { data: iniciatives } = useQuery(['cne-initiatives'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}adm/statistics/iniciatives_in_perspectives/cne`)).data,
        staleTime: 3600000,
    })

    const { data: institutions } = useQuery(['cne-institutions'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}cne/statistics/cnes`)).data,
        staleTime: 3600000,
    })

    const { data: members } = useQuery(['cne-members'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}gt/perspectives/5/members`)).data,
        staleTime: 3600000,
    })

    useEffect(() => {
        getOptions();
    }, []);

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
        async function fetchData(page = 1, filters) {
            _loading(true);
            const {
                data,
            } = await axios.get(`${import.meta.env.VITE_SERVER}cne/?limit=6&page=${page}${prepareFilters(filters, togglers)}`);
            _loading(false);

            _iniciativas(data);
        }

        fetchData(page, filters);
    }, [page, filters, togglers]);

    useEffect(() => {
        _page(1);
        //_showPop(null);

        async function fetchGeoData() {
            if (Object.keys(filters).filter(k => !!filters[k]).length === 0) {
                _iniciativas_ids(null);
                return;
            }

            const { data } = await axios.get(`${import.meta.env.VITE_SERVER}cne/geo/?${prepareFilters(filters, togglers)}`);

            _iniciativas_ids(data);
        }

        /* reset zoom and position */
        mapRef && mapRef.current && mapRef.current.leafletElement.setView(position, zoom);
        fetchGeoData(filters);
    }, [filters, togglers]);

    useEffect(() => {
        async function fetchUFs() {
            _ufs(await getUFs(filters, togglers));
        }

        fetchUFs();
    }, [filters, togglers]);

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
    }

    const getOptions = async () => {
        const {
            data: { regioes },
        } = await axios.get(`${import.meta.env.VITE_SERVER}cne/options`);

        _regioes(regioes);
    };

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
        /* _fields({ ...fields, instituicao: selectedOption });

        if (selectedOption && selectedOption.length) {
            _filters({ ...filters, instituicao: selectedOption.map(o => o.value) });
            _togglers(togglers => ({ ...togglers, instituicao: true }));
        } else {
            _filters({ ...filters, instituicao: null });
            _togglers(togglers => ({ ...togglers, instituicao: false }));
        } */
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

    const loadMunicipiosOptions = (inputValue, callback) => {
        axios
            .get(`${import.meta.env.VITE_SERVER}cne/municipios/?nome=${inputValue}${prepareFilters(filters, togglers)}`)
            .then(function ({ data }) {
                callback(data);
            });
    };

    const loadNameOptions =
        (url = 'cne/list/') =>
            (inputValue, callback) => {
                axios
                    .get(`${import.meta.env.VITE_SERVER}${url}?nome=${inputValue}${prepareFilters(filters, togglers)}`)
                    .then(function ({ data }) {
                        callback(data);
                    });
            };

    return (<>
        <section className={styles['cne-dash']}>

            <div className="width-limiter">

                <div className={styles['cne-dash-inner']}>

                    <div className={styles['title']}>Conheça os Centros de Educação e Cooperação Socioambiental em atuação no Brasil</div>

                    <div className={styles['big-numbers']}>
                        <div className={`${styles['box-with-image']} ${styles['large-box']}`}>
                            <div className={`${styles['box']} ${styles['box-1']}`}>
                                {!iniciatives && <div className={styles.number}>...</div>}
                                {iniciatives && <div className={styles.number}>{iniciatives}</div>}
                                <div className={styles.text}>Centros</div>
                            </div>
                        </div>


                        <div className={styles['box-v-group']}>
                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']}`}>
                                    {!institutions && <div className={styles.number}>...</div>}
                                    {institutions && <div className={styles.number}>{institutions}</div>}
                                    <div className={styles.text}>Organizações envolvidas</div>
                                </div>
                            </div>

                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']}`}>
                                    {!members && <div className={styles.number}>...</div>}
                                    {members && <div className={styles.number}>{members}</div>}
                                    <div className={styles.text}>Pessoas envolvidas</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>

        <section id="mapa">

            <div className={styles.container}>
                <div className={styles['map-container']}>
                    <Map center={position} zoomControl={false} zoom={zoom} ref={mapRef} maxZoom={18} minZoom={3} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers="pppzcm:cecsa"
                            format="image/png"
                            transparent={true}
                            opacity={0.8}
                            cql_filter={iniciativas_ids ? `id in (${iniciativas_ids.join(',')})` : 'id>0'}
                        />

                        {!!selected && <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers="pppzcm:cecsa"
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
                        </div>

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

                        <div className={styles.each}>
                            <div><Toggler checked={togglers['municipios']} onToggle={(checked) => handleToggle('municipios')(checked)} /></div>
                            <div>Município</div>
                            <div>
                                <div>
                                    <StyledAsyncReactSelect
                                        classNamePrefix={reactSelectClassNamePrefix}
                                        {...selectDefaults}
                                        placeholder="digite..."
                                        onChange={selectedOption => onFilterMunicipioChange(selectedOption)}
                                        closeMenuOnSelect={false}
                                        loadOptions={loadMunicipiosOptions}
                                        isClearable
                                        isMulti
                                        value={fields['municipios']}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.each}>
                            <div><Toggler disabled checked={togglers['instituicao']} onToggle={(checked) => handleToggle('instituicao')(checked)} /></div>
                            <div>Nome da organização</div>
                            <div>
                                <div>
                                    <StyledAsyncReactSelect
                                        classNamePrefix={reactSelectClassNamePrefix}
                                        {...selectDefaults}
                                        placeholder="digite..."
                                        onChange={selectedOption => onFilterInstNameChange(selectedOption)}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        loadOptions={loadNameOptions('project/instiuicao/list/')}
                                        isClearable
                                        value={fields['instituicao']}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.each}>
                            <div><Toggler checked={togglers['id']} onToggle={(checked) => handleToggle('id')(checked)} /></div>
                            <div>Nome do centro</div>
                            <div>
                                <div>
                                    <StyledAsyncReactSelect
                                        classNamePrefix={reactSelectClassNamePrefix}
                                        className="no-down"
                                        {...selectDefaults}
                                        placeholder="digite..."
                                        onChange={selectedOption => onFilterNameChange(selectedOption)}
                                        closeMenuOnSelect={false}
                                        loadOptions={loadNameOptions()}
                                        isClearable
                                        value={fields['id']}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles['list-header']}>
                            <div>PPEA Selecionadas</div>
                            <div>Organização</div>
                            <div>Região</div>
                            <div>Conecte-se</div>
                        </div>

                        {!loading && !!iniciativas && iniciativas.entities.map(p => <div key={p.id} className={styles['list-item']}>
                            <div>{p.nome}</div>
                            <div>{p.instituicao_nome}</div>
                            <div>{p.nm_regiao}</div>
                            <div>
                                <img onClick={() => handleSelect(p)} src={Mapa} />
                                <img onClick={() => window.open(`/projeto-single/${p.id}`, '_blank')} src={Acesso} />
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

function Toggler({ checked, onToggle, disabled = false }) {
    return (<div className={styles.toggler} onClick={() => { if (!disabled) onToggle(!checked) }}>
        {!checked && <ToggleLeft className={styles['toggle-left']} />}
        {checked && <ToggleRight className={styles['toggle-right']} />}
    </div>)
}