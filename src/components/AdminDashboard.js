import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Mail, Phone, User, Briefcase, Trash2, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Unable to connect to server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setBookings(bookings.filter(booking => booking.id !== id));
          alert('Booking deleted successfully');
        } else {
          alert('Failed to delete booking');
        }
      } catch (err) {
        console.error('Error deleting booking:', err);
        alert('Unable to delete booking');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-black/80 backdrop-blur-lg shadow-lg border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/afiq-portfolio')}
              className="flex items-center gap-2 text-gray-300 hover:text-teal-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Portfolio</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-500/20 rounded-lg">
                  <Briefcase className="text-teal-400" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold">{bookings.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Calendar className="text-emerald-400" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">This Month</p>
                  <p className="text-3xl font-bold">
                    {bookings.filter(b => {
                      const date = new Date(b.created_at);
                      const now = new Date();
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <User className="text-purple-400" size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Latest Booking</p>
                  <p className="text-lg font-bold">
                    {bookings.length > 0 ? formatDate(bookings[0].created_at).split(',')[0] : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <h2 className="text-2xl font-bold">All Bookings</h2>
              <p className="text-gray-400 mt-1">Manage and view all service booking requests</p>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <RefreshCw className="animate-spin mx-auto mb-4 text-teal-400" size={40} />
                <p className="text-gray-400">Loading bookings...</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={fetchBookings}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-12 text-center">
                <Briefcase className="mx-auto mb-4 text-gray-600" size={40} />
                <p className="text-gray-400">No bookings yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50 border-b border-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Service</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Message</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">#{booking.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-500" />
                            <span className="font-medium">{booking.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Mail size={14} className="text-gray-500" />
                              <a href={`mailto:${booking.email}`} className="hover:text-teal-400">
                                {booking.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Phone size={14} className="text-gray-500" />
                              <a href={`tel:${booking.phone}`} className="hover:text-teal-400">
                                {booking.phone}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">
                            {booking.service}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 max-w-xs">
                          <div className="truncate" title={booking.message}>
                            {booking.message || 'No message'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {formatDate(booking.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete booking"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
