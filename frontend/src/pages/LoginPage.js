import { useState } from 'react';
import { Eye, EyeOff, Briefcase, Mail, Lock, ArrowRight } from 'lucide-react';
import { authAPI } from '../api';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('candidate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await authAPI.login(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.user.role === 'CANDIDATE') {
        window.location.href = '/dashboard';
      } else if (data.user.role === 'COMPANY') {
        window.location.href = '/company/dashboard';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px', height: '48px',
            background: '#185FA5', borderRadius: '12px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 12px'
          }}>
            <Briefcase size={24} color="white" />
          </div>
          <h1 style={{
            fontSize: '24px', fontWeight: '700',
            color: '#0f172a', marginBottom: '4px'
          }}>Welcome back</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Sign in to your JobMatch AI account
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
                {r === 'candidate' ? '👤 Candidate' : '🏢 Company'}
              </button>
            ))}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block', fontSize: '13px',
              fontWeight: '500', color: '#374151', marginBottom: '6px'
            }}>Email address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#94a3b8" style={{
                position: 'absolute', left: '14px',
                top: '50%', transform: 'translateY(-50%)'
              }} />
              <input type="email" placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{
                  width: '100%', padding: '11px 14px 11px 40px',
                  border: '1.5px solid #e2e8f0', borderRadius: '10px',
                  fontSize: '14px', color: '#0f172a', outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#185FA5'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{
              display: 'block', fontSize: '13px',
              fontWeight: '500', color: '#374151', marginBottom: '6px'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#94a3b8" style={{
                position: 'absolute', left: '14px',
                top: '50%', transform: 'translateY(-50%)'
              }} />
              <input type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{
                  width: '100%', padding: '11px 40px 11px 40px',
                  border: '1.5px solid #e2e8f0', borderRadius: '10px',
                  fontSize: '14px', color: '#0f172a', outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#185FA5'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{
                position: 'absolute', right: '14px',
                top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer'
              }}>
                {showPassword ? <EyeOff size={16} color="#94a3b8" /> : <Eye size={16} color="#94a3b8" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <button style={{
              background: 'none', border: 'none',
              fontSize: '13px', color: '#185FA5',
              cursor: 'pointer', fontWeight: '500'
            }}>Forgot password?</button>
          </div>

          {/* Remember Me */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '8px', marginBottom: '20px'
          }}>
            <input type="checkbox" id="remember" style={{
              width: '16px', height: '16px',
              accentColor: '#185FA5', cursor: 'pointer'
            }} />
            <label htmlFor="remember" style={{
              fontSize: '13px', color: '#64748b', cursor: 'pointer'
            }}>Remember me for 30 days</label>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: '10px', padding: '10px 14px',
              marginBottom: '16px', fontSize: '13px', color: '#DC2626'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
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
                Signing in...
              </>
            ) : (
              <>Sign In <ArrowRight size={16} /></>
            )}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '12px', margin: '24px 0'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>

          {/* Sign Up Link */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
            Don't have an account?{' '}
            <button
              onClick={() => window.location.href = '/signup'}
              style={{
                background: 'none', border: 'none',
                color: '#185FA5', fontWeight: '600',
                cursor: 'pointer', fontSize: '14px'
              }}>
              Create free account
            </button>
          </p>
        </div>

        <p style={{
          textAlign: 'center', fontSize: '12px',
          color: '#94a3b8', marginTop: '20px'
        }}>
          By signing in you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoginPage;