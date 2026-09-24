import { query } from "@/lib/db";

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UserPage() {
   let users: User[] = [];

   try {
        users = await query<User[]>('SELECT id, name, email FROM user ORDER BY id DESC');
        console.log('Loaded users:', users);
    } catch (err) {
        console.error('Failed to load users', err);
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-transit-navy mb-4">Users</h1>
            <table className="min-w-full border border-slate-200 bg-white shadow-sm">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-slate-500">Email</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 text-sm text-slate-500">{user.name}</td>
                            <td className="px-4 py-2 text-sm text-slate-500">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}