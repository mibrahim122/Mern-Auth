import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent)
  
  const navigate = useNavigate()

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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })

      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    // If user is logged in AND data is loaded AND already verified, redirect to home
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-violet-800 via-fuchsia-900 to-indigo-950'>
      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        alt="Logo" 
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-105 transition-transform drop-shadow-md' 
      />
      <form onSubmit={onSubmitHandler} className='bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-sm border border-white/10'>
        <h1 className='text-3xl font-bold text-white text-center mb-3 tracking-tight drop-shadow-sm'>Verify OTP</h1>
        <p className='text-center mb-6 text-gray-400'>Enter the 6-digit code sent to your email id.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input 
              type="text" 
              maxLength='1' 
              key={index} 
              required
              className='w-12 h-12 bg-white/5 text-white text-center text-xl rounded-xl border border-white/10 focus:border-fuchsia-500 focus:bg-black/30 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-lg shadow-fuchsia-600/30 active:scale-[0.98]'>
          Verify Email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify