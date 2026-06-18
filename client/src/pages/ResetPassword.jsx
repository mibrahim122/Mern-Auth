import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

    const { backendUrl } = useContext(AppContent)
    axios.defaults.withCredentials = true

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

    const inputRefs = React.useRef([])

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        })
    }

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && setIsEmailSent(true)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map(e => e.value)
        setOtp(otpArray.join(''))
        setIsOtpSubmitted(true)
    }

    const onSubmitNewPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword })
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && navigate('/login')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-violet-800 via-fuchsia-900 to-indigo-950'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-105 transition-transform drop-shadow-md' />

            {/* enter email id */}
            {!isEmailSent &&
                <form onSubmit={onSubmitEmail} className='bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-sm border border-white/10'>
                    <h1 className='text-3xl font-bold text-white text-center mb-3 tracking-tight drop-shadow-sm'>Reset Password</h1>
                    <p className='text-center mb-6 text-gray-400'>Enter your registered email address.</p>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 transition-all focus-within:border-fuchsia-500 focus-within:bg-black/30'>
                        <img src={assets.mail_icon} alt="" className='w-4 h-4 opacity-70 invert' />
                        <input type="email" placeholder='Email Address' 
                        className='bg-transparent outline-none w-full text-white placeholder-gray-500'
                        value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button className='w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-lg shadow-fuchsia-600/30 active:scale-[0.98] mt-3'>
                        Submit
                    </button>
                </form>
            }

            {/* otp input form */}
            {!isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitOtp} className='bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-sm border border-white/10'>
                    <h1 className='text-3xl font-bold text-white text-center mb-3 tracking-tight drop-shadow-sm'>Verify OTP</h1>
                    <p className='text-center mb-6 text-gray-400'>Enter the 6-digit code sent to your email.</p>
                    <div className='flex justify-between mb-8' onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input type="text" maxLength='1' key={index} required
                                className='w-12 h-12 bg-white/5 text-white text-center text-xl rounded-xl border border-white/10 focus:border-fuchsia-500 focus:bg-black/30 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all'
                                ref={e => inputRefs.current[index] = e}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <button className='w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-lg shadow-fuchsia-600/30 active:scale-[0.98]'>
                        Submit
                    </button>
                </form>
            }

            {/* enter new password */}
            {isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitNewPassword} className='bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-sm border border-white/10'>
                    <h1 className='text-3xl font-bold text-white text-center mb-3 tracking-tight drop-shadow-sm'>New Password</h1>
                    <p className='text-center mb-6 text-gray-400'>Enter your new password below.</p>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 transition-all focus-within:border-fuchsia-500 focus-within:bg-black/30'>
                        <img src={assets.lock_icon} alt="" className='w-4 h-4 opacity-70 invert' />
                        <input type="password" placeholder='New Password' 
                        className='bg-transparent outline-none w-full text-white placeholder-gray-500'
                        value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>
                    <button className='w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-lg shadow-fuchsia-600/30 active:scale-[0.98] mt-3'>
                        Submit
                    </button>
                </form>
            }
        </div>
    )
}

export default ResetPassword