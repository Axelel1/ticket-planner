import type { Route, ScheduleWithRoute, Vehicle, Driver } from "@/lib/definitions";
import pool from "./db";

export async function fetchRoutes(): Promise<Route[]> {
  const [rows] = await pool.query("SELECT * FROM routes ORDER BY created_at DESC");
  return rows as Route[];
}

export async function fetchSchedules(): Promise<ScheduleWithRoute[]> {
  const [rows] = await pool.query(`
    SELECT
      s.*,
      CONCAT(r.origin, ' → ', r.destination) AS route_label,
      CONCAT(v.type, ' #', v.id, ' — ', v.capacity, ' seats') AS vehicle_label
    FROM schedules s
    JOIN routes r ON s.route_id = r.id
    JOIN vehicles v ON s.vehicle_id = v.id
    ORDER BY s.departure_time
  `);
  return rows as ScheduleWithRoute[];
}

export async function fetchVehicles(): Promise<Vehicle[]> {
  const [rows] = await pool.query("SELECT * FROM vehicles");
  return rows as Vehicle[];
}

export async function fetchDrivers(): Promise<Driver[]> {
  const [rows] = await pool.query("SELECT * FROM drivers");
  return rows as Driver[];
}

export type TripDisplay = {
  id: number;
  origin: string;
  destination: string;
  departure_time: string;
  vehicle_label: string;
  capacity: number;
  total_time_min: number;
  price: number | null;
};

export async function fetchTripsForDisplay(): Promise<TripDisplay[]> {
  const [rows] = await pool.query(`
    SELECT
      s.id,
      r.origin,
      r.destination,
      s.departure_time,
      CONCAT(v.type, ' — ', v.plate_number) AS vehicle_label,
      v.capacity,
      COALESCE((SELECT SUM(st.travel_time_min) FROM stops st WHERE st.route_id = r.id), 0) AS total_time_min,
      (
        SELECT f.price FROM fares f
        JOIN stops s1 ON f.from_stop_id = s1.id AND s1.sequence = 1
        JOIN stops s2 ON f.to_stop_id = s2.id
        WHERE f.route_id = r.id
        ORDER BY s2.sequence DESC
        LIMIT 1
      ) AS price
    FROM schedules s
    JOIN routes r ON s.route_id = r.id
    JOIN vehicles v ON s.vehicle_id = v.id
    ORDER BY s.departure_time
  `);
  return rows as TripDisplay[];
}