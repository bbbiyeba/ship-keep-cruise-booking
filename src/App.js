import React, { useState } from 'react';
import AccountCreation from './components/AccountCreation';
import TripBooking from './components/TripBooking';
import AdminPanel from './components/AdminPanel';
import './App.css';

/**
 * Ship Keep Co Cruise Booking Application
 * 
 * Main application component that manages:
 * - User account creation
 * - Trip booking
 * - Admin dashboard
 * 
 * Data Storage: In-memory (for demo purposes)
 * In production, this would connect to a backend API
 */
function App() {
  // Application state
  const [currentPage, setCurrentPage] = useState('account'); // 'account' | 'booking' | 'admin'
  const [accounts, setAccounts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  /**
   * Handles successful account creation
   * Stores account data and navigates to booking page
   */
  const handleAccountCreated = (accountData) => {
    const newAccount = {
      ...accountData,
      id: Date.now(), // Simple ID generation for demo
      createdAt: accountData.createdAt || new Date().toISOString()
    };
    
    setAccounts(prevAccounts => [...prevAccounts, newAccount]);
    setCurrentUser(accountData.username);
    setCurrentPage('booking');
    
    console.log('Account created:', newAccount);
  };

  /**
   * Handles successful trip booking
   * Stores booking data with user reference
   */
  const handleBookingComplete = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      user: currentUser,
      bookedAt: new Date().toISOString()
    };
    
    setBookings(prevBookings => [...prevBookings, newBooking]);
    
    console.log('Booking created:', newBooking);
  };

  /**
   * Navigation handler
   */
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App" style={{ 
      minHeight: '100vh',
      backgroundColor: '#f3f4f6'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '24px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ fontSize: '32px' }}>🚢</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
              Ship Keep Co
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.9 }}>
              Your Gateway to Ocean Adventures
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Bar (shown after account creation) */}
      {currentUser && (
        <nav style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 0'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button
              onClick={() => navigateTo('booking')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentPage === 'booking' ? '#1e40af' : '#f3f4f6',
                color: currentPage === 'booking' ? 'white' : '#4b5563',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              📅 Book a Trip
            </button>
            
            <button
              onClick={() => navigateTo('admin')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentPage === 'admin' ? '#1e40af' : '#f3f4f6',
                color: currentPage === 'admin' ? 'white' : '#4b5563',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🔧 Admin Panel
            </button>
            
            <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#6b7280' }}>
              Logged in as: <strong style={{ color: '#1f2937' }}>{currentUser}</strong>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main style={{ padding: '40px 0', minHeight: 'calc(100vh - 200px)' }}>
        {/* Account Creation Page */}
        {currentPage === 'account' && (
          <AccountCreation onAccountCreated={handleAccountCreated} />
        )}
        
        {/* Trip Booking Page */}
        {currentPage === 'booking' && (
          <TripBooking onBookingComplete={handleBookingComplete} />
        )}
        
        {/* Admin Dashboard */}
        {currentPage === 'admin' && (
          <AdminPanel accounts={accounts} bookings={bookings} />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1f2937',
        color: '#9ca3af',
        padding: '24px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            © 2026 Ship Keep Co. All rights reserved.
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '12px' }}>
            Demo Application - Dell ISG Software Engineering Assessment
          </p>
        </div>
      </footer>

      {/* Development Console (for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          backgroundColor: '#1f2937',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '12px',
          maxWidth: '300px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <strong>Dev Console:</strong><br/>
          Accounts: {accounts.length}<br/>
          Bookings: {bookings.length}<br/>
          Current User: {currentUser || 'None'}<br/>
          Page: {currentPage}
        </div>
      )}
    </div>
  );
}

export default App;