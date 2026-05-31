import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await apiService.getRooms();
        setRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        // Fallback data
        setRooms([
          { id: 1, name: 'Standard Room', type: 'Standard', size: '25m²', occupancy: 2, price_per_night: 80, description: 'Comfortable room with modern amenities' },
          { id: 2, name: 'Deluxe Room', type: 'Deluxe', size: '35m²', occupancy: 2, price_per_night: 120, description: 'Spacious room with city view' },
          { id: 3, name: 'Executive Suite', type: 'Suite', size: '45m²', occupancy: 4, price_per_night: 160, description: 'Luxurious suite with separate living area' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <section id="rooms" className="section"><div className="container"><h2>Loading rooms...</h2></div></section>;
  }

  return (
    <section id="rooms" className="section">
      <div className="container">
        <h2>Our Rooms</h2>
        <div className="grid">
          {rooms.map((room) => (
            <div key={room.id} className="card">
              <h3>{room.name}</h3>
              <p><strong>Type:</strong> {room.type}</p>
              <p><strong>Size:</strong> {room.size}</p>
              <p><strong>Occupancy:</strong> {room.occupancy} guests</p>
              <p>{room.description}</p>
              <div className="card-price">${room.price_per_night}/night</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rooms;
