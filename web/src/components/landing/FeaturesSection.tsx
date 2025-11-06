import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import { CryptoFeatureCard } from '../CryptoFeatureCard'
import { Code, Cpu, Lock, Rocket } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <AnimatedSection id='features'>
      <div className='max-w-7xl mx-auto'>
        <motion.div className='text-center mb-16' initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <motion.div
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6'
            style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid #a7f3d0' }}
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className='w-4 h-4' style={{ color: 'var(--brand-yellow)' }} />
            <span className='text-sm font-semibold' style={{ color: 'var(--brand-yellow)' }}>
              Core Features
            </span>
          </motion.div>
          <h2 className='text-4xl font-bold mb-4' style={{ color: 'var(--brand-light-gray)' }}>
            Why FluxTrader？
          </h2>
          <p className='text-lg' style={{ color: 'var(--text-secondary)' }}>
            A powerful and secure AI trading platform
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          <CryptoFeatureCard
            icon={<Code className='w-8 h-8' />}
            title='Custom Prompts'
            description='Natural language prompts to fully unleash your ideas.'
            features={['Custom Prompts', 'Custom Trading Style', 'Custom Trading Goals', 'Real-time Modification']}
            delay={0.0}
          />
          <CryptoFeatureCard
            icon={<Cpu className='w-8 h-8' />}
            title='Multi-Agent Intelligent Competition'
            description='AI strategies battle at high speed in sandbox, with the best surviving to achieve strategy evolution.'
            features={['Multiple AI Agents Running in Parallel', 'Automatic Strategy Optimization', 'Sandbox Security Testing', 'Cross-Market Strategy Migration']}
            delay={0.1}
          />
          <CryptoFeatureCard
            icon={<Lock className='w-8 h-8' />}
            title='Secure and Reliable Trading'
            description='Enterprise-grade security protection, giving you full control over your funds and trading strategies.'
            features={['Local Private Key Management', 'Fine-grained API Permission Control', 'Real-time Risk Monitoring', 'Trading Log Audit']}
            delay={0.2}
          />
        </div>
      </div>
    </AnimatedSection>
  )
}

