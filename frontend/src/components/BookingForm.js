import React, { useState } from 'react';
import apiService from '../services/apiService';
import PaymentModal from './PaymentModal';

function BookingForm() {
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in: '',
    check_out: '',
    adults: 1,
    children: 0,
    room_type: 'Deluxe Room',
    special_requests: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Check availability first
      const availability = await apiService.checkAvailability(
        formData.check_in,
        formData.check_out
      );

      if (!availability.available) {
        setMessage(`Rooms not available: ${availability.error || 'Please select different dates'}`);
        setLoading(false);
        return;
      }

      // Create reservation
      const reservation = await apiService.createReservation(formData);
      setReservationData(reservation);
      setShowPayment(true);
      setMessage('Reservation created! Proceeding to payment...');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setMessage('Payment successful! Confirmation sent to your email.');
    setShowPayment(false);
    setFormData({
      guest_name: '',
      guest_email: '',
      guest_phone: '',
      check_in: '',
      check_out: '',
      adults: 1,
      children: 0,
      room_type: 'Deluxe Room',
      special_requests: ''
    });
  };

  return (
    <>
      <section id="booking" className="section">
        <div className="container">
          <h2>Book Your Stay</h2>
          <form onSubmit={handleSubmit}>
            <label>Full Name *</label>
            <input
              type="text"
              name="guest_name"
              value={formData.guest_name}
              onChange={handleChange}
              required
            />

            <label>Email *</label>
            <input
              type="email"
              name="guest_email"
              value={formData.guest_email}
              onChange={handleChange}
              required
            />

            <label>Phone Number *</label>
            <input
              type="tel"
              name="guest_phone"
              value={formData.guest_phone}
              onChange={handleChange}
              required
            />

            <label>Room Type *</label>
            <select name="room_type" value={formData.room_type} onChange={handleChange} required>
              <option value="Standard Room">Standard Room</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Executive Suite">Executive Suite</option>
            </select>

            <label>Check-in Date *</label>
            <input
              type="date"
              name="check_in"
              value={formData.check_in}
              onChange={handleChange}
              required
            />

            <label>Check-out Date *</label>
            <input
              type="date"
              name="check_out"
              value={formData.check_out}
              onChange={handleChange}
              required
            />

            <label>Number of Adults *</label>
            <input
              type="number"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              min="1"
              required
            />

            <label>Number of Children</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              min="0"
            />

            <label>Special Requests</label>
            <textarea
              name="special_requests"
              value={formData.special_requests}
              onChange={handleChange}
            />

            {message && (
              <div className={message.includes('Error') ? 'error' : 'success'}>
                {message}
              </div>
            )}

            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Processing...' : 'Book Now'}
            </button>
          </form>
        </div>
      </section>

      {showPayment && reservationData && (
        <PaymentModal
          reservationId={reservationData.id}
          amount={reservationData.total_amount || 100}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </>
  );
}

export default BookingForm;
