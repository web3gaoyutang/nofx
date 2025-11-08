import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n/translations';
import { ArrowLeft } from 'lucide-react';

export function RegisterPage() {
  const { language } = useLanguage();
  const { register, completeRegistration } = useAuth();
  const [step, setStep] = useState<'register' | 'verify-email'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [userID, setUserID] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 倒计时效果
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('passwordMismatch', language));
      return;
    }

    if (password.length < 6) {
      setError(t('passwordTooShort', language));
      return;
    }

    setLoading(true);

    const result = await register(email, password);

    if (result.success && result.userID) {
      setUserID(result.userID);
      setStep('verify-email');
      setCountdown(60); // 60秒倒计时
    } else {
      setError(result.message || t('registrationFailed', language));
    }

    setLoading(false);
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/send-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userID }),
      });

      const data = await response.json();

      if (response.ok) {
        setCountdown(60);
      } else {
        setError(data.error || '重新发送失败');
      }
    } catch (err) {
      setError('网络错误,请稍后重试');
    }

    setLoading(false);
  };

  const handleEmailVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await completeRegistration(userID, emailCode);

    if (!result.success) {
      setError(result.message || t('registrationFailed', language));
    }
    // 成功的话AuthContext会自动处理登录状态

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0B0E11' }}>
      <div className="w-full max-w-md">
        {/* Back to Home */}
        {step === 'register' && (
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="flex items-center gap-2 mb-6 text-sm hover:text-[#34d399] transition-colors"
            style={{ color: '#848E9C' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {/* Logo */}
        <div className="text-center mb-8">
          {/* <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <img src="/images/logo.png" alt="FluxTrader Logo" className="w-16 h-16 object-contain" />
          </div> */}
          <h1 className="text-2xl font-bold" style={{ color: '#EAECEF' }}>
            {t('appTitle', language)}
          </h1>
          <p className="text-sm mt-2" style={{ color: '#848E9C' }}>
            {step === 'register' && t('registerTitle', language)}
            {step === 'verify-email' && '验证邮箱'}
          </p>
        </div>

        {/* Registration Form */}
        <div className="rounded-lg p-6" style={{ background: '#1E2329', border: '1px solid #2B3139' }}>
          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#EAECEF' }}>
                  {t('email', language)}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={{ background: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF' }}
                  placeholder={t('emailPlaceholder', language)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#EAECEF' }}>
                  {t('password', language)}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={{ background: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF' }}
                  placeholder={t('passwordPlaceholder', language)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#EAECEF' }}>
                  {t('confirmPassword', language)}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={{ background: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF' }}
                  placeholder={t('confirmPasswordPlaceholder', language)}
                  required
                />
              </div>

              {error && (
                <div className="text-sm px-3 py-2 rounded" style={{ background: 'rgba(246, 70, 93, 0.1)', color: '#F6465D' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 rounded text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50"
                style={{ background: '#34d399', color: '#000' }}
              >
                {loading ? t('loading', language) : t('registerButton', language)}
              </button>
            </form>
          )}

          {step === 'verify-email' && (
            <form onSubmit={handleEmailVerify} className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-5xl mb-4">📧</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#EAECEF' }}>
                  Verify your email
                </h3>
                <p className="text-sm" style={{ color: '#848E9C' }}>
                  We have sent a verification email to <span className="font-semibold" style={{ color: '#34d399' }}>{email}</span>
                  <br />
                  Please enter the 6-digit verification code in the email
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#EAECEF' }}>
                  verification code
                </label>
                <input
                  type="text"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-3 py-2 rounded text-center text-2xl font-mono tracking-widest"
                  style={{ background: '#0B0E11', border: '1px solid #2B3139', color: '#EAECEF', letterSpacing: '0.5em' }}
                  placeholder="000000"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-sm" style={{ color: '#848E9C' }}>
                <span>Did not receive the verification code?</span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={countdown > 0}
                  className="font-semibold hover:underline disabled:opacity-50 disabled:no-underline"
                  style={{ color: countdown > 0 ? '#848E9C' : '#34d399' }}
                >
                  {countdown > 0 ? `重新发送 (${countdown}s)` : '重新发送'}
                </button>
              </div>

              {error && (
                <div className="text-sm px-3 py-2 rounded" style={{ background: 'rgba(246, 70, 93, 0.1)', color: '#F6465D' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || emailCode.length !== 6}
                className="w-full px-4 py-2 rounded text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50"
                style={{ background: '#34d399', color: '#000' }}
              >
                {loading ? t('loading', language) : '完成注册'}
              </button>
            </form>
          )}
        </div>

        {/* Login Link */}
        {step === 'register' && (
          <div className="text-center mt-6">
            <p className="text-sm" style={{ color: '#848E9C' }}>
              Already have an account?{' '}
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/login');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="font-semibold hover:underline"
                style={{ color: '#34d399' }}
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}