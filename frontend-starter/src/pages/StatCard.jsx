export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">
          {value}
        </p>
      </div>

      {icon && (
        <div className="text-indigo-600 text-3xl">
          {icon}
        </div>
      )}
    </div>
  );
}
