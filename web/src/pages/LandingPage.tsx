import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeaderBar from '../components/landing/HeaderBar'
import HeroSection from '../components/landing/HeroSection'
import AboutSection from '../components/landing/AboutSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import AnimatedSection from '../components/landing/AnimatedSection'
import LoginModal from '../components/landing/LoginModal'
import TermsModal from '../components/landing/TermsModal'
import FooterSection from '../components/landing/FooterSection'

export function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  useEffect(() => {
    // 检查用户是否已经同意过用户协议
    const hasAgreedToTerms = localStorage.getItem('agreedToTerms')
    if (!hasAgreedToTerms) {
      setShowTermsModal(true)
    }
  }, [])

  const handleAcceptTerms = () => {
    localStorage.setItem('agreedToTerms', 'true')
    setShowTermsModal(false)
  }

  const handleDeclineTerms = () => {
    // 用户拒绝协议，可以导航到其他页面或显示提示
    window.location.href = 'about:blank'
  }

  return (
    <div className='min-h-screen overflow-hidden' style={{ background: 'var(--brand-black)', color: 'var(--brand-light-gray)' }}>
      <HeaderBar onLoginClick={() => setShowLoginModal(true)} />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />

      {/* CTA */}
      <AnimatedSection backgroundColor='var(--panel-bg)'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.h2 className='text-5xl font-bold mb-6' style={{ color: 'var(--brand-light-gray)' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Are you ready to define the future of AI trading?
          </motion.h2>
          <motion.p className='text-xl mb-12' style={{ color: 'var(--text-secondary)' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Starting from the crypto market and expanding to TradFi. FluxTrader is the infrastructure of AgentFi.
          </motion.p>
          <div className='flex flex-wrap justify-center gap-4'>
            <motion.button onClick={() => setShowLoginModal(true)} className='flex items-center gap-2 px-10 py-4 rounded-lg font-semibold text-lg' style={{ background: 'var(--brand-yellow)', color: 'var(--brand-black)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Start Now
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className='w-5 h-5' />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </AnimatedSection>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showTermsModal && <TermsModal onAccept={handleAcceptTerms} onDecline={handleDeclineTerms} />}
      <FooterSection />
    </div>
  )
}