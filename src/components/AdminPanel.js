import React, { useState } from 'react';

function AdminPanel({ accounts, bookings }) {
  const [activeTab, setActiveTab] = useState('accounts');

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '40px'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          View and manage all accounts and bookings
        </p>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          borderBottom: '2px solid #e5e7eb',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setActiveTab('accounts')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              color: activeTab === 'accounts' ? '#1e40af' : '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'accounts' ? '3px solid #1e40af' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            Accounts ({accounts.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              color: activeTab === 'bookings' ? '#1e40af' : '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'bookings' ? '3px solid #1e40af' : '3px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            Bookings ({bookings.length})
          </button>
        </div>

        {/* Accounts Table */}
        {activeTab === 'accounts' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Username
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Email
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {accounts.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ 
                      padding: '48px', 
                      textAlign: 'center', 
                      color: '#9ca3af',
                      fontSize: '16px'
                    }}>
                      No accounts created yet
                    </td>
                  </tr>
                ) : (
                  accounts.map((account) => (
                    <tr 
                      key={account.id} 
                      style={{ borderBottom: '1px solid #e5e7eb' }}
                    >
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#1f2937',
                        fontWeight: '500'
                      }}>
                        {account.username}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#6b7280'
                      }}>
                        {account.email}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#6b7280'
                      }}>
                        {formatDate(account.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Bookings Table */}
        {activeTab === 'bookings' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    User
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Guest Name
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Voyage
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Route
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Dates
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ 
                      padding: '48px', 
                      textAlign: 'center', 
                      color: '#9ca3af',
                      fontSize: '16px'
                    }}>
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr 
                      key={booking.id} 
                      style={{ borderBottom: '1px solid #e5e7eb' }}
                    >
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#1f2937',
                        fontWeight: '500'
                      }}>
                        {booking.user}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#1f2937'
                      }}>
                        {booking.name}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '4px 12px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {booking.voyage}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#6b7280'
                      }}>
                        {booking.departureLocation} → {booking.arrivalLocation}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '14px', 
                        color: '#6b7280'
                      }}>
                        {booking.departureDate}<br/>
                        <span style={{ fontSize: '12px' }}>to</span><br/>
                        {booking.arrivalDate}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '16px', 
                        color: '#059669',
                        fontWeight: '700'
                      }}>
                        ${booking.cost.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Statistics */}
        <div style={{ 
          marginTop: '32px', 
          padding: '24px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
              Total Accounts
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>
              {accounts.length}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
              Total Bookings
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0891b2' }}>
              {bookings.length}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
              Total Revenue
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
              ${bookings.reduce((sum, b) => sum + b.cost, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;