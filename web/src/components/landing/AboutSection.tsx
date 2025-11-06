import { motion } from 'framer-motion'
import { Shield, Target } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import Typewriter from '../Typewriter'

export default function AboutSection() {
  return (
    <AnimatedSection id='about' backgroundColor='var(--brand-dark-gray)'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full'
              style={{
                background: 'rgba(52, 211, 153, 0.1)',
                border: '1px solid #a7f3d0',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Target
                className='w-4 h-4'
                style={{ color: 'var(--brand-yellow)' }}
              />
              <span
                className='text-sm font-semibold'
                style={{ color: 'var(--brand-yellow)' }}
              >
                About FluxTrader
              </span>
            </motion.div>

            <h2
              className='text-4xl font-bold'
              style={{ color: 'var(--brand-light-gray)' }}
            >
              What is FluxTrader?
            </h2>
            <p
              className='text-lg leading-relaxed'
              style={{ color: 'var(--text-secondary)' }}
            >
              FluxTrader is a trading robot platform where everyone can have their own AI trading robot with just one click. It offers a unified 'decision-making - risk - execution' layer and supports all asset classes.
            </p>
            <p
              className='text-lg leading-relaxed'
              style={{ color: 'var(--text-secondary)' }}
            >
              Connect exchange API → Pick strategy → Deploy to cloud. Let FluxTrader trade 24/7 while you sleep.
            </p>
            <motion.div
              className='flex items-center gap-3 pt-4'
              whileHover={{ x: 5 }}
            >
              <div
                className='w-12 h-12 rounded-full flex items-center justify-center'
                style={{ background: 'rgba(52, 211, 153, 0.1)' }}
              >
                <Shield
                  className='w-6 h-6'
                  style={{ color: 'var(--brand-yellow)' }}
                />
              </div>
              <div>
                <div
                  className='font-semibold'
                  style={{ color: 'var(--brand-light-gray)' }}
                >
                  100% Control
                </div>
                <div
                  className='text-sm'
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Have full control over AI prompt words and funds
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className='relative'>
            <div
              className='rounded-2xl p-8'
              style={{
                background: 'var(--brand-black)',
                border: '1px solid var(--panel-border)',
              }}
            >
              <Typewriter
                lines={[
                  'Initializing portfolio...',
                  'BTC/USDT signal +2.1 % → BUY 0.003 BTC at 68 420',
                  'Setting stop-loss 1 % ', 
                  'ETH/USDT +1.8 % → SELL 0.05 ETH at 3 520',
                  'Portfolio +2.34 % today',
                  'Sleep mode engaged...',
                  'SOL/USDT signal +3.2 % → BUY 1.2 SOL at 142.3',
                  'Risk limit hit → agent paused',
                  'BTC/USDT +2.1 % → BUY 0.003 BTC at 68 420',
                  'Setting stop-loss 1 %',
                  'ETH/USDT +1.8 % → SELL 0.05 ETH at 3 520',
                  'Portfolio +2.34 % today',
                  'Sleep mode engaged...',
                  'SOL/USDT signal +3.2 % → BUY 1.2 SOL at 142.3'
                ]}
                typingSpeed={70}
                lineDelay={900}
                className='text-sm font-mono'
                style={{
                  color: '#00FF41',
                  textShadow: '0 0 6px rgba(0,255,65,0.6)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

