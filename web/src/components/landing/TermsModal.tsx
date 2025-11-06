import { motion } from 'framer-motion'

interface TermsModalProps {
  onAccept: () => void
  onDecline: () => void
}

export default function TermsModal({ onAccept, onDecline }: TermsModalProps) {
  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='relative max-w-2xl w-full rounded-2xl p-8'
        style={{ background: 'var(--brand-dark-gray)', border: '1px solid #a7f3d0' }}
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
      >
        <h2 className='text-2xl font-bold mb-6' style={{ color: 'var(--brand-light-gray)' }}>
          User Agreement
        </h2>
        
        <div className='mb-6 max-h-96 overflow-y-auto'>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            Please read this User Agreement carefully before using the FluxTrader platform.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>1. Acceptance of Terms</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            By accessing or using FluxTrader, you agree to be bound by this User Agreement and all applicable laws and regulations.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>2. Risk Disclosure</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            Cryptocurrency trading involves significant risk and may not be suitable for all investors. Past performance is not indicative of future results.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>3. No Investment Advice</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            FluxTrader does not provide investment advice. All trading decisions are made by you or your AI agents.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>4. Limitation of Liability</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            FluxTrader shall not be liable for any direct, indirect, incidental, special or consequential damages.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>5. Legal Compliance Statement</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            Prohibition of Access Statement: This platform hereby issues an official statement prohibiting Chinese citizens, Hong Kong residents, etc. from accessing this platform and using any services provided by this platform. This platform strictly complies with relevant laws and regulations and compliance requirements. Users shall bear corresponding legal responsibilities for any acts that violate the provisions of this statement.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>6. Research on the Actual Value of AI in Trading</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            This platform is committed to researching the actual value of AI in trading, aiming to promote healthy industry development through technological innovation and compliant practices. We encourage users to explore the application of AI technology in the field of trading under the premise of legal compliance, in order to improve trading efficiency and risk management capabilities.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>7. Free Use and Acceptance of Donations</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            The services provided by this platform are free of charge within a certain scope, aiming to create an open and free learning and research environment for users. At the same time, this platform accepts voluntary donations from users, which will be used to support the continuous development and technological innovation of the platform. All donations are based on user voluntariness, and this platform will ensure the reasonable use and transparent management of donation funds.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>8. Legal Liability</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            We strongly recommend that all users must comply with local laws and regulations to avoid bearing legal consequences. Violation of the provisions of this statement may result in users facing legal liabilities, including but not limited to civil liability, administrative liability and criminal liability.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>9. Platform Liability</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            This platform will continue to strictly abide by the laws and regulations of various countries to ensure platform compliance and user asset security. This platform does not assume any legal liability arising from users' violation of the provisions of this statement.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>10. Scope of Application</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            This statement applies to all users who access this platform, as well as all information, advice and/or services provided to users through this platform.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>11. Statement Updates</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            This platform may modify and update this statement according to changes in laws and regulations and business development needs. Users should regularly check the latest version of this statement to ensure that they understand and comply with relevant regulations.
          </p>
          
          <h3 className='font-bold mb-2' style={{ color: 'var(--brand-light-gray)' }}>12. Final Interpretation</h3>
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            This platform reserves the final right of interpretation of this statement.
          </p>
          
          <p className='text-sm mb-4' style={{ color: 'var(--text-secondary)' }}>
            Hereby declared.
          </p>
        </div>
        
        <div className='flex flex-col sm:flex-row gap-4'>
          <motion.button
            onClick={onAccept}
            className='flex-1 px-6 py-3 rounded-lg font-semibold text-center'
            style={{ background: 'var(--brand-yellow)', color: 'var(--brand-black)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Accept
          </motion.button>
          <motion.button
            onClick={onDecline}
            className='flex-1 px-6 py-3 rounded-lg font-semibold text-center'
            style={{ background: 'var(--brand-dark-gray)', color: 'var(--brand-light-gray)', border: '1px solid #a7f3d0' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Decline
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}