import Header from '../../components/Header';

import imgsobre from './sobre.png';
import imgsobre_mobile from './sobre_mobile.png';

import Development from '../../components/Development';

import IniciativaCadastradas from '../../components/IniciativasCadastradas';
import NaMidia from '../../components/NaMidia';

import './style.scss';
import styles from './styles.module.scss'

import ContentByType from '../../components/ContentByType';
import Faq from '../../components/Faq';

import MapGeneral from '../../components/MapGeneral';

import { content_types } from '../../utils';

import { useMediaQuery } from 'react-responsive';

function Home() {
  const isMobile = useMediaQuery({ maxWidth: 991 });

  /* if (isMobile)  */return (<>
    <Header />

    <section className={styles.sobre}>
      <div className={styles['width-limiter']}>
        {!isMobile && <img src={imgsobre} />}
        {isMobile && <img src={imgsobre_mobile} />}
      </div>
    </section>

    <MapGeneral />

    {
      ['news'/* , 'learning' */].map(c => <ContentByType
        key={c}
        id={content_types[c][2]}
        contentType={c}
        title={content_types[c][1]}
        moreText={content_types[c][3]}
        className={`content-type-${c}`}
      />)
    }
    

    <IniciativaCadastradas />

    <NaMidia />

    {/* <Faq /> */}

    <Development />
  </>)
}

export default Home;