import { useAuth } from "../context/AuthProvider"
import { RiLogoutCircleRLine } from "@remixicon/react"

const Dashboard = () => {

  const { user, logout } = useAuth()

  return (
    <section className="grid grid-cols-[500px_1fr] min-h-screen">
      <div className="p-10 bg-[#1b1e23] border-r border-r-white/20">
        <h2 className="text-2xl text-btn font-bold mb-10">Dragon Panel</h2>
        <button onClick={logout} className="bg-red-400 text-white py-3 px-6 rounded-lg cursor-pointer flex gap-x-2 text-w"><RiLogoutCircleRLine />Logout</button>
      </div>
      <div className="p-10 text-white">
        <div className="text-3xl font-bold">Welcome, back, {user.name}</div>

        <div className="grid grid-cols-3 gap-x-5 mt-5">
          <div className="border border-white/20 p-5 rounded-lg">
            <div className="text-white/20">Account</div>
            <div className="text-2xl">Active</div>
          </div>
          <div className="border border-white/20 p-5 rounded-lg">
            <div className="text-white/20">Email</div>
            <div className="text-2xl">{user.email}</div>
          </div>
          <div className="border border-white/20 p-5 rounded-lg">
            <div className="text-white/20">Role</div>
            <div className="text-2xl">User</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard