import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const UDashboard = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="w-full max-w-5xl">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {auth?.user?.name} 
        </h1>
        <p className="text-gray-400 text-sm">
          Manage your account and track your orders
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-lg font-semibold mb-4">Profile Info</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p><span className="text-gray-400">Name:</span> {auth?.user?.name}</p>
          <p><span className="text-gray-400">Email:</span> {auth?.user?.email}</p>
          <p><span className="text-gray-400">Role:</span> {auth?.user?.role}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card title="Orders" value="12" />
        <Card title="Wishlist" value="5" />
        <Card title="Cart Items" value="3" />
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

        <div className="space-y-3 text-sm">
          <OrderItem name="Order #2451" status="Delivered" />
          <OrderItem name="Order #2448" status="Pending" />
          <OrderItem name="Order #2445" status="Cancelled" />
        </div>
      </div>

    </div>
  );
};

export default UDashboard;



// 🔹 Card Component
const Card = ({ title, value }) => (
  <div className="bg-gray-800 p-5 rounded-xl">
    <p className="text-gray-400 text-sm">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);


// 🔹 Order Item
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