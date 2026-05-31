const API_BASE = 'http://localhost:8000/api';

const stripeService = {
  // Create payment intent
  async createPaymentIntent(reservationId, amount) {
    try {
      const response = await fetch(`${API_BASE}/payment/create-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservation_id: reservationId,
          amount: Math.round(amount * 100) // Convert to cents
        })
      });
      if (!response.ok) throw new Error('Failed to create payment intent');
      return await response.json();
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  },

  // Confirm payment
  async confirmPayment(reservationId, paymentIntentId) {
    try {
      const response = await fetch(`${API_BASE}/payment/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservation_id: reservationId,
          payment_intent_id: paymentIntentId
        })
      });
      if (!response.ok) throw new Error('Failed to confirm payment');
      return await response.json();
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }
};

export default stripeService;
