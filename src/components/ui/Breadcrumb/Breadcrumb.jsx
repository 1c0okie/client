import { Link } from 'react-router-dom';
import './Breadcrumb.css';

// items là mảng: [{ label: 'Trang chủ', link: '/' }, { label: 'Văn học' }]
const Breadcrumb = ({ items }) => {
  return (
    <nav className="ui-breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <span key={index} className="breadcrumb-item">
            {item.link ? (
              <Link to={item.link}>{item.label}</Link>
            ) : (
              <span className="active">{item.label}</span>
            )}
            {!isLast && <span className="separator">/</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;