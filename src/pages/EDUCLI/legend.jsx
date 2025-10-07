import styles from './styles.module.scss';

export function Legend({ layer }) {
    // https://geoserver.monitoraea.org.br/geoserver/pppzcm/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LEGEND_OPTIONS=dpi:100;columns:1&LAYER=pppzcm:educom_clima_count
    // title
    // geoserver server
    // layer
    // w, h, columns

    return (<div className={styles.legend}>
        <div className={styles.title}>Quantidade de iniciativas</div>
        <img src="https://geoserver.monitoraea.org.br/geoserver/pppzcm/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LEGEND_OPTIONS=dpi:100;columns:1&LAYER=pppzcm:educom_clima_count" />
    </div>)
}
