// Ship Keep Co Cruise Line Timetable
// 4 voyages: Americas A, Americas B, Europe A, Europe B
// Blank entries mean the ship is at sea (not available for boarding/disembarking)

export const TIMETABLE = {
  "2026-01-01": { "Americas A": "New York City", "Americas B": "Halifax, NS", "Europe A": "Southampton, UK", "Europe B": "Lisbon, Portugal" },
  "2026-01-02": { "Americas A": "Wilmington, NC", "Americas B": "", "Europe A": "Cherbourg, France", "Europe B": "Cobh, Ireland" },
  "2026-01-03": { "Americas A": "Miami", "Americas B": "Bar Harbor, ME", "Europe A": "Bilbao, Spain", "Europe B": "Galway, Ireland" },
  "2026-01-04": { "Americas A": "Cancun", "Americas B": "Portland, ME", "Europe A": "", "Europe B": "" },
  "2026-01-05": { "Americas A": "Montego Bay", "Americas B": "", "Europe A": "Casablanca, Morocco", "Europe B": "Bergen, Norway" },
  "2026-01-06": { "Americas A": "Parrot Bay", "Americas B": "New York City", "Europe A": "Santa Cruz de Tenerife, Spain", "Europe B": "Bergen, Norway" },
  "2026-01-07": { "Americas A": "Tuckers Town, Bermuda", "Americas B": "New York City", "Europe A": "", "Europe B": "" },
  "2026-01-08": { "Americas A": "Wilmington, NC", "Americas B": "", "Europe A": "Edinburgh, Scotland", "Europe B": "" },
  "2026-01-09": { "Americas A": "Atlantic City", "Americas B": "Miami", "Europe A": "Ponta Delgada, Portugal", "Europe B": "" },
  "2026-01-10": { "Americas A": "", "Americas B": "Cancun", "Europe A": "Lisbon, Portugal", "Europe B": "Amsterdam, Netherlands" },
  "2026-01-11": { "Americas A": "Halifax, NS", "Americas B": "Montego Bay", "Europe A": "Cobh, Ireland", "Europe B": "Southampton, UK" },
  "2026-01-12": { "Americas A": "", "Americas B": "Parrot Bay", "Europe A": "Galway, Ireland", "Europe B": "Southampton, UK" },
  "2026-01-13": { "Americas A": "Bar Harbor, ME", "Americas B": "Tuckers Town, Bermuda", "Europe A": "Cherbourg, France", "Europe B": "" },
  "2026-01-14": { "Americas A": "Portland, ME", "Americas B": "", "Europe A": "Bergen, Norway", "Europe B": "Bilbao, Spain" },
  "2026-01-15": { "Americas A": "Atlantic City", "Americas B": "", "Europe A": "Bergen, Norway", "Europe B": "" },
  "2026-01-16": { "Americas A": "New York City", "Americas B": "", "Europe A": "Casablanca, Morocco", "Europe B": "" },
  "2026-01-17": { "Americas A": "New York City", "Americas B": "Halifax, NS", "Europe A": "Edinburgh, Scotland", "Europe B": "Santa Cruz de Tenerife, Spain" },
  "2026-01-18": { "Americas A": "Wilmington, NC", "Americas B": "", "Europe A": "", "Europe B": "" },
  "2026-01-19": { "Americas A": "Miami", "Americas B": "Bar Harbor, ME", "Europe A": "Amsterdam, Netherlands", "Europe B": "" },
  "2026-01-20": { "Americas A": "Cancun", "Americas B": "Portland, ME", "Europe A": "Southampton, UK", "Europe B": "Ponta Delgada, Portugal" },
  "2026-01-21": { "Americas A": "Montego Bay", "Americas B": "", "Europe A": "Southampton, UK", "Europe B": "Lisbon, Portugal" },
  "2026-01-22": { "Americas A": "Parrot Bay", "Americas B": "New York City", "Europe A": "Cherbourg, France", "Europe B": "Cobh, Ireland" },
  "2026-01-23": { "Americas A": "Tuckers Town, Bermuda", "Americas B": "New York City", "Europe A": "Bilbao, Spain", "Europe B": "Galway, Ireland" },
  "2026-01-24": { "Americas A": "Wilmington, NC", "Americas B": "", "Europe A": "", "Europe B": "" },
  "2026-01-25": { "Americas A": "Atlantic City", "Americas B": "Miami", "Europe A": "Casablanca, Morocco", "Europe B": "Bergen, Norway" },
  "2026-01-26": { "Americas A": "", "Americas B": "Cancun", "Europe A": "Santa Cruz de Tenerife, Spain", "Europe B": "Bergen, Norway" },
  "2026-01-27": { "Americas A": "Halifax, NS", "Americas B": "Montego Bay", "Europe A": "", "Europe B": "" },
  "2026-01-28": { "Americas A": "", "Americas B": "Parrot Bay", "Europe A": "Edinburgh, Scotland", "Europe B": "" },
  "2026-01-29": { "Americas A": "Bar Harbor, ME", "Americas B": "Tuckers Town, Bermuda", "Europe A": "Ponta Delgada, Portugal", "Europe B": "" },
  "2026-01-30": { "Americas A": "Portland, ME", "Americas B": "", "Europe A": "Lisbon, Portugal", "Europe B": "Amsterdam, Netherlands" },
  "2026-01-31": { "Americas A": "Atlantic City", "Americas B": "", "Europe A": "Cobh, Ireland", "Europe B": "Southampton, UK" }
};

// Helper function to get all available dates
export const getAllDates = () => {
  return Object.keys(TIMETABLE).sort();
};

// Helper function to get voyages available on a specific date
// Returns array of {voyage, location} objects for non-empty locations
export const getVoyagesForDate = (date) => {
  const dayData = TIMETABLE[date];
  if (!dayData) return [];
  
  return Object.entries(dayData)
    .filter(([_, location]) => location !== "")
    .map(([voyage, location]) => ({ voyage, location }));
};

// Helper function to get future stops on a specific voyage
// Used to populate arrival location options
export const getFutureStops = (startDate, voyage) => {
  const allDates = getAllDates();
  const startIndex = allDates.indexOf(startDate);
  
  if (startIndex === -1) return [];
  
  return allDates
    .slice(startIndex + 1) // Only dates after departure
    .filter(date => {
      const location = TIMETABLE[date][voyage];
      return location && location !== ""; // Only include actual ports, not at-sea days
    })
    .map(date => ({
      date,
      location: TIMETABLE[date][voyage]
    }));
};

// Helper function to validate a voyage route
export const isValidRoute = (departureDate, arrivalDate, voyage) => {
  if (!departureDate || !arrivalDate || !voyage) return false;
  if (departureDate >= arrivalDate) return false;
  
  const futureStops = getFutureStops(departureDate, voyage);
  return futureStops.some(stop => stop.date === arrivalDate);
};

// Helper function to calculate trip cost
export const calculateTripCost = (departureDate, arrivalDate) => {
  if (!departureDate || !arrivalDate) return 0;
  
  const departure = new Date(departureDate);
  const arrival = new Date(arrivalDate);
  const nights = Math.ceil((arrival - departure) / (1000 * 60 * 60 * 24));
  
  return nights * 249.99; // $249.99 per night
};

export default TIMETABLE;