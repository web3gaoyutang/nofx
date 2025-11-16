import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function FooterSection() {
  const { language } = useLanguage()
  return (
    <footer style={{ borderTop: '1px solid #2B3139', background: '#181A20' }}>
      <div className='max-w-[1200px] mx-auto px-6 py-10'>
        {/* Brand */}
        <div className='flex items-center gap-3 mb-8'>
          {/* <img src='/images/logo.png' alt='FluxTrader Logo' className='w-8 h-8' /> */}
          <div>
            <div className='text-lg font-bold' style={{ color: '#EAECEF' }}>
              FluxTrader
            </div>
            <div className='text-xs' style={{ color: '#848E9C' }}>
              Intelligent AI trading assistant
            </div>
          </div>
        </div>

        {/* Bottom note (kept subtle) */}
        <div
          className='pt-6 mt-8 text-center text-xs'
          style={{ color: '#5E6673', borderTop: '1px solid #2B3139' }}
        >
          <p>{t('footerTitle', language)}</p>
          <p className='mt-1'>{t('footerWarning', language)}</p>
        </div>
      </div>
    </footer>
  )
}
