export type Route = {
  id: number;
  code: string;
  origin: string;
  destination: string;
  created_at: string;
};

export type Stop = {
  id: number;
  route_id: number;
  name: string;
  sequence: number;
  lat: number | null;
  lng: number | null;
  zone: string | null;
  distance_km: number | null;
  travel_time_min: number | null;
};

export type Fare = {
  id: number;
  route_id: number;
  from_stop_id: number;
  to_stop_id: number;
  price: number;
};

export type Vehicle = {
  id: number;
  plate_number: string;
  type: string;
  capacity: number;
};

export type Driver = {
  id: number;
  name: string;
  license_no: string;
};

export type Schedule = {
  id: number;
  route_id: number;
  vehicle_id: number;
  driver_id: number;
  departure_time: string;
  recurrence_rule: "daily" | "weekdays" | "custom-days" | "specific-dates";
  recurrence_days: string | null;
  effective_from: string;
  effective_to: string;
  buffer_minutes: number;
};

// Joined shape used by the Schedules table UI
export type ScheduleWithRoute = Schedule & {
  route_label: string;
  vehicle_label: string;
};

export type BlockoutDate = {
  id: number;
  schedule_id: number;
  blocked_date: string;
};

export type Trip = {
  id: number;
  schedule_id: number;
  trip_date: string;
  status: "on-time" | "delayed" | "cancelled";
  delay_minutes: number;
  actual_departure: string | null;
};

export type Booking = {
  id: number;
  trip_id: number;
  user_id: number | null;
  passenger_name: string;
  contact: string;
  total_amount: number;
  status: "confirmed" | "cancelled" | "refunded";
  created_at: string;
};

export type BookingSeat = {
  id: number;
  booking_id: number;
  seat_number: string;
};

export type Ticket = {
  id: number;
  booking_id: number;
  qr_code: string;
  issued_at: string;
};

export type Transaction = {
  id: number;
  booking_id: number;
  amount: number;
  method: string;
  status: "paid" | "refunded" | "failed";
  created_at: string;
};