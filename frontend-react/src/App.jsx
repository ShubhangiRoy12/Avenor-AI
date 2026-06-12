import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Image,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserRound,
  UsersRound
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";
const DEMO_CHAT_LIMIT = 5;
const DEMO_IMAGE_LIMIT = 2;

const imageIntentWords = [
  "generate image",
  "create image",
  "make image",
  "image of",
  "visual",
  "picture",
  "poster",
  "dashboard mockup",
  "illustration"
];

const performanceData = [
  { day: "Mon", work: 68, focus: 74 },
  { day: "Tue", work: 76, focus: 82 },
  { day: "Wed", work: 84, focus: 79 },
  { day: "Thu", work: 81, focus: 88 },
  { day: "Fri", work: 92, focus: 86 },
  { day: "Sat", work: 74, focus: 78 }
];

const taskData = [
  { name: "Done", value: 62, color: "#38bdf8" },
  { name: "Pending", value: 24, color: "#f59e0b" },
  { name: "Blocked", value: 14, color: "#fb7185" }
];

const employeeRows = [
  {
    name: "Aarav Mehta",
    role: "Operations Lead",
    score: "94%",
    attendance: "96%",
    status: "Excellent"
  },
  {
    name: "Neha Sharma",
    role: "Business Analyst",
    score: "89%",
    attendance: "92%",
    status: "On Track"
  },
  {
    name: "Rohan Kapoor",
    role: "Product Intern",
    score: "82%",
    attendance: "90%",
    status: "Review"
  }
];

const meetings = [
  "10:00 AM - Sprint Planning",
  "12:30 PM - Client Review",
  "03:00 PM - AI Automation Demo"
];

const documents = [
  { name: "Quarterly Report", submitted: true },
  { name: "Compliance Form", submitted: false },
  { name: "Project Proposal", submitted: true }
];

const mails = [
  "Client requested revised delivery plan",
  "HR reminder: attendance regularization",
  "Finance shared updated invoice sheet"
];

const enterprisePrompts = [
  "Prepare an executive summary of this week's employee productivity and blockers",
  "Draft a professional client update email with timeline, risks, and next steps",
  "Analyze team attendance, task progress, and meeting load for management review",
  "Generate image of a premium enterprise AI operations dashboard",
  "Create a detailed project report with achievements, pending tasks, and recommendations"
];

const teamMembers = [
  {
    name: "Ananya Rao",
    role: "Senior Operations Manager",
    email: "ananya.rao@avenor.ai",
    team: "Enterprise Operations",
    desk: "Floor 4, D-27",
    availability: "09:30 AM - 06:30 PM",
    focus: "Workflow automation",
    load: 78,
    status: "Available",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Aarav Mehta",
    role: "Operations Lead",
    email: "aarav.mehta@avenor.ai",
    team: "Client Delivery",
    desk: "Floor 3, B-14",
    availability: "10:00 AM - 07:00 PM",
    focus: "Client escalations",
    load: 64,
    status: "In meeting",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Neha Sharma",
    role: "Business Analyst",
    email: "neha.sharma@avenor.ai",
    team: "Growth Intelligence",
    desk: "Floor 5, A-08",
    availability: "09:00 AM - 06:00 PM",
    focus: "Market reports",
    load: 71,
    status: "Available",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Rohan Kapoor",
    role: "Product Intern",
    email: "rohan.kapoor@avenor.ai",
    team: "AI Products",
    desk: "Floor 2, C-19",
    availability: "11:00 AM - 08:00 PM",
    focus: "Dashboard QA",
    load: 52,
    status: "Deep work",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
  }
];

const workflowItems = [
  {
    stage: "Intake",
    title: "Client automation request",
    owner: "Aarav",
    impact: "High",
    next: "Convert meeting notes into task brief"
  },
  {
    stage: "AI Review",
    title: "Support ticket pattern analysis",
    owner: "Neha",
    impact: "Medium",
    next: "Ask Avenor for blocker summary"
  },
  {
    stage: "Approval",
    title: "Quarterly productivity report",
    owner: "Ananya",
    impact: "High",
    next: "Export PDF for leadership"
  }
];

const documentTemplates = [
  "Employee performance report",
  "Client project update",
  "Meeting minutes with action items",
  "Weekly team productivity summary",
  "AI adoption business proposal",
  "Pending documents checklist"
];

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%2338bdf8'/%3E%3Cstop offset='.52' stop-color='%232563eb'/%3E%3Cstop offset='1' stop-color='%238b5cf6'/%3E%3C/linearGradient%3E%3CradialGradient id='r' cx='.28' cy='.18' r='.75'%3E%3Cstop stop-color='%23dbeafe' stop-opacity='.65'/%3E%3Cstop offset='1' stop-color='%23dbeafe' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='400' height='400' rx='92' fill='%23071124'/%3E%3Ccircle cx='200' cy='200' r='176' fill='url(%23g)' opacity='.92'/%3E%3Ccircle cx='150' cy='116' r='150' fill='url(%23r)'/%3E%3Ccircle cx='200' cy='158' r='56' fill='%23e0f2fe'/%3E%3Cpath d='M92 323c18-76 67-116 108-116s90 40 108 116' fill='%23e0f2fe'/%3E%3Cpath d='M116 326c22-48 50-72 84-72s62 24 84 72' fill='%230f172a' opacity='.16'/%3E%3C/svg%3E";

const defaultProfile = {
  name: "Ananya Rao",
  role: "Senior Operations Manager",
  email: "ananya.rao@avenor.ai",
  enterprise: "Avenor AI",
  team: "Enterprise Operations",
  desk: "Floor 4, D-27",
  availability: "09:30 AM - 06:30 PM",
  manager: "Ritika Sharma",
  status: "Available",
  image: DEFAULT_AVATAR
};

const heroSlides = [
  {
    title: "AI workspace for modern teams.",
    description: "Plan, write, analyze, and export from one premium command center."
  },
  {
    title: "From idea to action, faster.",
    description: "Convert rough notes into prompts, reports, tasks, and decisions."
  },
  {
    title: "Enterprise AI, without clutter.",
    description: "Manage agents, documents, visuals, and team context in one place."
  },
  {
    title: "Build better work outputs.",
    description: "Create polished briefs, summaries, updates, and AI-ready prompts."
  },
  {
    title: "Your office AI command layer.",
    description: "Bring people, workflows, and intelligent agents into a focused workspace."
  }
];

function createCaptcha() {
  const left = Math.floor(10 + Math.random() * 40);
  const right = Math.floor(2 + Math.random() * 18);
  return {
    question: `${left} + ${right}`,
    answer: String(left + right)
  };
}

function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authPanel, setAuthPanel] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isEnteringWorkspace, setIsEnteringWorkspace] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(() => createCaptcha());
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [mode, setMode] = useState("auto");
  const [input, setInput] = useState("");
  const [backendOnline, setBackendOnline] = useState(null);
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("avenor-profile") || "null") || defaultProfile;
    } catch {
      return defaultProfile;
    }
  });
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("avenor-react-chat") || "[]");
    } catch {
      return [];
    }
  });
  const [documentDraft, setDocumentDraft] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("avenor-document-draft") || "null") || {
        title: "Agent Output Draft",
        type: "Report",
        content: "",
        signature: "Approved by Avenor AI Workspace"
      };
    } catch {
      return {
        title: "Agent Output Draft",
        type: "Report",
        content: "",
        signature: "Approved by Avenor AI Workspace"
      };
    }
  });
  const [recentChats, setRecentChats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("avenor-recent-chats") || "[]");
    } catch {
      return [];
    }
  });
  const [demoUsage, setDemoUsage] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("avenor-demo-usage") || "null") || {
        ai: 0,
        image: 0
      };
    } catch {
      return {
        ai: 0,
        image: 0
      };
    }
  });
  const [limitPopup, setLimitPopup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const completionRate = useMemo(() => {
    const done = taskData.find(item => item.name === "Done")?.value || 0;
    return `${done}%`;
  }, []);

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch(`${API_BASE}/health`);
        setBackendOnline(response.ok);
      } catch {
        setBackendOnline(false);
      }
    }

    checkBackend();
    const timer = window.setInterval(checkBackend, 15000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex(current => (current + 1) % heroSlides.length);
    }, 4300);

    return () => window.clearInterval(timer);
  }, []);

  function handleAuth(event) {
    event.preventDefault();

    if (captchaInput.trim() !== captcha.answer) {
      alert("Captcha is incorrect. Please enter the shown code.");
      setCaptcha(createCaptcha());
      setCaptchaInput("");
      return;
    }

    setIsEnteringWorkspace(true);
    window.setTimeout(() => {
      setIsAuthed(true);
      setNeedsProfileSetup(authMode === "signup" || localStorage.getItem("avenor-profile-complete") !== "true");
      setIsEnteringWorkspace(false);
    }, 900);
  }

  function saveMessages(nextMessages) {
    setMessages(nextMessages);
    sessionStorage.setItem("avenor-react-chat", JSON.stringify(nextMessages.slice(-60)));
  }

  function isImageRequest(query) {
    const normalizedQuery = query.toLowerCase();
    return mode === "image" || imageIntentWords.some(word => normalizedQuery.includes(word));
  }

  function saveDemoUsage(nextUsage) {
    setDemoUsage(nextUsage);
    sessionStorage.setItem("avenor-demo-usage", JSON.stringify(nextUsage));
  }

  function showDemoLimit(kind) {
    const text =
      kind === "image"
        ? "The public demo allows 2 image generations per session to protect API credits. Please contact the creator for full access."
        : "The public demo allows 5 AI requests per session to protect API credits. Please contact the creator for full access.";

    setLimitPopup({ kind, text });
    setActiveView("agents");

    const limitMessages = [
      ...messages,
      {
        role: "assistant",
        text: `Thanks for exploring Avenor AI! ${text}`,
        agent: "Demo Limit"
      }
    ];

    saveMessages(limitMessages.slice(-60));
  }

  function rememberConversation(nextMessages) {
    const lastUser = [...nextMessages].reverse().find(message => message.role === "user");
    const lastAssistant = [...nextMessages].reverse().find(message => message.role === "assistant");

    if (!lastUser || !lastAssistant) return;

    const snapshot = {
      id: Date.now(),
      title: lastUser.text.slice(0, 72),
      updatedAt: new Date().toLocaleString(),
      messages: nextMessages.slice(-12)
    };

    const nextRecentChats = [
      snapshot,
      ...recentChats.filter(chat => chat.title !== snapshot.title)
    ].slice(0, 3);

    setRecentChats(nextRecentChats);
    localStorage.setItem("avenor-recent-chats", JSON.stringify(nextRecentChats));
  }

  function restoreRecentChat(chat) {
    saveMessages(chat.messages || []);
    setActiveView("agents");
  }

  function clearMemory() {
    setRecentChats([]);
    localStorage.removeItem("avenor-recent-chats");
  }

  function saveDocumentDraft(nextDraft) {
    setDocumentDraft(nextDraft);
    localStorage.setItem("avenor-document-draft", JSON.stringify(nextDraft));
  }

  function openDocumentStudio(content, title = "Agent Output Draft") {
    saveDocumentDraft({
      ...documentDraft,
      title,
      content
    });
    setActiveView("documents");
  }

  function saveProfile(nextProfile) {
    setProfile(nextProfile);
    localStorage.setItem("avenor-profile", JSON.stringify(nextProfile));
  }

  function completeProfile(nextProfile) {
    saveProfile(nextProfile);
    localStorage.setItem("avenor-profile-complete", "true");
    setNeedsProfileSetup(false);
    setActiveView("dashboard");
  }

  async function sendMessage(customPrompt) {
    const query = (customPrompt || input).trim();
    if (!query || isLoading) return;

    const imageRequest = isImageRequest(query);

    if (demoUsage.ai >= DEMO_CHAT_LIMIT) {
      showDemoLimit("chat");
      return;
    }

    if (imageRequest && demoUsage.image >= DEMO_IMAGE_LIMIT) {
      showDemoLimit("image");
      return;
    }

    saveDemoUsage({
      ai: demoUsage.ai + 1,
      image: demoUsage.image + (imageRequest ? 1 : 0)
    });

    const userMessage = {
      role: "user",
      text: query
    };

    const nextMessages = [...messages, userMessage];
    saveMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setActiveView("agents");

    try {
      const response = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, mode })
      });

      const data = await response.json();

      const assistantMessages = [
        ...nextMessages,
        {
          role: "assistant",
          text: data.result,
          agent: data.agent_used,
          steps: data.steps || [],
          imageUrl: data.image_url || null
        }
      ];

      saveMessages(assistantMessages);
      rememberConversation(assistantMessages);
    } catch {
      const failedMessages = [
        ...nextMessages,
        {
          role: "assistant",
          text: "Could not reach Avenor AI backend. Start FastAPI on port 8000, then try again.",
          agent: "System"
        }
      ];

      saveMessages(failedMessages);
      rememberConversation(failedMessages);
    } finally {
      setIsLoading(false);
    }
  }

  async function downloadDocument(type, customQuery = "") {
    const query =
      customQuery.trim() ||
      input.trim() ||
      messages.map(message => `${message.role}: ${message.text}`).join("\n\n") ||
      "Create a professional enterprise productivity report for Avenor AI.";

    try {
      const response = await fetch(`${API_BASE}/generate-${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, mode: "analysis" })
      });

      if (!response.ok) {
        throw new Error("Document export failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = type === "pdf" ? "avenor-report.pdf" : "avenor-report.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert("Document generation failed. Start the FastAPI backend on port 8000, then try again.");
    }
  }

  async function exportContent(type, content, filename = "avenor_agent_output") {
    if (!content?.trim()) {
      alert("No generated text is available to export yet.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/export-${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content, filename })
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.${type === "pdf" ? "pdf" : "docx"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed. Start the FastAPI backend on port 8000, then try again.");
    }
  }

  async function downloadImage(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "avenor-generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  }

  function clearHistory() {
    saveMessages([]);
  }

  const viewTitles = {
    dashboard: "Employee Operations Dashboard",
    team: "Team Directory",
    workflows: "Workflow Intelligence",
    prompts: "Prompt Studio",
    documents: "Document Studio",
    agents: "AI Command Center"
  };

  const latestAssistantText = [...messages].reverse().find(message => message.role === "assistant" && message.text)?.text || "";

  if (!isAuthed) {
    return (
      <main className="auth-page cinematic-auth">
        <div className="ambient-bg" aria-hidden="true">
          <span className="mesh mesh-one"></span>
          <span className="mesh mesh-two"></span>
          <span className="mesh mesh-three"></span>
        </div>
        <div className="particle-field" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} style={{ "--i": index }}></span>
          ))}
        </div>
        <div className="hero-backdrop-system" aria-hidden="true">
          <div className="hero-halo"></div>
          <div className="orbit-ring orbit-one"></div>
          <div className="orbit-ring orbit-two"></div>
          <div className="network-grid">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index}></span>
            ))}
          </div>
          <div className="data-chip chip-one">Live agents</div>
          <div className="data-chip chip-two">Secure workspace</div>
          <div className="data-chip chip-three">Document memory</div>
          <div className="glass-console console-left">
            <i></i>
            <strong></strong>
            <span></span>
            <span></span>
          </div>
          <div className="glass-console console-right">
            <i></i>
            <strong></strong>
            <span></span>
            <span></span>
          </div>
          <div className="glass-console console-bottom-left mini-console">
            <i></i>
            <strong></strong>
            <span></span>
          </div>
          <div className="glass-console console-bottom-right mini-console">
            <i></i>
            <strong></strong>
            <span></span>
          </div>
          <div className="signal-trace trace-one"></div>
          <div className="signal-trace trace-two"></div>
          <div className="bottom-light-rail rail-one"></div>
          <div className="bottom-light-rail rail-two"></div>
        </div>

        <nav className="landing-nav">
          <div className="brand-lockup">
            <img className="brand-logo cinematic-logo" src="/Avenor_logo.png" alt="Avenor AI" />
            <div>
              <h1>Avenor AI</h1>
              <p>Enterprise intelligence workspace</p>
            </div>
          </div>

          <div className="landing-nav-actions">
            <button
              className={authMode === "login" && authPanel ? "active" : ""}
              onClick={() => {
                setAuthMode("login");
                setAuthPanel("login");
              }}
            >
              Login
            </button>
            <button
              className={authMode === "signup" && authPanel ? "active" : ""}
              onClick={() => {
                setAuthMode("signup");
                setAuthPanel("signup");
              }}
            >
              Register
            </button>
          </div>
        </nav>

        <section className="landing-stage">
          <motion.div
            className="auth-hero cinematic-hero"
            key={heroIndex}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="eyebrow">Enterprise AI Command Layer</span>
            <h2>{heroSlides[heroIndex].title}</h2>
            <p>{heroSlides[heroIndex].description}</p>
          </motion.div>

          <div className="hero-ctas">
            <button
              className="primary-button"
              onClick={() => {
                setAuthMode("login");
                setAuthPanel("login");
              }}
            >
              Login to Workspace
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                setAuthMode("signup");
                setAuthPanel("signup");
              }}
            >
              Register Team
            </button>
          </div>

          <div className="workspace-visual" aria-label="Avenor AI workspace preview">
            <div className="visual-orbit"></div>
            <div className="visual-card main">
              <div>
                <strong>Prompt Studio</strong>
              </div>
              <Sparkles size={22} />
            </div>
            <div className="visual-card">
              <div>
                <strong>Document Studio</strong>
              </div>
              <FileText size={22} />
            </div>
            <div className="visual-card">
              <div>
                <strong>Agent Routing</strong>
              </div>
              <Bot size={22} />
            </div>
            <div className="visual-card">
              <div>
                <strong>Smart Insights</strong>
              </div>
              <Activity size={22} />
            </div>
            <div className="visual-card">
              <div>
                <strong>Workplace Hub</strong>
              </div>
              <BriefcaseBusiness size={22} />
            </div>
          </div>

          {authPanel && (
            <motion.section
              className="auth-card cinematic-auth-card"
              initial={{ opacity: 0, y: 26, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="auth-tabs">
                <button className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>Login</button>
                <button className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>Register</button>
              </div>

              <form onSubmit={handleAuth}>
                <h3>{authMode === "login" ? "Welcome back" : "Create workspace"}</h3>
                <p className="form-subtitle">Enter your details and solve the quick addition check.</p>

                {authMode === "signup" && (
                  <label>
                    Full name
                    <input placeholder="Enter your name" />
                  </label>
                )}

                <label>
                  Email
                  <input type="email" placeholder="employee@avenor.ai" required />
                </label>

                <label>
                  Password
                  <input type="password" placeholder="Enter password" required />
                </label>

                <label>
                  Captcha
                  <div className="captcha-row">
                    <strong>{captcha.question} = ?</strong>
                    <input value={captchaInput} onChange={event => setCaptchaInput(event.target.value)} placeholder="Answer" required />
                  </div>
                </label>

                <button className="primary-button" type="submit">
                  {authMode === "login" ? "Enter Workspace" : "Create Account"}
                </button>
              </form>
            </motion.section>
          )}

          <div className="security-strip">
            <div><ShieldCheck size={18} /> Captcha protected</div>
            <div><Lock size={18} /> Session secured</div>
            <div><Activity size={18} /> AI services ready</div>
          </div>
        </section>

        {isEnteringWorkspace && (
          <motion.div
            className="workspace-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img src="/Avenor_logo.png" alt="Avenor AI" />
            <strong>Opening Avenor workspace</strong>
            <span></span>
          </motion.div>
        )}
      </main>
    );
  }

  if (needsProfileSetup) {
    return <ProfileSetup profile={profile} onComplete={completeProfile} />;
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup compact">
          <img className="sidebar-logo" src="/Avenor_logo.png" alt="Avenor AI" />
          <div>
            <h1>Avenor AI</h1>
            <p>Enterprise OS</p>
          </div>
        </div>

        <nav className="nav-list">
          <button className={activeView === "dashboard" ? "active" : ""} onClick={() => setActiveView("dashboard")}><LayoutDashboard size={18} /> Dashboard</button>
          <button className={activeView === "team" ? "active" : ""} onClick={() => setActiveView("team")}><UsersRound size={18} /> Team Directory</button>
          <button className={activeView === "workflows" ? "active" : ""} onClick={() => setActiveView("workflows")}><CheckCircle2 size={18} /> Workflow Lab</button>
          <button className={activeView === "prompts" ? "active" : ""} onClick={() => setActiveView("prompts")}><Sparkles size={18} /> Prompt Studio</button>
          <button className={activeView === "agents" ? "active" : ""} onClick={() => setActiveView("agents")}><Bot size={18} /> AI Agents</button>
          <button className={activeView === "documents" ? "active" : ""} onClick={() => setActiveView("documents")}><FileText size={18} /> Document Studio</button>
        </nav>

        <div className="agent-mode-box">
          <span>Agent Mode</span>
          <select value={mode} onChange={event => setMode(event.target.value)}>
            <option value="auto">Executive Copilot</option>
            <option value="research">Market Research</option>
            <option value="analysis">Business Analysis</option>
            <option value="action">Office Assistant</option>
            <option value="image">Visual Studio</option>
          </select>
        </div>

        <button className="logout-button" onClick={() => setIsAuthed(false)}><LogOut size={17} /> Logout</button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-title">
            <div>
              <p>Enterprise Workspace</p>
              <h2>{viewTitles[activeView]}</h2>
            </div>
          </div>

          <div className="topbar-actions">
            <div className={`status-pill ${backendOnline ? "online" : "offline"}`}>
              <span></span>
              {backendOnline ? "AI Services Online" : "AI Services Offline"}
            </div>
            <button onClick={() => exportContent("pdf", latestAssistantText, "avenor_latest_response")}>PDF</button>
            <button onClick={() => exportContent("word", latestAssistantText, "avenor_latest_response")}>Word</button>
          </div>
        </header>

        {activeView === "dashboard" && (
          <Dashboard
            completionRate={completionRate}
            setActiveView={setActiveView}
            sendMessage={sendMessage}
            profile={profile}
            setProfile={saveProfile}
          />
        )}

        {activeView === "team" && <TeamView sendMessage={sendMessage} profile={profile} />}

        {activeView === "workflows" && <WorkflowView sendMessage={sendMessage} />}

        {activeView === "prompts" && <PromptStudio sendMessage={sendMessage} profile={profile} />}

        {activeView === "documents" && (
          <DocumentStudio
            latestAssistantText={latestAssistantText}
            documentDraft={documentDraft}
            saveDocumentDraft={saveDocumentDraft}
            exportContent={exportContent}
            sendMessage={sendMessage}
          />
        )}

        {activeView === "agents" && (
          <AgentsView
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            messages={messages}
            isLoading={isLoading}
            clearHistory={clearHistory}
            exportContent={exportContent}
            downloadImage={downloadImage}
            openDocumentStudio={openDocumentStudio}
            recentChats={recentChats}
            restoreRecentChat={restoreRecentChat}
            clearMemory={clearMemory}
            demoUsage={demoUsage}
            demoLimits={{ ai: DEMO_CHAT_LIMIT, image: DEMO_IMAGE_LIMIT }}
            isDemoLimited={demoUsage.ai >= DEMO_CHAT_LIMIT}
          />
        )}
      </section>

      {limitPopup && (
        <div className="demo-limit-backdrop" role="dialog" aria-modal="true">
          <motion.div
            className="demo-limit-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22 }}
          >
            <button className="demo-limit-close" onClick={() => setLimitPopup(null)} aria-label="Close limit message">
              x
            </button>
            <div className="demo-limit-emoji">🥳</div>
            <h3>Thanks for exploring Avenor AI!</h3>
            <p>{limitPopup.text}</p>
            <button className="primary-button" onClick={() => setLimitPopup(null)}>Got it</button>
          </motion.div>
        </div>
      )}
    </main>
  );
}

function ProfileSetup({ profile, onComplete }) {
  const [draft, setDraft] = useState(profile);

  function update(field, value) {
    setDraft({ ...draft, [field]: value });
  }

  return (
    <main className="setup-page">
      <section className="setup-card">
        <div className="brand-lockup">
          <img className="brand-logo" src="/Avenor_logo.png" alt="Avenor AI" />
          <div>
            <h1>Build Your Workspace Profile</h1>
            <p>This fills your dashboard, team context, and AI document prompts.</p>
          </div>
        </div>

        <div className="setup-grid">
          <label>Name<input value={draft.name} onChange={event => update("name", event.target.value)} /></label>
          <label>Email<input value={draft.email} onChange={event => update("email", event.target.value)} /></label>
          <label>Enterprise<input value={draft.enterprise} onChange={event => update("enterprise", event.target.value)} /></label>
          <label>Role<input value={draft.role} onChange={event => update("role", event.target.value)} /></label>
          <label>Team<input value={draft.team} onChange={event => update("team", event.target.value)} /></label>
          <label>Desk<input value={draft.desk} onChange={event => update("desk", event.target.value)} /></label>
          <label>Available Time<input value={draft.availability} onChange={event => update("availability", event.target.value)} /></label>
          <label>Manager<input value={draft.manager} onChange={event => update("manager", event.target.value)} /></label>
          <label>Status<input value={draft.status} onChange={event => update("status", event.target.value)} /></label>
        </div>

        <div className="setup-preview">
          <AvatarUploader image={draft.image} name={draft.name} onChange={value => update("image", value)} />
          <div>
            <span className="eyebrow">Preview</span>
            <h2>{draft.name}</h2>
            <p>{draft.role} at {draft.enterprise}</p>
          </div>
        </div>

        <button className="primary-button setup-submit" onClick={() => onComplete(draft)}>Enter Workspace</button>
      </section>
    </main>
  );
}

function AvatarUploader({ image, name, onChange }) {
  function loadFile(file) {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = event => onChange(event.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <label
      className="avatar-uploader"
      onDragOver={event => event.preventDefault()}
      onDrop={event => {
        event.preventDefault();
        loadFile(event.dataTransfer.files?.[0]);
      }}
    >
      <img src={image || DEFAULT_AVATAR} alt={name || "Profile avatar"} />
      <input type="file" accept="image/*" onChange={event => loadFile(event.target.files?.[0])} />
      <span><Image size={16} /> Change Avatar</span>
    </label>
  );
}

function Dashboard({ completionRate, setActiveView, sendMessage, profile, setProfile }) {
  const calendarDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function updateProfile(field, value) {
    setProfile({ ...profile, [field]: value });
  }

  return (
    <div className="dashboard-grid">
      <section className="hero-panel employee-summary-panel">
        <div className="employee-profile-block">
          <img src={profile.image} alt={profile.name} />

          <div>
            <span className="eyebrow">Employee Overview</span>
            <h2>{profile.name}</h2>
            <p>{profile.role} at {profile.enterprise}</p>

            <div className="employee-meta-grid">
              <div>
                <span>Email</span>
                <strong>{profile.email}</strong>
              </div>
              <div>
                <span>Available Time</span>
                <strong>{profile.availability}</strong>
              </div>
              <div>
                <span>Desk</span>
                <strong>{profile.desk}</strong>
              </div>
              <div>
                <span>Team</span>
                <strong>{profile.team}</strong>
              </div>
              <div>
                <span>Manager</span>
                <strong>{profile.manager}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong className="green-text">{profile.status}</strong>
              </div>
            </div>

            <div className="hero-actions">
              <button className="primary-button" onClick={() => setActiveView("agents")}>Open AI Agents</button>
              <button onClick={() => sendMessage(`Prepare a short employee performance summary for ${profile.name} including role, enterprise, availability, team, desk, attendance, tasks, meetings, achievements, and pending documents.`)}>Generate Summary</button>
            </div>
          </div>
        </div>
      </section>

      <section className="stat-card">
        <BriefcaseBusiness />
        <span>Tasks Completed</span>
        <strong>{completionRate}</strong>
        <p>Team delivery is ahead of weekly target.</p>
      </section>

      <section className="stat-card">
        <CalendarDays />
        <span>Meetings Today</span>
        <strong>3</strong>
        <p>Two client-facing, one internal planning sync.</p>
      </section>

      <section className="stat-card">
        <UploadCloud />
        <span>Documents</span>
        <strong>2/3</strong>
        <p>One compliance document still pending.</p>
      </section>

      <section className="chart-card wide">
        <div className="card-heading">
          <h3>Work Performance</h3>
          <p>Weekly productivity and focus trend</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
            <Area type="monotone" dataKey="work" stroke="#38bdf8" fill="rgba(56,189,248,0.18)" />
            <Area type="monotone" dataKey="focus" stroke="#34d399" fill="rgba(52,211,153,0.14)" />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <section className="calendar-card">
        <div className="card-heading">
          <h3>Weekly Calendar</h3>
          <p>Availability and planned work blocks</p>
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day, index) => (
            <div className={index === 2 || index === 4 ? "calendar-day active" : "calendar-day"} key={day}>
              <span>{day}</span>
              <strong>{18 + index}</strong>
            </div>
          ))}
        </div>
        <div className="calendar-events">
          <p><Clock3 size={15} /> 10:00 AM Sprint planning</p>
          <p><Clock3 size={15} /> 03:00 PM AI automation review</p>
        </div>
      </section>

      <section className="profile-editor-card">
        <div className="card-heading">
          <h3>Workspace Profile</h3>
          <p>Update the dashboard with your own details</p>
        </div>
        <div className="profile-form-grid">
          <div className="profile-avatar-field">
            <AvatarUploader image={profile.image} name={profile.name} onChange={value => updateProfile("image", value)} />
          </div>
          <input value={profile.name} onChange={event => updateProfile("name", event.target.value)} placeholder="Name" />
          <input value={profile.email} onChange={event => updateProfile("email", event.target.value)} placeholder="Email" />
          <input value={profile.enterprise} onChange={event => updateProfile("enterprise", event.target.value)} placeholder="Enterprise" />
          <input value={profile.role} onChange={event => updateProfile("role", event.target.value)} placeholder="Role" />
          <input value={profile.team} onChange={event => updateProfile("team", event.target.value)} placeholder="Team" />
          <input value={profile.desk} onChange={event => updateProfile("desk", event.target.value)} placeholder="Desk" />
          <input value={profile.availability} onChange={event => updateProfile("availability", event.target.value)} placeholder="Available time" />
          <input value={profile.manager} onChange={event => updateProfile("manager", event.target.value)} placeholder="Manager" />
        </div>
      </section>

      <section className="chart-card">
        <div className="card-heading">
          <h3>Task Health</h3>
          <p>Assigned work status</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={taskData} dataKey="value" innerRadius={60} outerRadius={88}>
              {taskData.map(item => <Cell key={item.name} fill={item.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section className="table-card">
        <div className="card-heading">
          <h3>Employee Details</h3>
          <p>Performance, attendance, status</p>
        </div>
        {employeeRows.map(row => (
          <div className="employee-row" key={row.name}>
            <div className="avatar">{row.name[0]}</div>
            <div>
              <strong>{row.name}</strong>
              <span>{row.role}</span>
            </div>
            <p>{row.score}</p>
            <p>{row.attendance}</p>
            <em>{row.status}</em>
          </div>
        ))}
      </section>

      <section className="mini-card">
        <h3>Meetings Aligned</h3>
        {meetings.map(item => <p key={item}><Clock3 size={15} /> {item}</p>)}
      </section>

      <section className="mini-card">
        <h3>Important Mails</h3>
        {mails.map(item => <p key={item}><Mail size={15} /> {item}</p>)}
      </section>

      <section className="mini-card">
        <h3>Documents</h3>
        {documents.map(item => (
          <p key={item.name}>
            <FileText size={15} /> {item.name}
            <span className={item.submitted ? "ok" : "warn"}>{item.submitted ? "Submitted" : "Pending"}</span>
          </p>
        ))}
      </section>

      <section className="mini-card ai-work-queue">
        <div>
          <h3>AI Work Queue</h3>
          <p><Sparkles size={15} /> 2 briefs ready for review <span className="ok">Ready</span></p>
          <p><MessageSquare size={15} /> Client update needs approval <span className="warn">Review</span></p>
          <p><FileText size={15} /> Export weekly report from Document Studio <span className="ok">Next</span></p>
        </div>
        <button onClick={() => setActiveView("agents")}>Continue in AI Agents</button>
      </section>
    </div>
  );
}

function TeamView({ sendMessage, profile }) {
  const visibleTeamMembers = [
    {
      ...teamMembers[0],
      name: profile.name || teamMembers[0].name,
      role: profile.role || teamMembers[0].role,
      email: profile.email || teamMembers[0].email,
      team: profile.team || teamMembers[0].team,
      desk: profile.desk || teamMembers[0].desk,
      availability: profile.availability || teamMembers[0].availability,
      image: profile.image || DEFAULT_AVATAR
    },
    ...teamMembers.slice(1)
  ];

  return (
    <div className="page-grid">
      <section className="page-hero">
        <span className="eyebrow">Team Intelligence</span>
        <h2>See who is available, what each person owns, and where AI can support the team.</h2>
        <p>Use this as a lightweight enterprise directory with workload visibility, desk details, availability, and role-based AI actions.</p>
      </section>

      <section className="team-grid">
        {visibleTeamMembers.map(member => (
          <article className="team-card" key={member.email}>
            <div className="team-card-top">
              <img src={member.image} alt={member.name} />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span className={member.status === "Available" ? "status-ok" : "status-soft"}>{member.status}</span>
              </div>
            </div>

            <div className="team-meta">
              <div><span>Email</span><strong>{member.email}</strong></div>
              <div><span>Team</span><strong>{member.team}</strong></div>
              <div><span>Desk</span><strong>{member.desk}</strong></div>
              <div><span>Available</span><strong>{member.availability}</strong></div>
            </div>

            <div className="workload-line">
              <div><span>Workload</span><strong>{member.load}%</strong></div>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${member.load}%` }} /></div>
            </div>

            <button onClick={() => sendMessage(`Create a short professional work summary for ${member.name}, ${member.role}, focusing on ${member.focus}, availability, current workload, and recommended next actions.`)}>
              Generate work brief
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

function WorkflowView({ sendMessage }) {
  return (
    <div className="page-grid">
      <section className="page-hero workflow-hero">
        <span className="eyebrow">Workflow Lab</span>
        <h2>Turn tasks and meetings into AI-assisted execution plans.</h2>
        <p>Instead of a plain task list, this page shows a mini workflow pipeline: intake, AI review, approval, and export-ready output.</p>
      </section>

      <section className="workflow-metrics">
        <div className="stat-card"><Activity /><span>Automation Fit</span><strong>81%</strong><p>Good candidate for AI summarization and reporting.</p></div>
        <div className="stat-card"><Clock3 /><span>Meeting Load</span><strong>3.4h</strong><p>AI can reduce follow-up writing and task extraction.</p></div>
        <div className="stat-card"><BarChart3 /><span>Decision Speed</span><strong>2.1x</strong><p>Faster briefs after each operational review.</p></div>
      </section>

      <section className="workflow-board">
        {workflowItems.map(item => (
          <article className="workflow-item" key={item.title}>
            <div>
              <span>{item.stage}</span>
              <strong>{item.title}</strong>
              <p>Owner: {item.owner} · Impact: {item.impact}</p>
            </div>
            <button onClick={() => sendMessage(`Create an execution plan for "${item.title}". Include owner, next step, risks, deadline suggestions, remarks, and a short meeting follow-up email.`)}>
              Ask Avenor
            </button>
          </article>
        ))}
      </section>

      <section className="innovation-card">
        <h3>Suggested innovative feature</h3>
        <p>
          Add an "AI Meeting-to-Tasks" flow: paste meeting notes, Avenor extracts owners, deadlines,
          blockers, client updates, and creates a downloadable action plan.
        </p>
        <button onClick={() => sendMessage("Create an AI Meeting-to-Tasks action plan from sample meeting notes. Include owners, deadlines, blockers, remarks, and client-ready follow-up.")}>
          Demo meeting-to-tasks
        </button>
      </section>
    </div>
  );
}

function PromptStudio({ sendMessage, profile }) {
  const [idea, setIdea] = useState("Need a project briefing for my internship review");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");

  function optimizePrompt() {
    const prompt = `Act as an enterprise AI assistant for ${profile.enterprise}.

Goal: ${idea}

Context:
- User: ${profile.name}, ${profile.role}
- Team: ${profile.team}
- Audience: professional reviewers or management

Output requirements:
- Write in clear business language
- Use headings and bullet points
- Include objective, current status, achievements, risks, next steps, and recommended actions
- Make the response ready to export as a PDF or Word document
- Avoid generic filler and keep it practical`;

    setOptimizedPrompt(prompt);
  }

  return (
    <div className="prompt-studio">
      <section className="prompt-hero">
        <span className="eyebrow">Prompt Studio</span>
        <h2>Turn rough ideas into precise agent-ready prompts.</h2>
        <p>Write a small idea, optimize it into a structured enterprise prompt, edit it, then send it to AI Agents.</p>
      </section>

      <section className="prompt-builder-card">
        <div className="prompt-input-panel">
          <label>
            Small idea
            <textarea value={idea} onChange={event => setIdea(event.target.value)} />
          </label>
          <button className="primary-button" onClick={optimizePrompt}>Optimize Prompt</button>
        </div>

        <div className="prompt-output-panel">
          <label>
            Optimized prompt
            <textarea
              value={optimizedPrompt}
              onChange={event => setOptimizedPrompt(event.target.value)}
              placeholder="Your optimized prompt will appear here..."
            />
          </label>
          <button onClick={() => sendMessage(optimizedPrompt || idea)}>Send to AI Agents</button>
        </div>
      </section>

      <section className="prompt-template-grid">
        {[
          "Create a printable project briefing",
          "Draft a client escalation update",
          "Analyze team blockers and deadlines",
          "Prepare a leadership-ready weekly report"
        ].map(template => (
          <button key={template} onClick={() => setIdea(template)}>
            <Sparkles size={18} />
            {template}
          </button>
        ))}
      </section>
    </div>
  );
}

function DocumentStudio({ latestAssistantText, documentDraft, saveDocumentDraft, exportContent, sendMessage }) {
  const [draft, setDraft] = useState(documentDraft);

  useEffect(() => {
    setDraft(documentDraft);
  }, [documentDraft]);

  useEffect(() => {
    if (latestAssistantText && !documentDraft.content) {
      const nextDraft = {
        ...documentDraft,
        content: latestAssistantText
      };
      setDraft(nextDraft);
      saveDocumentDraft(nextDraft);
    }
  }, [latestAssistantText, documentDraft, saveDocumentDraft]);

  function updateDraft(field, value) {
    const nextDraft = { ...draft, [field]: value };
    setDraft(nextDraft);
    saveDocumentDraft(nextDraft);
  }

  const signedDocument = `${draft.title}\nDocument Type: ${draft.type}\n\n${draft.content}\n\n---\nSignature: ${draft.signature}`;

  return (
    <div className="document-studio">
      <section className="doc-builder">
        <div className="doc-header-row">
          <div>
            <span className="eyebrow">Document Studio</span>
            <h2>Edit the AI output, save the draft, and export the final document.</h2>
            <p>AI-generated responses sent from AI Agents appear here for editing, signing, reuse, and PDF or Word export.</p>
          </div>
          <div className="doc-memory-badge">
            <CheckCircle2 size={18} />
            Browser draft memory active
          </div>
        </div>

        <div className="doc-meta-grid">
          <label>
            Document title
            <input value={draft.title} onChange={event => updateDraft("title", event.target.value)} />
          </label>

          <label>
            Document type
            <select value={draft.type} onChange={event => updateDraft("type", event.target.value)}>
              <option>Report</option>
              <option>Email</option>
              <option>Proposal</option>
              <option>Meeting Notes</option>
              <option>Project Brief</option>
            </select>
          </label>
        </div>

        <label className="doc-editor-label">
          Editable AI document
          <textarea
            value={draft.content}
            onChange={event => updateDraft("content", event.target.value)}
            placeholder="AI-generated text sent from AI Agents will appear here. You can edit it, save it, send the edited version back to AI, or export it."
          />
        </label>

        <div className="doc-actions">
          <button onClick={() => saveDocumentDraft(draft)}>Save Draft</button>
          <button className="primary-button" onClick={() => exportContent("pdf", signedDocument, "avenor_document")}>Export PDF</button>
          <button onClick={() => exportContent("word", signedDocument, "avenor_document")}>Export Word</button>
          <button onClick={() => sendMessage(`Improve this edited document and make it client-ready:\n\n${signedDocument}`)}>Improve with AI</button>
        </div>
      </section>

      <section className="doc-status-list">
        <div className="card-heading">
          <h3>Document Flow</h3>
          <p>How this page connects to the rest of the workspace.</p>
        </div>
        {[
          ["1", "Generate answer in AI Agents"],
          ["2", "Edit and save draft here"],
          ["3", "Send edited draft back to AI or export"]
        ].map(item => (
          <div className="doc-status-row" key={item[0]}>
            <strong>{item[0]}</strong>
            <span>{item[1]}</span>
            <CheckCircle2 size={16} />
          </div>
        ))}
      </section>
    </div>
  );
}

function AgentsView({
  input,
  setInput,
  sendMessage,
  messages,
  isLoading,
  clearHistory,
  exportContent,
  downloadImage,
  openDocumentStudio,
  recentChats,
  restoreRecentChat,
  clearMemory,
  demoUsage,
  demoLimits,
  isDemoLimited
}) {
  const messageListRef = useRef(null);
  const lastUserRef = useRef(null);

  useEffect(() => {
    if (lastUserRef.current) {
      lastUserRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [messages.length]);

  function copyText(text) {
    navigator.clipboard?.writeText(text);
  }

  return (
    <div className="agents-layout">
      <section className="chat-card">
        <div className="card-heading row">
          <div>
            <h3>AI Agent Workspace</h3>
            <p>Research, analysis, office writing, image generation, reports</p>
            <div className="usage-pills">
              <span>{demoUsage.ai}/{demoLimits.ai} AI requests</span>
              <span>{demoUsage.image}/{demoLimits.image} images</span>
            </div>
          </div>
          <div className="chat-actions">
            <button onClick={clearHistory}>Clear History</button>
            <button onClick={() => exportContent("pdf", [...messages].reverse().find(message => message.role === "assistant")?.text || "", "avenor_latest_response")}>Latest PDF</button>
            <button onClick={() => exportContent("word", [...messages].reverse().find(message => message.role === "assistant")?.text || "", "avenor_latest_response")}>Latest Word</button>
          </div>
        </div>

        <div className="message-list" ref={messageListRef}>
          {messages.length === 0 && (
            <div className="empty-chat">
              <Sparkles size={28} />
              <h3>Ask Avenor anything enterprise-related.</h3>
              <p>Try executive summaries, reports, email drafting, task analysis, or generated visuals.</p>
            </div>
          )}

          {messages.map((message, index) => {
            const isLastUser = message.role === "user" && index === messages.map(item => item.role).lastIndexOf("user");

            return (
            <div
              className={`chat-message ${message.role}`}
              key={`${message.role}-${index}`}
              ref={isLastUser ? lastUserRef : null}
            >
              <div className="message-bubble">
                {message.role === "assistant" ? (
                  <div className="response-shell">
                    <div className="response-toolbar">
                      <strong>AI Response</strong>
                      <button onClick={() => copyText(message.text)}>Copy text</button>
                    </div>
                    <div className="markdown-response">
                      {message.text}
                    </div>
                  </div>
                ) : (
                  <p>{message.text}</p>
                )}
                {message.imageUrl && <img src={message.imageUrl} alt="Generated result" />}
                {message.agent && <span>{message.agent}</span>}
                {message.role === "assistant" && (
                  <div className="message-export-actions">
                    <button onClick={() => exportContent("pdf", message.text, "avenor_agent_response")}>Download PDF</button>
                    <button onClick={() => exportContent("word", message.text, "avenor_agent_response")}>Download Word</button>
                    <button onClick={() => openDocumentStudio(message.text, "Agent Response Draft")}>Edit in Document Studio</button>
                    {message.imageUrl && <button onClick={() => downloadImage(message.imageUrl)}>Download Image</button>}
                  </div>
                )}
              </div>
            </div>
          );
          })}

          {isLoading && <div className="typing">Avenor agents are processing...</div>}
        </div>

        <div className="composer">
          <textarea
            value={input}
            onChange={event => setInput(event.target.value)}
            onKeyDown={event => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            disabled={isDemoLimited || isLoading}
            placeholder={isDemoLimited ? "Demo limit reached. Please contact the creator for full access." : "Ask for reports, office emails, task analysis, visual generation..."}
          />
          <button onClick={() => sendMessage()} disabled={isDemoLimited || isLoading}><Send size={18} /></button>
        </div>
        {isDemoLimited && <p className="demo-limit-inline">Demo limit reached. Thanks for exploring Avenor AI 😊</p>}
      </section>

      <aside className="prompt-panel">
        <div className="prompt-panel-inner">
        <h3>Enterprise Prompts</h3>
        {enterprisePrompts.map(prompt => (
          <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}</button>
        ))}

        <div className="memory-box">
          <div className="memory-heading">
            <h3>Recent Memory</h3>
            <button onClick={clearMemory}>Clear</button>
          </div>
          <p>Last 3 completed chats are saved in this browser.</p>
          {recentChats.length === 0 && <span>No saved chats yet.</span>}
          {recentChats.map(chat => (
            <button className="memory-item" key={chat.id} onClick={() => restoreRecentChat(chat)}>
              <strong>{chat.title}</strong>
              <small>{chat.updatedAt}</small>
            </button>
          ))}
        </div>

        <div className="agent-info">
          <Bot size={22} />
          <strong>Agent routing</strong>
          <p>Avenor automatically routes work to research, analysis, office assistant, or visual generation modules.</p>
        </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
