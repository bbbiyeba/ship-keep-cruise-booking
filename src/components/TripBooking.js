import React, { useState } from 'react';
import { getVoyagesForDate, getFutureStops } from '../data/timetable';

function TripBooking({ onBookingComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    departureDate: '',
    departureLocation: '',
    arrivalDate: '',
    arrivalLocation: ''
  });
  
  const [selectedVoyage, setSelectedVoyage] = useState('');
  const [availableArrivals, setAvailableArrivals] = useState([]);
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleDepartureDateChange = (e) => {
    const date = e.target.value;
    setFormData({
      name: formData.name,
      departureDate: date,
      departureLocation: '',
      arrivalDate: '',
      arrivalLocation: ''
    });
    setSelectedVoyage('');
    setAvailableArrivals([]);
    
    if (errors.departureDate) {
      setErrors(prev => ({ ...prev, departureDate: '' }));
    }
  };

  const handleDepartureLocationChange = (e) => {
    const location = e.target.value;
    
    // Find which voyage this location belongs to
    const voyages = getVoyagesForDate(formData.departureDate);
    const selectedVoyageData = voyages.find(v => v.location === location);
    
    if (selectedVoyageData) {
      setFormData(prev => ({
        ...prev,
        departureLocation: location,
        arrivalDate: '',
        arrivalLocation: ''
      }));
      setSelectedVoyage(selectedVoyageData.voyage);
      
      // Get future stops for this voyage
      const futureStops = getFutureStops(formData.departureDate, selectedVoyageData.voyage);
      setAvailableArrivals(futureStops);
    }
    
    if (errors.departureLocation) {
      setErrors(prev => ({ ...prev, departureLocation: '' }));
    }
  };

  const handleArrivalDateChange = (e) => {
    const dateLocation = e.target.value;
    const [date, location] = dateLocation.split('|');
    
    setFormData(prev => ({
      ...prev,
      arrivalDate: date,
      arrivalLocation: location
    }));
    
    if (errors.arrivalDate) {
      setErrors(prev => ({ ...prev, arrivalDate: '' }));
    }
  };

  const calculateCost = () => {
    if (!formData.departureDate || !formData.arrivalDate) return 0;
    
    const departure = new Date(formData.departureDate);
    const arrival = new Date(formData.arrivalDate);
    const nights = Math.ceil((arrival - departure) / (1000 * 60 * 60 * 24));
    
    return nights * 249.99;
  };

  const validateBooking = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    }
    
    if (!formData.departureLocation) {
      newErrors.departureLocation = 'Departure location is required';
    }
    
    if (!formData.arrivalDate) {
      newErrors.arrivalDate = 'Arrival date is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateBooking();
    
    if (Object.keys(newErrors).length === 0) {
      onBookingComplete({
        ...formData,
        voyage: selectedVoyage,
        cost: calculateCost(),
        bookedAt: new Date().toISOString()
      });
      
      // Reset form
      setFormData({
        name: '',
        departureDate: '',
        departureLocation: '',
        arrivalDate: '',
        arrivalLocation: ''
      });
      setSelectedVoyage('');
      setAvailableArrivals([]);
      
      alert('Trip booked successfully!');
    } else {
      setErrors(newErrors);
    }
  };

  const departureVoyages = formData.departureDate ? getVoyagesForDate(formData.departureDate) : [];
  const cost = calculateCost();
  const nights = formData.departureDate && formData.arrivalDate
    ? Math.ceil((new Date(formData.arrivalDate) - new Date(formData.departureDate)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0891b2' }}>
            Book Your Voyage
          </h1>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>
            Select your departure and arrival to set sail
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              marginBottom: '8px',
              color: '#374151'
            }}>
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.name ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {errors.name && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Departure Date */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              marginBottom: '8px',
              color: '#374151'
            }}>
              Departure Date *
            </label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={handleDepartureDateChange}
              min="2026-01-01"
              max="2028-01-01"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.departureDate ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            {errors.departureDate && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                {errors.departureDate}
              </p>
            )}
          </div>

          {/* Departure Location */}
          {formData.departureDate && departureVoyages.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                Departure Location * 
                <span style={{ color: '#6b7280', fontWeight: 'normal', fontSize: '12px' }}>
                  ({departureVoyages.length} ports available)
                </span>
              </label>
              <select
                value={formData.departureLocation}
                onChange={handleDepartureLocationChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.departureLocation ? '2px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select departure port</option>
                {departureVoyages.map((voyage, idx) => (
                  <option key={idx} value={voyage.location}>
                    {voyage.location} ({voyage.voyage})
                  </option>
                ))}
              </select>
              {errors.departureLocation && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {errors.departureLocation}
                </p>
              )}
            </div>
          )}

          {formData.departureDate && departureVoyages.length === 0 && (
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#fef3c7', 
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <p style={{ color: '#92400e', fontSize: '14px' }}>
                No ships are docked on this date. Please select a different date.
              </p>
            </div>
          )}

          {/* Arrival Date */}
          {selectedVoyage && availableArrivals.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                Arrival Date & Location *
                <span style={{ color: '#6b7280', fontWeight: 'normal', fontSize: '12px' }}>
                  ({selectedVoyage})
                </span>
              </label>
              <select
                value={formData.arrivalDate ? `${formData.arrivalDate}|${formData.arrivalLocation}` : ''}
                onChange={handleArrivalDateChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.arrivalDate ? '2px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select arrival port</option>
                {availableArrivals.map((stop, idx) => (
                  <option key={idx} value={`${stop.date}|${stop.location}`}>
                    {stop.date} - {stop.location}
                  </option>
                ))}
              </select>
              {errors.arrivalDate && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {errors.arrivalDate}
                </p>
              )}
            </div>
          )}

          {/* Cost Display */}
          {cost > 0 && (
            <div style={{ 
              marginBottom: '24px',
              padding: '24px',
              background: 'linear-gradient(to right, #ecfeff, #dbeafe)',
              borderRadius: '12px',
              border: '2px solid #06b6d4'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                    Total Cost
                  </p>
                  <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#0891b2' }}>
                    ${cost.toFixed(2)}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                    {nights} night{nights !== 1 ? 's' : ''} at $249.99/night
                  </p>
                </div>
                <div style={{ fontSize: '48px' }}>💰</div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!cost}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: cost ? '#0891b2' : '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: cost ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (cost) e.target.style.backgroundColor = '#0e7490';
            }}
            onMouseOut={(e) => {
              if (cost) e.target.style.backgroundColor = '#0891b2';
            }}
          >
            {cost ? 'Book Trip' : 'Complete all fields to book'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TripBooking;