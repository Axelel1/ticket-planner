const users = [
  { name: "Juan Dela Cruz", email: "juan@email.com", password: "password123", phone: "0917 123 4567", role: "passenger" },
  { name: "Maria Santos", email: "maria@email.com", password: "password123", phone: "0918 234 5678", role: "passenger" },
  { name: "Admin User", email: "admin@simpleticket.com", password: "adminpass", phone: null, role: "admin" },
];

const routes = [
  { code: "Route 101 – Northbound", origin: "Manila", destination: "Baguio" },
  { code: "Route 202", origin: "Cebu", destination: "Dumaguete" },
  { code: "Route 303", origin: "Davao", destination: "Cagayan de Oro" },
];

// stops reference routes by array index (0, 1, 2) — resolved to real route_id during seeding
const stops = [
  { routeIndex: 0, name: "Manila (Pasay Terminal)", sequence: 1, lat: 14.5378, lng: 120.9896, zone: "Zone 1", distance_km: null, travel_time_min: null },
  { routeIndex: 0, name: "Tarlac City Terminal", sequence: 2, lat: 15.4802, lng: 120.5979, zone: "Zone 2", distance_km: 125, travel_time_min: 120 },
  { routeIndex: 0, name: "Rosario, La Union", sequence: 3, lat: 16.3389, lng: 120.3461, zone: "Zone 3", distance_km: 95, travel_time_min: 90 },
  { routeIndex: 0, name: "Baguio (Governor Pack Rd. Terminal)", sequence: 4, lat: 16.4145, lng: 120.596, zone: "Zone 4", distance_km: 26, travel_time_min: 45 },
];

const vehicles = [
  { plate_number: "NBC-1234", type: "Bus", capacity: 45 },
  { plate_number: "NBC-5678", type: "Bus", capacity: 32 },
  { plate_number: "NBC-9012", type: "Van", capacity: 15 },
];

const drivers = [
  { name: "Pedro Santos", license_no: "N01-23-456789" },
  { name: "Ana Reyes", license_no: "N02-34-567890" },
];

// schedules reference routes/vehicles/drivers by array index — resolved during seeding
const schedules = [
  {
    routeIndex: 0,
    vehicleIndex: 0,
    driverIndex: 0,
    departure_time: "06:00:00",
    recurrence_rule: "custom-days",
    recurrence_days: "Mon,Wed,Fri",
    effective_from: "2026-06-01",
    effective_to: "2026-08-31",
    buffer_minutes: 20,
  },
  {
    routeIndex: 1,
    vehicleIndex: 1,
    driverIndex: 1,
    departure_time: "07:30:00",
    recurrence_rule: "daily",
    recurrence_days: null,
    effective_from: "2026-06-01",
    effective_to: "2026-12-31",
    buffer_minutes: 15,
  },
];

  // fares reference stops by index into the `stops` array above (currently route 0 only)
  const fares = [
    { fromIndex: 0, toIndex: 1, price: 150 },
    { fromIndex: 0, toIndex: 2, price: 280 },
    { fromIndex: 0, toIndex: 3, price: 480 },
    { fromIndex: 1, toIndex: 2, price: 180 },
    { fromIndex: 1, toIndex: 3, price: 350 },
    { fromIndex: 2, toIndex: 3, price: 150 },

  ];

export { users, routes, stops, fares, vehicles, drivers, schedules };