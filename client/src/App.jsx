import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import AuthModal from './components/AuthModal'

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState('login') // 'login' or 'register'

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar onAuthClick={() => setIsAuthOpen(true)} />
      
      <main>
        <Hero />
        <Features />
      </main>

      <AnimatePresence>
        {isAuthOpen && (
          <AuthModal 
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            type={authType}
            onTypeChange={setAuthType}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App