import React from "react";

const AdminDashboard = () => {
  return (
    <div className="w-full max-w-6xl">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        <Card title="Total Users" value="1,240" />
        <Card title="Total Products" value="320" />
        <Card title="Orders" value="890" />
        <Card title="Revenue" value="₹1.2L" />

      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <div className="bg-gray-800 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

          <div className="space-y-3 text-sm">
            <OrderItem name="Order #1023" status="Delivered" />
            <OrderItem name="Order #1022" status="Pending" />
            <OrderItem name="Order #1021" status="Cancelled" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="flex flex-col gap-3">
            <button className="bg-cyan-500 text-black py-2 rounded-lg hover:opacity-90">
              + Add Product
            </button>
            <button className="bg-gray-700 py-2 rounded-lg hover:bg-gray-600">
              Manage Users
            </button>
            <button className="bg-gray-700 py-2 rounded-lg hover:bg-gray-600">
              View Orders
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;



// 🔹 Reusable Card Component
const Card = ({ title, value }) => (
  <div className="bg-gray-800 p-5 rounded-xl shadow">
    <p className="text-gray-400 text-sm">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);


// 🔹 Order Item Component
const OrderItem = ({ name, status }) => {
  const statusColor =
    status === "Delivered"
      ? "text-green-400"
      : status === "Pending"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="flex justify-between bg-gray-700 px-3 py-2 rounded-lg">
      <span>{name}</span>
      <span className={statusColor}>{status}</span>
    </div>
  );
};