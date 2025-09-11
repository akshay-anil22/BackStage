import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import API from '../api/api' // Import your API instance

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const navigate = useNavigate()

  const { currentPassword, newPassword, confirmPassword } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Frontend validation: Check if new passwords match
    if (newPassword !== confirmPassword) {
      setToast({
        show: true,
        message: 'New passwords do not match!',
        type: 'error',
      })
      setTimeout(() => setToast({ ...toast, show: false }), 3000)
      return
    }

    try {
      // Prepare data for the API call (matching backend's expected fields)
      const apiData = {
        oldPassword: currentPassword,
        newPassword: newPassword,
      }

      // Make the API call to change the password
      const res = await API.post('/api/change-password', apiData)

      // Show success toast
      setToast({ show: true, message: res.data.message, type: 'success' })

      // Clear local storage and redirect to login after a delay
      setTimeout(() => {
        localStorage.removeItem('token')
        navigate('/login')
      }, 2000)
    } catch (err) {
      // Show error toast with message from the backend or a default one
      const errorMessage =
        err.response?.data?.message || 'Something went wrong'
      setToast({ show: true, message: errorMessage, type: 'error' })
      setTimeout(() => setToast({ ...toast, show: false }), 3000)
    }
  }

  return (
    <div className="theme-dawn1 min-h-screen bg-cover bg-center relative">
      <Navbar />
      <div className="flex items-center justify-center pt-24 pb-12">
        <div className="theme-dawn1 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            Change Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="pl-1 font-mourand text-3xl"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                name="currentPassword"
                value={currentPassword}
                onChange={onChange}
                required
                className="appearance-none rounded-lg relative block w-full px-2 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-200 text-gray-900 dark:text-black bg-white dark:bg-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="pl-1 font-mourand text-3xl"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                name="newPassword"
                value={newPassword}
                onChange={onChange}
                required
                className="appearance-none rounded-lg relative block w-full px-2 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-200 text-gray-900 dark:text-black bg-white dark:bg-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="pl-1 font-mourand text-3xl"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
                className="appearance-none rounded-lg relative block w-full px-2 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-200 text-gray-900 dark:text-black bg-white dark:bg-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 transition duration-300"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

export default ChangePassword