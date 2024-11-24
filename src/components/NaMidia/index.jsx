import img1 from '../../images/happy_1.jpg'
import img2 from '../../images/happy_2.jpg'
import img3 from '../../images/happy_3.jpg'

import MoreTip from '../../images/more_timeline_tip.svg?react'

export default function NaMidia() {
    return (<section id="monitoraea_midia">
        <div className="inner-title-box na-midia">
            <div className="left-side">MonitoraEA na mídia</div>
            <div className="right-side"></div>
        </div>

        <div className="width-limiter">
            <div className="timeline">
                <div className="timeline-each">
                    <div></div>
                    <div className="timeline-each-thumb empty"></div>
                </div>
                <div className="timeline-each">
                    <div className="timeline-each-date">
                        <div className="timeline-each-date-miolo">
                            <div className="left-side">01 Jan 2024</div>
                            <div className="right-side"></div>
                        </div>
                    </div>
                    <div className="timeline-each-thumb">
                        <div className="timeline-each-thumb-image">
                            <img src={img1} alt="imagem de timeline" />
                        </div>
                    </div>
                    <div className="timeline-each-text">[SEDUC-PA] Projetos finalistas da CYC serão nacionalmente divulgados  em plataforma</div>
                </div>
                <div className="timeline-each">
                    <div className="timeline-each-date">
                        <div className="timeline-each-date-miolo">
                            <div className="left-side">12 Fev 2024</div>
                            <div className="right-side"></div>
                        </div>
                    </div>
                    <div className="timeline-each-thumb">
                        <div className="timeline-each-thumb-image">
                            <img src={img2} alt="imagem de timeline" />
                        </div>
                    </div>
                    <div className="timeline-each-text">[Agência de notícias -AC] Equipe do Acre participa da Oficina de Formação e Construção de Indicadores da Educação Ambiental em Belém – PA</div>
                </div>
                <div className="timeline-each">
                    <div className="timeline-each-date">
                        <div className="timeline-each-date-miolo">
                            <div className="left-side">24 Jun 2024</div>
                            <div className="right-side"></div>
                        </div>
                    </div>
                    <div className="timeline-each-thumb">
                        <div className="timeline-each-thumb-image">
                            <img src={img3} alt="imagem de timeline" />
                        </div>
                    </div>
                    <div className="timeline-each-text">[IBAMA] Ibama participa de Oficina de Monitoramento e Avaliação de Políticas Públicas de Educação Ambiental</div>
                </div>
                <div className="timeline-each">
                    <div></div>
                    <div className="timeline-each-thumb"></div>
                </div>
                <div className="timeline-each">
                    <div></div>
                    <div className="end">
                        <MoreTip />                        
                    </div>
                    <div className="timeline-each-more"><a href="">More</a></div>
                </div>
            </div>
        </div>
    </section>)
}