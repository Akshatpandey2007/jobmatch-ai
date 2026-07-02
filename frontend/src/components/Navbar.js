import { useState } from 'react';
import { Menu, X, Briefcase, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const navLinks = [
    { label: 'Find Jobs', path: '/dashboard' },
    { label: 'Companies', path: '/' },
    { label: 'Get Certified', path: '/dashboard' },
    { label: 'Resume Builder', path: '/dashboard' },
  ];

  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky', top: 0, zIndex: 1000,
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 24px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        height: '64px'
      }}>

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center',
            gap: '8px', cursor: 'pointer'
          }}>
          <div style={{
            width: '32px', height: '32px',
            background: '#185FA5', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Briefcase size={18} color="white" />
          </div>
          <span style={{
            fontSize: '18px', fontWeight: '600', color: '#0f172a'
          }}>
            Job<span style={{ color: '#185FA5' }}>Match</span>
            <span style={{
              fontSize: '11px', fontWeight: '500', color: '#185FA5',
              background: '#EFF6FF', padding: '2px 6px',
              borderRadius: '4px', marginLeft: '6px', verticalAlign: 'middle'
            }}>AI</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navLinks.map(item => (
            <button key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                padding: '8px 14px', background: 'transparent',
                border: 'none', borderRadius: '8px',
                fontSize: '14px', color: '#475569',
                cursor: 'pointer', fontWeight: '500',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                e.target.style.background = '#F1F5F9';
                e.target.style.color = '#0f172a';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#475569';
              }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          {token ? (
            <>
              {/* Notification Bell */}
              <button style={{
                width: '38px', height: '38px',
                background: 'transparent', border: '1px solid #e2e8f0',
                borderRadius: '10px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative'
              }}>
                <Bell size={17} color="#475569" />
                <span style={{
                  position: 'absolute', top: '6px', right: '6px',
                  width: '8px', height: '8px', background: '#EF4444',
                  borderRadius: '50%', border: '2px solid white'
                }}></span>
              </button>

              {/* User Avatar */}
              <div style={{
                width: '38px', height: '38px',
                background: '#185FA5', borderRadius: '10px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '13px',
                fontWeight: '600', color: 'white', cursor: 'pointer'
              }}
              onClick={() => user?.role === 'COMPANY' ? navigate('/company/dashboard') : navigate('/dashboard')}>
                {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 18px', background: '#FEF2F2',
                  color: '#DC2626', border: '1px solid #FECACA',
                  borderRadius: '10px', fontSize: '14px',
                  fontWeight: '500', cursor: 'pointer'
                }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '8px 18px', background: 'transparent',
                  color: '#475569', border: '1px solid #e2e8f0',
                  borderRadius: '10px', fontSize: '14px',
                  fontWeight: '500', cursor: 'pointer'
                }}>
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                style={{
                  padding: '8px 18px', background: '#185FA5',
                  color: 'white', border: 'none',
                  borderRadius: '10px', fontSize: '14px',
                  fontWeight: '500', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(24,95,165,0.3)'
                }}>
                Get Started
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          padding: '12px 24px 20px',
          borderTop: '1px solid #e2e8f0',
          background: '#ffffff'
        }}>
          {navLinks.map(item => (
            <button key={item.label}
              onClick={() => { navigate(item.path); setMenuOpen(false); }}
              style={{
                display: 'block', width: '100%',
                padding: '12px 16px', background: 'transparent',
                border: 'none', borderRadius: '8px',
                fontSize: '15px', color: '#475569',
                cursor: 'pointer', textAlign: 'left',
                fontWeight: '500', marginBottom: '4px'
              }}>
              {item.label}
            </button>
          ))}
          {!token && (
            <button
              onClick={() => navigate('/signup')}
              style={{
                display: 'block', width: '100%',
                padding: '12px 16px', background: '#185FA5',
                border: 'none', borderRadius: '10px',
                fontSize: '15px', color: 'white',
                cursor: 'pointer', fontWeight: '500', marginTop: '8px'
              }}>
              Get Started
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;