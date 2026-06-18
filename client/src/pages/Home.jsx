import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Features from '../components/Features'
import TechStack from '../components/TechStack'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300'>
      <Navbar />
      <Header />
      <Features />
      <TechStack />
      <Footer />
    </div>
  )
}
export default Home