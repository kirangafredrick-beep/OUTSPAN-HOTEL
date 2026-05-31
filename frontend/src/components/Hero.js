import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div>
        <h1>Welcome to Outspan Hotel</h1>
        <p>Experience luxury near Mount Kenya</p>
        <div className="hero-buttons">
          <button className="btn" onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}>
            Book Now
          </button>
          <button className="btn btn-secondary" onClick={() => document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' })}>
            Explore Rooms
          </button>
          <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
