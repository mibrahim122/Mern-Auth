import { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContent } from '../context/AppContext'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsSubmitting(true);

            axios.defaults.withCredentials = true

            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })

                if (data.success) {
                    setIsLoggedin(true)
                    getUserData()
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

                if (data.success) {
                    setIsLoggedin(true)
                    getUserData()
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-violet-800 via-fuchsia-900 to-indigo-950'>
            <img
                onClick={() => navigate('/')}
                src={assets.logo} alt="Logo"
                className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-105 transition-transform drop-shadow-md'
            />

            {/* Glassmorphism Card */}
            <div className='bg-black/40 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full sm:w-96 text-gray-300 text-sm border border-white/10'>

                <h2 className='text-3xl font-bold text-white text-center mb-3 tracking-tight drop-shadow-sm'>
                    {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
                </h2>

                <p className='text-center text-sm mb-8 text-gray-400'>
                    {state === 'Sign Up' ? 'Create your account to get started' : 'Login to access your dashboard'}
                </p>

                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 transition-all focus-within:border-fuchsia-500 focus-within:bg-black/30'>
                            <img src={assets.person_icon} alt="" className='opacity-70 invert' />
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                className='bg-transparent outline-none w-full text-white placeholder-gray-500'
                                type="text"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 transition-all focus-within:border-fuchsia-500 focus-within:bg-black/30'>
                        <img src={assets.mail_icon} alt="" className='opacity-70 invert' />
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='bg-transparent outline-none w-full text-white placeholder-gray-500'
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 transition-all focus-within:border-fuchsia-500 focus-within:bg-black/30'>
                        <img src={assets.lock_icon} alt="" className='opacity-70 invert' />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='bg-transparent outline-none w-full text-white placeholder-gray-500'
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className='mb-6 text-fuchsia-400 cursor-pointer hover:text-fuchsia-300 transition-colors inline-block font-medium'>
                        Forgot password?
                    </p>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium 
                        transition-all duration-300 
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed scale-95' : 'hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-lg shadow-fuchsia-600/30 active:scale-[0.98]'}
                        flex justify-center items-center gap-2`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </>
                        ) : state}
                    </button>
                </form>

                <div className='mt-6 text-center'>
                    {state === 'Sign Up' ? (
                        <p className='text-gray-400 text-sm'>
                            Already have an account?{' '}
                            <span onClick={() => setState('Login')} className='text-fuchsia-400 cursor-pointer font-medium hover:text-fuchsia-300 transition-colors'>Login here</span>
                        </p>
                    ) : (
                        <p className='text-gray-400 text-sm'>
                            Don't have an account?{' '}
                            <span onClick={() => setState('Sign Up')} className='text-fuchsia-400 cursor-pointer font-medium hover:text-fuchsia-300 transition-colors'>Sign up</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login