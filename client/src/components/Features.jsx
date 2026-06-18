const Features = () => {
    const featuresList = [
      {
        title: "JWT Token Handling",
        desc: "Implements secure JSON Web Tokens issued dynamically upon successful handshakes and validated safely through HTTP cookies.",
        icon: (
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        )
      },
      {
        title: "OTP Email Verification",
        desc: "Integrates server-side SMTP mail routing to deliver cryptographic time-based one-time passcodes for active verification.",
        icon: (
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" /></svg>
        )
      },
      {
        title: "State Management & Toasting",
        desc: "Global context keeps user schemas updated smoothly across views, driving live feedback responses via structural toast popups.",
        icon: (
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )
      }
    ];
  
    return (
      <section className="py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl transition-colors">Engineered Security Layout</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-colors">Explore the active architectural properties underpinning this application's access layers.</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresList.map((f, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center mb-5 border border-indigo-100 dark:border-slate-700 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Features