import React, { useState, useEffect } from 'react';
import { adminAuthService, adminApiService } from '../services/adminService';

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('reservations');
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reservationsData, roomsData, contactsData] = await Promise.all([
        adminApiService.getReservations(),
        adminApiService.getRooms(),
        adminApiService.getContacts()
      ]);
      setReservations(Array.isArray(reservationsData) ? reservationsData : []);
      setRooms(Array.isArray(roomsData) ? roomsData : []);
      setContacts(Array.isArray(contactsData) ? contactsData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback data for demo
      setReservations([
        { id: 1, guest_name: 'John Doe', guest_email: 'john@example.com', check_in: '2024-02-01', check_out: '2024-02-05', room_type: 'Deluxe Room', total_amount: 480, status: 'confirmed' },
        { id: 2, guest_name: 'Jane Smith', guest_email: 'jane@example.com', check_in: '2024-02-10', check_out: '2024-02-12', room_type: 'Executive Suite', total_amount: 320, status: 'pending' },
        { id: 3, guest_name: 'Bob Wilson', guest_email: 'bob@example.com', check_in: '2024-02-15', check_out: '2024-02-20', room_type: 'Standard Room', total_amount: 400, status: 'confirmed' }
      ]);
      setRooms([
        { id: 1, name: 'Standard Room', type: 'Standard', size: '25m²', occupancy: 2, price_per_night: 80 },
        { id: 2, name: 'Deluxe Room', type: 'Deluxe', size: '35m²', occupancy: 2, price_per_night: 120 },
        { id: 3, name: 'Executive Suite', type: 'Suite', size: '45m²', occupancy: 4, price_per_night: 160 }
      ]);
      setContacts([
        { id: 1, name: 'Alice', email: 'alice@example.com', subject: 'Inquiry', message: 'Do you have availability for next weekend?', created_at: '2024-01-20' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminAuthService.logout();
    onLogout();
  };

  const updateReservationStatus = async (id, status) => {
    try {
      await adminApiService.updateReservation(id, { status });
      setReservations(reservations.map(r => 
        r.id === id ? { ...r, status } : r
      ));
      setMessage('Reservation updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating reservation');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const deleteReservation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reservation?')) return;
    try {
      await adminApiService.deleteReservation(id);
      setReservations(reservations.filter(r => r.id !== id));
      setMessage('Reservation deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting reservation');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: '#ffc107',
      confirmed: '#28a745',
      cancelled: '#dc3545',
      completed: '#17a2b8'
    };
    return (
      <span style={{
        padding: '5px 10px',
        borderRadius: '20px',
        background: colors[status] || '#6c757d',
        color: 'white',
        fontSize: '0.85rem',
        textTransform: 'capitalize'
      }}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <header style={{
        background: '#8b5e3c',
        color: 'white',
        padding: '15px 0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '1.5rem' }}>Outspan Hotel Admin</h1>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,255,255,0.2)' }}>
            Logout
          </button>
        </div>
      </header>

      {message && (
        <div style={{
          padding: '15px',
          background: '#28a745',
          color: 'white',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            className={`btn ${activeTab === 'reservations' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('reservations')}
          >
            Reservations ({reservations.length})
          </button>
          <button
            className={`btn ${activeTab === 'rooms' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('rooms')}
          >
            Rooms ({rooms.length})
          </button>
          <button
            className={`btn ${activeTab === 'contacts' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contact Messages ({contacts.length})
          </button>
        </div>

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h2>Reservations</h2>
            {reservations.length === 0 ? (
              <p>No reservations found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>
                          {reservation.guest_name}<br />
                          <small>{reservation.guest_email}</small>
                        </td>
                        <td>{reservation.room_type}</td>
                        <td>{reservation.check_in}</td>
                        <td>{reservation.check_out}</td>
                        <td>${reservation.total_amount}</td>
                        <td>{getStatusBadge(reservation.status)}</td>
                        <td>
                          {reservation.status === 'pending' && (
                            <>
                              <button 
                                className="btn btn-small" 
                                style={{ background: '#28a745', marginRight: '5px' }}
                                onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                              >
                                Approve
                              </button>
                              <button 
                                className="btn btn-small" 
                                style={{ background: '#dc3545' }}
                                onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button 
                            className="btn btn-small" 
                            style={{ background: '#dc3545', marginLeft: '5px' }}
                            onClick={() => deleteReservation(reservation.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Rooms Tab */}
        {activeTab === 'rooms' && (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h2>Rooms Management</h2>
            {rooms.length === 0 ? (
              <p>No rooms found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Occupancy</th>
                      <th>Price/Night</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.name}</td>
                        <td>{room.type}</td>
                        <td>{room.size}</td>
                        <td>{room.occupancy} guests</td>
                        <td>${room.price_per_night}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h2>Contact Messages</h2>
            {contacts.length === 0 ? (
              <p>No contact messages found.</p>
            ) : (
              <div>
                {contacts.map((contact) => (
                  <div key={contact.id} style={{
                    padding: '15px',
                    borderBottom: '1px solid #e0e0e0',
                    marginBottom: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>{contact.name}</strong>
                      <small style={{ color: '#666' }}>
                        {contact.created_at ? new Date(contact.created_at).toLocaleDateString() : 'N/A'}
                      </small>
                    </div>
                    <p style={{ color: '#666', marginBottom: '5px' }}>{contact.email}</p>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{contact.subject}</p>
                    <p>{contact.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;