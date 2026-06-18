const TechStack = () => {
    const stack = [
      { name: "MongoDB", role: "Database Layer", detail: "NoSQL document store preserving strict encrypted user models.", color: "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" },
      { name: "Express.js", role: "Backend Routing", detail: "REST API endpoints mapping controller middleware functions smoothly.", color: "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300" },
      { name: "React.js", role: "Frontend Engine", detail: "Single Page Application delivering atomic components dynamically.", color: "border-sky-200 dark:border-sky-900/50 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400" },
      { name: "Node.js", role: "Runtime Platform", detail: "Asynchronous back-end event loop managing operational pipelines.", color: "border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" }
    ];
  
    return (
      <section className="py-20 max-w-6xl mx-auto px-6 bg-transparent">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Full-Stack Technical Integrity</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 transition-colors">A clean MERN composition structured for maintainability.</p>
          </div>
          <div className="bg-indigo-600 dark:bg-indigo-500 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-sm transition-colors">
            REST API Validated
          </div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((tech, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-3 border transition-colors ${tech.color}`}>
                  {tech.name}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-md mb-1 transition-colors">{tech.role}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">{tech.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default TechStack