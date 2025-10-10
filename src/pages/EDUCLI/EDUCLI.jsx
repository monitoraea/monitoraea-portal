import { useState } from "react";
import Header from "../../components/Header";
//import imgplaceholder from './placeholder.png';
//import bg from './bg.png';

//import DynamicContent from "../../components/DynamicContent";
import ContentByType from "../../components/ContentByType";
import Faq from "../../components/Faq";

import { content_types } from "../../utils";

import MapEDUCLI from "../../components/MapEDUCLI";

import Map from "../../components/Map";
import { Legend } from "./legend";
import Timeline from "./timeline";

import "./style.scss";
import styles from "./styles.module.scss";

import { definicao, ufs, faixa_etaria, participantes_genero, racas_etnias, midias, temas, estrategias_educativas } from './utils';

function EDUCLI() {
  return (
    <>
      <Header />

      <section id="sobre">
        <div className="width-limiter">
          <div className={styles["iniciativas-about"]}>
            <div>
              <div className={styles.title}>Projeto Educom&Clima</div>
            </div>
            <div>
              <p>
                A emergência climática já é uma realidade que nos desafia no dia
                a dia, mas abordá-la em sala de aula é um desafio que encontra
                obstáculos, como a falta de conhecimento sobre a emergência
                climática entre educadores(as) e estudantes da Educação Básica
                no Brasil, o que dificulta a mobilização para ações de combate
                às mudanças climáticas e de construção um futuro sustentável.
              </p>
              <p>
                Para essa missão a educomunicação se apresenta como uma prática
                inovadora, que parte do diálogo em uma abordagem que estimula o
                pensamento crítico, a criatividade e a participação ativa dos/as
                estudantes na busca por soluções para a crise climática.
              </p>
              <p>
                O projeto{" "}
                <span>
                  “Como a Educomunicação pode ampliar e qualificar as práticas
                  de Educação Ambiental Climática na Educação Básica no Brasil?”
                </span>{" "}
                que tem sido chamado de Educom & Clima, busca compreender como
                as práticas educomunicativas podem melhorar a educação climática
                nas escolas, através dos seguintes objetivos:
              </p>
              <p>
                <ul>
                  <li>
                    Identificar e analisar as iniciativas existentes que
                    utilizam a educomunicação para o enfrentamento da emergência
                    climática;
                  </li>
                  <li>
                    Desenvolver e testar uma metodologia que utilize a
                    educomunicação para ensinar sobre mudanças climáticas de
                    forma eficaz junto a educadores/as que estão em contexto de
                    sala de aula;
                  </li>
                  <li>
                    Criar um curso para capacitar professores/as e outros
                    profissionais da educação a utilizar essa metodologia.
                  </li>
                  <li>
                    Disseminar o conhecimento e os resultados do projeto para a
                    sociedade.
                  </li>
                </ul>
              </p>
              <p>
                Esta é uma iniciativa do Núcleo de Comunicação e Educação da
                Escola de Comunicações e Artes da Universidade de São
                Paulo-NCE/ECA/USP, em parceria com o Ministério do Meio Ambiente
                e Mudança do Clima-MMA, a Secretaria Municipal de Educação de
                São Paulo -SME- SP, o Programa Cemaden Educação, o Movimento
                Escolas pelo Clima e a Articulação Nacional de Políticas
                Públicas em Educação Ambiental (Anppea), apoiada pelo Programa
                de Pesquisa em Políticas Públicas-PPPP da Fundação de Amparo à
                Pesquisa do Estado de São Paulo (FAPESP). Uma colaboração que
                garante a participação de especialistas em educação, comunicação
                e políticas públicas, além de proporcionar a aplicação prática
                da pesquisa em escolas da rede municipal.
              </p>
              <p>
                Os produtos que serão gerados pelo projeto, como o banco de
                dados de iniciativas, a metodologia de ensino e o curso para
                educadores/as, serão disponibilizados gratuitamente e em
                formatos abertos para o público, contribuindo para a expansão da
                Educação Ambiental Climática no Brasil. As práticas
                educomunicativas podem contribuir para que as comunidades
                escolares assimilem o conhecimento sobre a emergência climática
                de forma crítica e criativa, promovendo ações locais, com
                condições para participar de forma ativa do enfrentamento à
                emergência climática e para a construção de um mundo mais justo
                e resiliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles["ciea-dash"]}>
        <div className="width-limiter">
          <div className={styles["ciea-dash-inner"]}>
            <div className={styles["title"]}>
              Conheça as Iniciativas do Educom&Clima
            </div>
          </div>
        </div>
      </section>

      {/*<MapEDUCLI />*/}

      <Map
        config={{
          perspective: "educom_clima",
          entity: "educom_clima/formap",
          geo: {
            layer: "pppzcm:educom_clima_count",
            field: "cd_uf",
            opacity: "1",
          },
          resultsTable: {
            headers: ["Iniciativas Selecionadas", "Tipo", "Região"],
            singleUrl: "/iniciativa/educom_clima",
            singleField: "iniciativa_id",
            data: (results) => [
              results.nome,
              (definicao.find(d => d.value == results.definicao) || {label: ''}).label,
              results.regioes.filter((r) => !!r).join(","),
            ],
          },
          fields: [
            {
              key: "ufs",
              initialFieldState: null,
              initialToggleState: false,
              title: "Estado",
              type: "select",
              options: ufs,
              isMulti: true,
            },
            {
              key: "definicao",
              initialFieldState: null,
              initialToggleState: false,
              title: "Tipo de Organizaço",
              type: "select",
              options: definicao,
              isMulti: true,
            },
            {
              key: "faixa_etaria",
              initialFieldState: null,
              initialToggleState: false,
              title: "Idades",
              type: "select",
              options: faixa_etaria,
              isMulti: true,
            },
            {
              key: "racas_etnias",
              initialFieldState: null,
              initialToggleState: false,
              title: "Relação Étnica",
              type: "select",
              options: racas_etnias,
              isMulti: true,
            },
            {
              key: "participantes_genero",
              initialFieldState: null,
              initialToggleState: false,
              title: "Gênero/Sexo",
              type: "select",
              options: participantes_genero,
              isMulti: true,
            },
            {
              key: "temas",
              initialFieldState: null,
              initialToggleState: false,
              title: "Tema",
              type: "select",
              options: temas,
              isMulti: true,
            },
            {
              key: "midias",
              initialFieldState: null,
              initialToggleState: false,
              title: "Mídias",
              type: "select",
              options: midias,
              isMulti: true,
            },
            {
              key: "estrategias_educativas",
              initialFieldState: null,
              initialToggleState: false,
              title: "Estratégias Educativas",
              type: "select",
              options: estrategias_educativas,
              isMulti: true,
            },
          ],
          legends: [<Legend />],
        }}
      />

      <Timeline />

      {["news" /* ,'learning' */].map((c) => (
        <ContentByType
          key={c}
          id={content_types[c][2]}
          contentType={c}
          title={content_types[c][1]}
          moreText={content_types[c][3]}
          portal="educom_clima"
        />
      ))}

      <Faq portal="educom_clima" />
    </>
  );
}

export default EDUCLI;
