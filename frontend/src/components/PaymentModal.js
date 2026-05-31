import React, { useState } from 'react';

function PaymentModal({ reservationId, amount, onSuccess, onClose }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter a valid card number');
      return;
    }
    if (expiryDate.length < 5) {
      setError('Please enter a valid expiry date (MM/YY)');
      return;
    }
    if (cvv.length < 3) {
      setError('Please enter a valid CVV');
      return;
    }
    if (!cardName.trim()) {
      setError('Please enter the name on card');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="modal show">
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: '20px', color: '#8b5e3c' }}>Payment</h2>
        
        <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '5px' }}>
          <p><strong>Reservation ID:</strong> {reservationId}</p>
          <p><strong>Amount:</strong> ${amount}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Cardholder Name *</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            required
          />

          <label>Card Number *</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
          />

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label>Expiry Date *</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>CVV *</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength="4"
                required
              />
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '15px' }} disabled={loading}>
            {loading ? 'Processing...' : `Pay $${amount}`}
          </button>
        </form>

        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '15px', textAlign: 'center' }}>
          This is a demo payment form. No actual payment will be processed.
        </p>
      </div>
    </div>
  );
}

export default PaymentModal;