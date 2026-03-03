import './Badge.css';

const Badge = ({ count, max = 99 }) => {
  if (count <= 0) return null; // Không hiện nếu số lượng là 0

  return (
    <span className="ui-badge">
      {count > max ? `${max}+` : count}
    </span>
  );
};

export default Badge;