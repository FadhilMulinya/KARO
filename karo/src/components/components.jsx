import { useState } from 'react'
import { Bell, CreditCard, FileText, Home, LogOut, School, Settings, User, UserPlus, DollarSign, BarChart, CreditCard as PaymentIcon, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Component() {
  const [dashboardType, setDashboardType] = useState('school')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New payment received", read: false },
    { id: 2, message: "Upcoming fee deadline", read: false },
  ])

  const toggleDashboard = () => {
    setDashboardType(dashboardType === 'student' ? 'school' : 'student')
    setActiveSection('dashboard')
  }

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">EduPay</h1>
        </div>
        <nav className="mt-8">
          <Link
            href="#dashboard"
            className={`flex items-center px-4 py-2 text-gray-700 ${
              activeSection === 'dashboard' ? 'bg-primary text-white' : ''
            }`}
            onClick={() => setActiveSection('dashboard')}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#invoices"
            className={`flex items-center px-4 py-2 text-gray-700 ${
              activeSection === 'invoices' ? 'bg-primary text-white' : ''
            }`}
            onClick={() => setActiveSection('invoices')}
          >
            <FileText className="mr-2 h-5 w-5" />
            Invoices
          </Link>
          <Link
            href="#payment"
            className={`flex items-center px-4 py-2 text-gray-700 ${
              activeSection === 'payment' ? 'bg-primary text-white' : ''
            }`}
            onClick={() => setActiveSection('payment')}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Payment
          </Link>
          {dashboardType === 'school' && (
            <>
              <Link
                href="#management"
                className={`flex items-center px-4 py-2 text-gray-700 ${
                  activeSection === 'management' ? 'bg-primary text-white' : ''
                }`}
                onClick={() => setActiveSection('management')}
              >
                <Settings className="mr-2 h-5 w-5" />
                Management
              </Link>
              <Link
                href="#register-student"
                className={`flex items-center px-4 py-2 text-gray-700 ${
                  activeSection === 'register-student' ? 'bg-primary text-white' : ''
                }`}
                onClick={() => setActiveSection('register-student')}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Register Student
              </Link>
              <Link
                href="#fee-check"
                className={`flex items-center px-4 py-2 text-gray-700 ${
                  activeSection === 'fee-check' ? 'bg-primary text-white' : ''
                }`}
                onClick={() => setActiveSection('fee-check')}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Check Fees
              </Link>
              <Link
                href="#reports"
                className={`flex items-center px-4 py-2 text-gray-700 ${
                  activeSection === 'reports' ? 'bg-primary text-white' : ''
                }`}
                onClick={() => setActiveSection('reports')}
              >
                <BarChart className="mr-2 h-5 w-5" />
                Reports
              </Link>
              <Link
                href="#payment-methods"
                className={`flex items-center px-4 py-2 text-gray-700 ${
                  activeSection === 'payment-methods' ? 'bg-primary text-white' : ''
                }`}
                onClick={() => setActiveSection('payment-methods')}
              >
                <PaymentIcon className="mr-2 h-5 w-5" />
                Payment Methods
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setActiveSection('notifications')}>
                  <Bell className="h-6 w-6" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                  )}
                </button>
              </div>
              <button
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                onClick={toggleDashboard}
              >
                {dashboardType === 'student' ? (
                  <User className="mr-2 h-5 w-5" />
                ) : (
                  <School className="mr-2 h-5 w-5" />
                )}
                {dashboardType === 'student' ? 'Student' : 'School'}
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeSection === 'dashboard' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dashboardType === 'student' ? (
                <>
                  <DashboardCard title="Current Fees" value="$1,500" />
                  <DashboardCard title="Due Date" value="May 31, 2023" />
                  <DashboardCard title="Notifications" value="2 New" />
                </>
              ) : (
                <>
                  <DashboardCard title="Total Fees Collected" value="$150,000" />
                  <DashboardCard title="Outstanding Payments" value="$25,000" />
                  <DashboardCard title="Active Students" value="500" />
                </>
              )}
            </div>
          )}

          {activeSection === 'invoices' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Invoice Management</h3>
              <p>View and download your invoices here.</p>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">School Fee Payment</h3>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
                Make Payment
              </button>
            </div>
          )}

          {activeSection === 'management' && dashboardType === 'school' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">School Management Dashboard</h3>
              <p>Access administrative tools and insights here.</p>
            </div>
          )}

          {activeSection === 'register-student' && dashboardType === 'school' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Register New Student</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700">
                    Student Email
                  </label>
                  <input
                    type="email"
                    id="studentEmail"
                    name="studentEmail"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="studentClass" className="block text-sm font-medium text-gray-700">
                    Class
                  </label>
                  <select
                    id="studentClass"
                    name="studentClass"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  >
                    <option>Select a class</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Register Student
                </button>
              </form>
            </div>
          )}

          {activeSection === 'fee-check' && dashboardType === 'school' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Check Student Fees</h3>
              <div className="mb-4">
                <label htmlFor="studentSearch" className="block text-sm font-medium text-gray-700">
                  Search Student
                </label>
                <input
                  type="text"
                  id="studentSearch"
                  name="studentSearch"
                  placeholder="Enter student name or ID"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fees Paid
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Outstanding
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap">STU001</td>
                    <td className="px-6 py-4 whitespace-nowrap">$1,000</td>
                    <td className="px-6 py-4 whitespace-nowrap">$500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap">STU002</td>
                    <td className="px-6 py-4 whitespace-nowrap">$1,500</td>
                    <td className="px-6 py-4 whitespace-nowrap">$0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'reports' && dashboardType === 'school' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Financial Reports</h3>
              <div className="space-y-4">
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 w-full">
                  Generate Monthly Report
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 w-full">
                  Generate Yearly Report
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 w-full">
                  Export Data to CSV
                </button>
              </div>
            </div>
          )}

          {activeSection === 'payment-methods' && dashboardType === 'school' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Manage Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    <span>Credit Card</span>
                  </div>
                  <button className="text-primary hover:text-primary/80">Edit</button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span>Bank Transfer</span>
                  </div>
                  <button className="text-primary hover:text-primary/80">Edit</button>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 w-full">
                  Add New Payment Method
                </button>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className={`p-4 border rounded ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                    <div className="flex items-center justify-between">
                      <span>{notification.message}</span>
                      {!notification.read && (
                        <button 
                          onClick={() => markNotificationAsRead(notification.id)}
                          className="text-sm text-primary hover:text-primary/80"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-primary">{value}</p>
    </div>
  )
}