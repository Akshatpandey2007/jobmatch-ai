import { useState } from 'react';
import { Menu, X, Briefcase, Bell, User } from 'lucide-react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>

        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#185FA5',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Briefcase size={18} color="white" />
          </div>
          <span style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0f172a'
          }}>
            Job<span style={{ color: '#185FA5' }}>Match</span>
            <span style={{
              fontSize: '11px',
              fontWeight: '500',
              color: '#185FA5',
              background: '#EFF6FF',
              padding: '2px 6px',
              borderRadius: '4px',
              marginLeft: '6px',
              verticalAlign: 'middle'
            }}>AI</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }} className="desktop-nav">
          {['Find Jobs', 'Companies', 'Get Certified', 'Resume Builder'].map(item => (
            <button key={item} style={{
              padding: '8px 14px',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#475569',
              cursor: 'pointer',
              fontWeight: '500',
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
              {item}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Notification Bell */}
          <button style={{
            width: '38px',
            height: '38px',
            background: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <Bell size={17} color="#475569" />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              background: '#EF4444',
              borderRadius: '50%',
              border: '2px solid white'
            }}></span>
          </button>

          {/* Profile */}
          <button style={{
            width: '38px',
            height: '38px',
            background: '#185FA5',
            border: 'none',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1a4f8a'}
          onMouseLeave={e => e.currentTarget.style.background = '#185FA5'}>
            <User size={17} color="white" />
          </button>

          {/* Login Button */}
          <button style={{
            padding: '8px 18px',
            background: '#185FA5',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1a4f8a'}
          onMouseLeave={e => e.currentTarget.style.background = '#185FA5'}>
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: '38px',
              height: '38px',
              background: 'transparent',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          padding: '12px 24px 20px',
          borderTop: '1px solid #e2e8f0',
          background: '#ffffff'
        }}>
          {['Find Jobs', 'Companies', 'Get Certified', 'Resume Builder'].map(item => (
            <button key={item} style={{
              display: 'block',
              width: '100%',
              padding: '12px 16px',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              color: '#475569',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              {item}
            </button>
          ))}
          <button style={{
            display: 'block',
            width: '100%',
            padding: '12px 16px',
            background: '#185FA5',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
            marginTop: '8px'
          }}>
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;