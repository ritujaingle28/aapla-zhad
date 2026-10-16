import React, { useState, useEffect, useRef } from 'react';
import { AuthUser } from '../../types';
import { ESTATE_IMAGES } from '../../data/orchardData';
import {
  RegisteredAccount,
  getRegisteredUsers,
  saveRegisteredUsers,
  findUserByIdentifier,
  cleanPhone,
  toAuthUser,
} from '../../data/userData';

interface SignInTabProps {
  onSignInSuccess: (user: AuthUser) => void;
  onNavigateHome: () => void;
  onNavigateToPricing: () => void;
}

type AuthMode = 'signin' | 'create-account';
type SignInMethod = 'email' | 'phone';
type Step = 'form' | 'verify-otp';

export const SignInTab: React.FC<SignInTabProps> = ({
  onSignInSuccess,
  onNavigateHome,
  onNavigateToPricing,
}) => {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [currentStep, setCurrentStep] = useState<Step>('form');

  // Sign In method chooser: Email ID vs Phone Number
  const [signInMethod, setSignInMethod] = useState<SignInMethod>('email');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPhone, setSignInPhone] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Create Account fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('Mumbai');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Pending user state for OTP verification
  const [pendingUser, setPendingUser] = useState<RegisteredAccount | null>(null);
  const [verificationChannel, setVerificationChannel] = useState<'email' | 'phone'>('email');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState<number>(45);
  const [otpNotification, setOtpNotification] = useState<string | null>(null);

  // Feedback & Status
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Forgot Password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotMethod, setForgotMethod] = useState<'email' | 'phone'>('email');
  const [forgotValue, setForgotValue] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // OTP input refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (currentStep === 'verify-otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStep, resendTimer]);

  // Generate a random 6-digit OTP and trigger live notice
  const triggerOtpDispatch = (targetUser: RegisteredAccount, channel: 'email' | 'phone') => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpDigits(['', '', '', '', '', '']);
    setResendTimer(45);

    const destination =
      channel === 'phone'
        ? `+91 ${targetUser.phone}`
        : targetUser.email;

    setOtpNotification(
      `Estate Security Dispatch: Verification Code for ${targetUser.name} is [ ${code} ] sent to ${destination}`
    );

    // Auto-focus the first OTP input
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);
  };

  // Switch tabs
  const handleTabSwitch = (mode: AuthMode) => {
    setAuthMode(mode);
    setCurrentStep('form');
    setErrorMessage('');
    setSuccessMessage('');
    setPendingUser(null);
    setOtpNotification(null);
  };

  // Sign In Submission
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    let lookupValue = '';
    if (signInMethod === 'email') {
      lookupValue = signInEmail.trim();
      if (!lookupValue) {
        setErrorMessage('Please enter your registered Email ID.');
        return;
      }
      if (!lookupValue.includes('@')) {
        setErrorMessage('Please enter a valid Email ID (e.g. name@domain.com).');
        return;
      }
    } else {
      lookupValue = signInPhone.trim();
      if (!lookupValue) {
        setErrorMessage('Please enter your registered 10-digit Mobile Phone Number.');
        return;
      }
      if (cleanPhone(lookupValue).length < 10) {
        setErrorMessage('Please enter a valid 10-digit Mobile Phone Number.');
        return;
      }
    }

    if (!signInPassword) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const existing = findUserByIdentifier(lookupValue);

      if (!existing) {
        if (signInMethod === 'email') {
          setErrorMessage(
            `No account found for email "${lookupValue}". If you are new to Aapla Zhad, please create an account.`
          );
        } else {
          setErrorMessage(
            `No account found for phone number "+91 ${lookupValue}". If you are new to Aapla Zhad, please create an account.`
          );
        }
        return;
      }

      if (existing.password && existing.password !== signInPassword) {
        setErrorMessage('Incorrect password. Please verify your credentials or reset your password.');
        return;
      }

      // Existing user confirmed and password matches!
      // Dispatch verification code to the selected method channel
      const channel = signInMethod;
      setPendingUser(existing);
      setVerificationChannel(channel);
      setCurrentStep('verify-otp');
      triggerOtpDispatch(existing, channel);
    }, 500);
  };

  // Create Account Submission
  const handleCreateAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    const emailCheck = regEmail.trim().toLowerCase();
    const phoneCheck = cleanPhone(regPhone);

    if (!emailCheck.includes('@') || !emailCheck.includes('.')) {
      setErrorMessage('Please enter a valid Email ID.');
      return;
    }

    if (phoneCheck.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Check if user already exists in the database
      const existingEmail = findUserByIdentifier(emailCheck);
      const existingPhone = findUserByIdentifier(phoneCheck);

      if (existingEmail || existingPhone) {
        setErrorMessage(
          'An account with this Email or Phone number already exists. Please Sign In to continue.'
        );
        return;
      }

      // New user confirmed: prepare account & initiate verification step
      const newAccount: RegisteredAccount = {
        id: `usr-${Date.now()}`,
        name: regName.trim(),
        email: emailCheck,
        phone: phoneCheck,
        password: regPassword,
        city: regCity,
        role: 'patron',
        joinedDate: 'March 2025',
      };

      setPendingUser(newAccount);
      setVerificationChannel('email');
      setCurrentStep('verify-otp');
      triggerOtpDispatch(newAccount, 'email');
    }, 500);
  };

  // OTP Digit changes
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);
    const nextFocus = Math.min(pasted.length, 5);
    inputRefs.current[nextFocus]?.focus();
  };

  // Auto-fill code helper
  const handleQuickFillOtp = () => {
    if (!generatedOtp) return;
    const digits = generatedOtp.split('');
    setOtpDigits(digits);
    inputRefs.current[5]?.focus();
  };

  // Verify Code Submit
  const handleVerifyOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const enteredCode = otpDigits.join('');
    if (enteredCode.length < 6) {
      setErrorMessage('Please enter the full 6-digit verification code.');
      return;
    }

    if (enteredCode !== generatedOtp) {
      setErrorMessage('Invalid verification code. Please check the code or click Resend.');
      return;
    }

    if (!pendingUser) {
      setErrorMessage('Session expired. Please try again.');
      setCurrentStep('form');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);

      // If this was a new registration, save to database
      if (authMode === 'create-account') {
        const users = getRegisteredUsers();
        saveRegisteredUsers([pendingUser, ...users]);
      }

      setSuccessMessage('Authentication verified successfully! Opening your Patron Portal...');

      setTimeout(() => {
        onSignInSuccess(toAuthUser(pendingUser));
      }, 700);
    }, 600);
  };

  // Resend code handler
  const handleResendCode = () => {
    if (resendTimer > 0 || !pendingUser) return;
    setErrorMessage('');
    triggerOtpDispatch(pendingUser, verificationChannel);
  };

  // Quick Pre-fill Demo Accounts for Testing
  const handleQuickPreFill = (user: RegisteredAccount, method: SignInMethod) => {
    setAuthMode('signin');
    setCurrentStep('form');
    setSignInMethod(method);
    if (method === 'email') {
      setSignInEmail(user.email);
      setSignInPhone('');
    } else {
      setSignInPhone(user.phone);
      setSignInEmail('');
    }
    setSignInPassword(user.password || 'password123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0c0e11] text-[#f2eee9] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between text-[12px] font-sans-ui text-[#9ba1ad]">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 hover:text-[#f2eee9] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Gothangaon Farm</span>
          </button>
          <div className="flex items-center gap-1.5 text-[#C98E4B]">
            <span className="material-symbols-outlined text-[15px] text-[#9cd3b4]">verified_user</span>
            <span>Two-Factor Verified Portal</span>
          </div>
        </div>

        {/* Live OTP Notification Dispatch Banner */}
        {otpNotification && (
          <div className="mb-5 p-4 rounded-xl bg-[#14231b] border border-[#9cd3b4]/40 text-[#f2eee9] shadow-2xl animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#9cd3b4] shrink-0 mt-0.5">
                mark_email_read
              </span>
              <div>
                <div className="text-[11px] font-mono text-[#9cd3b4] uppercase tracking-wider font-semibold">
                  Simulated Security Gateway ({verificationChannel === 'phone' ? 'SMS / WhatsApp' : 'Email'})
                </div>
                <div className="text-[12px] text-[#f2eee9]/90 mt-0.5 font-sans-ui leading-relaxed">
                  Your one-time code is{' '}
                  <strong className="font-mono text-[14px] text-[#fbba72] px-1.5 py-0.5 rounded bg-black/40 border border-[#C98E4B]/30 ml-1">
                    {generatedOtp}
                  </strong>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickFillOtp}
              className="px-3 py-1.5 rounded-lg bg-[#9cd3b4]/20 hover:bg-[#9cd3b4]/30 text-[#9cd3b4] text-[11px] font-sans-ui font-semibold transition-colors cursor-pointer border border-[#9cd3b4]/30 shrink-0 self-start sm:self-auto"
            >
              Fill Code Automatically
            </button>
          </div>
        )}

        {/* Card Container */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#12151a] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C98E4B] to-transparent"></div>

          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-[#1b2026] border border-[#C98E4B]/30 flex items-center justify-center mx-auto mb-4 shadow-md">
              <img
                alt="Aapla Zhad Crest"
                src={ESTATE_IMAGES.logo}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="font-sans-ui text-[10px] uppercase tracking-[0.26em] text-[#C98E4B] font-bold block mb-1">
              PATRON CONCIERGE &amp; PORTAL
            </span>
            <h1 className="font-garamond text-3xl sm:text-4xl text-[#f2eee9] font-normal">
              {currentStep === 'verify-otp'
                ? 'Verify Your Identity'
                : authMode === 'signin'
                ? 'Sign In to Patron Portal'
                : 'Create Patron Account'}
            </h1>
            <p className="font-sans-ui text-[13px] text-[#9ba1ad] font-light mt-2 max-w-sm mx-auto leading-relaxed">
              {currentStep === 'verify-otp'
                ? `Enter the 6-digit authentication verification code sent to your ${
                    verificationChannel === 'phone' ? 'phone number' : 'email address'
                  }.`
                : authMode === 'signin'
                ? 'For existing patrons and reserve stewards with an active tree allocation.'
                : 'New to Aapla Zhad? Register your details to reserve a heritage tree.'}
            </p>
          </div>

          {/* Mode Switcher: Sign In (Existing) vs Create Account (New) */}
          {currentStep === 'form' && (
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0a0c0e] border border-white/[0.06] mb-6 text-[13px] font-sans-ui">
              <button
                type="button"
                onClick={() => handleTabSwitch('signin')}
                className={`py-2.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-sm'
                    : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                }`}
              >
                Sign In (Existing)
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch('create-account')}
                className={`py-2.5 rounded-lg transition-colors font-medium cursor-pointer ${
                  authMode === 'create-account'
                    ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-sm'
                    : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                }`}
              >
                Create Account (New)
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-900/30 border border-red-500/30 text-red-200 text-[12px] font-sans-ui flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-red-400 shrink-0">
                  error
                </span>
                <span>{errorMessage}</span>
              </div>
              {errorMessage.includes('create an account') && (
                <button
                  type="button"
                  onClick={() => handleTabSwitch('create-account')}
                  className="text-[11px] font-semibold text-[#fbba72] hover:underline shrink-0 text-left sm:text-right cursor-pointer"
                >
                  Create Account Now →
                </button>
              )}
              {errorMessage.includes('Please Sign In') && (
                <button
                  type="button"
                  onClick={() => handleTabSwitch('signin')}
                  className="text-[11px] font-semibold text-[#fbba72] hover:underline shrink-0 text-left sm:text-right cursor-pointer"
                >
                  Switch to Sign In →
                </button>
              )}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#14231b] border border-[#9cd3b4]/40 text-[#9cd3b4] text-[12px] font-sans-ui flex items-center gap-2 animate-fade-in">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{successMessage}</span>
            </div>
          )}

          {/* STEP 1: FORM (Sign In or Create Account) */}
          {currentStep === 'form' && (
            <>
              {authMode === 'signin' ? (
                /* SIGN IN FORM FOR EXISTING USERS */
                <form onSubmit={handleSignInSubmit} className="space-y-4 font-sans-ui text-[13px]">
                  
                  {/* Option to Choose Between Phone Number and Email ID */}
                  <div className="p-3 rounded-xl bg-[#0a0c0e] border border-white/[0.08] mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#9ba1ad] text-[11px] uppercase tracking-wider font-semibold">
                        Choose Sign In Option
                      </span>
                      <span className="text-[10px] text-[#C98E4B] font-mono">
                        {signInMethod === 'email' ? 'Using Email ID' : 'Using Phone Number'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 p-1 rounded-lg bg-[#14181f] border border-white/[0.06] text-[12px]">
                      <button
                        type="button"
                        onClick={() => {
                          setSignInMethod('email');
                          setErrorMessage('');
                        }}
                        className={`py-2 rounded-md transition-all font-medium flex items-center justify-center gap-2 cursor-pointer ${
                          signInMethod === 'email'
                            ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-sm'
                            : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">mail</span>
                        <span>Email ID</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSignInMethod('phone');
                          setErrorMessage('');
                        }}
                        className={`py-2 rounded-md transition-all font-medium flex items-center justify-center gap-2 cursor-pointer ${
                          signInMethod === 'phone'
                            ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-sm'
                            : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
                        <span>Phone Number</span>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Input based on Selected Option */}
                  {signInMethod === 'email' ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider font-medium">
                          Registered Email Address
                        </label>
                        <span className="text-[11px] text-[#666c77]">e.g. name@domain.com</span>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="e.g. siddharth.mehta@connoisseur.in"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg px-3.5 py-2.5 text-[#f2eee9] outline-none placeholder:text-[#666c77]"
                        />
                        <span className="material-symbols-outlined text-[18px] text-[#666c77] absolute right-3 top-3 pointer-events-none">
                          mail
                        </span>
                      </div>
                      <p className="text-[11px] text-[#666c77] mt-1">
                        We will send a 6-digit verification code to this email address.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider font-medium">
                          Registered Mobile Phone Number
                        </label>
                        <span className="text-[11px] text-[#666c77]">10 Digits</span>
                      </div>
                      <div className="relative flex items-center">
                        <span className="inline-flex items-center px-3 py-2.5 rounded-l-lg bg-[#161a20] border border-r-0 border-white/[0.08] text-[#C98E4B] font-mono text-[13px] select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="98200 45210"
                          value={signInPhone}
                          onChange={(e) => setSignInPhone(e.target.value)}
                          className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-r-lg px-3.5 py-2.5 text-[#f2eee9] font-mono outline-none placeholder:text-[#666c77]"
                        />
                        <span className="material-symbols-outlined text-[18px] text-[#666c77] absolute right-3 pointer-events-none">
                          phone_iphone
                        </span>
                      </div>
                      <p className="text-[11px] text-[#666c77] mt-1">
                        We will send a 6-digit verification code via SMS / WhatsApp to this number.
                      </p>
                    </div>
                  )}

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider font-medium">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotMethod(signInMethod);
                          setForgotValue(signInMethod === 'email' ? signInEmail : signInPhone);
                          setShowForgotModal(true);
                        }}
                        className="text-[11px] text-[#C98E4B] hover:text-[#fbba72] cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter your security password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg px-3.5 py-2.5 text-[#f2eee9] outline-none placeholder:text-[#666c77]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-[#666c77] hover:text-[#f2eee9] cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#9ba1ad] text-[12px]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded bg-[#1b2026] border-white/20 text-[#C98E4B] focus:ring-0"
                      />
                      <span>Remember this device for 30 days</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-lg bg-[#C98E4B] hover:bg-[#d89e5c] text-[#0c0e11] font-semibold text-[13px] tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#0c0e11] border-t-transparent animate-spin"></span>
                        <span>Verifying Account...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          Proceed to Verification ({signInMethod === 'email' ? 'Email' : 'Phone'})
                        </span>
                        <span className="material-symbols-outlined text-[16px]">security</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[12px] text-[#9ba1ad]">
                      Don't have an existing tree account?{' '}
                      <button
                        type="button"
                        onClick={() => handleTabSwitch('create-account')}
                        className="text-[#C98E4B] hover:underline font-semibold cursor-pointer"
                      >
                        Create an Account
                      </button>
                    </span>
                  </div>
                </form>
              ) : (
                /* CREATE ACCOUNT FORM FOR NEW USERS */
                <form onSubmit={handleCreateAccountSubmit} className="space-y-4 font-sans-ui text-[13px]">
                  <div>
                    <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1.5 font-medium">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Siddharth Mehta"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg px-3.5 py-2.5 text-[#f2eee9] outline-none placeholder:text-[#666c77]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg px-3.5 py-2.5 text-[#f2eee9] outline-none placeholder:text-[#666c77]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1.5 font-medium">
                        Mobile Number (WhatsApp/OTP) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg px-3.5 py-2.5 text-[#f2eee9] outline-none placeholder:text-[#666c77]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1.5 font-medium">
                      Primary Delivery City
                    </label>
                    <select
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg px-3.5 py-2.5 text-[#f2eee9] outline-none"
                    >
                      <option value="Mumbai">Mumbai &amp; Thane Region</option>
                      <option value="Delhi NCR">Delhi NCR (Gurugram, Noida)</option>
                      <option value="Bengaluru">Bengaluru Urban</option>
                      <option value="Pune">Pune &amp; PCMC</option>
                      <option value="Ahmedabad">Ahmedabad &amp; Gandhinagar</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Other">Other Metro Region</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1.5 font-medium">
                        Create Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg px-3.5 py-2.5 text-[#f2eee9] outline-none placeholder:text-[#666c77]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1.5 font-medium">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Re-type password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg px-3.5 py-2.5 text-[#f2eee9] outline-none placeholder:text-[#666c77]"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-[#666c77] leading-relaxed">
                    By registering, you agree to receive official harvest notices, tree reservations, and two-factor security alerts from Gothangaon Farm.
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-lg bg-[#C98E4B] hover:bg-[#d89e5c] text-[#0c0e11] font-semibold text-[13px] tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#0c0e11] border-t-transparent animate-spin"></span>
                        <span>Verifying Availability...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify &amp; Create Account</span>
                        <span className="material-symbols-outlined text-[16px]">verified_user</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[12px] text-[#9ba1ad]">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => handleTabSwitch('signin')}
                        className="text-[#C98E4B] hover:underline font-semibold cursor-pointer"
                      >
                        Sign In to Existing Account
                      </button>
                    </span>
                  </div>
                </form>
              )}
            </>
          )}

          {/* STEP 2: VERIFY OTP SCREEN */}
          {currentStep === 'verify-otp' && pendingUser && (
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-6 font-sans-ui animate-fade-in">
              <div className="p-4 rounded-xl bg-[#0a0c0e] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#9ba1ad] uppercase tracking-wider font-medium">
                    Target Verification Recipient
                  </div>
                  <div className="text-[14px] text-[#f2eee9] font-medium mt-0.5">
                    {pendingUser.name}
                  </div>
                  <div className="text-[12px] text-[#C98E4B] font-mono">
                    {verificationChannel === 'phone'
                      ? `+91 ${pendingUser.phone}`
                      : pendingUser.email}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep('form');
                    setErrorMessage('');
                  }}
                  className="text-[11px] text-[#9ba1ad] hover:text-[#f2eee9] underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Explicit Choice Between Email ID and Phone Number for Receiving Verification Code */}
              <div className="p-3 rounded-xl bg-[#14181f] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#9ba1ad] font-semibold">
                    Receive Code Via:
                  </span>
                  <span className="text-[10px] text-[#9cd3b4] font-medium">
                    Active Channel: {verificationChannel === 'email' ? 'Email ID' : 'Phone Number'}
                  </span>
                </div>

                <div className="grid grid-cols-2 p-1 rounded-lg bg-[#0a0c0e] border border-white/[0.06] text-[12px]">
                  <button
                    type="button"
                    onClick={() => {
                      setVerificationChannel('email');
                      triggerOtpDispatch(pendingUser, 'email');
                    }}
                    className={`py-2 rounded-md transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
                      verificationChannel === 'email'
                        ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-sm'
                        : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">mail</span>
                    <span>Email ID</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVerificationChannel('phone');
                      triggerOtpDispatch(pendingUser, 'phone');
                    }}
                    className={`py-2 rounded-md transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
                      verificationChannel === 'phone'
                        ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-sm'
                        : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">phone_iphone</span>
                    <span>Phone Number</span>
                  </button>
                </div>
              </div>

              {/* 6-Digit Code Input */}
              <div>
                <label className="block text-center text-[#9ba1ad] text-[12px] uppercase tracking-wider mb-3 font-medium">
                  Enter 6-Digit Code
                </label>
                <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-bold bg-[#1b2026] border border-white/[0.12] focus:border-[#C98E4B] focus:bg-[#222830] text-[#f2eee9] rounded-xl outline-none transition-all shadow-inner"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Code Countdown */}
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#666c77]">Didn't receive code?</span>
                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={handleResendCode}
                  className={`font-medium cursor-pointer transition-colors ${
                    resendTimer > 0
                      ? 'text-[#666c77] cursor-not-allowed'
                      : 'text-[#C98E4B] hover:text-[#fbba72] underline'
                  }`}
                >
                  {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code Now'}
                </button>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isVerifying || otpDigits.join('').length < 6}
                  className="w-full py-3.5 rounded-lg bg-[#C98E4B] hover:bg-[#d89e5c] text-[#0c0e11] font-semibold text-[13px] tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-[#0c0e11] border-t-transparent animate-spin"></span>
                      <span>Authenticating Token...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify &amp; Enter Portal</span>
                      <span className="material-symbols-outlined text-[16px]">login</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep('form');
                    setErrorMessage('');
                  }}
                  className="w-full py-2.5 text-[12px] text-[#9ba1ad] hover:text-[#f2eee9] transition-colors cursor-pointer"
                >
                  Back to {authMode === 'signin' ? 'Sign In' : 'Registration'}
                </button>
              </div>
            </form>
          )}

          {/* Quick Pre-fill Demo Accounts for Testing Both Phone and Email Options */}
          {currentStep === 'form' && authMode === 'signin' && (
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans-ui text-[11px] uppercase tracking-widest text-[#9ba1ad] font-semibold">
                  Test Existing Accounts: Choose Email or Phone
                </span>
                <span className="text-[10px] text-[#9cd3b4] font-medium bg-[#9cd3b4]/10 border border-[#9cd3b4]/20 px-2 py-0.5 rounded">
                  Instant Test
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Siddharth Mehta */}
                <div className="p-3 rounded-lg bg-[#1b2026] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <div className="font-sans-ui text-[12px] text-[#f2eee9] font-medium flex items-center gap-2">
                      <span>Siddharth Mehta</span>
                      <span className="text-[10px] text-[#C98E4B] bg-[#C98E4B]/10 px-1.5 py-0.5 rounded">
                        Tree #88
                      </span>
                    </div>
                    <div className="text-[11px] text-[#666c77] font-mono mt-0.5">
                      Email: siddharth.mehta@connoisseur.in · Phone: 9820045210
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuickPreFill(
                          {
                            id: 'usr-sm-88',
                            name: 'Siddharth Mehta',
                            email: 'siddharth.mehta@connoisseur.in',
                            phone: '9820045210',
                            password: 'password123',
                            city: 'Mumbai',
                            role: 'patron',
                            treeAllocated: 'KESHAR-1936 · TREE-088',
                            plotNumber: 'ESTATE PLOT #09',
                            certificateNumber: 'AZ-2025-KSH088-012',
                            joinedDate: 'Season 2024',
                          },
                          'email'
                        )
                      }
                      className="px-2.5 py-1.5 rounded bg-[#242b35] hover:bg-[#2e3744] text-[11px] text-[#f2eee9] font-medium transition-colors border border-white/[0.06] cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px] text-[#C98E4B]">mail</span>
                      <span>Use Email</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuickPreFill(
                          {
                            id: 'usr-sm-88',
                            name: 'Siddharth Mehta',
                            email: 'siddharth.mehta@connoisseur.in',
                            phone: '9820045210',
                            password: 'password123',
                            city: 'Mumbai',
                            role: 'patron',
                            treeAllocated: 'KESHAR-1936 · TREE-088',
                            plotNumber: 'ESTATE PLOT #09',
                            certificateNumber: 'AZ-2025-KSH088-012',
                            joinedDate: 'Season 2024',
                          },
                          'phone'
                        )
                      }
                      className="px-2.5 py-1.5 rounded bg-[#242b35] hover:bg-[#2e3744] text-[11px] text-[#f2eee9] font-medium transition-colors border border-white/[0.06] cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px] text-[#9cd3b4]">
                        phone_iphone
                      </span>
                      <span>Use Phone</span>
                    </button>
                  </div>
                </div>

                {/* Dr. Ananya Roy */}
                <div className="p-3 rounded-lg bg-[#1b2026] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <div className="font-sans-ui text-[12px] text-[#f2eee9] font-medium flex items-center gap-2">
                      <span>Dr. Ananya Roy</span>
                      <span className="text-[10px] text-[#9cd3b4] bg-[#9cd3b4]/10 px-1.5 py-0.5 rounded">
                        Tree #104
                      </span>
                    </div>
                    <div className="text-[11px] text-[#666c77] font-mono mt-0.5">
                      Email: ananya.roy@health.org · Phone: 9845012345
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuickPreFill(
                          {
                            id: 'usr-ar-104',
                            name: 'Dr. Ananya Roy',
                            email: 'ananya.roy@health.org',
                            phone: '9845012345',
                            password: 'password123',
                            city: 'Bengaluru',
                            role: 'patron',
                            treeAllocated: 'KESHAR-1948 · TREE-104',
                            plotNumber: 'ESTATE PLOT #14',
                            certificateNumber: 'AZ-2025-KSH104-089',
                            joinedDate: 'Season 2024',
                          },
                          'email'
                        )
                      }
                      className="px-2.5 py-1.5 rounded bg-[#242b35] hover:bg-[#2e3744] text-[11px] text-[#f2eee9] font-medium transition-colors border border-white/[0.06] cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px] text-[#C98E4B]">mail</span>
                      <span>Use Email</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuickPreFill(
                          {
                            id: 'usr-ar-104',
                            name: 'Dr. Ananya Roy',
                            email: 'ananya.roy@health.org',
                            phone: '9845012345',
                            password: 'password123',
                            city: 'Bengaluru',
                            role: 'patron',
                            treeAllocated: 'KESHAR-1948 · TREE-104',
                            plotNumber: 'ESTATE PLOT #14',
                            certificateNumber: 'AZ-2025-KSH104-089',
                            joinedDate: 'Season 2024',
                          },
                          'phone'
                        )
                      }
                      className="px-2.5 py-1.5 rounded bg-[#242b35] hover:bg-[#2e3744] text-[11px] text-[#f2eee9] font-medium transition-colors border border-white/[0.06] cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px] text-[#9cd3b4]">
                        phone_iphone
                      </span>
                      <span>Use Phone</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tree Booking Prompt */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] text-center text-[12px] font-sans-ui text-[#9ba1ad]">
            Looking to reserve a numbered heritage tree?{' '}
            <button
              type="button"
              onClick={onNavigateToPricing}
              className="text-[#C98E4B] hover:text-[#fbba72] font-semibold cursor-pointer underline underline-offset-4"
            >
              Explore 2025 Tree Allocations (₹3,500 deposit)
            </button>
          </div>
        </div>

        {/* Security Trust Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-sans-ui text-[#666c77]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9cd3b4] text-[15px]">lock</span>
            <span>Two-Factor Authentication Protocol</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#C98E4B] text-[15px]">verified</span>
            <span>Gothangaon Farm Provenance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#C98E4B] text-[15px]">nature</span>
            <span>100% Zero Carbide Certified</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal with Option to choose Email or Phone */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151a] border border-[#C98E4B]/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-[#666c77] hover:text-[#f2eee9] cursor-pointer text-lg"
            >
              ✕
            </button>
            <h3 className="font-garamond text-2xl text-[#f2eee9] mb-2">
              Recover Patron Credentials
            </h3>
            <p className="font-sans-ui text-[13px] text-[#9ba1ad] mb-4 font-light">
              Select how you would like to receive your secure recovery verification code.
            </p>

            {/* Option to choose Email or Phone */}
            <div className="grid grid-cols-2 p-1 rounded-lg bg-[#0a0c0e] border border-white/[0.06] text-[12px] mb-4">
              <button
                type="button"
                onClick={() => setForgotMethod('email')}
                className={`py-2 rounded-md transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
                  forgotMethod === 'email'
                    ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-sm'
                    : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">mail</span>
                <span>Email ID</span>
              </button>
              <button
                type="button"
                onClick={() => setForgotMethod('phone')}
                className={`py-2 rounded-md transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
                  forgotMethod === 'phone'
                    ? 'bg-[#C98E4B] text-[#0c0e11] font-semibold shadow-sm'
                    : 'text-[#9ba1ad] hover:text-[#f2eee9]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">phone_iphone</span>
                <span>Phone Number</span>
              </button>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-[#14231b] border border-[#9cd3b4]/40 text-[#9cd3b4] text-[13px] font-sans-ui flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
                <span>
                  Recovery verification link dispatched to your {forgotMethod === 'email' ? 'email' : 'mobile phone'}!
                </span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (forgotValue.trim()) {
                    setForgotSent(true);
                    setTimeout(() => {
                      setForgotSent(false);
                      setShowForgotModal(false);
                      setForgotValue('');
                    }, 3000);
                  }
                }}
                className="space-y-4 font-sans-ui text-[13px]"
              >
                {forgotMethod === 'email' ? (
                  <div>
                    <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1 font-medium">
                      Registered Email ID
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. siddharth.mehta@connoisseur.in"
                      value={forgotValue}
                      onChange={(e) => setForgotValue(e.target.value)}
                      className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-lg p-2.5 text-[#f2eee9] outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[#9ba1ad] text-[11px] uppercase tracking-wider mb-1 font-medium">
                      Registered Mobile Phone Number
                    </label>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-2.5 rounded-l-lg bg-[#161a20] border border-r-0 border-white/[0.08] text-[#C98E4B] font-mono text-[13px] select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98200 45210"
                        value={forgotValue}
                        onChange={(e) => setForgotValue(e.target.value)}
                        className="w-full bg-[#1b2026] border border-white/[0.08] focus:border-[#C98E4B] rounded-r-lg p-2.5 text-[#f2eee9] font-mono outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded border border-white/[0.08] text-[#9ba1ad] hover:text-[#f2eee9] text-[12px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-[#C98E4B] hover:bg-[#d89e5c] text-[#0c0e11] font-semibold text-[12px] cursor-pointer"
                  >
                    Send Recovery Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
