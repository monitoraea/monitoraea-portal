import React, { useState, useEffect } from 'react';
import './style.scss';
import logomonitoraea from './logo-monitoraea.png';
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
      <div className="nav">
        <div className="brand">
          {/* TODO */}
        </div>

        {!!menu && isDesktop && (
          <>
            <ul className="menu">
              <li className="menu-item"><Link to="/">Inicio</Link></li>
              {menu.map(i => <li key={i.id} className="menu-item">
                <MenuItem data={i} />

                {!!i.children.length && <ul className="sub-menu">
                  {i.children.map(c => <li key={c.id} className="sub-menu-item">
                    <MenuItem data={c} />
                  </li>)}
                </ul>}

              </li>)}

              <li className="menu-item"><div className="contact" onClick={() => _showContactDialog(true)}>Contato</div></li>

            </ul>
            <div className="access">
              {/* TODO */}
            </div>

          </>
        )}

        {isMobile && (
          <>
            <div className="mobile-toggle" onClick={toggleMobileMenu}>
              <div className="icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      {!!menu && isMobile && (
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="menu">
            <Link to="/">Início</Link>

            {menu.map(i => <li key={i.id} className="menu-item">
              <MenuItem data={i} />

              {!!i.children.length && <ul className="sub-menu">
                {i.children.map(c => <li key={c.id} className="sub-menu-item">
                  <MenuItem data={c} onClick={closeMobileMenu} />
                </li>)}
              </ul>}

            </li>)}

            <li className="menu-item"><div className="contact">Contato</div></li>

          </ul>
          <div className="close" onClick={toggleMobileMenu}>
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
