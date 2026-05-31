const API_BASE = 'http://localhost:8000/api';

const apiService = {
  // Get all rooms
  async getRooms() {
    try {
      const response = await fetch(`${API_BASE}/rooms`);
      if (!response.ok) throw new Error('Failed to fetch rooms');
      return await response.json();
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return [];
    }
  },

  // Check room availability
  async checkAvailability(checkIn, checkOut) {
    try {
      const response = await fetch(`${API_BASE}/reservations/check-availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ check_in: checkIn, check_out: checkOut })
      });
      const data = await response.json();
      return response.ok ? data : { available: false, error: data.message };
    } catch (error) {
      console.error('Error checking availability:', error);
      return { available: false, error: error.message };
    }
  },

  // Create reservation
  async createReservation(reservation) {
    try {
      const response = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create reservation');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  // Send contact form
  async sendContact(contact) {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      });
      if (!response.ok) throw new Error('Failed to send contact form');
      return await response.json();
    } catch (error) {
      console.error('Error sending contact:', error);
      throw error;
    }
  },

  // Send chat message
  async sendChat(message) {
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!response.ok) throw new Error('Failed to send chat');
      return await response.json();
    } catch (error) {
      console.error('Error sending chat:', error);
      throw error;
    }
  },

  // Get reviews
  async getReviews() {
    try {
      const response = await fetch(`${API_BASE}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  // Submit review
  async submitReview(review) {
    try {
      const response = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      if (!response.ok) throw new Error('Failed to submit review');
      return await response.json();
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  }
};

export default apiService;
