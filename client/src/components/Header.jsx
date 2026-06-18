import { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/AppContext'

const Header = () => {
  const { userData } = useContext(AppContent)

  return (
    <section className='flex flex-col items-center pt-36 pb-20 px-4 text-center max-w-4xl mx-auto relative'>
        
      {/* Ambient Background Glows for Dark Mode */}
      <div className='absolute top-0 left-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/5 blur-[120px] rounded-full pointer-events-none' />
      <div className='absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none' />

      {/* Security Badge */}
      <div className='inline-flex items-center gap-2 bg-indigo-50 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm transition-colors'>
        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
        Production-Ready MERN Architecture
      </div>

      {/* Robot Avatar */}
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-indigo-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <img 
          src={assets.header_img || "/robot-placeholder.png"} alt="Robot Avatar" 
          className='w-28 h-28 sm:w-32 sm:h-32 rounded-full relative z-10 border-4 border-white dark:border-slate-800 shadow-md transition-all duration-300 hover:scale-105' 
        />
      </div>

      {/* Dynamic Greeting Heading */}
      <h1 className='text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 max-w-2xl leading-tight transition-colors'>
        Secure Identity, <br />
        <span className='bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent'>
          Seamless Access.
        </span>
      </h1>

      <p className='text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed transition-colors'>
        {userData ? (
          <>Welcome back, <span className="font-semibold text-slate-900 dark:text-white">{userData.name}</span>! You have successfully bypassed the secure layer. Explore your verified dashboard features below.</>
        ) : (
          "An advanced authentication boilerplate implementing industry-standard security models, cryptographic token distribution, and automated account validation mechanisms."
        )}
      </p>

      {/* Modern Call to Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-4 w-full justify-center px-4'>
        <button className='bg-slate-900 dark:bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-indigo-500 transition-all shadow-lg shadow-slate-900/10 dark:shadow-indigo-600/20 active:scale-[0.98]'>
          View Technical Specs
        </button>
        <button className='bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-8 py-3.5 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]'>
          Explore Codebase
        </button>
      </div>
    </section>
  )
}

export default Header