import OtherCard from '../OtherCard/OtherCard';
import './OtherRow.css';

const OtherRow = ({ title, books, onViewAll }) => {
  // Chỉ lấy tối đa 7 sách
  const displayBooks = books.slice(0, 8);

  return (
    <div className="other-row">
      {/* Header */}
      <h2 className="other-row-title">
        <span className="title-text">{title}</span>
      </h2>

      {/* Danh sách sách */}
      <div className="other-book-list">
        {displayBooks.map((book) => (
          <OtherCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default OtherRow;
