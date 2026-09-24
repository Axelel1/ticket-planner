"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "passenger" | "admin";
  phone: string | null;
  created_at: string;
};

export async function getUsers(): Promise<User[]> {
  const [rows] = await pool.query(
    "SELECT id, name, email, role, phone, created_at FROM users ORDER BY created_at DESC",
  );
  return rows as User[];
}

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string; // TODO: hash before storing — placeholder only

  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required.");
  }

  await pool.query(
    "INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, 'passenger')",
    [name, email, password, phone || null],
  );

  revalidatePath("/client/users");
  redirect("/client/users");
}