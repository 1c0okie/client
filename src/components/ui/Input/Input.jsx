import './Input.css';

const Input = ({ 
  label, 
  error, 
  id, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`ui-input-wrapper ${className}`}>
      {label && <label htmlFor={id} className="ui-label">{label}</label>}
      
      <input 
        id={id}
        className={`ui-input ${error ? 'has-error' : ''}`} 
        {...props} 
      />
      
      {error && <span className="ui-error-text">{error}</span>}
    </div>
  );
};

export default Input;