import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className='relative max-w-md w-full rounded-2xl p-8'
        style={{ background: 'var(--brand-dark-gray)', border: '1px solid #a7f3d0' }}
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button onClick={onClose} className='absolute top-4 right-4' style={{ color: 'var(--text-secondary)' }} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
          <X className='w-6 h-6' />
        </motion.button>
        <h2 className='text-2xl font-bold mb-6' style={{ color: 'var(--brand-light-gray)' }}>
          Access FluxTrader Platform
        </h2>
        <p className='text-sm mb-6' style={{ color: 'var(--text-secondary)' }}>
          Please login or register to access the full AI trading platform
        </p>
        <div className='space-y-3'>
          <motion.button
            onClick={() => {
              window.history.pushState({}, '', '/login')
              window.dispatchEvent(new PopStateEvent('popstate'))
              onClose()
            }}
            className='block w-full px-6 py-3 rounded-lg font-semibold text-center'
            style={{ background: 'var(--brand-yellow)', color: 'var(--brand-black)' }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(52, 211, 153, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <motion.button
            onClick={() => {
              window.history.pushState({}, '', '/register')
              window.dispatchEvent(new PopStateEvent('popstate'))
              onClose()
            }}
            className='block w-full px-6 py-3 rounded-lg font-semibold text-center'
            style={{ background: 'var(--brand-dark-gray)', color: 'var(--brand-light-gray)', border: '1px solid #a7f3d0' }}
            whileHover={{ scale: 1.05, borderColor: 'var(--brand-yellow)' }}
            whileTap={{ scale: 0.95 }}
          >
            Register New Account
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}