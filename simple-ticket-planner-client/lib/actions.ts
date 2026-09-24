'use server';

import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (name && email) {
    await query('INSERT INTO user (name, email) VALUES (?, ?)', [name, email]);
    revalidatePath('client/users');
    redirect('users');

  }
}

export async function updateUser(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (id && name && email) {
    await query('UPDATE user SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    revalidatePath('client/users');
    redirect('/users');
  }
}