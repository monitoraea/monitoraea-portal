import React, { useEffect, useState, Fragment } from 'react';
import './style.scss';
import logomonitoraea from '../../images/logo.png';
import { Link } from 'react-router-dom';

import youtube from '../../images/youtube.png'
import instagram from '../../images/instagram.png'
import anppea from '../../images/ic-anppea.png'

import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

/* import Modal from '../Modal'; */
import styles from './styles.module.scss';

function Footer() {

  const [menu, _menu] = useState(null);
  const [showContactDialog, _showContactDialog] = useState(false);

  const [name, _name] = useState('');
  const [email, _email] = useState('');
  const [message, _message] = useState('');

  const redirectTo = relative_path => {
    window.location = `/${relative_path || ''}`;
  };

  const { data } = useQuery(
    ['menu_tree'],
    {
      queryFn: async () =>
        (
          await axios.get(`${import.meta.env.VITE_SERVER}menu_portal`)
        ).data,
      staleTime: 3600000 /* 1h */
    },
  );

  const mutations = {
    send: useMutation(
      () => axios.post(`${import.meta.env.VITE_SERVER}adm/send_contact`, { email, name, message })
    ),
  };

  const handleSend = async () => {
    if (!name.length || !email.length || !message.length) return;

    await mutations.send.mutateAsync();

    _showContactDialog(false);
    _name('');
    _email('');
    _message('');
  }

  useEffect(() => {
    if (!!data) {
      let menu = []

      // somente dois niveis
      for (let item of data.filter(i => !i.parent_id)) { /* root */
        menu.push({
          ...item,
          children: data.filter(i => i.parent_id === item.id)
        })
      }

      _menu(menu);
    }
  }, [data])

  return (
    <div id="footer">
      <div className={styles.footer}>
        <div className="inner-title-box rodape">
          <div className="left-side">Mapa do Site</div>
          <div className="right-side"></div>
        </div>

        <div className={`width-limiter ${styles.inner}`}>
          <div className={styles.logo}><img src={logomonitoraea} /></div>

          <div className={styles.line1}>

            <div className={`${styles.menu}`}>
              <div>Sobre</div>
              <ul>
                <li>O Sistema MonitoraEA</li>
                <li>ANPPEA</li>
              </ul>
            </div>

            <div className={`${styles.menu}`}>
              <div>Fique por dentro</div>
              <ul>
                <li>Passo a passo</li>
                <li>Notícias</li>
                <li>MonitoraEA na mídia</li>
                <li>Cursos e formações</li>
                <li>Publicações</li>
              </ul>
            </div>

            <div className={styles.contato}>
              <div>
                <div>Fale conosco:</div>
                <a href="mailto:portal.monitoraea@gmail.com">portal.monitoraea@gmail.com</a>
              </div>
              <div>
                <div>Acesse nossas redes sociais:</div>
                <div>
                  <div className={styles['social-media']}><img src={youtube} alt="" /><img src={instagram} alt="" /></div>
                </div>
              </div>
            </div>

          </div>
          <div className={styles.line2}>

            <div className={`${styles.menu}`}>
              <div>Perspectivas de mapeamento</div>
              <ul>
                <li>Políticas Públicas de Educação Ambiental</li>
                <li>Projetos e Ações de Educação Ambiental</li>
              </ul>
            </div>

            <div className={styles.right}>
              <div>
                <div>Associe-se à </div>
                <img src={anppea} />
              </div>
              <div className={styles.end}>
                <div>LGPD</div>
                <div>Termos de uso</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* <Modal open={showContactDialog} onClose={() => _showContactDialog(false)} title="Enviar mensagem para a Secretaria Executiva" onSend={handleSend}>
        <div className={styles.fields}>
          <div className={styles['field-wrap']}>
            <label>E-mail</label>
            <input type="text" name="email" value={email} onChange={(e) => _email(e.target.value)} />
          </div>
          <div className={styles['field-wrap']}>
            <label>Nome</label>
            <input type="text" name="name" value={name} onChange={(e) => _name(e.target.value)} />
          </div>
          <div className={styles['field-wrap']}>
            <label>Mensagem</label>
            <textarea rows={4} name="message" value={message} onChange={(e) => _message(e.target.value)} />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}

/* function MenuItem({ data, ...rest }) {
  if (data.type === 'link') return (<li className="menu-item"><Link target={data.blank ? '_blank' : ''} to={data.link} {...rest}>{data.title}</Link></li>)
  if (data.type === 'page') return (<li className="menu-item"><Link to={`/page/${data.content_id}`} {...rest}>{data.title}</Link></li>)
  if (data.type === 'none') return (<></>)

  return (<li className="menu-item"><Link disabled>{data.title}</Link></li>)
} */

export default Footer;
