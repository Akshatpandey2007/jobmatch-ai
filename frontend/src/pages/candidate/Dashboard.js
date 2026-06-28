import { useState, useEffect } from 'react';
import { authAPI, jobsAPI, applicationsAPI } from '../../api';
import {
  Bell, Search, Briefcase, TrendingUp, Award,
  FileText, MessageSquare, ChevronRight, MapPin,
  Clock, Users, Star, Shield, Zap, Target,
  BookOpen, ArrowUp, Eye, CheckCircle, XCircle,
  AlertCircle, Building2, Upload, Play
} from 'lucide-react';


const jobs = [
  {
    id: 1,
    title: "Python Developer",
    company: "Infosys",
    location: "Bangalore",
    mode: "Offline",
    type: "Full-time",
    salary: "₹4–6 LPA",
    match: 94,
    vacancies: 2,
    posted: "2 days ago",
    skills: ["Python", "Django", "REST APIs"],
    verified: true,
    logo: "IN",
    color: "#185FA5"
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Wipro",
    location: "Remote",
    mode: "Online",
    type: "Internship",
    salary: "₹15k/month",
    match: 88,
    vacancies: 5,
    posted: "1 day ago",
    skills: ["Python", "SQL", "Excel"],
    verified: true,
    logo: "WI",
    color: "#7C3AED"
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Razorpay",
    location: "Mumbai",
    mode: "Hybrid",
    type: "Full-time",
    salary: "₹8–12 LPA",
    match: 71,
    vacancies: 1,
    posted: "3 days ago",
    skills: ["Python", "Docker", "Redis"],
    verified: true,
    logo: "RZ",
    color: "#059669",
    gaps: ["Docker", "Kubernetes", "Redis"]
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "TCS",
    location: "Pune",
    mode: "Hybrid",
    type: "Full-time",
    salary: "₹5–8 LPA",
    match: 82,
    vacancies: 8,
    posted: "Today",
    skills: ["React", "Node.js", "SQL"],
    verified: true,
    logo: "TC",
    color: "#DC2626"
  }
];

const applications = [
  { company: "Infosys", role: "Python Developer", status: "shortlisted", date: "2 days ago", logo: "IN", color: "#185FA5" },
  { company: "Wipro", role: "Data Analyst Intern", status: "viewed", date: "4 days ago", logo: "WI", color: "#7C3AED" },
  { company: "Accenture", role: "Frontend Developer", status: "applied", date: "1 week ago", logo: "AC", color: "#059669" }
];

const certificates = [
  { domain: "Python Development", level: "Expert", score: 91, color: "#059669", bg: "#ECFDF5", id: "JM-PY-2026-X7K9M2" },
  { domain: "SQL & Database", level: "Proficient", score: 76, color: "#185FA5", bg: "#EFF6FF", id: "JM-SQL-2026-P3N8K1" }
];

const statusConfig = {
  shortlisted: { label: "Shortlisted", color: "#059669", bg: "#ECFDF5", icon: <CheckCircle size={12} /> },
  viewed: { label: "Resume Viewed", color: "#D97706", bg: "#FFFBEB", icon: <Eye size={12} /> },
  applied: { label: "Applied", color: "#185FA5", bg: "#EFF6FF", icon: <AlertCircle size={12} /> },
  rejected: { label: "Rejected", color: "#DC2626", bg: "#FEF2F2", icon: <XCircle size={12} /> }
};

function MatchBadge({ score }) {
  const color = score >= 85 ? "#059669" : score >= 70 ? "#D97706" : "#DC2626";
  const bg = score >= 85 ? "#ECFDF5" : score >= 70 ? "#FFFBEB" : "#FEF2F2";
  return (
    <div style={{
      background: bg, color, borderRadius: "100px",
      padding: "4px 10px", fontSize: "12px", fontWeight: "600",
      display: "flex", alignItems: "center", gap: "4px", flexShrink: 0
    }}>
      <Zap size={11} fill={color} />
      {score}% match
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [realJobs, setRealJobs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load real jobs
    jobsAPI.getAll().then(data => {
      setRealJobs(data.jobs || []);
    }).catch(err => console.log('Jobs error:', err));

    // Load real applications
    applicationsAPI.getMyApplications(token).then(data => {
      setMyApplications(data.applications || []);
    }).catch(err => console.log('Applications error:', err));

    setLoading(false);
  }, []);
  const candidate = {
  name: user?.fullName || "Your Name",
  initials: user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : "??",
  domain: "Backend Developer",
  location: "Indore, MP",
  profileStrength: 20,
  matchedJobs: realJobs.length,
  appliedJobs: myApplications.length,
  certificates: 0,
  skills: [],
  verified: false
};
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const tabs = [
    { id: "overview", label: "Overview", icon: <TrendingUp size={15} /> },
    { id: "jobs", label: "Find Jobs", icon: <Briefcase size={15} /> },
    { id: "applications", label: "Applications", icon: <FileText size={15} /> },
    { id: "certify", label: "Certifications", icon: <Award size={15} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={15} /> },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = selectedMode === "All" || job.mode === selectedMode;
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesMode && matchesType;
  });

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Top Header */}
      <div style={{
        background: "#ffffff",
        borderBottom: "1px solid #E2E8F0",
        padding: "0 24px",
        position: "sticky", top: "64px", zIndex: 100
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", height: "56px"
        }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px" }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", border: "none", borderRadius: "8px",
                fontSize: "13px", fontWeight: "500", cursor: "pointer",
                background: activeTab === tab.id ? "#EFF6FF" : "transparent",
                color: activeTab === tab.id ? "#185FA5" : "#64748B",
                transition: "all 0.15s ease"
              }}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "7px 14px", background: "#185FA5", color: "white",
              border: "none", borderRadius: "8px", fontSize: "13px",
              fontWeight: "500", cursor: "pointer"
            }}>
              <Upload size={14} /> Update Resume
            </button>
            <div style={{ position: "relative" }}>
              <button style={{
                width: "36px", height: "36px", border: "1px solid #E2E8F0",
                borderRadius: "8px", background: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Bell size={16} color="#64748B" />
              </button>
              <div style={{
                position: "absolute", top: "6px", right: "6px",
                width: "8px", height: "8px", background: "#EF4444",
                borderRadius: "50%", border: "2px solid white"
              }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px" }}>

            {/* Left — Profile Card */}
            <div>
              <div style={{
                background: "white", borderRadius: "16px",
                border: "1px solid #E2E8F0", overflow: "hidden",
                marginBottom: "16px"
              }}>
                {/* Cover */}
                <div style={{
                  height: "80px",
                  background: "linear-gradient(135deg, #185FA5 0%, #7C3AED 100%)"
                }} />
                <div style={{ padding: "0 20px 20px" }}>
                  <div style={{
                    width: "64px", height: "64px",
                    background: "#185FA5", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px", fontWeight: "700", color: "white",
                    marginTop: "-32px", border: "3px solid white",
                    marginBottom: "12px"
                  }}>{candidate.initials}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A" }}>
                      {candidate.name}
                    </span>
                    {candidate.verified && (
                      <CheckCircle size={15} color="#185FA5" fill="#185FA5" />
                    )}
                  </div>
                  <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "4px" }}>
                    {candidate.domain}
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    fontSize: "12px", color: "#94A3B8", marginBottom: "16px"
                  }}>
                    <MapPin size={12} /> {candidate.location}
                  </div>

                  {/* Skills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "16px" }}>
                    {candidate.skills.map(skill => (
                      <span key={skill} style={{
                        fontSize: "11px", padding: "3px 8px",
                        background: "#F1F5F9", color: "#475569",
                        borderRadius: "100px", border: "1px solid #E2E8F0"
                      }}>{skill}</span>
                    ))}
                  </div>

                  {/* Profile Strength */}
                  <div>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      marginBottom: "6px"
                    }}>
                      <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "500" }}>
                        Profile strength
                      </span>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#185FA5" }}>
                        {candidate.profileStrength}%
                      </span>
                    </div>
                    <div style={{
                      height: "6px", background: "#F1F5F9",
                      borderRadius: "3px", overflow: "hidden"
                    }}>
                      <div style={{
                        height: "100%", width: `${candidate.profileStrength}%`,
                        background: "linear-gradient(90deg, #185FA5, #7C3AED)",
                        borderRadius: "3px"
                      }} />
                    </div>
                    <div style={{
                      fontSize: "11px", color: "#94A3B8",
                      marginTop: "6px"
                    }}>
                      Add GitHub profile to reach 95%
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "10px", marginBottom: "16px"
              }}>
                {[
                  { label: "Jobs matched", value: candidate.matchedJobs, icon: <Target size={16} color="#185FA5" />, bg: "#EFF6FF" },
                  { label: "Applied", value: candidate.appliedJobs, icon: <FileText size={16} color="#7C3AED" />, bg: "#F5F3FF" },
                  { label: "Certificates", value: candidate.certificates, icon: <Award size={16} color="#059669" />, bg: "#ECFDF5" },
                  { label: "Profile views", value: 24, icon: <Eye size={16} color="#D97706" />, bg: "#FFFBEB" },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background: "white", borderRadius: "12px",
                    border: "1px solid #E2E8F0", padding: "14px",
                    textAlign: "center"
                  }}>
                    <div style={{
                      width: "32px", height: "32px", background: stat.bg,
                      borderRadius: "8px", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      margin: "0 auto 8px"
                    }}>{stat.icon}</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#0F172A" }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "11px", color: "#94A3B8" }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Certificates Preview */}
              <div style={{
                background: "white", borderRadius: "16px",
                border: "1px solid #E2E8F0", padding: "16px"
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "12px"
                }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A" }}>
                    My Certificates
                  </span>
                  <button onClick={() => setActiveTab("certify")} style={{
                    fontSize: "12px", color: "#185FA5", background: "none",
                    border: "none", cursor: "pointer", fontWeight: "500"
                  }}>View all</button>
                </div>
                {certificates.map(cert => (
                  <div key={cert.id} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px", background: "#F8FAFC",
                    borderRadius: "10px", marginBottom: "8px"
                  }}>
                    <div style={{
                      width: "36px", height: "36px", background: cert.bg,
                      borderRadius: "8px", display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <Award size={18} color={cert.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: "12px", fontWeight: "500",
                        color: "#0F172A", whiteSpace: "nowrap",
                        overflow: "hidden", textOverflow: "ellipsis"
                      }}>{cert.domain}</div>
                      <div style={{ fontSize: "11px", color: cert.color, fontWeight: "500" }}>
                        {cert.level} · {cert.score}%
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => setActiveTab("certify")} style={{
                  width: "100%", padding: "10px",
                  background: "#F8FAFC", border: "1px dashed #CBD5E1",
                  borderRadius: "10px", fontSize: "12px", color: "#64748B",
                  cursor: "pointer", fontWeight: "500",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "6px"
                }}>
                  <Award size={13} /> Get certified in new domain
                </button>
              </div>
            </div>

            {/* Right — Main Content */}
            <div>
              {/* Welcome Banner */}
              <div style={{
                background: "linear-gradient(135deg, #185FA5 0%, #7C3AED 100%)",
                borderRadius: "16px", padding: "24px",
                marginBottom: "20px", color: "white",
                display: "flex", justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "6px" }}>
                    Good morning, {candidate.name.split(' ')[0]}! 👋
                  </div>
                  <div style={{ fontSize: "14px", opacity: 0.85, marginBottom: "16px" }}>
                    You have 3 new job matches today. Your profile was viewed 5 times this week.
                  </div>
                  <button onClick={() => setActiveTab("jobs")} style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "9px 18px", background: "white",
                    color: "#185FA5", border: "none",
                    borderRadius: "8px", fontSize: "13px",
                    fontWeight: "600", cursor: "pointer"
                  }}>
                    View matches <ChevronRight size={14} />
                  </button>
                </div>
                <div style={{
                  width: "80px", height: "80px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0
                }}>
                  <Zap size={36} color="white" />
                </div>
              </div>

              {/* Top Job Matches */}
              <div style={{
                background: "white", borderRadius: "16px",
                border: "1px solid #E2E8F0", padding: "20px",
                marginBottom: "20px"
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "16px"
                }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", color: "#0F172A" }}>
                    Top matches for you
                  </span>
                  <button onClick={() => setActiveTab("jobs")} style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    fontSize: "13px", color: "#185FA5", background: "none",
                    border: "none", cursor: "pointer", fontWeight: "500"
                  }}>
                    See all 14 <ChevronRight size={14} />
                  </button>
                </div>

                {jobs.slice(0, 3).map(job => (
                  <div key={job.id} style={{
                    display: "flex", alignItems: "flex-start",
                    gap: "12px", padding: "14px",
                    border: "1px solid #F1F5F9",
                    borderRadius: "12px", marginBottom: "10px",
                    transition: "all 0.15s ease", cursor: "pointer"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#185FA5";
                    e.currentTarget.style.background = "#FAFBFF";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#F1F5F9";
                    e.currentTarget.style.background = "white";
                  }}>
                    <div style={{
                      width: "44px", height: "44px",
                      background: job.color + "15",
                      borderRadius: "10px",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "14px",
                      fontWeight: "700", color: job.color, flexShrink: 0
                    }}>{job.logo}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "flex-start", marginBottom: "4px"
                      }}>
                        <div>
                          <span style={{
                            fontSize: "14px", fontWeight: "600", color: "#0F172A"
                          }}>{job.title}</span>
                          <div style={{
                            display: "flex", alignItems: "center",
                            gap: "4px", fontSize: "12px", color: "#64748B"
                          }}>
                            {job.company}
                            {job.verified && <Shield size={11} color="#185FA5" fill="#185FA5" />}
                            · {job.location}
                          </div>
                        </div>
                        <MatchBadge score={job.match} />
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {[job.type, job.mode, job.salary].map(tag => (
                          <span key={tag} style={{
                            fontSize: "11px", padding: "2px 8px",
                            background: "#F8FAFC", color: "#64748B",
                            borderRadius: "100px", border: "1px solid #E2E8F0"
                          }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Application Status */}
              <div style={{
                background: "white", borderRadius: "16px",
                border: "1px solid #E2E8F0", padding: "20px"
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "16px"
                }}>
                  <span style={{ fontSize: "15px", fontWeight: "600", color: "#0F172A" }}>
                    Recent applications
                  </span>
                  <button onClick={() => setActiveTab("applications")} style={{
                    fontSize: "13px", color: "#185FA5", background: "none",
                    border: "none", cursor: "pointer", fontWeight: "500"
                  }}>View all</button>
                </div>
                {applications.map((app, i) => {
                  const status = statusConfig[app.status];
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center",
                      gap: "12px", padding: "12px 0",
                      borderBottom: i < applications.length - 1 ? "1px solid #F1F5F9" : "none"
                    }}>
                      <div style={{
                        width: "38px", height: "38px",
                        background: app.color + "15",
                        borderRadius: "10px",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "12px",
                        fontWeight: "700", color: app.color, flexShrink: 0
                      }}>{app.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: "500", color: "#0F172A" }}>
                          {app.role}
                        </div>
                        <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                          {app.company} · {app.date}
                        </div>
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: "4px",
                        padding: "4px 10px", borderRadius: "100px",
                        background: status.bg, color: status.color,
                        fontSize: "12px", fontWeight: "500"
                      }}>
                        {status.icon}
                        {status.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === "jobs" && (
          <div>
            {/* Search and Filters */}
            <div style={{
              background: "white", borderRadius: "16px",
              border: "1px solid #E2E8F0", padding: "20px",
              marginBottom: "20px"
            }}>
              <div style={{
                display: "flex", gap: "12px", flexWrap: "wrap",
                alignItems: "center"
              }}>
                <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
                  <Search size={16} color="#94A3B8" style={{
                    position: "absolute", left: "14px",
                    top: "50%", transform: "translateY(-50%)"
                  }} />
                  <input
                    type="text"
                    placeholder="Search jobs, companies..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 14px 10px 40px",
                      border: "1.5px solid #E2E8F0", borderRadius: "10px",
                      fontSize: "14px", outline: "none",
                      boxSizing: "border-box"
                    }}
                    onFocus={e => e.target.style.borderColor = "#185FA5"}
                    onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                  />
                </div>
                {[
                  { label: "Mode", options: ["All", "Online", "Offline", "Hybrid"], value: selectedMode, setter: setSelectedMode },
                  { label: "Type", options: ["All", "Full-time", "Internship", "Part-time"], value: selectedType, setter: setSelectedType }
                ].map(filter => (
                  <select key={filter.label}
                    value={filter.value}
                    onChange={e => filter.setter(e.target.value)}
                    style={{
                      padding: "10px 14px", border: "1.5px solid #E2E8F0",
                      borderRadius: "10px", fontSize: "13px",
                      color: "#475569", outline: "none", cursor: "pointer",
                      background: "white"
                    }}>
                    {filter.options.map(opt => (
                      <option key={opt}>{opt === "All" ? `All ${filter.label}s` : opt}</option>
                    ))}
                  </select>
                ))}
                <div style={{
                  fontSize: "13px", color: "#94A3B8", whiteSpace: "nowrap"
                }}>
                  {filteredJobs.length} jobs found
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredJobs.map(job => (
                <div key={job.id} style={{
                  background: "white", borderRadius: "16px",
                  border: "1px solid #E2E8F0", padding: "20px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                  e.currentTarget.style.borderColor = "#CBD5E1";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#E2E8F0";
                }}>
                  <div style={{
                    display: "flex", gap: "14px", alignItems: "flex-start"
                  }}>
                    <div style={{
                      width: "52px", height: "52px",
                      background: job.color + "15",
                      borderRadius: "12px",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "16px",
                      fontWeight: "700", color: job.color, flexShrink: 0
                    }}>{job.logo}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "flex-start", marginBottom: "6px"
                      }}>
                        <div>
                          <div style={{
                            fontSize: "16px", fontWeight: "600",
                            color: "#0F172A", marginBottom: "3px"
                          }}>{job.title}</div>
                          <div style={{
                            display: "flex", alignItems: "center",
                            gap: "6px", fontSize: "13px", color: "#64748B"
                          }}>
                            <Building2 size={13} />
                            {job.company}
                            {job.verified && (
                              <span style={{
                                display: "flex", alignItems: "center",
                                gap: "2px", fontSize: "11px",
                                color: "#185FA5", fontWeight: "500"
                              }}>
                                <Shield size={11} fill="#185FA5" color="#185FA5" /> Verified
                              </span>
                            )}
                            <span style={{ color: "#CBD5E1" }}>·</span>
                            <MapPin size={12} /> {job.location}
                            <span style={{ color: "#CBD5E1" }}>·</span>
                            <Users size={12} /> {job.vacancies} vacancies
                            <span style={{ color: "#CBD5E1" }}>·</span>
                            <Clock size={12} /> {job.posted}
                          </div>
                        </div>
                        <MatchBadge score={job.match} />
                      </div>

                      <div style={{
                        display: "flex", gap: "6px",
                        flexWrap: "wrap", marginBottom: "12px"
                      }}>
                        {[job.type, job.mode, job.salary].map(tag => (
                          <span key={tag} style={{
                            fontSize: "12px", padding: "3px 10px",
                            background: "#F8FAFC", color: "#475569",
                            borderRadius: "100px", border: "1px solid #E2E8F0",
                            fontWeight: "500"
                          }}>{tag}</span>
                        ))}
                        {job.skills.map(skill => (
                          <span key={skill} style={{
                            fontSize: "12px", padding: "3px 10px",
                            background: "#EFF6FF", color: "#185FA5",
                            borderRadius: "100px", border: "1px solid #BFDBFE"
                          }}>{skill}</span>
                        ))}
                      </div>

                      {/* Skill gap warning */}
                      {job.gaps && (
                        <div style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          padding: "10px 12px",
                          background: "#FFFBEB", borderRadius: "10px",
                          border: "1px solid #FDE68A",
                          marginBottom: "12px", fontSize: "12px", color: "#92400E"
                        }}>
                          <AlertCircle size={14} color="#D97706" />
                          <span>
                            Skill gaps: <strong>{job.gaps.join(", ")}</strong> — 
                            learn these to boost your match to 95%+
                          </span>
                        </div>
                      )}

                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "9px 18px", background: "#185FA5",
                          color: "white", border: "none", borderRadius: "9px",
                          fontSize: "13px", fontWeight: "600", cursor: "pointer",
                          boxShadow: "0 2px 8px rgba(24,95,165,0.25)"
                        }}>
                          Apply Now <ChevronRight size={14} />
                        </button>
                        <button style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "9px 16px", background: "#F8FAFC",
                          color: "#475569", border: "1px solid #E2E8F0",
                          borderRadius: "9px", fontSize: "13px",
                          fontWeight: "500", cursor: "pointer"
                        }}>
                          <Target size={13} /> Take Test
                        </button>
                        <button style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          padding: "9px 16px", background: "#F8FAFC",
                          color: "#475569", border: "1px solid #E2E8F0",
                          borderRadius: "9px", fontSize: "13px",
                          fontWeight: "500", cursor: "pointer"
                        }}>
                          <Play size={13} /> Mock Interview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <div style={{
            background: "white", borderRadius: "16px",
            border: "1px solid #E2E8F0", padding: "24px"
          }}>
            <div style={{
              fontSize: "16px", fontWeight: "600",
              color: "#0F172A", marginBottom: "20px"
            }}>My Applications</div>

            {/* Pipeline */}
            <div style={{
              display: "flex", gap: "4px", alignItems: "center",
              marginBottom: "24px", flexWrap: "wrap"
            }}>
              {["Applied", "Resume Viewed", "Shortlisted", "Interview", "Offer"].map((stage, i, arr) => (
                <>
                  <div key={stage} style={{
                    padding: "6px 14px", borderRadius: "100px",
                    fontSize: "12px", fontWeight: "500",
                    background: i === 2 ? "#ECFDF5" : "#F8FAFC",
                    color: i === 2 ? "#059669" : "#64748B",
                    border: `1px solid ${i === 2 ? "#A7F3D0" : "#E2E8F0"}`
                  }}>{stage}</div>
                  {i < arr.length - 1 && (
                    <ChevronRight key={`arrow-${i}`} size={14} color="#CBD5E1" />
                  )}
                </>
              ))}
            </div>

            {applications.map((app, i) => {
              const status = statusConfig[app.status];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center",
                  gap: "14px", padding: "16px",
                  border: "1px solid #F1F5F9", borderRadius: "12px",
                  marginBottom: "10px", transition: "all 0.15s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#CBD5E1"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#F1F5F9"}>
                  <div style={{
                    width: "44px", height: "44px",
                    background: app.color + "15",
                    borderRadius: "10px",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "14px",
                    fontWeight: "700", color: app.color, flexShrink: 0
                  }}>{app.logo}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "14px", fontWeight: "500", color: "#0F172A"
                    }}>{app.role}</div>
                    <div style={{
                      fontSize: "12px", color: "#94A3B8"
                    }}>{app.company} · Applied {app.date}</div>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    padding: "5px 12px", borderRadius: "100px",
                    background: status.bg, color: status.color,
                    fontSize: "12px", fontWeight: "500"
                  }}>
                    {status.icon} {status.label}
                  </div>
                  <button style={{
                    padding: "7px 14px", background: "#F8FAFC",
                    border: "1px solid #E2E8F0", borderRadius: "8px",
                    fontSize: "12px", color: "#64748B", cursor: "pointer"
                  }}>View</button>
                </div>
              );
            })}
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === "certify" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}>
            <div>
              <div style={{
                fontSize: "16px", fontWeight: "600",
                color: "#0F172A", marginBottom: "16px"
              }}>My Certificates</div>
              {certificates.map(cert => (
                <div key={cert.id} style={{
                  background: "white", borderRadius: "16px",
                  border: "1px solid #E2E8F0", padding: "20px",
                  marginBottom: "12px"
                }}>
                  <div style={{
                    display: "flex", alignItems: "center",
                    gap: "12px", marginBottom: "12px"
                  }}>
                    <div style={{
                      width: "48px", height: "48px", background: cert.bg,
                      borderRadius: "12px", display: "flex",
                      alignItems: "center", justifyContent: "center"
                    }}>
                      <Award size={24} color={cert.color} />
                    </div>
                    <div>
                      <div style={{
                        fontSize: "15px", fontWeight: "600", color: "#0F172A"
                      }}>{cert.domain}</div>
                      <div style={{
                        fontSize: "13px", color: cert.color, fontWeight: "500"
                      }}>{cert.level} · {cert.score}% score</div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: "11px", color: "#94A3B8",
                    fontFamily: "monospace", marginBottom: "12px"
                  }}>{cert.id}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button style={{
                      flex: 1, padding: "8px",
                      background: "#185FA5", color: "white",
                      border: "none", borderRadius: "8px",
                      fontSize: "12px", fontWeight: "500", cursor: "pointer"
                    }}>Share on LinkedIn</button>
                    <button style={{
                      flex: 1, padding: "8px",
                      background: "#F8FAFC", color: "#475569",
                      border: "1px solid #E2E8F0", borderRadius: "8px",
                      fontSize: "12px", cursor: "pointer"
                    }}>Verify QR</button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{
                fontSize: "16px", fontWeight: "600",
                color: "#0F172A", marginBottom: "16px"
              }}>Get Certified</div>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"
              }}>
                {[
                  { domain: "Python Dev", icon: "🐍", color: "#185FA5" },
                  { domain: "Web Dev", icon: "🌐", color: "#7C3AED" },
                  { domain: "Data Analysis", icon: "📊", color: "#059669" },
                  { domain: "Digital Marketing", icon: "📣", color: "#D97706" },
                  { domain: "React.js", icon: "⚛️", color: "#06B6D4" },
                  { domain: "Node.js", icon: "🟢", color: "#16A34A" },
                  { domain: "SQL & DB", icon: "🗄️", color: "#DC2626" },
                  { domain: "Cloud Basics", icon: "☁️", color: "#0284C7" },
                ].map(item => (
                  <button key={item.domain} style={{
                    padding: "14px", background: "white",
                    border: "1px solid #E2E8F0", borderRadius: "12px",
                    cursor: "pointer", textAlign: "left",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.background = "#FAFBFF";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.background = "white";
                  }}>
                    <div style={{ fontSize: "20px", marginBottom: "6px" }}>
                      {item.icon}
                    </div>
                    <div style={{
                      fontSize: "12px", fontWeight: "500", color: "#0F172A"
                    }}>{item.domain}</div>
                    <div style={{
                      fontSize: "11px", color: "#94A3B8", marginTop: "2px"
                    }}>30 questions · 60 min</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div style={{
            display: "grid", gridTemplateColumns: "280px 1fr",
            gap: "0", background: "white",
            borderRadius: "16px", border: "1px solid #E2E8F0",
            overflow: "hidden", height: "500px"
          }}>
            {/* Conversations List */}
            <div style={{ borderRight: "1px solid #E2E8F0" }}>
              <div style={{
                padding: "16px", borderBottom: "1px solid #E2E8F0",
                fontSize: "14px", fontWeight: "600", color: "#0F172A"
              }}>Messages</div>
              {[
                { company: "Infosys HR", name: "Priya Sharma", preview: "Thursday 3 PM confirmed!", time: "2h ago", unread: true, color: "#185FA5", logo: "IN" },
                { company: "Wipro Talent", name: "Rahul Verma", preview: "Thank you for applying...", time: "1d ago", unread: false, color: "#7C3AED", logo: "WI" }
              ].map((conv, i) => (
                <div key={i} style={{
                  padding: "14px 16px", cursor: "pointer",
                  background: i === 0 ? "#F8FAFF" : "white",
                  borderLeft: i === 0 ? "3px solid #185FA5" : "3px solid transparent",
                  display: "flex", gap: "10px", alignItems: "flex-start"
                }}>
                  <div style={{
                    width: "36px", height: "36px",
                    background: conv.color + "15",
                    borderRadius: "50%", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: "700",
                    color: conv.color, flexShrink: 0
                  }}>{conv.logo}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      marginBottom: "2px"
                    }}>
                      <span style={{
                        fontSize: "13px", fontWeight: "600", color: "#0F172A"
                      }}>{conv.name}</span>
                      <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                        {conv.time}
                      </span>
                    </div>
                    <div style={{
                      fontSize: "12px", color: "#94A3B8",
                      whiteSpace: "nowrap", overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>{conv.preview}</div>
                  </div>
                  {conv.unread && (
                    <div style={{
                      width: "8px", height: "8px",
                      background: "#185FA5", borderRadius: "50%",
                      flexShrink: 0, marginTop: "4px"
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Chat Window */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{
                padding: "14px 20px",
                borderBottom: "1px solid #E2E8F0",
                display: "flex", alignItems: "center", gap: "10px"
              }}>
                <div style={{
                  width: "36px", height: "36px",
                  background: "#185FA5" + "15",
                  borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "700", color: "#185FA5"
                }}>IN</div>
                <div>
                  <div style={{
                    fontSize: "14px", fontWeight: "600", color: "#0F172A"
                  }}>Priya Sharma</div>
                  <div style={{
                    fontSize: "12px", color: "#94A3B8"
                  }}>Infosys HR · Re: Python Developer</div>
                </div>
              </div>

              <div style={{
                flex: 1, padding: "20px",
                display: "flex", flexDirection: "column",
                gap: "12px", overflowY: "auto"
              }}>
                {[
                  { text: "Hi Akshat, we reviewed your application and were impressed with your assessment score of 82%. Would you be available for a technical interview this week?", sent: false },
                  { text: "Hello Priya, thank you so much! Yes I'm available. Thursday or Friday afternoon works best for me.", sent: true },
                  { text: "Thursday 3 PM confirmed! ✓", sent: false },
                ].map((msg, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: msg.sent ? "flex-end" : "flex-start"
                  }}>
                    <div style={{
                      maxWidth: "70%", padding: "10px 14px",
                      borderRadius: msg.sent ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.sent ? "#185FA5" : "#F8FAFC",
                      color: msg.sent ? "white" : "#0F172A",
                      fontSize: "13px", lineHeight: "1.5",
                      border: msg.sent ? "none" : "1px solid #E2E8F0"
                    }}>{msg.text}</div>
                  </div>
                ))}
              </div>

              <div style={{
                padding: "14px 20px",
                borderTop: "1px solid #E2E8F0",
                display: "flex", gap: "10px"
              }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  style={{
                    flex: 1, padding: "10px 14px",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "10px", fontSize: "13px",
                    outline: "none"
                  }}
                  onFocus={e => e.target.style.borderColor = "#185FA5"}
                  onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                />
                <button style={{
                  padding: "10px 18px", background: "#185FA5",
                  color: "white", border: "none",
                  borderRadius: "10px", fontSize: "13px",
                  fontWeight: "500", cursor: "pointer"
                }}>Send</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}