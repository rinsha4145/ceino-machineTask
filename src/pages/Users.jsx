import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import { Edit, Trash2, Users } from 'lucide-react';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) setUsers(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAdd = () => {
    setEditIndex(null);
    setOpen(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  };

  const handleSubmit = (values) => {
    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = values;
      setUsers(updated);
    } else {
      setUsers([...users, values]);
    }
    setOpen(false);
    setEditIndex(null);
  };
  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'user':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
      
      <button
        onClick={handleAdd}
        className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
      >
        + Add User
      </button>

      {/* User List */}
     <div className="w-11/12 max-w-6xl">
      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {users.length > 0 ? (
          <>
            {/* Table Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center font-semibold text-gray-700">
                <div className="col-span-3">
                  <span className="text-sm uppercase tracking-wider">Name</span>
                </div>
                <div className="col-span-3">
                  <span className="text-sm uppercase tracking-wider">Email</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm uppercase tracking-wider">Phone</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm uppercase tracking-wider">Role</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm uppercase tracking-wider text-center">Actions</span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <div 
                  key={index} 
                  className="px-6 py-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Name */}
                    <div className="col-span-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                          {user.name?.split(' ').map(n => n[0]).join('') || '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-3">
                      <p className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="col-span-2">
                      <p className="text-gray-600 font-mono text-sm">
                        {user.phone}
                      </p>
                    </div>

                    {/* Role */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="p-2.5 bg-amber-500 hover:bg-amber-600 rounded-xl shadow-lg hover:shadow-xl text-white transition-all duration-200 transform hover:-translate-y-0.5 group-hover:scale-105"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl shadow-lg hover:shadow-xl text-white transition-all duration-200 transform hover:-translate-y-0.5 group-hover:scale-105"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              Add some users to get started!
            </p>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                    {user.name?.split(' ').map(n => n[0]).join('') || '?'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 bg-amber-500 hover:bg-amber-600 rounded-lg shadow text-white transition-colors duration-200"
                    title="Edit User"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 bg-red-500 hover:bg-red-600 rounded-lg shadow text-white transition-colors duration-200"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                  <p className="text-gray-800 break-all">{user.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</label>
                  <p className="text-gray-800 font-mono text-sm">{user.phone}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Mobile Empty State */
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 text-center py-12 px-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600 text-sm">
              Add some users to get started!
            </p>
          </div>
        )}
      </div>
    </div>

      {/* Popup user  Form */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <UserForm
              initialValues={
                editIndex !== null
                  ? users[editIndex]
                  : { name: "", email: "", phone: "", role: "" }
              }
              onSubmit={handleSubmit}
              onCancel={() => setOpen(false)}
              isEdit={editIndex !== null}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
