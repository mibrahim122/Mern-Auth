import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate()
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)

    // 1. Initialize Dark Mode State (Checks localStorage first)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    // 2. Apply the 'dark' class to the HTML document root when toggled
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [theme])

    // 3. Toggle Function for the Button
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

            if (data.success) {
                navigate('/email-verify')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(backendUrl + '/api/auth/logout')
            data.success && setIsLoggedin(false)
            data.success && setUserData(false)
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-50'>
            <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 cursor-pointer' onClick={() => navigate('/')} />
            
            {/* Right Side Container for Toggle and User/Login */}
            <div className='flex items-center gap-4'>
                
                {/* Light/Dark Mode Toggle Button */}
                <button 
                    onClick={toggleTheme} 
                    className='p-2.5 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 transition-all hover:bg-gray-300 dark:hover:bg-slate-700 shadow-sm'
                    aria-label="Toggle Dark Mode"
                >
                    {theme === 'light' ? (
                        // Moon Icon for Light Mode
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    ) : (
                        // Sun Icon for Dark Mode
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </button>

                {userData ?
                    <div className='w-10 h-10 flex justify-center items-center rounded-full bg-black dark:bg-white text-white dark:text-black relative group cursor-pointer font-medium shadow-md transition-all'>
                        {userData.name[0].toUpperCase()}
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black dark:text-white rounded pt-12'>
                            <ul className='list-none m-0 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl text-sm border border-gray-100 dark:border-slate-700 whitespace-nowrap overflow-hidden'>
                                {!userData.isAccountVerified &&
                                    <li onClick={sendVerificationOtp} className='py-2.5 px-4 hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-slate-700'>
                                        Verify Email
                                    </li>
                                }
                                <li onClick={logout} className='py-2.5 px-4 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 cursor-pointer transition-colors'>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                    :
                    <button onClick={() => navigate('/login')}
                        className='flex items-center gap-2 border border-gray-300 dark:border-slate-600 rounded-full px-6 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all font-medium shadow-sm'>
                        Login <img src={assets.arrow_icon} alt="" className='w-3 transition-all dark:invert' />
                    </button>
                }
            </div>
        </div>
    )
}

export default Navbar