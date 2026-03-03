import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div style={{
      textAlign: 'center', padding: '80px 20px', maxWidth: '600px', margin: '0 auto'
    }}>
      <div style={{fontSize: '60px', marginBottom: '20px'}}>🎉</div>
      <h1 style={{color: '#28a745', marginBottom: '15px'}}>Đặt hàng thành công!</h1>
      <p style={{color: '#666', lineHeight: '1.6'}}>
        Cảm ơn bạn đã mua sách tại BookStore. <br/>
        Mã đơn hàng của bạn là <strong>#DH{Math.floor(Math.random() * 10000)}</strong>.
        Chúng tôi sẽ liên hệ sớm nhất để giao hàng.
      </p>
      
      <div style={{marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center'}}>
        <Link to="/account/orders" style={{
          padding: '10px 20px', border: '1px solid #ddd', borderRadius: '4px', textDecoration: 'none', color: '#333'
        }}>
          Xem đơn hàng
        </Link>
        <Link to="/" style={{
          padding: '10px 20px', background: '#007bff', color: 'white', borderRadius: '4px', textDecoration: 'none'
        }}>
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;