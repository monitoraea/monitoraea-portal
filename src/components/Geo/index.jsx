import { useState, useEffect, createRef } from 'react';
// import randomColor from 'randomcolor';
import { Map, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
/* styles */
import styles from './styles.module.scss';

/*  */
const mapRef = createRef();
const position = [-15.559793, -56.58506];
const zoom = 4;
const colors = ['#4bade5']; // randomColor({ luminosity: 'dark', count: 15 });

export default function ProjectGeo({ loading, pas, bounds }) {
    const [local_bounds, _local_bounds] = useState(null);

    useEffect(() => {
        _local_bounds(bounds);
    }, [bounds]);

    useEffect(() => {
        local_bounds && mapRef && mapRef.current && mapRef.current.leafletElement.fitBounds(local_bounds);
    }, [local_bounds]);

    return (<section id="mapa">
        <div className={styles.container}>
            <div className={styles['map-container']}>
                <Map center={position} zoomControl={false} zoom={zoom} ref={mapRef} dragging={false} scrollWheelZoom={false} /*  onClick={handleMapClick} */>
                    <TileLayer
                        attribution='<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {pas &&
                        pas.map(({ id, geojson, mungeo }, idx) => (
                            <GeoJSON
                                style={{
                                    weight: 2,
                                    color: '#fff',
                                    fillColor: colors[idx % colors.length],
                                    fillOpacity: 0.7,
                                }}
                                key={id}
                                data={JSON.parse(geojson)}
                            >
                                {mungeo && (
                                    <Tooltip sticky>
                                        #{idx} {mungeo}
                                    </Tooltip>
                                )}
                            </GeoJSON>
                        ))
                    }
                </Map>
            </div>
        </div>
    </section>);
}