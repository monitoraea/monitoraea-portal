import { useState } from 'react';
import './style.scss';

import Arrow1 from '../../images/accordeon_arrow_1.svg?react';
/* import Arrow2 from '../../images/accordeon_arrow_2.svg?react'; */

function AccordeonItem({ title, content, isOpen, onClick }) {
  return (
    <div className="accordeon-item">
      <div className={`accordeon-title ${isOpen ? 'open' : ''}`} onClick={onClick}>
        {title}
        <div className="icon">
          <Arrow1 />
        </div>
      </div>
      {isOpen && <div className="accordeon-content">{content}</div>}
    </div>
  );
}

function Accordeon({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    if (index === openIndex) {
      // Se o mesmo item estiver aberto, feche-o
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="accordeon">
      {items.map((item, index) => (
        <AccordeonItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === openIndex}
          onClick={() => toggleItem(index)}
        />
      ))}
    </div>
  );
}

export default Accordeon;
