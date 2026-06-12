import { useState } from 'react';
import {
  Building2, Users, Briefcase, TrendingUp,
  Plus, Search, Filter, Eye, CheckCircle,
  XCircle, Clock, MessageSquare, Shield,
  ChevronRight, Star, Award, Zap, MapPin,
  Calendar, DollarSign, AlertCircle, Bell,
  BarChart2, Target, ArrowUp, Settings
} from 'lucide-react';

const company = {
  name: "Infosys BPO",
  initials: "IN",
  industry: "IT Services",
  location: "Bangalore & Indore",
  verified: true,
  plan: "Growth"
};

const jobs = [
  {
    id: 1,
    title: "Python Developer",
    type: "Full-time",
    mode: "Offline",
    vacancies: 2,
    filled: 0,
    applicants: 18,
    shortlisted: 3,
    deadline: "Jun 30, 2026",
    status: "active",
    salary: "₹4–6 LPA",
    posted: "3 days ago"
  },
  {
    id: 2,
    title: "Data Analyst",
    type: "Full-time",
    mode: "Hybrid",
    vacancies: 3,
    filled: 1,
    applicants: 24,
    shortlisted: 5,
    deadline: "Jul 15, 2026",
    status: "active",
    salary: "₹5–8 LPA",
    posted: "1 week ago"
  },
  {
    id: 3,
    title: "Frontend Intern",
    type: "Internship",
    mode: "Online",
    vacancies: 5,
    filled: 5,
    applicants: 67,
    shortlisted: 8,
    deadline: "Jun 15, 2026",
    status: "filled",
    salary: "₹12k/month",
    posted: "2 weeks ago"
  }
];

const applicants = [
  {
    name: "Akshat Pandey",
    initials: "AP",
    role: "Python Developer",
    match: 94,
    assessment: 82,
    interview: 88,
    cert: "Expert",
    certColor: "#059669",
    location: "Indore",
    experience: "Fresher",
    status: "shortlisted",
    color: "#185FA5"
  },
  {
    name: "Rohit Sharma",
    initials: "RS",
    role: "Python Developer",
    match: 87,
    assessment: 74,
    interview: 79,
    cert: "Proficient",
    certColor: "#185FA5",
    location: "Bhopal",
    experience: "Fresher",
    status: "reviewing",
    color: "#7C3AED"
  },
  {
    name: "Priya Kumar",
    initials: "PK",
    role: "Python Developer",
    match: 79,
    assessment: 68,
    interview: 71,
    cert: "Basic",
    certColor: "#D97706",
    location: "Indore",
    experience: "Fresher",
    status: "reviewing",
    color: "#059669"
  },
  {
    name: "Ananya Singh",
    initials: "AS",
    role: "Data Analyst",
    match: 91,
    assessment: 85,
    interview: 90,
    cert: "Expert",
    certColor: "#059669",
    location: "Indore",
    experience: "Fresher",
    status: "interview",
    color: "#DC2626"
  }
];

const statusConfig = {
  shortlisted: { label: "Shortlisted", color: "#059669", bg: "#ECFDF5" },
  reviewing: { label: "Reviewing", color: "#D97706", bg: "#FFFBEB" },
  interview: { label: "Interview", color: "#185FA5", bg: "#EFF6FF" },
  offered: { label: "Offer Sent", color: "#7C3AED", bg: "#F5F3FF" },
  rejected: { label: "Rejected", color: "#DC2626", bg: "#FEF2F2" }
};

function ScoreBar({ value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        flex: 1, height: "4px", background: "#F1F5F9",
        borderRadius: "2px", overflow: "hidden"
      }}>
        <div style={{
          width: `${value}%`, height: "100%",
          background: color, borderRadius: "2px"
        }} />
      </div>
      <span style={{ fontSize: "12px", fontWeight: "600", color: "#0F172A", minWidth: "28px" }}>
        {value}%
      </span>
    </div>
  );
}

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [showPostJob, setShowPostJob] = useState(false);
  const [notes, setNotes] = useState({});

  const tabs = [
    { id: "overview", label: "Overview", icon: <TrendingUp size={15} /> },
    { id: "jobs", label: "Job Listings", icon: <Briefcase size={15} /> },
    { id: "candidates", label: "Candidates", icon: <Users size={15} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={15} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={15} /> },
  ];

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Sub Header */}
      <div style={{
        background: "#ffffff", borderBottom: "1px solid #E2E8F0",
        padding: "0 24px", position: "sticky", top: "64px", zIndex: 100
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", height: "56px"
        }}>
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
          <button
            onClick={() => setShowPostJob(true)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", background: "#185FA5",
              color: "white", border: "none", borderRadius: "8px",
              fontSize: "13px", fontWeight: "500", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(24,95,165,0.25)"
            }}>
            <Plus size={15} /> Post New Job
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            {/* Company Header */}
            <div style={{
              background: "white", borderRadius: "16px",
              border: "1px solid #E2E8F0", padding: "24px",
              marginBottom: "20px",
              display: "flex", alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "64px", height: "64px",
                  background: "#EFF6FF", borderRadius: "16px",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "22px",
                  fontWeight: "700", color: "#185FA5"
                }}>{company.initials}</div>
                <div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    marginBottom: "4px"
                  }}>
                    <span style={{
                      fontSize: "20px", fontWeight: "700", color: "#0F172A"
                    }}>{company.name}</span>
                    {company.verified && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: "4px",
                        background: "#EFF6FF", color: "#185FA5",
                        padding: "3px 10px", borderRadius: "100px",
                        fontSize: "12px", fontWeight: "500"
                      }}>
                        <Shield size={12} fill="#185FA5" /> Verified
                      </div>
                    )}
                    <div style={{
                      background: "#F5F3FF", color: "#7C3AED",
                      padding: "3px 10px", borderRadius: "100px",
                      fontSize: "12px", fontWeight: "500"
                    }}>{company.plan} Plan</div>
                  </div>
                  <div style={{
                    fontSize: "13px", color: "#64748B",
                    display: "flex", alignItems: "center", gap: "8px"
                  }}>
                    <Building2 size={13} /> {company.industry}
                    <span style={{ color: "#CBD5E1" }}>·</span>
                    <MapPin size={13} /> {company.location}
                  </div>
                </div>
              </div>
              <button style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 16px", background: "#F8FAFC",
                color: "#475569", border: "1px solid #E2E8F0",
                borderRadius: "8px", fontSize: "13px", cursor: "pointer"
              }}>
                <Settings size={14} /> Edit Profile
              </button>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px", marginBottom: "20px"
            }}>
              {[
                { label: "Active Jobs", value: "3", icon: <Briefcase size={18} color="#185FA5" />, bg: "#EFF6FF", change: "+1 this week" },
                { label: "Total Applicants", value: "109", icon: <Users size={18} color="#7C3AED" />, bg: "#F5F3FF", change: "+18 today" },
                { label: "Shortlisted", value: "16", icon: <CheckCircle size={18} color="#059669" />, bg: "#ECFDF5", change: "Across all jobs" },
                { label: "Vacancies Filled", value: "6", icon: <Target size={18} color="#D97706" />, bg: "#FFFBEB", change: "Out of 10 total" },
                { label: "Avg Match Score", value: "84%", icon: <Zap size={18} color="#DC2626" />, bg: "#FEF2F2", change: "Platform avg 71%" },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: "white", borderRadius: "14px",
                  border: "1px solid #E2E8F0", padding: "18px"
                }}>
                  <div style={{
                    width: "40px", height: "40px", background: stat.bg,
                    borderRadius: "10px", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    marginBottom: "12px"
                  }}>{stat.icon}</div>
                  <div style={{
                    fontSize: "26px", fontWeight: "700",
                    color: "#0F172A", marginBottom: "2px"
                  }}>{stat.value}</div>
                  <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "4px" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94A3B8" }}>{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Active Jobs Preview */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "20px"
            }}>
              <div style={{
                background: "white", borderRadius: "16px",
                border: "1px solid #E2E8F0", padding: "20px"
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "16px"
                }}>
                  <span style={{
                    fontSize: "15px", fontWeight: "600", color: "#0F172A"
                  }}>Active Jobs</span>
                  <button onClick={() => setActiveTab("jobs")} style={{
                    fontSize: "12px", color: "#185FA5", background: "none",
                    border: "none", cursor: "pointer", fontWeight: "500"
                  }}>Manage all</button>
                </div>
                {jobs.map(job => (
                  <div key={job.id} style={{
                    padding: "12px", border: "1px solid #F1F5F9",
                    borderRadius: "10px", marginBottom: "8px",
                    cursor: "pointer", transition: "all 0.15s ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#185FA5"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#F1F5F9"}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      marginBottom: "6px"
                    }}>
                      <span style={{
                        fontSize: "13px", fontWeight: "500", color: "#0F172A"
                      }}>{job.title}</span>
                      <span style={{
                        fontSize: "11px", padding: "2px 8px",
                        borderRadius: "100px",
                        background: job.status === "filled" ? "#ECFDF5" : "#EFF6FF",
                        color: job.status === "filled" ? "#059669" : "#185FA5",
                        fontWeight: "500"
                      }}>
                        {job.status === "filled" ? "Filled" : "Active"}
                      </span>
                    </div>
                    <div style={{
                      display: "flex", gap: "12px",
                      fontSize: "12px", color: "#94A3B8"
                    }}>
                      <span>{job.applicants} applicants</span>
                      <span>{job.shortlisted} shortlisted</span>
                      <span>{job.vacancies - job.filled} vacancies left</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Candidates Preview */}
              <div style={{
                background: "white", borderRadius: "16px",
                border: "1px solid #E2E8F0", padding: "20px"
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "16px"
                }}>
                  <span style={{
                    fontSize: "15px", fontWeight: "600", color: "#0F172A"
                  }}>Top Candidates</span>
                  <button onClick={() => setActiveTab("candidates")} style={{
                    fontSize: "12px", color: "#185FA5", background: "none",
                    border: "none", cursor: "pointer", fontWeight: "500"
                  }}>View all</button>
                </div>
                {applicants.slice(0, 3).map((app, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 0",
                    borderBottom: i < 2 ? "1px solid #F1F5F9" : "none"
                  }}>
                    <div style={{
                      width: "36px", height: "36px",
                      background: app.color + "15",
                      borderRadius: "50%", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: "700",
                      color: app.color, flexShrink: 0
                    }}>{app.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "13px", fontWeight: "500", color: "#0F172A"
                      }}>{app.name}</div>
                      <div style={{
                        fontSize: "11px", color: "#94A3B8"
                      }}>{app.role} · {app.location}</div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      background: "#ECFDF5", color: "#059669",
                      padding: "3px 8px", borderRadius: "100px",
                      fontSize: "12px", fontWeight: "600"
                    }}>
                      <Zap size={10} fill="#059669" /> {app.match}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === "jobs" && (
          <div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "16px"
            }}>
              <div style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A" }}>
                Job Listings
              </div>
              <button onClick={() => setShowPostJob(true)} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "9px 18px", background: "#185FA5",
                color: "white", border: "none", borderRadius: "10px",
                fontSize: "13px", fontWeight: "500", cursor: "pointer"
              }}>
                <Plus size={15} /> Post New Job
              </button>
            </div>

            {jobs.map(job => (
              <div key={job.id} style={{
                background: "white", borderRadius: "16px",
                border: "1px solid #E2E8F0", padding: "20px",
                marginBottom: "12px"
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", marginBottom: "14px"
                }}>
                  <div>
                    <div style={{
                      fontSize: "16px", fontWeight: "600",
                      color: "#0F172A", marginBottom: "4px"
                    }}>{job.title}</div>
                    <div style={{
                      display: "flex", gap: "8px",
                      fontSize: "13px", color: "#64748B"
                    }}>
                      <span>{job.type}</span>
                      <span style={{ color: "#CBD5E1" }}>·</span>
                      <span>{job.mode}</span>
                      <span style={{ color: "#CBD5E1" }}>·</span>
                      <span>{job.salary}</span>
                      <span style={{ color: "#CBD5E1" }}>·</span>
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "100px",
                      fontSize: "12px", fontWeight: "500",
                      background: job.status === "filled" ? "#ECFDF5" : "#EFF6FF",
                      color: job.status === "filled" ? "#059669" : "#185FA5"
                    }}>
                      {job.status === "filled" ? "Filled" : "Active"}
                    </span>
                    <button style={{
                      padding: "6px 14px", background: "#F8FAFC",
                      border: "1px solid #E2E8F0", borderRadius: "8px",
                      fontSize: "12px", cursor: "pointer", color: "#475569"
                    }}>Edit</button>
                    <button style={{
                      padding: "6px 14px", background: "#FEF2F2",
                      border: "1px solid #FECACA", borderRadius: "8px",
                      fontSize: "12px", cursor: "pointer", color: "#DC2626"
                    }}>Close</button>
                  </div>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "12px"
                }}>
                  {[
                    { label: "Total Applicants", value: job.applicants, color: "#185FA5", bg: "#EFF6FF" },
                    { label: "Shortlisted", value: job.shortlisted, color: "#059669", bg: "#ECFDF5" },
                    { label: "Vacancies Left", value: job.vacancies - job.filled, color: "#D97706", bg: "#FFFBEB" },
                    { label: "Days Left", value: "21", color: "#7C3AED", bg: "#F5F3FF" },
                  ].map(stat => (
                    <div key={stat.label} style={{
                      background: stat.bg, borderRadius: "10px",
                      padding: "12px", textAlign: "center"
                    }}>
                      <div style={{
                        fontSize: "22px", fontWeight: "700",
                        color: stat.color
                      }}>{stat.value}</div>
                      <div style={{
                        fontSize: "11px", color: "#64748B", marginTop: "2px"
                      }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setSelectedJob(job); setActiveTab("candidates"); }}
                  style={{
                    marginTop: "14px", display: "flex",
                    alignItems: "center", gap: "6px",
                    padding: "8px 16px", background: "#185FA5",
                    color: "white", border: "none", borderRadius: "8px",
                    fontSize: "13px", fontWeight: "500", cursor: "pointer"
                  }}>
                  View Applicants <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CANDIDATES TAB */}
        {activeTab === "candidates" && (
          <div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px"
            }}>
              <div style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A" }}>
                Applicants — {selectedJob.title}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {jobs.map(job => (
                  <button key={job.id}
                    onClick={() => setSelectedJob(job)}
                    style={{
                      padding: "6px 14px", borderRadius: "8px",
                      fontSize: "12px", fontWeight: "500", cursor: "pointer",
                      border: "1px solid #E2E8F0",
                      background: selectedJob.id === job.id ? "#185FA5" : "#F8FAFC",
                      color: selectedJob.id === job.id ? "white" : "#64748B"
                    }}>{job.title}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {applicants.map((app, i) => {
                const status = statusConfig[app.status];
                return (
                  <div key={i} style={{
                    background: "white", borderRadius: "16px",
                    border: "1px solid #E2E8F0", padding: "20px",
                    transition: "all 0.15s ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                    <div style={{
                      display: "flex", gap: "14px", alignItems: "flex-start"
                    }}>
                      <div style={{
                        width: "48px", height: "48px",
                        background: app.color + "15",
                        borderRadius: "50%", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "16px", fontWeight: "700",
                        color: app.color, flexShrink: 0
                      }}>{app.initials}</div>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: "flex", justifyContent: "space-between",
                          alignItems: "flex-start", marginBottom: "12px"
                        }}>
                          <div>
                            <div style={{
                              fontSize: "15px", fontWeight: "600",
                              color: "#0F172A", marginBottom: "3px"
                            }}>{app.name}</div>
                            <div style={{
                              fontSize: "12px", color: "#64748B",
                              display: "flex", alignItems: "center", gap: "6px"
                            }}>
                              <MapPin size={11} /> {app.location}
                              <span style={{ color: "#CBD5E1" }}>·</span>
                              {app.experience}
                              <span style={{ color: "#CBD5E1" }}>·</span>
                              <Award size={11} color={app.certColor} />
                              <span style={{ color: app.certColor, fontWeight: "500" }}>
                                {app.cert} certified
                              </span>
                            </div>
                          </div>
                          <div style={{
                            padding: "4px 12px", borderRadius: "100px",
                            background: status.bg, color: status.color,
                            fontSize: "12px", fontWeight: "500"
                          }}>{status.label}</div>
                        </div>

                        {/* Scores */}
                        <div style={{
                          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "12px", marginBottom: "14px"
                        }}>
                          {[
                            { label: "AI Match", value: app.match, color: "#185FA5" },
                            { label: "Assessment", value: app.assessment, color: "#7C3AED" },
                            { label: "Mock Interview", value: app.interview, color: "#059669" },
                          ].map(score => (
                            <div key={score.label}>
                              <div style={{
                                display: "flex", justifyContent: "space-between",
                                fontSize: "11px", color: "#94A3B8",
                                marginBottom: "4px"
                              }}>
                                <span>{score.label}</span>
                              </div>
                              <ScoreBar value={score.value} color={score.color} />
                            </div>
                          ))}
                        </div>

                        {/* Private Notes */}
                        <div style={{ marginBottom: "12px" }}>
                          <input
                            placeholder="Add private note (only you can see this)..."
                            value={notes[app.name] || ""}
                            onChange={e => setNotes({ ...notes, [app.name]: e.target.value })}
                            style={{
                              width: "100%", padding: "8px 12px",
                              border: "1px solid #E2E8F0", borderRadius: "8px",
                              fontSize: "12px", color: "#475569",
                              outline: "none", boxSizing: "border-box",
                              background: "#FAFAFA"
                            }}
                            onFocus={e => e.target.style.borderColor = "#185FA5"}
                            onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                          />
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <button style={{
                            padding: "7px 16px", background: "#185FA5",
                            color: "white", border: "none", borderRadius: "8px",
                            fontSize: "12px", fontWeight: "500", cursor: "pointer"
                          }}>Shortlist</button>
                          <button style={{
                            padding: "7px 16px", background: "#F5F3FF",
                            color: "#7C3AED", border: "1px solid #DDD6FE",
                            borderRadius: "8px", fontSize: "12px", cursor: "pointer"
                          }}>Schedule Interview</button>
                          <button style={{
                            padding: "7px 16px", background: "#ECFDF5",
                            color: "#059669", border: "1px solid #A7F3D0",
                            borderRadius: "8px", fontSize: "12px", cursor: "pointer"
                          }}>Send Offer</button>
                          <button style={{
                            padding: "7px 16px", background: "#F8FAFC",
                            color: "#64748B", border: "1px solid #E2E8F0",
                            borderRadius: "8px", fontSize: "12px", cursor: "pointer"
                          }}>Message</button>
                          <button style={{
                            padding: "7px 16px", background: "#FEF2F2",
                            color: "#DC2626", border: "1px solid #FECACA",
                            borderRadius: "8px", fontSize: "12px", cursor: "pointer"
                          }}>Reject</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}>
            {[
              { title: "Applications this week", value: "23", change: "+18%", positive: true },
              { title: "Average time to hire", value: "12 days", change: "-3 days", positive: true },
              { title: "Vacancy fill rate", value: "60%", change: "+5%", positive: true },
              { title: "Candidate quality score", value: "84%", change: "+2%", positive: true },
            ].map(metric => (
              <div key={metric.title} style={{
                background: "white", borderRadius: "16px",
                border: "1px solid #E2E8F0", padding: "24px"
              }}>
                <div style={{
                  fontSize: "13px", color: "#64748B",
                  marginBottom: "8px"
                }}>{metric.title}</div>
                <div style={{
                  fontSize: "32px", fontWeight: "700",
                  color: "#0F172A", marginBottom: "8px"
                }}>{metric.value}</div>
                <div style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  fontSize: "13px", fontWeight: "500",
                  color: metric.positive ? "#059669" : "#DC2626"
                }}>
                  <ArrowUp size={14} /> {metric.change} vs last week
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div style={{
            display: "grid", gridTemplateColumns: "280px 1fr",
            background: "white", borderRadius: "16px",
            border: "1px solid #E2E8F0", overflow: "hidden", height: "500px"
          }}>
            <div style={{ borderRight: "1px solid #E2E8F0" }}>
              <div style={{
                padding: "16px", borderBottom: "1px solid #E2E8F0",
                fontSize: "14px", fontWeight: "600", color: "#0F172A"
              }}>Conversations</div>
              {applicants.slice(0, 3).map((app, i) => (
                <div key={i} style={{
                  padding: "14px 16px", cursor: "pointer",
                  background: i === 0 ? "#F8FAFF" : "white",
                  borderLeft: i === 0 ? "3px solid #185FA5" : "3px solid transparent",
                  display: "flex", gap: "10px"
                }}>
                  <div style={{
                    width: "36px", height: "36px",
                    background: app.color + "15", borderRadius: "50%",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "12px",
                    fontWeight: "700", color: app.color, flexShrink: 0
                  }}>{app.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "13px", fontWeight: "500",
                      color: "#0F172A"
                    }}>{app.name}</div>
                    <div style={{
                      fontSize: "12px", color: "#94A3B8",
                      whiteSpace: "nowrap", overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>{app.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{
                padding: "16px 20px",
                borderBottom: "1px solid #E2E8F0",
                fontSize: "14px", fontWeight: "600", color: "#0F172A"
              }}>
                {applicants[0].name} — {applicants[0].role}
              </div>
              <div style={{
                flex: 1, padding: "20px",
                display: "flex", flexDirection: "column", gap: "10px"
              }}>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    background: "#F8FAFC", border: "1px solid #E2E8F0",
                    borderRadius: "12px 12px 12px 4px",
                    padding: "10px 14px", fontSize: "13px",
                    color: "#0F172A", maxWidth: "70%", lineHeight: "1.5"
                  }}>
                    Hi, I wanted to express my interest in the Python Developer role.
                    I scored 94% on the AI match test!
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{
                    background: "#185FA5", borderRadius: "12px 12px 4px 12px",
                    padding: "10px 14px", fontSize: "13px",
                    color: "white", maxWidth: "70%", lineHeight: "1.5"
                  }}>
                    Hi Akshat! Your profile is impressive. We'd like to schedule
                    a technical interview. Are you available Thursday 3 PM?
                  </div>
                </div>
              </div>
              <div style={{
                padding: "14px 20px", borderTop: "1px solid #E2E8F0",
                display: "flex", gap: "10px"
              }}>
                <input
                  placeholder="Message the candidate..."
                  style={{
                    flex: 1, padding: "10px 14px",
                    border: "1.5px solid #E2E8F0", borderRadius: "10px",
                    fontSize: "13px", outline: "none"
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

      {/* Post Job Modal */}
      {showPostJob && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.5)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000,
          padding: "24px"
        }}>
          <div style={{
            background: "white", borderRadius: "20px",
            padding: "28px", width: "100%", maxWidth: "560px",
            maxHeight: "85vh", overflowY: "auto"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "24px"
            }}>
              <div style={{
                fontSize: "18px", fontWeight: "600", color: "#0F172A"
              }}>Post a New Opportunity</div>
              <button onClick={() => setShowPostJob(false)} style={{
                background: "#F8FAFC", border: "1px solid #E2E8F0",
                borderRadius: "8px", width: "32px", height: "32px",
                cursor: "pointer", fontSize: "16px", color: "#64748B"
              }}>✕</button>
            </div>

            {/* Opportunity Type */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>Opportunity Type</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["Full-time Job", "Internship", "Part-time"].map(type => (
                  <button key={type} style={{
                    padding: "8px 16px", border: "1.5px solid #E2E8F0",
                    borderRadius: "8px", fontSize: "13px",
                    cursor: "pointer", background: "white", color: "#64748B"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#185FA5";
                    e.currentTarget.style.color = "#185FA5";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.color = "#64748B";
                  }}>{type}</button>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>Work Mode</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["Online", "Offline", "Hybrid"].map(mode => (
                  <button key={mode} style={{
                    padding: "8px 16px", border: "1.5px solid #E2E8F0",
                    borderRadius: "8px", fontSize: "13px",
                    cursor: "pointer", background: "white", color: "#64748B"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#185FA5";
                    e.currentTarget.style.color = "#185FA5";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.color = "#64748B";
                  }}>{mode}</button>
                ))}
              </div>
            </div>

            {/* Job Title */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>Job / Internship Title</label>
              <input type="text"
                placeholder="e.g. Python Developer / Marketing Intern"
                style={{
                  width: "100%", padding: "10px 14px",
                  border: "1.5px solid #E2E8F0", borderRadius: "10px",
                  fontSize: "14px", outline: "none", boxSizing: "border-box"
                }}
                onFocus={e => e.target.style.borderColor = "#185FA5"}
                onBlur={e => e.target.style.borderColor = "#E2E8F0"}
              />
            </div>

            {/* Required Skills */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>Required Skills (comma separated)</label>
              <input type="text" placeholder="Python, Django, REST APIs"
                style={{
                  width: "100%", padding: "10px 14px",
                  border: "1.5px solid #E2E8F0", borderRadius: "10px",
                  fontSize: "14px", outline: "none", boxSizing: "border-box"
                }}
                onFocus={e => e.target.style.borderColor = "#185FA5"}
                onBlur={e => e.target.style.borderColor = "#E2E8F0"}
              />
            </div>

            {/* Experience Required */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>Experience Required</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["Fresher (0 yr)", "0–1 year", "1–2 years", "2+ years"].map(exp => (
                  <button key={exp} style={{
                    padding: "7px 14px", border: "1.5px solid #E2E8F0",
                    borderRadius: "8px", fontSize: "12px",
                    cursor: "pointer", background: "white", color: "#64748B"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#185FA5";
                    e.currentTarget.style.color = "#185FA5";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.color = "#64748B";
                  }}>{exp}</button>
                ))}
              </div>
            </div>

            {/* Stipend / Salary */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>Stipend / Salary</label>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                {["Paid", "Unpaid"].map(type => (
                  <button key={type} style={{
                    padding: "7px 20px", border: "1.5px solid #E2E8F0",
                    borderRadius: "8px", fontSize: "13px",
                    cursor: "pointer", background: "white", color: "#64748B"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#185FA5";
                    e.currentTarget.style.color = "#185FA5";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.color = "#64748B";
                  }}>{type}</button>
                ))}
              </div>
              <input type="text"
                placeholder="e.g. ₹15,000/month or ₹4–6 LPA (leave blank if unpaid)"
                style={{
                  width: "100%", padding: "10px 14px",
                  border: "1.5px solid #E2E8F0", borderRadius: "10px",
                  fontSize: "14px", outline: "none", boxSizing: "border-box"
                }}
                onFocus={e => e.target.style.borderColor = "#185FA5"}
                onBlur={e => e.target.style.borderColor = "#E2E8F0"}
              />
            </div>

            {/* Duration */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>Duration (for internships)</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["1 month", "2 months", "3 months", "6 months", "Not applicable"].map(d => (
                  <button key={d} style={{
                    padding: "7px 14px", border: "1.5px solid #E2E8F0",
                    borderRadius: "8px", fontSize: "12px",
                    cursor: "pointer", background: "white", color: "#64748B"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#185FA5";
                    e.currentTarget.style.color = "#185FA5";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#E2E8F0";
                    e.currentTarget.style.color = "#64748B";
                  }}>{d}</button>
                ))}
              </div>
            </div>

            {/* Vacancies and Deadline */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "12px", marginBottom: "16px"
            }}>
              <div>
                <label style={{
                  display: "block", fontSize: "13px",
                  fontWeight: "500", color: "#374151", marginBottom: "6px"
                }}>Number of Vacancies</label>
                <input type="number" placeholder="e.g. 3"
                  style={{
                    width: "100%", padding: "10px 14px",
                    border: "1.5px solid #E2E8F0", borderRadius: "10px",
                    fontSize: "14px", outline: "none", boxSizing: "border-box"
                  }}
                  onFocus={e => e.target.style.borderColor = "#185FA5"}
                  onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                />
              </div>
              <div>
                <label style={{
                  display: "block", fontSize: "13px",
                  fontWeight: "500", color: "#374151", marginBottom: "6px"
                }}>Application Deadline</label>
                <input type="date"
                  style={{
                    width: "100%", padding: "10px 14px",
                    border: "1.5px solid #E2E8F0", borderRadius: "10px",
                    fontSize: "14px", outline: "none", boxSizing: "border-box"
                  }}
                  onFocus={e => e.target.style.borderColor = "#185FA5"}
                  onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                />
              </div>
            </div>

            {/* Job Description */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                fontWeight: "500", color: "#374151", marginBottom: "6px"
              }}>Job Description</label>
              <textarea
                placeholder="Describe the role, responsibilities, and requirements..."
                rows={4}
                style={{
                  width: "100%", padding: "10px 14px",
                  border: "1.5px solid #E2E8F0", borderRadius: "10px",
                  fontSize: "14px", outline: "none",
                  boxSizing: "border-box", resize: "vertical",
                  fontFamily: "inherit"
                }}
                onFocus={e => e.target.style.borderColor = "#185FA5"}
                onBlur={e => e.target.style.borderColor = "#E2E8F0"}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowPostJob(false)} style={{
                flex: 1, padding: "12px",
                background: "#F8FAFC", color: "#475569",
                border: "1px solid #E2E8F0", borderRadius: "10px",
                fontSize: "14px", fontWeight: "500", cursor: "pointer"
              }}>Cancel</button>
              <button onClick={() => setShowPostJob(false)} style={{
                flex: 2, padding: "12px",
                background: "#185FA5", color: "white",
                border: "none", borderRadius: "10px",
                fontSize: "14px", fontWeight: "600", cursor: "pointer",
                boxShadow: "0 4px 12px rgba(24,95,165,0.3)"
              }}>Post Opportunity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};