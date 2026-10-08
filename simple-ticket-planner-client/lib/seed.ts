import pool from "@/lib/db";
import { users, routes, stops, fares, vehicles, drivers, schedules } from "@/lib/placeholder-data";

async function seedUsers() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('passenger', 'admin') NOT NULL DEFAULT 'passenger',
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  for (const u of users) {
    await pool.query(
      `INSERT IGNORE INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, ?)`,
      [u.name, u.email, u.password, u.phone, u.role],
    );
  }
}

async function seedRoutes() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS routes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(50) NOT NULL UNIQUE,
      origin VARCHAR(100) NOT NULL,
      destination VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const ids: number[] = [];
  for (const r of routes) {
    await pool.query(
      `INSERT IGNORE INTO routes (code, origin, destination) VALUES (?, ?, ?)`,
      [r.code, r.origin, r.destination],
    );
    const [rows] = await pool.query(`SELECT id FROM routes WHERE code = ?`, [r.code]);
    ids.push((rows as { id: number }[])[0].id);
  }
  return ids;
}

async function seedStops(routeIds: number[]) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS stops (
      id INT AUTO_INCREMENT PRIMARY KEY,
      route_id INT NOT NULL,
      name VARCHAR(150) NOT NULL,
      sequence INT NOT NULL,
      lat DECIMAL(9,6),
      lng DECIMAL(9,6),
      zone VARCHAR(50),
      distance_km DECIMAL(6,2),
      travel_time_min INT,
      UNIQUE KEY unique_route_sequence (route_id, sequence),
      FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
    )
  `);

  const ids: number[] = [];
  for (const s of stops) {
    const routeId = routeIds[s.routeIndex];
    await pool.query(
      `INSERT IGNORE INTO stops (route_id, name, sequence, lat, lng, zone, distance_km, travel_time_min)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [routeId, s.name, s.sequence, s.lat, s.lng, s.zone, s.distance_km, s.travel_time_min],
    );
    const [rows] = await pool.query(
      `SELECT id FROM stops WHERE route_id = ? AND sequence = ?`,
      [routeId, s.sequence],
    );
    ids.push((rows as { id: number }[])[0].id);
  }
  return ids;
}

async function seedFares(routeIds: number[], stopIds: number[]) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS fares (
      id INT AUTO_INCREMENT PRIMARY KEY,
      route_id INT NOT NULL,
      from_stop_id INT NOT NULL,
      to_stop_id INT NOT NULL,
      price DECIMAL(8,2) NOT NULL,
      UNIQUE KEY unique_fare (route_id, from_stop_id, to_stop_id),
      FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
      FOREIGN KEY (from_stop_id) REFERENCES stops(id) ON DELETE CASCADE,
      FOREIGN KEY (to_stop_id) REFERENCES stops(id) ON DELETE CASCADE
    )
  `);

  for (const f of fares) {
    await pool.query(
      `INSERT IGNORE INTO fares (route_id, from_stop_id, to_stop_id, price) VALUES (?, ?, ?, ?)`,
      [routeIds[0], stopIds[f.fromIndex], stopIds[f.toIndex], f.price],
    );
  }
}

async function seedVehicles() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      plate_number VARCHAR(20) NOT NULL UNIQUE,
      type VARCHAR(50) NOT NULL,
      capacity INT NOT NULL
    )
  `);

  const ids: number[] = [];
  for (const v of vehicles) {
    await pool.query(
      `INSERT IGNORE INTO vehicles (plate_number, type, capacity) VALUES (?, ?, ?)`,
      [v.plate_number, v.type, v.capacity],
    );
    // Look up the real id regardless of whether this row was just inserted or already existed
    const [rows] = await pool.query(
      `SELECT id FROM vehicles WHERE plate_number = ?`,
      [v.plate_number],
    );
    ids.push((rows as { id: number }[])[0].id);
  }
  return ids;
}

async function seedDrivers() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS drivers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      license_no VARCHAR(50) NOT NULL UNIQUE
    )
  `);

  const ids: number[] = [];
  for (const d of drivers) {
    await pool.query(
      `INSERT IGNORE INTO drivers (name, license_no) VALUES (?, ?)`,
      [d.name, d.license_no],
    );
    const [rows] = await pool.query(
      `SELECT id FROM drivers WHERE license_no = ?`,
      [d.license_no],
    );
    ids.push((rows as { id: number }[])[0].id);
  }
  return ids;
}

async function seedSchedules(routeIds: number[], vehicleIds: number[], driverIds: number[]) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schedules (
      id INT AUTO_INCREMENT PRIMARY KEY,
      route_id INT NOT NULL,
      vehicle_id INT NOT NULL,
      driver_id INT NOT NULL,
      departure_time TIME NOT NULL,
      recurrence_rule VARCHAR(50) NOT NULL,
      recurrence_days VARCHAR(50),
      effective_from DATE NOT NULL,
      effective_to DATE NOT NULL,
      buffer_minutes INT DEFAULT 0,
      FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
      FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
      FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
    )
  `);
  for (const s of schedules) {
    await pool.query(
      `INSERT INTO schedules (route_id, vehicle_id, driver_id, departure_time, recurrence_rule, recurrence_days, effective_from, effective_to, buffer_minutes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        routeIds[s.routeIndex],
        vehicleIds[s.vehicleIndex],
        driverIds[s.driverIndex],
        s.departure_time,
        s.recurrence_rule,
        s.recurrence_days,
        s.effective_from,
        s.effective_to,
        s.buffer_minutes,
      ],
    );
  }
}

async function seedBlockoutDates() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blockout_dates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      schedule_id INT NOT NULL,
      blocked_date DATE NOT NULL,
      FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
    )
  `);
}

async function seedTrips() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS trips (
      id INT AUTO_INCREMENT PRIMARY KEY,
      schedule_id INT NOT NULL,
      trip_date DATE NOT NULL,
      status ENUM('on-time', 'delayed', 'cancelled') NOT NULL DEFAULT 'on-time',
      delay_minutes INT DEFAULT 0,
      actual_departure TIME,
      FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
    )
  `);
}

async function seedBookings() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      trip_id INT NOT NULL,
      user_id INT,
      passenger_name VARCHAR(150) NOT NULL,
      contact VARCHAR(100) NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      status ENUM('confirmed', 'cancelled', 'refunded') NOT NULL DEFAULT 'confirmed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);
}

async function seedBookingSeats() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS booking_seats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      booking_id INT NOT NULL,
      seat_number VARCHAR(10) NOT NULL,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
    )
  `);
}

async function seedTickets() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      booking_id INT NOT NULL UNIQUE,
      qr_code VARCHAR(255) NOT NULL,
      issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
    )
  `);
}

async function seedTransactions() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      booking_id INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      method VARCHAR(50) NOT NULL,
      status ENUM('paid', 'refunded', 'failed') NOT NULL DEFAULT 'paid',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
    )
  `);
}

export async function seedDatabase() {
  await seedUsers();

  const routeIds = await seedRoutes();
  const stopIds = await seedStops(routeIds);
  await seedFares(routeIds, stopIds);

  const vehicleIds = await seedVehicles();
  const driverIds = await seedDrivers();
  await seedSchedules(routeIds, vehicleIds, driverIds);
  await seedBlockoutDates();

  await seedTrips();
  await seedBookings();
  await seedBookingSeats();
  await seedTickets();
  await seedTransactions();

  return { message: "Database seeded successfully" };
}