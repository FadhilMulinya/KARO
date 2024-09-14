import React, { useState, useEffect } from 'react'
import { Bell, CreditCard, FileText, Home, LogOut, School, Settings, User, UserPlus, DollarSign, BarChart, CreditCard as PaymentIcon } from 'lucide-react'
import web3 from '../web3'
import contract from '../contract'
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useActiveAccount} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { base, sepolia } from "thirdweb/chains";
// import Link from 'next/link'\


export default function Component({connect}) {
 const [dashboardType, setDashboardType] = useState('school')
 const [activeSection, setActiveSection] = useState('dashboard')
 const [walletAddress, setWalletAddress] = useState('');
 const [loading, setLoading] = useState(false);

 const [notifications, setNotifications] = useState([
   { id: 1, message: "New payment received", read: false },
   { id: 2, message: "Upcoming fee deadline", read: false },
 ])

 const client = createThirdwebClient({
  clientId: "468d5f5c59ee852ff57f2190e04cf6dd",
});

const smartAccount = useActiveAccount();

useEffect(() => {
  // This function will run whenever smartAccount changes
  const checkSmartAccount = () => {
    if (smartAccount) {
      console.log('Smart account is active:', smartAccount);

      console.log('Smart account address:', smartAccount.address);
      setWalletAddress(smartAccount.address)
      console.log('state Smart account address:', walletAddress);

      // Perform any actions you want to take when smartAccount is active
    } else {
      console.log('Smart account is not active.');
      // Handle the case where smartAccount is null or inactive
    }
  };

  checkSmartAccount(); // Initial check

  const interval = setInterval(checkSmartAccount, 1000); // Keep checking every second

  // Cleanup on component unmount or smartAccount change
  return () => clearInterval(interval);
}, [smartAccount]);

 const toggleDashboard = () => {
  //setLoding to true
  //prompt user connect address again

   setDashboardType(dashboardType === 'student' ? 'school' : 'student')
   //return null
   //setLoading false
   setActiveSection('dashboard')
 }


 const markNotificationAsRead = (id) => {
   setNotifications(notifications.map(notif =>
     notif.id === id ? { ...notif, read: true } : notif
   ))
 }

 if(loading){
  return(
    <div>
      <h1>Loading</h1>
    </div>
  )
 }

 return (
   <div className="flex h-screen bg-gray-100">
     {/* Sidebar */}
     <aside className="w-64 bg-white shadow-md">
       <div className="p-4">
         <h1 className="text-2xl font-bold text-primary">EduPay</h1>
       </div>
       <nav className="mt-8">
     
         <SideBarItem
           href="#dashboard"
           icon={<Home className="mr-2 h-5 w-5" />}
           label="Dashboard"
           active={activeSection === 'dashboard'}
           onClick={() => setActiveSection('dashboard')}
         />
         <SideBarItem
           href="#invoices"
           icon={<FileText className="mr-2 h-5 w-5" />}
           label="Invoices"
           active={activeSection === 'invoices'}
           onClick={() => setActiveSection('invoices')}
         />
         <SideBarItem
           href="#payment"
           icon={<CreditCard className="mr-2 h-5 w-5" />}
           label="Payment"
           active={activeSection === 'payment'}
           onClick={() => setActiveSection('payment')}
         />


         {connect === 'school' && (
           <>
             <SideBarItem
               href="#management"
               icon={<Settings className="mr-2 h-5 w-5" />}
               label="Management"
               active={activeSection === 'management'}
               onClick={() => setActiveSection('management')}
             />
             <SideBarItem
               href="#register-student"
               icon={<UserPlus className="mr-2 h-5 w-5" />}
               label="Register Student"
               active={activeSection === 'register-student'}
               onClick={() => setActiveSection('register-student')}
             />
             <SideBarItem
               href="#fee-check"
               icon={<DollarSign className="mr-2 h-5 w-5" />}
               label="Check Fees"
               active={activeSection === 'fee-check'}
               onClick={() => setActiveSection('fee-check')}
             />
             <SideBarItem
               href="#reports"
               icon={<BarChart className="mr-2 h-5 w-5" />}
               label="Reports"
               active={activeSection === 'reports'}
               onClick={() => setActiveSection('reports')}
             />
             <SideBarItem
               href="#payment-methods"
               icon={<PaymentIcon className="mr-2 h-5 w-5" />}
               label="Payment Methods"
               active={activeSection === 'payment-methods'}
               onClick={() => setActiveSection('payment-methods')}
             />
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
             {/* <ConnectButton
              client={createThirdwebClient({
                clientId: "your-thirdweb-client-id-goes-here",
              })}
              wallets={[
                createWallet("com.coinbase.wallet", {
                  walletConfig: {
                    options: "smartWalletOnly",
                  },
                  chains: [base, sepolia],
                }),
              ]}
              onConnect={()=>{}}
              style={{}}
            />              */}

<ConnectButton
        client={client}
        accountAbstraction={{
          chain: sepolia, // the chain where your smart accounts will be or is deployed
          sponsorGas: false, // enable or disable sponsored transactions
        }}
      />
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
           <div className="bg-white -6 rounded-lg shadow">
             <h3 className="text-lg font-semibold mb-4">Invoice Management</h3>
             <button className="bg-primary text-black px-4 py-2 rounded hover:bg-primary/90">View and download your invoices here</button>
           </div>
         )}


{activeSection === 'payment' && (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4">School Fee Payment</h3>
    <button className="bg-primary text-black px-4 py-2 rounded hover:bg-primary/90">
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
                   <option>Class 1C</option>
                   <option>Class 2B</option>
                   <option>Class 3N</option>
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
             <h3 className="text-lg font-semibold mb-4">Check Fees</h3>
             <p>View and manage student fee details here.</p>
           </div>
       )}


       {activeSection === 'reports' && dashboardType === 'school' && (
           <div className="bg-white p-6 rounded-lg shadow">
             <h3 className="text-lg font-semibold mb-4">Reports</h3>
             <p>Generate and view various reports related to fees and student data.</p>
           </div>
       )}


       {activeSection === 'payment-methods' && dashboardType === 'school' && (
           <div className="bg-white p-6 rounded-lg shadow">
             <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
             <p>Manage and configure payment methods available for fee payments.</p>
           </div>
       )}


       {activeSection === 'notifications' && (
           <div className="bg-white p-6 rounded-lg shadow">
               <h3 className="text-lg font-semibold mb-4">Notifications</h3>
               <ul>
                   {notifications.map(notification => (
                   <li
                       key={notification.id}
                       className={`p-4 mb-2 rounded ${notification.read ? 'bg-gray-200' : 'bg-red-100'}`}
                       onClick={() => markNotificationAsRead(notification.id)}
                   >
                       {notification.message}
                   </li>
                   ))}
               </ul>
           </div>
       )}
       </div>
     </main>
   </div>
 )
}


function SideBarItem({ href, icon, label, active, onClick }) {
 return (
   <a
     href={href}
     className={`flex items-center p-4 text-gray-700 hover:bg-gray-200 ${active ? 'bg-gray-200 font-semibold' : ''}`}
     onClick={onClick}
   >
     {icon}
     <span className="ml-2 text-green-400">{label}</span>
   </a>
 )
}


function DashboardCard({ title, value }) {
 return (
   <div className="bg-white p-4 rounded-lg shadow">
     <h4 className="text-sm font-medium text-gray-600">{title}</h4>
     <p className="text-xl font-semibold text-gray-800">{value}</p>
   </div>
 )
}



