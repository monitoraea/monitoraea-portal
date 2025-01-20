import Nav from '../../components/nav/nav';
import imgplaceholder from './placeholder.png';
import bg from './bg.png';

import DynamicContent from '../../components/DynamicContent';
import ContentByType from '../../components/ContentByType';
import Faq from '../../components/Faq';

import { content_types } from '../../utils';

import MapCIEA from '../../components/MapCIEA';

// import './style.scss';
import styles from './styles.module.scss'

function CIEA() {

  return (
    <>
      <div className="banner">
        <img className="bg" src={bg} alt="" />
        <div className="backdrop"></div>
        <div className="content">
          <div className="title">Comissões Interinstitucional de Educação Ambiental</div>
        </div>
      </div>

      <Nav />

      <section id="sobre" className={styles['about-section']}>
        <div className="width-limiter">
          <p className="p-xl"><DynamicContent keyRef="ciea.intro" /></p>
        </div>
      </section>

      <MapCIEA />


      {['news'/* ,'learning' */].map(c => <ContentByType
        key={c}
        id={content_types[c][2]}
        contentType={c}
        title={content_types[c][1]}
        moreText={content_types[c][3]}
        portal="ciea"
      />)}

      <Faq portal="ciea" />

    </>
  );
}

export default CIEA;
