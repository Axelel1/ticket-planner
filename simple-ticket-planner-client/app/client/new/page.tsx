
import CreateForm from '../create-form';

export default async function UsersPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Form Container */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Add New User</h1>
          </div>
          <CreateForm />
        </div>
      </div>
    </div>
  );
}