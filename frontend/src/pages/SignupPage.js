import { useState } from 'react';
import {
  Eye, EyeOff, Briefcase, Mail, Lock,
  User, Phone, Building2, ArrowRight, CheckCircle
} from 'lucide-react';
import { authAPI } from '../api';

function SignupPage() {
  const [role, setRole] = useState('candidate');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    password: '', companyName: '', city: ''
  });

  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return { strength: 0, label: '', color: '' };
    if (pass.length < 6) return { strength: 1, label: 'Weak', color: '#EF4444' };
    if (pass.length < 10) return { strength: 2, label: 'Fair', color: '#F59E0B' };
    if (pass.length >= 10 && /[A-Z]/.test(pass) && /[0-9]/.test(pass))
      return { strength: 4, label: 'Strong', color: '#10B981' };
    return { strength: 3, label: 'Good', color: '#3B82F6' };
  };

  const pwStrength = getPasswordStrength(form.password);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (role === 'candidate') {
        data = await authAPI.registerCandidate({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password
        });
      } else {
        data = await authAPI.registerCompany({
          companyName: form.companyName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          city: form.city
        });
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px 11px 40px',
    border: '1.5px solid #e2e8f0', borderRadius: '10px',
    fontSize: '14px', color: '#0f172a', outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box', fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block', fontSize: '13px',
    fontWeight: '500', color: '#374151', marginBottom: '6px'
  };

  const iconStyle = {
    position: 'absolute', left: '14px',
    top: '50%', transform: 'translateY(-50%)',
    pointerEvents: 'none'
  };

  if (step === 2) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '24px'
      }}>
        <div style={{
          background: '#ffffff', borderRadius: '20px',
          padding: '48px 32px', border: '1px solid #e2e8f0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          textAlign: 'center', maxWidth: '400px', width: '100%'
        }}>
          <div style={{
            width: '64px', height: '64px', background: '#ECFDF5',
            borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle size={32} color="#10B981" />
          </div>
          <h2 style={{
            fontSize: '22px', fontWeight: '700',
            color: '#0f172a', marginBottom: '8px'
          }}>Account created!</h2>
          <p style={{
            fontSize: '14px', color: '#64748b',
            marginBottom: '8px', lineHeight: '1.6'
          }}>Welcome to JobMatch AI</p>
          <p style={{
            fontSize: '14px', fontWeight: '600',
            color: '#185FA5', marginBottom: '24px'
          }}>{form.email}</p>
          <button
            onClick={() => {
              if (role === 'candidate') {
                window.location.href = '/dashboard';
              } else {
                window.location.href = '/company/dashboard';
              }
            }}
            style={{
              width: '100%', padding: '13px',
              background: '#185FA5', color: 'white',
              border: 'none', borderRadius: '12px',
              fontSize: '15px', fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(24,95,165,0.3)'
            }}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px', height: '48px', background: '#185FA5',
            borderRadius: '12px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <Briefcase size={24} color="white" />
          </div>
          <h1 style={{
            fontSize: '24px', fontWeight: '700',
            color: '#0f172a', marginBottom: '4px'
          }}>Create your account</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Join 2,400+ candidates finding their dream job
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#ffffff', borderRadius: '20px',
          padding: '32px', border: '1px solid #e2e8f0',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
        }}>

          {/* Role Toggle */}
          <div style={{
            display: 'flex', background: '#f1f5f9',
            borderRadius: '12px', padding: '4px', marginBottom: '24px'
          }}>
            {['candidate', 'company'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: '8px', border: 'none',
                borderRadius: '10px', fontSize: '14px',
                fontWeight: '500', cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: role === r ? '#ffffff' : 'transparent',
                color: role === r ? '#185FA5' : '#64748b',
                boxShadow: role === r ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
              }}>
                {r === 'candidate' ? '👤 I am a Candidate' : '🏢 I am a Company'}
              </button>
            ))}
          </div>

          {/* Candidate Fields */}
          {role === 'candidate' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Full name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#94a3b8" style={iconStyle} />
                <input type="text" placeholder="Akshat Pandey"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#185FA5'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>
          )}

          {/* Company Fields */}
          {role === 'company' && (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Company name</label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={16} color="#94a3b8" style={iconStyle} />
                  <input type="text" placeholder="Infosys BPO Indore"
                    value={form.companyName}
                    onChange={e => setForm({ ...form, companyName: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#185FA5'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>City</label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={16} color="#94a3b8" style={iconStyle} />
                  <input type="text" placeholder="Indore"
                    value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#185FA5'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#94a3b8" style={iconStyle} />
              <input type="email" placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#185FA5'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Phone number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} color="#94a3b8" style={iconStyle} />
              <input type="tel" placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#185FA5'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '8px' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#94a3b8" style={iconStyle} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 8 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ ...inputStyle, paddingRight: '40px' }}
                onFocus={e => e.target.style.borderColor = '#185FA5'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{
                position: 'absolute', right: '14px',
                top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer'
              }}>
                {showPassword
                  ? <EyeOff size={16} color="#94a3b8" />
                  : <Eye size={16} color="#94a3b8" />}
              </button>
            </div>
          </div>

          {/* Password Strength */}
          {form.password.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    flex: 1, height: '3px', borderRadius: '2px',
                    background: i <= pwStrength.strength ? pwStrength.color : '#e2e8f0',
                    transition: 'background 0.2s ease'
                  }} />
                ))}
              </div>
              <span style={{
                fontSize: '12px', color: pwStrength.color, fontWeight: '500'
              }}>{pwStrength.label} password</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: '10px', padding: '10px 14px',
              marginBottom: '16px', fontSize: '13px', color: '#DC2626'
            }}>{error}</div>
          )}

          {/* Terms */}
          <div style={{
            display: 'flex', alignItems: 'flex-start',
            gap: '8px', marginBottom: '24px'
          }}>
            <input type="checkbox" id="terms" style={{
              width: '16px', height: '16px',
              accentColor: '#185FA5', cursor: 'pointer',
              marginTop: '2px', flexShrink: 0
            }} />
            <label htmlFor="terms" style={{
              fontSize: '13px', color: '#64748b',
              cursor: 'pointer', lineHeight: '1.5'
            }}>
              I agree to the{' '}
              <span style={{ color: '#185FA5', fontWeight: '500' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: '#185FA5', fontWeight: '500' }}>Privacy Policy</span>
            </label>
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} style={{
            width: '100%', padding: '13px',
            background: loading ? '#94a3b8' : '#185FA5',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '15px', fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: loading ? 'none' : '0 4px 12px rgba(24,95,165,0.3)'
          }}>
            {loading ? (
              <>
                <div style={{
                  width: '16px', height: '16px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></div>
                Creating account...
              </>
            ) : (
              <>Create Account <ArrowRight size={16} /></>
            )}
          </button>

          {/* Login Link */}
          <p style={{
            textAlign: 'center', fontSize: '14px',
            color: '#64748b', marginTop: '20px'
          }}>
            Already have an account?{' '}
            <button
              onClick={() => window.location.href = '/login'}
              style={{
                background: 'none', border: 'none',
                color: '#185FA5', fontWeight: '600',
                cursor: 'pointer', fontSize: '14px'
              }}>Sign in</button>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default SignupPage;