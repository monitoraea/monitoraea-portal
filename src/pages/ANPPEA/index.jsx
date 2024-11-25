import Header from '../../components/Header';
import bg from './bg.png';
import './style.scss';

import DynamicContent from '../../components/DynamicContent';
import Faq from '../../components/Faq';

function Anppea() {
  return (
    <>
      <Header />

      <section id="sobre">
        <div className="width-limiter">
          <div className="title-xl">ANPPEA</div>
          <p className="p-xl"><DynamicContent keyRef="anppea.content" /></p>          
        </div>
      </section>
      
      <Faq portal="anppea" />

    </>
  );
}

export default Anppea;
