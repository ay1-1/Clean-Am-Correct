import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Shield,
  Sparkles,
  User,
  Mail,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { servicesData } from '../data/services';

/* ------------------------------------------------------------------ */
/*  Paystack types                                                       */
/* ------------------------------------------------------------------ */
declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: PaystackOptions) => { openIframe: () => void };
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number; // kobo
  currency: string;
  ref: string;
  metadata: Record<string, unknown>;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Service pricing (NGN)                                               */
/* ------------------------------------------------------------------ */
const servicePricing: Record<string, { min: number; label: string }> = {
  'residential-cleaning': { min: 8000, label: '₦8,000 deposit' },
  'deep-cleaning': { min: 15000, label: '₦15,000 deposit' },
  'commercial-cleaning': { min: 20000, label: '₦20,000 deposit' },
  'move-in-move-out': { min: 18000, label: '₦18,000 deposit' },
  'post-event-cleaning': { min: 12000, label: '₦12,000 deposit' },
};

/* ------------------------------------------------------------------ */
/*  Component props                                                      */
/* ------------------------------------------------------------------ */
interface PaymentPortalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-select a service when opened from a service card */
  preSelectedServiceId?: string;
}

/* ------------------------------------------------------------------ */
/*  Paystack public key — replace with your real key                    */
/* ------------------------------------------------------------------ */
const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

/* ------------------------------------------------------------------ */
/*  Main Component                                                       */
/* ------------------------------------------------------------------ */
export const PaymentPortal: React.FC<PaymentPortalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
}) => {
  /* ---------- State ---------- */
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedServiceId ?? ''
  );
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paystackError, setPaystackError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentRef, setPaymentRef] = useState<string | null>(null);

  /* ---------- Pre-select service ---------- */
  useEffect(() => {
    if (preSelectedServiceId) setSelectedServiceId(preSelectedServiceId);
  }, [preSelectedServiceId]);

  /* ---------- Lock body scroll ---------- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* ---------- Load Paystack script ---------- */
  useEffect(() => {
    if (!isOpen) return;
    if (window.PaystackPop) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () =>
      setPaystackError(
        'Could not load payment gateway. Please check your internet connection.'
      );
    document.body.appendChild(script);
    return () => {
      // leave script in DOM for reuse
    };
  }, [isOpen]);

  /* ---------- Reset on close ---------- */
  const handleClose = useCallback(() => {
    setStep(1);
    setSelectedServiceId(preSelectedServiceId ?? '');
    setForm({ name: '', email: '', phone: '' });
    setErrors({});
    setLoading(false);
    setPaymentSuccess(false);
    setPaymentRef(null);
    setPaystackError(null);
    onClose();
  }, [onClose, preSelectedServiceId]);

  /* ---------- Helpers ---------- */
  const selectedService = servicesData.find((s) => s.id === selectedServiceId);
  const pricing = selectedServiceId ? servicePricing[selectedServiceId] : null;

  const generateRef = () =>
    `CAC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  /* ---------- Validation ---------- */
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your full name';
    if (!form.email.trim()) newErrors.email = 'Please enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email address';
    if (!form.phone.trim()) newErrors.phone = 'Please enter your phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- Paystack payment ---------- */
  const initiatePayment = () => {
    if (!scriptLoaded || !window.PaystackPop) {
      setPaystackError(
        'Payment gateway is not ready yet. Please wait a moment and try again.'
      );
      return;
    }
    if (!pricing) return;
    setLoading(true);
    setPaystackError(null);

    const ref = generateRef();

    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: form.email,
        amount: pricing.min * 100, // kobo
        currency: 'NGN',
        ref,
        metadata: {
          custom_fields: [
            { display_name: 'Customer Name', variable_name: 'name', value: form.name },
            { display_name: 'Phone', variable_name: 'phone', value: form.phone },
            {
              display_name: 'Service',
              variable_name: 'service',
              value: selectedService?.title ?? selectedServiceId,
            },
          ],
        },
        callback: (response) => {
          setLoading(false);
          setPaymentRef(response.reference);
          setPaymentSuccess(true);
          setStep(3);
        },
        onClose: () => {
          setLoading(false);
        },
      });
      handler.openIframe();
    } catch (err) {
      setLoading(false);
      setPaystackError('Something went wrong launching the payment window. Please try again.');
    }
  };

  /* ---------- Keyboard escape ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  if (!isOpen) return null;

  /* ==================================================================
     RENDER
  ================================================================== */
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-portal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#06101e]/80 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl flex flex-col">
        {/* ── Header ── */}
        <div className="relative bg-gradient-to-br from-[#032b69] via-[#043580] to-[#0284c7] p-6 rounded-t-2xl overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#38b6ff]/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl pointer-events-none" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#38b6ff] flex items-center justify-center">
                  <CreditCard className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-bold tracking-widest uppercase text-sky-200">
                  Secure Payment
                </span>
              </div>
              <h2
                id="payment-portal-title"
                className="font-serif-brand text-2xl font-bold text-white leading-tight"
              >
                Book & Pay Online
              </h2>
              <p className="text-sm text-sky-100/80 mt-1">
                Pay a deposit to confirm your cleaning booking.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close payment portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step indicator */}
          {!paymentSuccess && (
            <div className="relative flex items-center gap-2 mt-5">
              {[
                { n: 1, label: 'Service' },
                { n: 2, label: 'Details' },
                { n: 3, label: 'Payment' },
              ].map((s, i) => (
                <React.Fragment key={s.n}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step >= s.n
                          ? 'bg-[#38b6ff] text-white'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {step > s.n ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.n}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        step >= s.n ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`flex-1 h-px ${
                        step > s.n ? 'bg-[#38b6ff]' : 'bg-white/15'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex-1 p-6">
          {/* ===== STEP 1: Select Service ===== */}
          {step === 1 && (
            <div>
              <h3 className="text-base font-bold text-[#032b69] mb-1">
                Choose Your Service
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Select the cleaning service you'd like to book.
              </p>

              <div className="space-y-2.5">
                {servicesData.map((service) => {
                  const price = servicePricing[service.id];
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      id={`service-option-${service.id}`}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                        isSelected
                          ? 'border-[#38b6ff] bg-sky-50 shadow-md'
                          : 'border-slate-100 hover:border-sky-200 hover:bg-sky-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-sm font-bold ${
                                isSelected ? 'text-[#032b69]' : 'text-slate-800'
                              }`}
                            >
                              {service.title}
                            </span>
                            {service.popular && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#38b6ff] px-2 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                            {service.shortDesc}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? 'text-[#0284c7]' : 'text-slate-500'
                            }`}
                          >
                            {price?.label}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ml-auto transition-all ${
                              isSelected
                                ? 'border-[#38b6ff] bg-[#38b6ff]'
                                : 'border-slate-200'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Notice */}
              <p className="text-[11px] text-slate-400 mt-4 flex items-start gap-1.5">
                <Shield className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#38b6ff]" />
                Deposit amounts shown are the minimum required to confirm your booking.
                Final pricing will be confirmed via WhatsApp.
              </p>
            </div>
          )}

          {/* ===== STEP 2: Customer Details ===== */}
          {step === 2 && (
            <div>
              <h3 className="text-base font-bold text-[#032b69] mb-1">
                Your Details
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                We'll use these details to confirm your booking.
              </p>

              {/* Service summary pill */}
              {selectedService && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border border-sky-100 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[#38b6ff] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#032b69]">
                      {selectedService.title}
                    </p>
                    <p className="text-xs text-[#0284c7] font-semibold">
                      {pricing?.label}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-[#032b69] transition-colors"
                  >
                    Change
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="payment-name"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="payment-name"
                      type="text"
                      placeholder="e.g. Amaka Johnson"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.name
                          ? 'border-red-300 bg-red-50 focus:border-red-400'
                          : 'border-slate-200 bg-white focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="payment-email"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="payment-email"
                      type="email"
                      placeholder="e.g. amaka@gmail.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.email
                          ? 'border-red-300 bg-red-50 focus:border-red-400'
                          : 'border-slate-200 bg-white focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="payment-phone"
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 block"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="payment-phone"
                      type="tel"
                      placeholder="e.g. 08012345678"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                        errors.phone
                          ? 'border-red-300 bg-red-50 focus:border-red-400'
                          : 'border-slate-200 bg-white focus:border-[#38b6ff] focus:ring-2 focus:ring-[#38b6ff]/20'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {paystackError && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {paystackError}
                </div>
              )}

              {/* Trust badges */}
              <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  256-bit SSL encrypted
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38b6ff]" />
                  Powered by Paystack
                </div>
              </div>
            </div>
          )}

          {/* ===== STEP 3: Success ===== */}
          {step === 3 && paymentSuccess && (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center mb-5 shadow-md">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="font-serif-brand text-2xl font-bold text-[#032b69] mb-2">
                Payment Successful!
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-4">
                Thank you, <span className="font-bold text-[#032b69]">{form.name.split(' ')[0]}</span>!
                Your deposit for <span className="font-bold text-[#0284c7]">{selectedService?.title}</span> has been received.
                We'll contact you on <span className="font-bold">{form.phone}</span> within 2 hours to confirm your booking date.
              </p>

              {paymentRef && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 mb-5">
                  Reference: <span className="font-mono font-bold text-[#032b69]">{paymentRef}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href={`https://wa.me/2347046975466?text=${encodeURIComponent(
                    `Hello Clean Am Correct, I just paid my deposit for the ${selectedService?.title} service. My name is ${form.name} and my reference is ${paymentRef}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#25D366] text-white text-sm font-bold shadow-sm hover:bg-[#1ebe5d] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M11.99 0C5.364 0 0 5.373 0 12c0 2.115.554 4.103 1.524 5.827L0 24l6.341-1.498A11.94 11.94 0 0011.99 24C18.626 24 24 18.627 24 12S18.626 0 11.99 0zm.01 21.818a9.808 9.808 0 01-5.012-1.373l-.359-.214-3.764.889.939-3.671-.234-.376A9.818 9.818 0 012.182 12c0-5.423 4.413-9.836 9.818-9.836 5.424 0 9.837 4.413 9.837 9.836 0 5.424-4.413 9.818-9.837 9.818z" />
                  </svg>
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-5 rounded-full border-2 border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer navigation ── */}
        {!paymentSuccess && (
          <div className="px-6 pb-6 flex gap-3">
            {/* Back button */}
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="flex items-center gap-1.5 px-5 py-3 rounded-full border-2 border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}

            {/* Next / Pay button */}
            {step === 1 && (
              <button
                id="payment-next-step-1"
                onClick={() => {
                  if (!selectedServiceId) return;
                  setStep(2);
                }}
                disabled={!selectedServiceId}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-bold tracking-wide transition-all ${
                  selectedServiceId
                    ? 'bg-[#032b69] text-white hover:bg-[#021d45] shadow-md hover:shadow-lg'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                id="payment-pay-button"
                onClick={() => {
                  if (!validateStep2()) return;
                  initiatePayment();
                }}
                disabled={loading || !scriptLoaded}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-bold tracking-wide bg-gradient-to-r from-[#0284c7] to-[#38b6ff] text-white hover:from-[#0369a1] hover:to-[#0ea5e9] shadow-md hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing…
                  </>
                ) : !scriptLoaded ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading Gateway…
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pay {pricing?.label}
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
