import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroSection() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  }
  const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } }

  return (
    <section className='relative pt-32 pb-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-1 gap-12 items-center justify-center text-center'>
          {/* Left Content */}
          <motion.div className='space-y-6 relative z-10' style={{ opacity, scale }} initial='initial' animate='animate' variants={staggerContainer}>
            <h1 className='text-5xl lg:text-7xl font-bold leading-tight' style={{ color: 'var(--brand-light-gray)' }}>
              AI Trading Agent
              <br />
              <span style={{ color: 'var(--brand-yellow)' }}>For Crypto</span>
            </h1>

            <motion.p className='text-xl leading-relaxed mx-auto max-w-3xl' style={{ color: 'var(--text-secondary)' }} variants={fadeInUp}>
              FluxTrader is the future standard of AI trading - a secure and controllable agent-based trading operation platform. Support exchanges such as Binance and Aster DEX
              Self-hosting and multi-agent competition enable AI to automatically make decisions, execute and optimize transactions for you.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

