const API_BASE = 'http://localhost:8000/api';

const adminAuthService = {
  // Login
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register
  async register(name, email, password) {
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      const token = this.getToken();
      if (token) {
        await fetch(`${API_BASE}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearToken();
    }
  },

  // Get token
  getToken() {
    return localStorage.getItem('adminToken');
  },

  // Set token
  setToken(token) {
    localStorage.setItem('adminToken', token);
  },

  // Clear token
  clearToken() {
    localStorage.removeItem('adminToken');
  }
};

const adminApiService = {
  // Get headers with auth token
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminAuthService.getToken()}`
    };
  },

  // Get all reservations
  async getReservations() {
    try {
      const response = await fetch(`${API_BASE}/reservations`, {
        headers: this.getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch reservations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
  },

  // Update reservation
  async updateReservation(id, data) {
    try {
      const response = await fetch(`${API_BASE}/reservations/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update reservation');
      return await response.json();
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  },

  // Delete reservation
  async deleteReservation(id) {
    try {
      const response = await fetch(`${API_BASE}/reservations/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete reservation');
      return await response.json();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  },

  // Get all rooms
  async getRooms() {
    try {
      const response = await fetch(`${API_BASE}/rooms`, {
        headers: this.getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch rooms');
      return await response.json();
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return [];
    }
  },

  // Create room
  async createRoom(data) {
    try {
      const response = await fetch(`${API_BASE}/rooms`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create room');
      return await response.json();
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  },

  // Update room
  async updateRoom(id, data) {
    try {
      const response = await fetch(`${API_BASE}/rooms/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update room');
      return await response.json();
    } catch (error) {
      console.error('Error updating room:', error);
      throw error;
    }
  },

  // Delete room
  async deleteRoom(id) {
    try {
      const response = await fetch(`${API_BASE}/rooms/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete room');
      return await response.json();
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  },

  // Get all contacts
  async getContacts() {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        headers: this.getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }
};

export { adminAuthService, adminApiService };
