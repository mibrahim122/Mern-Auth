const Footer = () => {
    return (
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 border-t border-slate-800 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <p className="text-white font-bold tracking-wide">MERN AUTH PLATFORM</p>
            <p className="text-xs mt-1 text-slate-500">Demonstrating modern architectural secure session methodologies.</p>
          </div>
          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Boilerplate Framework. Ready for LinkedIn Review.
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer