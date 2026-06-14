// import { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContent } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Login = () => {

//     const navigate = useNavigate()

//     // 1. Pulling global state and functions from Context
//     const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

//     const [state, setState] = useState('Sign Up')
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const onSubmitHandler = async (e) => {
//         try {
//             e.preventDefault();

//             // 2. Crucial for sending cookies to the backend
//             axios.defaults.withCredentials = true;

//             if (state === 'Sign Up') {
//                 // Register logic
//                 const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });

//                 if (data.success) {
//                     setIsLoggedin(true)
//                     getUserData()
//                     navigate('/')
//                 } else {
//                     toast.error(data.message)
//                 }
//             } else {
//                 // Login logic
//                 const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });

//                 if (data.success) {
//                     setIsLoggedin(true)
//                     getUserData()
//                     navigate('/')
//                 } else {
//                     toast.error(data.message)
//                 }
//             }

//         } catch (error) {
//             // Catches network errors or server crashes
//             toast.error(error.message)
//         }
//     }

//     return (
//         <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
//             <img 
//                 onClick={() => navigate('/')} 
//                 src={assets.logo} alt="" 
//                 className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' 
//             />
//             <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>

//                 <h2 className='text-3xl font-semibold text-white text-center mb-3'>
//                     {state === 'Sign Up' ? 'Create Account' : 'Login'}
//                 </h2>

//                 <p className='text-center text-sm mb-6'>
//                     {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
//                 </p>

//                 <form onSubmit={onSubmitHandler}>
//                     {state === 'Sign Up' && (
//                         <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
//                             <img src={assets.person_icon} alt="" />
//                             <input 
//                                 onChange={e => setName(e.target.value)} 
//                                 value={name} 
//                                 className='bg-transparent outline-none w-full' 
//                                 type="text" 
//                                 placeholder="Full Name" 
//                                 required 
//                             />
//                         </div>
//                     )}

//                     <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
//                         <img src={assets.mail_icon} alt="" />
//                         <input 
//                             onChange={e => setEmail(e.target.value)} 
//                             value={email} 
//                             className='bg-transparent outline-none w-full' 
//                             type="email" 
//                             placeholder="Email id" 
//                             required 
//                         />
//                     </div>

//                     <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
//                         <img src={assets.lock_icon} alt="" />
//                         <input 
//                             onChange={e => setPassword(e.target.value)} 
//                             value={password} 
//                             className='bg-transparent outline-none w-full' 
//                             type="password" 
//                             placeholder="Password" 
//                             required 
//                         />
//                     </div>

//                     <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>
//                         Forgot password?
//                     </p>

//                     <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
//                         {state}
//                     </button>
//                 </form>

//                 {state === 'Sign Up' ? (
//                     <p className='text-gray-400 text-center text-xs mt-4'>
//                         Already have an account?{' '}
//                         <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
//                     </p>
//                 ) : (
//                     <p className='text-gray-400 text-center text-xs mt-4'>
//                         Don't have an account?{' '}
//                         <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign up</span>
//                     </p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Login 

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

    // State to handle button click feedback
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsSubmitting(true); // START ANIMATION

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
            setIsSubmitting(false); // STOP ANIMATION
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
            <img
                onClick={() => navigate('/')}
                src={assets.logo} alt=""
                className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-105 transition-transform'
            />

            <div className='bg-slate-900 p-10 rounded-lg shadow-2xl w-full sm:w-96 text-indigo-300 text-sm border border-slate-800'>

                <h2 className='text-3xl font-semibold text-white text-center mb-3'>
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </h2>

                <p className='text-center text-sm mb-6'>
                    {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
                </p>

                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] transition-all focus-within:ring-1 focus-within:ring-indigo-400'>
                            <img src={assets.person_icon} alt="" />
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                className='bg-transparent outline-none w-full text-white'
                                type="text"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] transition-all focus-within:ring-1 focus-within:ring-indigo-400'>
                        <img src={assets.mail_icon} alt="" />
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='bg-transparent outline-none w-full text-white'
                            type="email"
                            placeholder="Email id"
                            required
                        />
                    </div>

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] transition-all focus-within:ring-1 focus-within:ring-indigo-400'>
                        <img src={assets.lock_icon} alt="" />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='bg-transparent outline-none w-full text-white'
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer hover:text-indigo-400'>
                        Forgot password?
                    </p>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium 
                        transition-all duration-300 
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed scale-95' : 'hover:scale-[1.02] active:scale-95 hover:shadow-lg shadow-indigo-500/20'}
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

                <div className='mt-4 text-center'>
                    {state === 'Sign Up' ? (
                        <p className='text-gray-400 text-xs'>
                            Already have an account?{' '}
                            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline hover:text-blue-300'>Login here</span>
                        </p>
                    ) : (
                        <p className='text-gray-400 text-xs'>
                            Don't have an account?{' '}
                            <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline hover:text-blue-300'>Sign up</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login