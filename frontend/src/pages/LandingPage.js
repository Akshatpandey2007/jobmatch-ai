import { useState, useEffect } from 'react';
import { 
  ArrowRight, Briefcase, Brain, Shield, 
  Award, ChevronRight, Star, Users, 
  Building2, TrendingUp, CheckCircle,
  Zap, Target, FileText
} from 'lucide-react';

function LandingPage() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const animate = (setter, target, duration) => {
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };
    animate(setCount1, 2400, 2000);
    animate(setCount2, 48, 1500);
    animate(setCount3, 320, 1800);
  }, []);

  const features = [
    {
      icon: <Brain size={24} color="#185FA5" />,
      title: "AI Capability Matching",
      desc: "We read your resume deeply and match you to jobs based on what you can actually do — not just keywords.",
      bg: "#EFF6FF"
    },
    {
      icon: <Target size={24} color="#7C3AED" />,
      title: "Skill Assessments",
      desc: "Take role-specific AI-generated tests before applying. Stand out with a real score that companies trust.",
      bg: "#F5F3FF"
    },
    {
      icon: <Award size={24} color="#059669" />,
      title: "Domain Certificates",
      desc: "Earn verified certificates with QR codes. Share on LinkedIn. Instantly verifiable by any company.",
      bg: "#ECFDF5"
    },
    {
      icon: <Shield size={24} color="#DC2626" />,
      title: "Zero Fake Companies",
      desc: "Every company is manually verified before listing jobs. Blue badge means 100% real and trustworthy.",
      bg: "#FEF2F2"
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Upload Your Resume",
      desc: "Our AI reads your resume and builds a complete capability profile — skills, domain, experience level.",
      icon: <FileText size={20} color="#185FA5" />
    },
    {
      num: "02",
      title: "Get Matched Instantly",
      desc: "See jobs ranked by match score. 94% match means you genuinely fit — not just keyword overlap.",
      icon: <Zap size={20} color="#7C3AED" />
    },
    {
      num: "03",
      title: "Prove Your Skills",
      desc: "Take the assessment, complete the mock interview, apply with confidence. Companies see your score.",
      icon: <TrendingUp size={20} color="#059669" />
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Placed at Infosys",
      text: "JobMatch AI showed me exactly which skills I was missing. Fixed them in 2 weeks and got placed.",
      rating: 5
    },
    {
      name: "Rohit Kumar",
      role: "Placed at Wipro",
      text: "The mock interview feature prepared me so well. I knew exactly what to say on the real call.",
      rating: 5
    },
    {
      name: "Ananya Singh",
      role: "Interning at TCS",
      text: "Got my Python certificate and 3 companies reached out within a week of adding it to LinkedIn.",
      rating: 5
    }
  ];

  return (
    <div style={{ background: '#ffffff' }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 50%, #fafffe 100%)',
        padding: '80px 24px 100px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(24,95,165,0.06) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#EFF6FF', border: '1px solid #BFDBFE',
          borderRadius: '100px', padding: '6px 16px',
          fontSize: '13px', color: '#1D4ED8', fontWeight: '500',
          marginBottom: '24px'
        }}>
          <Zap size={13} />
          India's First AI-Powered Job Matching Platform
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: '700',
          color: '#0f172a',
          lineHeight: '1.15',
          marginBottom: '20px',
          maxWidth: '700px',
          margin: '0 auto 20px'
        }}>
          Get hired based on what<br />
          you can{' '}
          <span style={{
            color: '#185FA5',
            position: 'relative'
          }}>
            actually do
          </span>
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#64748b',
          maxWidth: '540px',
          margin: '0 auto 36px',
          lineHeight: '1.7'
        }}>
          AI matches your real capabilities to the right jobs. 
          Take skill tests, earn certificates, get placed faster.
        </p>

        <div style={{
          display: 'flex', gap: '12px',
          justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px',
            background: '#185FA5', color: 'white',
            border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(24,95,165,0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(24,95,165,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(24,95,165,0.3)';
          }}>
            Find Jobs Now <ArrowRight size={18} />
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px',
            background: 'white', color: '#0f172a',
            border: '1.5px solid #e2e8f0', borderRadius: '12px',
            fontSize: '16px', fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#185FA5';
            e.currentTarget.style.color = '#185FA5';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.color = '#0f172a';
          }}>
            <Building2 size={18} />
            Post Jobs as Company
          </button>
        </div>

        {/* Trust indicators */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            'Free for candidates',
            'Verified companies only',
            'AI-powered matching'
          ].map(item => (
            <div key={item} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '14px', color: '#64748b'
            }}>
              <CheckCircle size={15} color="#059669" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        background: '#0f172a',
        padding: '40px 24px'
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px', textAlign: 'center'
        }}>
          {[
            { num: count1.toLocaleString() + '+', label: 'Active Candidates', icon: <Users size={20} color="#60A5FA" /> },
            { num: count2 + '+', label: 'Verified Companies', icon: <Building2 size={20} color="#34D399" /> },
            { num: count3 + '+', label: 'Jobs Successfully Filled', icon: <Briefcase size={20} color="#A78BFA" /> }
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '36px', fontWeight: '700',
                color: '#ffffff', marginBottom: '4px'
              }}>{stat.num}</div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{
              display: 'inline-block',
              background: '#EFF6FF', color: '#185FA5',
              padding: '4px 14px', borderRadius: '100px',
              fontSize: '13px', fontWeight: '500',
              marginBottom: '16px'
            }}>Why JobMatch AI</div>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: '700', color: '#0f172a',
              marginBottom: '14px'
            }}>
              Everything you need to get placed
            </h2>
            <p style={{
              fontSize: '16px', color: '#64748b',
              maxWidth: '480px', margin: '0 auto', lineHeight: '1.7'
            }}>
              Unlike Naukri or LinkedIn, we go beyond resumes to match real capability with real requirements.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {features.map(f => (
              <div key={f.title} style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px 24px',
                transition: 'all 0.2s ease',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#185FA5';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: f.bg, borderRadius: '12px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '16px'
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontSize: '16px', fontWeight: '600',
                  color: '#0f172a', marginBottom: '8px'
                }}>{f.title}</h3>
                <p style={{
                  fontSize: '14px', color: '#64748b',
                  lineHeight: '1.6'
                }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: '80px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{
              display: 'inline-block',
              background: '#F5F3FF', color: '#7C3AED',
              padding: '4px 14px', borderRadius: '100px',
              fontSize: '13px', fontWeight: '500',
              marginBottom: '16px'
            }}>How It Works</div>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: '700', color: '#0f172a'
            }}>
              From resume to offer in 3 steps
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px'
          }}>
            {steps.map((step, i) => (
              <div key={step.num} style={{
                textAlign: 'center', position: 'relative'
              }}>
                <div style={{
                  width: '64px', height: '64px',
                  background: '#f8fafc',
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  position: 'relative'
                }}>
                  {step.icon}
                  <span style={{
                    position: 'absolute', top: '-10px', right: '-10px',
                    background: '#185FA5', color: 'white',
                    width: '22px', height: '22px',
                    borderRadius: '50%', fontSize: '11px',
                    fontWeight: '700', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                  }}>{i + 1}</span>
                </div>
                <h3 style={{
                  fontSize: '17px', fontWeight: '600',
                  color: '#0f172a', marginBottom: '10px'
                }}>{step.title}</h3>
                <p style={{
                  fontSize: '14px', color: '#64748b',
                  lineHeight: '1.6'
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: '700', color: '#0f172a',
              marginBottom: '12px'
            }}>Students who got placed</h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>
              Real results from real candidates across India
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {testimonials.map(t => (
              <div key={t.name} style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  display: 'flex', gap: '4px', marginBottom: '14px'
                }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </div>
                <p style={{
                  fontSize: '14px', color: '#475569',
                  lineHeight: '1.7', marginBottom: '16px',
                  fontStyle: 'italic'
                }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: '#185FA5', borderRadius: '50%',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'white',
                    fontSize: '13px', fontWeight: '600'
                  }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '14px', fontWeight: '600',
                      color: '#0f172a'
                    }}>{t.name}</div>
                    <div style={{
                      fontSize: '12px', color: '#059669',
                      fontWeight: '500'
                    }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: '#0f172a',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 40px)',
            fontWeight: '700', color: '#ffffff',
            marginBottom: '16px', lineHeight: '1.2'
          }}>
            Ready to find your perfect job?
          </h2>
          <p style={{
            fontSize: '16px', color: '#94a3b8',
            marginBottom: '36px', lineHeight: '1.7'
          }}>
            Join 2,400+ candidates who found their dream job through AI-powered matching. 
            It's completely free for candidates.
          </p>
          <div style={{
            display: 'flex', gap: '12px',
            justifyContent: 'center', flexWrap: 'wrap'
          }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px',
              background: '#185FA5', color: 'white',
              border: 'none', borderRadius: '12px',
              fontSize: '16px', fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(24,95,165,0.4)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1a4f8a'}
            onMouseLeave={e => e.currentTarget.style.background = '#185FA5'}>
              Create Free Account <ChevronRight size={18} />
            </button>
            <button style={{
              padding: '14px 32px',
              background: 'transparent', color: '#ffffff',
              border: '1.5px solid #334155', borderRadius: '12px',
              fontSize: '16px', fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#94a3b8'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}>
              Post Jobs as Company
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;