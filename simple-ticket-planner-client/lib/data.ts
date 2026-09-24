import type { Route, ScheduleWithRoute, Vehicle, Driver } from "@/lib/definition";
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