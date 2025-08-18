import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

import Modal from '../Modal';
import styles from './styles.module.scss';

function Nav() {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isMobile = useMediaQuery({ maxWidth: 991 });

  // Adicione um estado para controlar se o menu mobile está aberto
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [menu, _menu] = useState(null);
  const [showContactDialog, _showContactDialog] = useState(false);

  const [name, _name] = useState('');
  const [email, _email] = useState('');
  const [message, _message] = useState('');

  const redirectTo = relative_path => {
    window.location = `/${relative_path || ''}`;
  };

  // Função para fechar o menu mobile
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Função para alternar o estado do menu mobile
  const toggleMobileMenu = () => {
    console.log('CLICKED!')
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

  useEffect(() => {
    if (!!data) {

      _menu(data);
    }
  }, [data])

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

  return (
    <>
      <div className={styles.nav}>

        {!!menu && isDesktop && (
          <>
            <ul className={styles.menu}>
              <li className={styles['menu-item']}><Link to="/">Inicio</Link></li>
              {menu.children.map(i => <li key={i.id} className={styles['menu-item']}>
                <MenuItem data={i} />

                {!!i.children.length && <ul className={styles['sub-menu']}>
                  {i.children.map(c => <li key={c.id} className={styles['sub-menu-item']}>
                    <MenuItem data={c} />
                  </li>)}
                </ul>}

              </li>)}

              <li className={styles['menu-item']}><div className={styles.contact} onClick={() => _showContactDialog(true)}>Contato</div></li>

            </ul>

          </>
        )}

        {isMobile && (
          <>
            <div className={styles['mobile-toggle']} onClick={toggleMobileMenu}>
              <div className={styles.icon}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="#fff" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* {isMobileMenuOpen ? <>OPEN {JSON.stringify(isMobile)} {JSON.stringify(menu)}</> : <>CLOSE</>} */}

      {!!menu && isMobile && (
        <div className={`${styles['mobile-menu']} ${isMobileMenuOpen ? styles.open : ''}`}>
          <ul className={styles.menu}>
            <li className={styles['menu-item']}>
              <MenuItem data={{
                title: 'Início',
                type: 'link',
                link: '/',
              }} />
            </li>

            {menu.children.map(i => <li key={i.id} className={styles['menu-item']}>
              <MenuItem data={i} />

              {!!i.children.length && <ul className={styles['sub-menu']}>
                {i.children.map(c => <li key={c.id} className={styles['sub-menu-item']}>
                  <MenuItem data={c} onClick={closeMobileMenu} />
                </li>)}
              </ul>}

            </li>)}

            <div className={styles['menu-item']}><a className={styles.contact}>Instagram</a></div>

            <div className={styles['menu-item']}><a className={styles.contact}>Contato</a></div>

          </ul>
          <div className={styles.close} onClick={toggleMobileMenu}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

      )}
      <Modal open={showContactDialog} onClose={() => _showContactDialog(false)} title="Enviar mensagem para a Secretaria Executiva" onSend={handleSend}>
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
      </Modal>
    </>
  );
}

function MenuItem({ data, ...rest }) {
  if (data.type === 'link') return (<Link target={data.blank ? '_blank' : ''} to={data.link} {...rest}>{data.title}</Link>)
  if (data.type === 'page') return (<Link to={`/page/${data.content_id}`} {...rest}>{data.title}</Link>)

  return (<Link disabled>{data.title}</Link>)
}

export default Nav;
