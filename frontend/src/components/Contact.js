import React, { useState } from 'react';
import apiService from '../services/apiService';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      await apiService.sendContact(formData);
      setMessage('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setMessage(`Error: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label>Your Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Subject *</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label>Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />

          {message && (
            <div className={message.includes('Error') ? 'error' : 'success'}>
              {message}
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-info" style={{ marginTop: '40px', textAlign: 'center' }}>
          <h3>Get in Touch</h3>
          <p><strong>Phone:</strong> +254 700 000 000</p>
          <p><strong>Email:</strong> info@outspanhotel.co.ke</p>
          <p><strong>Address:</strong> Outspan Road, Nyeri, Kenya</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;