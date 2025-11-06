import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

function StepCard({ number, title, description, delay }: any) {
  return (
    <motion.div className='flex gap-6 items-start' initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay }} whileHover={{ x: 10 }}>
      <motion.div
        className='flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl'
        style={{ background: 'var(--binance-yellow)', color: 'var(--brand-black)' }}
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {number}
      </motion.div>
      <div>
        <h3 className='text-2xl font-semibold mb-2' style={{ color: 'var(--brand-light-gray)' }}>
          {title}
        </h3>
        <p className='text-lg leading-relaxed' style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  return (
    <AnimatedSection id='how-it-works' backgroundColor='var(--brand-dark-gray)'>
      <div className='max-w-7xl mx-auto'>
        <motion.div className='text-center mb-16' initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className='text-4xl font-bold mb-4' style={{ color: 'var(--brand-light-gray)' }}>
            How to Get Started with FluxTrader
          </h2>
          <p className='text-lg' style={{ color: 'var(--text-secondary)' }}>
            Three simple steps to begin your AI automated trading journey
          </p>
        </motion.div>

        <div className='space-y-8'>
          {[
            { number: 1, title: 'Register/Login to System', description: 'Register/login to FluxTrader account and create API keys.' },
            { number: 2, title: 'Configure Information', description: 'Frontend setup for exchange APIs (e.g. Binance, Hyperliquid), AI models and custom prompts.' },
            { number: 3, title: 'Deploy and Run', description: 'One-click model startup from frontend to begin trading.' },
          ].map((step, index) => (
            <StepCard key={step.number} {...step} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
