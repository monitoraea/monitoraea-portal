import { useState, useEffect, createRef } from 'react';
import { Map, TileLayer, WMSTileLayer/* , Popup */, ZoomControl } from 'react-leaflet';
import makeAnimated from 'react-select/animated';

// import L from 'leaflet';

import axios from 'axios';
import { useQuery } from 'react-query';

import {
    reactSelectClassNamePrefix,
    StyledReactSelect,
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

function prepareFilters(filters) {
    let preparedFilters = '';

    for (let filter in filters) {
        if (filters[filter]) preparedFilters = `${preparedFilters}&f_${filter}=${filters[filter]}`;
    }

    return preparedFilters;
}

export default function MapPP() {
    const [iniciativas, _iniciativas] = useState(null);
    const [iniciativas_ids, _iniciativas_ids] = useState(null);

    const [linhas_acao, _linhas_acao] = useState(null);
    const [regioes, _regioes] = useState(null);
    const [ufs, _ufs] = useState(null);
    const [total, _total] = useState(null);

    const [pag, _pag] = useState(null);
    const [currentPage, _currentPage] = useState(1);

    const [consultas_open, _consultas_open] = useState(false);

    const [filters, _filters] = useState({});
    const [fields, _fields] = useState({
        linhas_acao: null,
        regioes: null,
        ufs: null,
        municipios: null,
        id: null,
    });
    const [togglers, _togglers] = useState({
        linhas_acao: false,
        regioes: false,
        ufs: false,
        municipios: false,
        id: false,
    });
    const [isFiltered, _isFiltered] = useState(false);

    const [bbox, _bbox] = useState(null)
    const [selected, _selected] = useState(null)

    const { data: iniciatives } = useQuery(['ppea-initiatives'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}adm/statistics/iniciatives_in_perspectives/politica`)).data,
        staleTime: 3600000,
    })

    const { data: institutions } = useQuery(['ppea-institutions'], {
        queryFn: async () => (await axios.get(`${import.meta.env.VITE_SERVER}ppea/statistics/institutions`)).data,
        staleTime: 3600000,
    })

    useEffect(() => {
        getOptions();
    }, []);

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
        async function fetchData(page = 1) {
            if (Object.keys(filters).filter(k => !!filters[k]).length === 0) {
                _showList(false);
                return;
            } else _showList(true);

            /* _loading(true); */
            const {
                data: { projects: i, pages, hasPrevious, hasNext, currentPage, total },
            } = await axios.get(`${import.meta.env.VITE_SERVER}project/?limit=6&page=${page}${prepareFilters(filters)}`);
            /* _loading(false); */

            _iniciativas(i);
            _pag({ pages, hasPrevious, hasNext });
            _currentPage(currentPage);
            _total(total);
        }

        fetchData(currentPage, filters);
    }, [currentPage, filters]);

    useEffect(() => {
        _currentPage(1);
        //_showPop(null);

        async function fetchGeoData() {
            if (Object.keys(filters).filter(k => !!filters[k]).length === 0) {
                _iniciativas_ids(null);
                return;
            }

            const { data } = await axios.get(`${import.meta.env.VITE_SERVER}project/geo/?${prepareFilters(filters)}`);

            _iniciativas_ids(data);
        }

        /* reset zoom and position */
        mapRef && mapRef.current && mapRef.current.leafletElement.setView(position, zoom);
        fetchGeoData(filters);
    }, [filters]);

    const handleSelect = (p) => {
        _selected(p.politica_id)
        _bbox(p.bbox)
    }

    const getOptions = async () => {
        const {
            data: { linhas_acao, regioes },
        } = await axios.get(`${import.meta.env.VITE_SERVER}project/options`);

        _linhas_acao(linhas_acao);
        _regioes(regioes);
    };

    const onFilterChange = (type, selectedOption) => {
        _currentPage(1);

        let newFilters;
        let newFields = { ...fields, [type]: selectedOption, id: null };

        if (selectedOption) {
            newFilters = {
                ...filters,
                [type]: selectedOption.map(s => s.value).join(','),
                id: null,
            };
        } else {
            newFilters = { ...filters, [type]: null, id: null };
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

    const handleToggle = (filter) => (checked) => {
        _togglers(togglers => ({...togglers, [filter]: checked}))
    }

    return (<>
        <section className={styles['ppea-dash']}>

            <div className="width-limiter">

                <div className={styles['ppea-dash-inner']}>
                    <div className={styles['title']}>
                        Conheça as iniciativas<br />
                        vinculadas à<br />
                        implementação do<br />PPPZCM
                    </div>

                    <div className={styles['big-numbers']}>
                        <div className={styles['box-with-image']}>
                            <div className={`${styles['box']} ${styles['box-1']}`}>
                                {!iniciatives && <div className={styles.number}>...</div>}
                                {iniciatives && <div className={styles.number}>{iniciatives}</div>}
                                <div className={styles.text}>iniciativas de<br />Educação<br />Ambiental</div>
                            </div>
                        </div>

                        <div className={styles.second}>

                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']}`}>
                                    {!institutions && <div className={styles.number}>...</div>}
                                    {institutions && <div className={styles.number}>XXX{/* {institutions} */}</div>}
                                    <div className={styles.text}>organizações</div>
                                </div>
                            </div>

                            <div className={styles['box-with-image']}>
                                <div className={`${styles['box']}`}>
                                    <div className={styles.number}>XXX</div>
                                    <div className={styles.text}>membros de comunidades</div>
                                </div>
                            </div>

                        </div>

                        <div><img src={DashExample} /></div>
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
                            layers="pppzcm:proj_atuacao"
                            format="image/png"
                            transparent={true}
                            opacity={0.8}
                            cql_filter={iniciativas_ids ? `project_id in (${iniciativas_ids.join(',')})` : 'project_id>0'}
                        />

                        {!!selected && <WMSTileLayer
                            url={import.meta.env.VITE_GEOSERVER_URL}
                            layers="pppzcm:proj_atuacao"
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
                            <div><Toggler checked={togglers['linhas_acao']} onToggle={(checked)=>handleToggle('linhas_acao')(checked)} /></div>
                            <div>Linhas de Ação</div>
                            <div>
                                {linhas_acao && (
                                    <div>
                                        <StyledReactSelect
                                            classNamePrefix={reactSelectClassNamePrefix}
                                            {...selectDefaults}
                                            onChange={selectedOption => onFilterChange('linhas_acao', selectedOption)}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={linhas_acao}
                                            value={fields['linhas_acao']}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles['list-header']}>
                            <div>PPEA Selecionadas</div>
                            <div>Organização</div>
                            <div>Região</div>
                            <div>Conecte-se</div>
                        </div>

                        {!!iniciativas && iniciativas.entities.map(p => <div key={p.id} className={styles['list-item']}>
                            <div>{p.nome}</div>
                            <div>{p.instituicao_nome}</div>
                            <div>-</div>
                            <div>
                                <img onClick={() => handleSelect(p)} src={Mapa} />
                                <img src={Acesso} />
                            </div>
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