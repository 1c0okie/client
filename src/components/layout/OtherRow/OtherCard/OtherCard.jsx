import './OtherCard.css';

const OtherCard = ({book}) => {
    return (
        <div className="simple-book-card">
  <div className="book-thumb">
    <img src={book.image} alt={book.title} className="book-image" />
  </div>
  
  <h3 className="book-name">{book.title}</h3>
</div>   
 );
};
export default OtherCard;