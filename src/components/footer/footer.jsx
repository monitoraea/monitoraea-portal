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

      _menu(data);
    }
  }, [data])

  if (!menu) return <></>

  return (
    <div id="footer">
      <div className={styles.footer}>

        <div className="width-limiter">
          <div className={styles['title-box']}>
            <div className={styles['left-side']}>Mapa do Site</div>
          </div>
        </div>

        <div className={`${styles['width-limiter']} ${styles.inner}`}>
          <div className={styles.links}>

            <div className={styles.line1}>

              <div className={`${styles.menu}`}>
                <div>Sobre</div>
                <ul>
                  {menu.children.filter(m => m.id === 1)[0].children.map(m => <MenuItem key={m.id} data={m} />)}
                </ul>
              </div>

              <div className={`${styles.menu}`}>
                <div>Fique por dentro</div>
                <ul>
                  <li><Link to={`/page/81`}>Passo a passo</Link></li>
                  {menu.children.filter(m => m.id === 27)[0].children.map(m => <MenuItem key={m.id} data={m} />)}
                </ul>
              </div>

              <div className={`${styles.menu}`}>
                <div>Perspectivas de mapeamento</div>
                <ul>
                  {menu.children.filter(m => m.id === 21)[0].children.map(m => <MenuItem key={m.id} data={m} />)}
                </ul>
              </div>

            </div>

          </div>

          <div className={styles.info}>
            <div className={styles.logo}><img src={logomonitoraea} /></div>

            <div className={styles.line2}>

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

              <div className={styles.etc}>
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
      </div>

    </div>
  );
}

function MenuItem({ data, ...rest }) {
  if (data.type === 'link' && data.link) return (<li><Link target={data.blank ? '_blank' : ''} to={data.link} {...rest}>{data.title}</Link></li>)
  if (data.type === 'page' && data.content_id) return (<li><Link to={`/page/${data.content_id}`} {...rest}>{data.title}</Link></li>)

  return (<li><Link disabled>{data.title}</Link></li>)
}

export default Footer;
