// import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import EmailVerify from './pages/EmailVerify'
// import ResetPassword from './pages/ResetPassword'

// const App = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='/login' element={<Login/>} />
//         <Route path='/email-verify' element={<EmailVerify/>} />
//         <Route path='/reset-password' element={<ResetPassword/>} />
//       </Routes>
//     </div>
//   )
// }

// export default App

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'

// 1. Import Toastify components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      {/* 2. Add ToastContainer here so it's always listening */}
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/email-verify' element={<EmailVerify/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </div>
  )
}

export default App