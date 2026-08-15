import { useState, useEffect } from "react";
import CircularGallery from "./CircularGallery";
import TextType from "./TextType";
import LogoLoop from "./LogoLoop";

const NAV_LINKS = ["Home", "Resume", "Projects", "Contact"/*, "Hobbies"*/];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ===== Smooth Theme Animation Support ===== */
  @property --accent {
    syntax: "<color>";
    inherits: true;
    initial-value: #7c6cff;
  }
  @property --accent2 {
    syntax: "<color>";
    inherits: true;
    initial-value: #ff6c9d;
  }
  @property --accent3 {
    syntax: "<color>";
    inherits: true;
    initial-value: #6cffda;
  }

  :root {
    --bg: #0a0a0f;
    --bg2: #111118;
    --card: #16161f;
    --border: #2a2a3a;

    /* start */
    --accent: #7c6cff;
    --accent2: #ff6c9d;
    --accent3: #6cffda;

    --text: #e8e8f0;
    --muted: #888899;
    --white: #ffffff;

    /* 4 themes × 60 seconds each = 240 seconds total */
    animation: themeSmooth 240s linear infinite;
  }

  @keyframes themeSmooth {
    /* Purple */
    0% {
      --accent: #7c6cff;
      --accent2: #ff6c9d;
      --accent3: #6cffda;
    }
    /* Blue */
    25% {
      --accent: #4aa3ff;
      --accent2: #59d6ff;
      --accent3: #7c6cff;
    }
    /* Green */
    50% {
      --accent: #3cff7a;
      --accent2: #6cffda;
      --accent3: #4aa3ff;
    }
    /* Orange */
    75% {
      --accent: #ff8a3d;
      --accent2: #ffd24a;
      --accent3: #ff6c9d;
    }
    /* Back to Purple */
    100% {
      --accent: #7c6cff;
      --accent2: #ff6c9d;
      --accent3: #6cffda;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :root { animation: none; }
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .portfolio-root { min-height: 100vh; }

  /* NAV */
  .pf-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 3rem;
    background: rgba(10,10,15,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .pf-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 1.4rem;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    cursor: pointer;
  }
  .pf-nav-links { display: flex; gap: 2rem; list-style: none; }
  .pf-nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
    color: var(--muted); transition: color 0.2s;
    letter-spacing: 0.04em;
  }
  .pf-nav-links button:hover, .pf-nav-links button.active { color: var(--white); }
  .pf-nav-links button.active { color: var(--accent); }

  /* SECTIONS */
  .pf-section { padding: 7rem 3rem 4rem; max-width: 1100px; margin: 0 auto; }
  .section-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    margin-bottom: 3rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .section-title::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--border), transparent);
  }

  /* HOME */
  .home-hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 7rem 3rem 4rem; text-align: center; position: relative;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,108,255,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(255,108,157,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 20%, rgba(108,255,218,0.06) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px; opacity: 0.3;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  }
  .hero-content { position: relative; z-index: 1; }
  .hero-avatar {
    width: 130px; height: 130px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800;
    color: white; margin: 0 auto 2rem;

    /* Fallback + smooth glow */
    box-shadow: 0 0 60px rgba(124,108,255,0.4);
    box-shadow: 0 0 60px color-mix(in srgb, var(--accent) 40%, transparent);

    animation: float 4s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .hero-name {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1.1; margin-bottom: 1rem;
  }
  .grad-text {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-sub {
    font-size: 1.15rem; color: var(--muted); margin-bottom: 2.5rem;
    font-weight: 300; letter-spacing: 0.02em;
  }
  .hero-about {
    max-width: 560px; margin: 0 auto 2.5rem;
    color: var(--text); line-height: 1.7; font-size: 1rem;
  }
  .hero-links { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .pf-btn {
    padding: 0.75rem 2rem; border-radius: 8px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s;
    display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;
    border: none;
  }
  .pf-btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: white;
  }
  .pf-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
  .pf-btn-outline {
    background: transparent; border: 1px solid var(--border);
    color: var(--text);
  }
  .pf-btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  /* CARDS */
  .pf-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 2rem; margin-bottom: 1.5rem;
    transition: border-color 0.2s, transform 0.2s;
  }
  .pf-card:hover { border-color: rgba(124,108,255,0.4); transform: translateY(-2px); }
  .card-header { display: flex; align-items: flex-start; gap: 1.5rem; flex-wrap: wrap; }
  .card-badge {
    background: rgba(124,108,255,0.1); border: 1px solid rgba(124,108,255,0.3);
    border-radius: 10px; padding: 1rem 1.2rem; min-width: 180px;
    flex-shrink: 0;
  }
  .card-badge-date { color: var(--accent); font-size: 0.8rem; font-weight: 600; margin-bottom: 0.4rem; }
  .card-badge-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.2rem; }
  .card-badge-org { color: var(--muted); font-size: 0.82rem; }
  .card-body-text { flex: 1; line-height: 1.7; color: var(--muted); font-size: 0.95rem; min-width: 200px; }

  /* SECTION SUBTITLE */
  .section-sub {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 1.4rem; color: var(--accent2); margin: 2.5rem 0 1.5rem;
  }

  /* SKILLS */
  .skills-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem; margin-bottom: 2rem;
  }
  .skill-chip {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 10px; padding: 0.75rem 1rem;
    font-size: 0.88rem; font-weight: 500; text-align: center;
    transition: all 0.2s;
  }
  .skill-chip:hover {
    border-color: var(--accent); color: var(--accent);
    background: rgba(124,108,255,0.08);
  }
  .lang-chip {
    background: rgba(108,255,218,0.08); border: 1px solid rgba(108,255,218,0.2);
    color: var(--accent3);
  }
  .lang-chip:hover { border-color: var(--accent3); }

  /* CERT */
  .cert-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem;
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
  }
  .cert-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: linear-gradient(135deg, #b06cff, #ff6c9d); flex-shrink: 0;
  }
  .cert-name { font-weight: 600; font-size: 0.95rem; }
  .cert-detail { color: var(--muted); font-size: 0.85rem; margin-top: 0.2rem; }

  /* PROJECTS */
  .github-stats { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2rem; }
  .github-stats img {
    border-radius: 12px; flex: 1; min-width: 200px;
    max-width: 100%; transition: transform 0.2s;
  }
  .github-stats img:hover { transform: scale(1.02); }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
  .contact-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.8rem; text-align: center;
    text-decoration: none; color: var(--text);
    transition: all 0.25s; display: flex; flex-direction: column;
    align-items: center; gap: 0.8rem;
  }
  .contact-card:hover { border-color: var(--accent); transform: translateY(-4px); color: var(--accent); }
  .contact-icon { font-size: 2rem; }
  .contact-label { font-size: 0.85rem; color: var(--muted); }

  .contact-form { margin-top: 3rem; }
  .form-group { margin-bottom: 1.2rem; }
  .form-label { display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--muted); font-weight: 500; }
  .form-input, .form-textarea {
    width: 100%; background: var(--card); border: 1px solid var(--border);
    border-radius: 10px; padding: 0.9rem 1.1rem;
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    transition: border-color 0.2s; outline: none; resize: vertical;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--accent); }
  .form-textarea { min-height: 140px; }
  .form-success {
    background: rgba(108,255,218,0.1); border: 1px solid var(--accent3);
    border-radius: 10px; padding: 1rem; text-align: center;
    color: var(--accent3); font-size: 0.95rem;
  }

  /* HOBBIES */
  .photo-grid { columns: 3; gap: 1rem; }
  @media (max-width: 768px) { .photo-grid { columns: 2; } }
  @media (max-width: 480px) { .photo-grid { columns: 1; } }
  .photo-card {
    break-inside: avoid; background: var(--card);
    border: 1px solid var(--border); border-radius: 12px;
    overflow: hidden; margin-bottom: 1rem;
    transition: all 0.25s; cursor: pointer;
  }
  .photo-card:hover { border-color: rgba(124,108,255,0.5); transform: scale(1.02); }
  .photo-placeholder {
    aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    font-size: 2.5rem;
  }
  .photo-caption {
    padding: 0.8rem 1rem; font-size: 0.82rem; color: var(--muted); line-height: 1.4;
  }

  /* FOOTER */
  .pf-footer {
    border-top: 1px solid var(--border);
    padding: 2rem 3rem;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
    gap: 1rem; font-size: 0.85rem; color: var(--muted);
  }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a {
    color: var(--muted); text-decoration: none; font-size: 1.3rem;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--accent); }

  /* FADE IN */
  .fade-in { animation: fadeIn 0.6s ease both; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 768px) {
    .pf-nav {
      gap: 1rem;
    }

    .pf-nav-links {
      flex: 1;
      justify-content: flex-end;
      gap: 1.2rem;  /* reduce spacing */
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .pf-nav-links::-webkit-scrollbar {
      display: none;
    }

    .pf-nav-links button {
      flex: 0 0 auto;
      white-space: nowrap;
      padding: 0.4rem 0.25rem;
    }
  }
`;

// ---- DATA ----
const experience = [
  {
    date: "May 2026 – August 2026",
    title: "Quality Assurance Tester",
    org: "OnlyMe · Toronto, ON",
    desc: "Volunteered as a QA Tester for OnlyMe, an early-stage tech startup. In this role I tested the application across core features and identifyed any bugs and usability issues before release. Documented findings and reported them directly to the founding team. Proposed specific improvements based on hands-on user experience testing, contributing to product refinement during the company's early development stage."
  },
  
  {
    date: "April 2025 – Present",
    title: "Event Staff",
    org: "University of Guelph · Guelph, ON",
    desc: "Manage varsity game day operations at the Athletics department, enhancing efficiency and customer satisfaction. Coordinate concession sales and ticketing to optimize revenue, facilitate DJ booth operations, and implement crowd control strategies for a safe, positive experience."
  },
  {
    date: "January 2024 – April 2025",
    title: "On Call & Door Staff",
    org: "University of Guelph · Guelph, ON",
    desc: "Ensured safety and security of residents and guests on weekends. Greeted and registered guests, monitored building access, enforced security measures, and assisted with excellent customer service."
  },
  {
    date: "March 2024 – September 2024",
    title: "uniBuddy Ambassador",
    org: "University of Guelph · Guelph, ON",
    desc: "Represented the university to prospective students via the uni-Buddy platform. Answered questions and shared personal experiences to help students make informed educational decisions."
  }
];

const education = [
  {
    date: "2023 – Present",
    title: "University of Guelph",
    org: "Guelph, ON, Canada",
    desc: "Bachelor of Computing (Honours), Computer Science",
    coursework: [
      "Data Structures",
      "Analysis & Design of Algorithms",
      "Software System Development & Integration",
      "System Analysis & Design in App",
      "Object Oriented Programming",
      "Software Engineering",
      "Web Development & Design"
    ],
    awards: ["Dean's Honours List — Fall 2025, Winter 2026"]
  }
];

const technicalSkills = [
  { label: "Java", sub: "Language" },
  { label: "Python", sub: "Language" },
  { label: "C", sub: "Language" },
  { label: "SQL", sub: "MySQL, PostgreSQL" },
  { label: "JavaScript", sub: "Language" },
  { label: "HTML/CSS", sub: "Language" },
  { label: "Dart", sub: "Language" },
  { label: "React", sub: "Framework" },
  { label: "Node.js", sub: "Framework" },
  { label: "Flask", sub: "Framework" },
  { label: "JUnit", sub: "Framework" },
  { label: "Flutter", sub: "Framework" },
  { label: "FastAPI", sub: "Framework" },
  { label: "Git", sub: "Dev Tool" },
  { label: "Docker", sub: "Dev Tool" },
  { label: "VS Code", sub: "Dev Tool" },
  { label: "Visual Studio", sub: "Dev Tool" },
  { label: "PyCharm", sub: "Dev Tool" },
  { label: "Eclipse", sub: "Dev Tool" },
  { label: "Web Development", sub: "HTML, CSS, React, Next.js" },
  { label: "Databases & SQL", sub: null },
];

const professionalSkills = [
  { label: "Team Management", sub: null },
  { label: "Microsoft Office", sub: null },
  { label: "Customer Service", sub: null },
  { label: "Technical & Verbal Communication", sub: null },
  { label: "Problem Solving", sub: null },
  { label: "Time Management", sub: null },
];

const certificates = [
  {
    name: "Smart Serve Ontario",
    detail: "Certificate #240610471157 · Valid 2024/06/10 – 2029/06/09"
  },
  {
    name: "Emergency First Aid with CPR B",
    detail: "LIFESAVING SOCIETY"
  }
];
const projects = [
  {
    title: "E-Commerce-Analytics-Dashboard",
    url: "https://github.com/chaos-hunter/E-Commerce-Analytics-Dashboard",
    desc: "Developed a full-stack e-commerce analytics platform using Spring Boot, React/TypeScript, and MariaDB that ingests and cleans raw retail transaction data, performs RFM analysis, and visualizes customer segments through an interactive scatter plot and histograms with dynamic filtering and .xlsx export",
    tags: ["Java", "Spring Boot", "React", "TypeScript", "MariaDB", "Docker"]
  },

  {
    title: "Neurolink Tutor",
    url: "https://neurolink-tutor.vercel.app/",
    desc: "Neuralinq ITS is a full-stack intelligent tutoring system built with React and Flask that uses Google Gemini AI to dynamically generate personalized lessons, questions, and practice sets tailored to each student's mastery level. It features an adaptive learning algorithm that tracks student performance across skills and adjusts content difficulty in real time, alongside an admin panel for content management, AI-generated materials, and progress analytics.",
    tags: ["React", "Flask", "Gemini AI"]
  },
  
  {
    title: "Reminder+",
    url: "https://github.com/chaos-hunter/Reminder-",
    desc: "Reminder+ is a Flutter habit-tracking app that combines time-based and location-based reminders with a journaling feature. Users get notified when they arrive at specific places rather than just at set times, and can log dated journal entries to support daily self-improvement.",
    tags: ["Flutter", "Dart", "Mobile"]
  },
  
  {
    title: "Finance Manager",
    url: "https://github.com/chaos-hunter/Finance-manager",
    desc: "Developed a full-stack personal finance management application using Django, Python, and SQLite that features secure user authentication and email-based password reset capabilities. The platform enables users to create custom categorical budget wallets, record granular transactional data, and automatically calculates real-time remaining balances and expenditure totals using robust backend data models.",
    tags: ["Python", "Django", "SQLite"]
  },
  {
    title: "Investor Simulation",
    url: "https://github.com/chaos-hunter/Portfolio-simulation-flutter-app",
    desc: "ProInvestor is a cross-platform real-time stock simulation and wealth projection application. Originally developed as a web app, it has been completely rebuilt using Flutter to provide a seamless, native experience across Windows laptops and Android/iOS smartphones. It allows users to track live stock prices, simulate paper trading with a virtual wallet, and project future investment growth over time.",
    tags: ["Flutter", "Yahoo Finance API", "Mobile"]
  },
];

// ---- COMPONENTS ----
function HomeSection() {
  return (
    <div className="home-hero fade-in" id="Home">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-avatar">DE</div>
        <h1 className="hero-name">
          Hello, I'm <span className="grad-text">David Entonu</span>
        </h1>
        <p className="hero-sub">Aspiring Developer & Tech Lover</p>
        <div className="hero-about">
          <TextType
            text={[
              "Fourth-year Bachelor of Computing student in Computer Science at the University of Guelph, graduating the Summer of 2027",
              "Passionate about the fields of Cloud devlopment, Data analytics, and Software Development",
              " Strong foundation in data structures, algorithms, and object-oriented programming through coursework and hands-on projects in Python, Java, and C"
            ]}
            typingSpeed={40}
            deletingSpeed={20}
            pauseDuration={2500}
            showCursor={true}
            cursorCharacter="_"
            loop={true}
          />
        </div>
        <div className="hero-links">
          <a className="pf-btn pf-btn-primary" href="https://github.com/chaos-hunter" target="_blank" rel="noreferrer">
            ⬡ GitHub
          </a>
          <a className="pf-btn pf-btn-outline" href="https://www.linkedin.com/in/david-e-218683129" target="_blank" rel="noreferrer">
            in LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

function ResumeSection() {
  return (
    <section className="pf-section fade-in" id="Resume">
      <h2 className="section-title"><span className="grad-text">Resume</span></h2>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
        <a className="pf-btn pf-btn-primary" href="/Resume.pdf" target="_blank" rel="noreferrer">
          ⬇ View Full Resume
        </a>
      </div>

      <p className="section-sub">Experience</p>
      {experience.map((e, i) => (
        <div className="pf-card" key={i}>
          <div className="card-header">
            <div className="card-badge">
              <div className="card-badge-date">{e.date}</div>
              <div className="card-badge-title">{e.title}</div>
              <div className="card-badge-org">{e.org}</div>
            </div>
            <p className="card-body-text">{e.desc}</p>
          </div>
        </div>
      ))}

      <p className="section-sub">Education</p>
      {education.map((e, i) => (
        <div className="pf-card" key={i}>
          <div className="card-header">
            <div className="card-badge">
              <div className="card-badge-date">{e.date}</div>
              <div className="card-badge-title">{e.title}</div>
              <div className="card-badge-org">{e.org}</div>
            </div>
            <div className="card-body-text">
              <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.75rem" }}>{e.desc}</p>
              <p style={{ fontSize: "0.82rem", color: "var(--accent)", fontWeight: 600, marginBottom: "0.4rem" }}>
                Relevant Coursework
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                {e.coursework.map(c => (
                  <span key={c} style={{
                    background: "rgba(124,108,255,0.08)", border: "1px solid rgba(124,108,255,0.2)",
                    borderRadius: "6px", padding: "0.2rem 0.6rem",
                    fontSize: "0.78rem", color: "var(--muted)"
                  }}>
                    {c}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--accent2)", fontWeight: 600, marginBottom: "0.4rem" }}>
                Awards
              </p>
              {e.awards.map(a => (
                <span key={a} style={{
                  background: "rgba(255,108,157,0.08)", border: "1px solid rgba(255,108,157,0.2)",
                  borderRadius: "6px", padding: "0.2rem 0.6rem",
                  fontSize: "0.78rem", color: "var(--accent2)"
                }}>
                   {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

         <p className="section-sub">Technical Skills</p>
      <div style={{ padding: "1rem 0 2rem" }}>
        <LogoLoop
          logos={technicalSkills.map(s => ({ node: s }))}
          speed={60}
          direction="left"
          gap={12}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#0a0a0f"
          renderItem={(item) => (
            <div style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "0.6rem 1.1rem",
              whiteSpace: "nowrap",
              transition: "border-color 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,108,255,0.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>
                {item.node.label}
              </div>
              {item.node.sub && (
                <div style={{ fontSize: "0.75rem", color: "var(--accent)", marginTop: "0.15rem" }}>
                  {item.node.sub}
                </div>
              )}
            </div>
          )}
        />
      </div>

      <p className="section-sub">Professional Skills</p>
      <div style={{ padding: "1rem 0 2rem" }}>
        <LogoLoop
          logos={professionalSkills.map(s => ({ node: s }))}
          speed={60}
          direction="right"
          gap={12}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#0a0a0f"
          renderItem={(item) => (
            <div style={{
              background: "rgba(255,108,157,0.08)",
              border: "1px solid rgba(255,108,157,0.2)",
              borderRadius: "10px",
              padding: "0.6rem 1.1rem",
              whiteSpace: "nowrap",
              transition: "border-color 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,108,157,0.2)"}
            >
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--accent2)" }}>
                {item.node.label}
              </div>
            </div>
          )}
        />
      </div>

      {/* <p className="section-sub">Certificates</p>
      {certificates.map((c, i) => (
        <div className="cert-card" key={i}>
          <div className="cert-dot" />
          <div>
            <div className="cert-name">{c.name}</div>
            <div className="cert-detail">{c.detail}</div>
          </div>
        </div>
      ))} */}

    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="pf-section fade-in" id="Projects">
      <h2 className="section-title"><span className="grad-text">Projects</span></h2>
      <p style={{ color: "var(--muted)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
        A selection of my work. Click any card to view the live project.
      </p>

      <div className="github-stats" style={{ marginBottom: "3rem" }}>
        <img
          src="https://github-readme-stats-peach-kappa-61.vercel.app/api?username=chaos-hunter&show_icons=true&theme=radical&cache_seconds=1800"
          alt="GitHub Stats"
        />
        <img
          src="https://github-readme-stats-peach-kappa-61.vercel.app/api/top-langs/?username=chaos-hunter&layout=compact&theme=radical&cache_seconds=1800"
          alt="Top Languages"
        />
      </div>

      <p className="section-sub">Top Projects</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {projects.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="pf-card" style={{ height: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>
                  {p.title}
                </h3>
                <span style={{ color: "var(--accent)", fontSize: "1rem", flexShrink: 0 }}>↗</span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6, flex: 1, margin: 0 }}>
                {p.desc}
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{
                    background: "rgba(124,108,255,0.1)",
                    border: "1px solid rgba(124,108,255,0.25)",
                    borderRadius: "6px", padding: "0.2rem 0.6rem",
                    fontSize: "0.75rem", color: "var(--accent)"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <a className="pf-btn pf-btn-outline" href="https://github.com/chaos-hunter" target="_blank" rel="noreferrer">
          View all on GitHub →
        </a>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mqaqareq", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) { setSent(true); setForm({ name: "", email: "", phone: "", message: "" }); }
    } catch (_) {}
    setSending(false);
  };

  return (
    <section className="pf-section fade-in" id="Contact">
      <h2 className="section-title"><span className="grad-text">Contact</span></h2>
      <p style={{ color: "var(--muted)", marginBottom: "2.5rem" }}>
        Let's work together! Reach out through any of these channels.
      </p>

      <div className="contact-grid">
        <a className="contact-card" href="https://www.linkedin.com/in/david-e-218683129" target="_blank" rel="noreferrer">
          <span className="contact-icon">💼</span>
          <strong>LinkedIn</strong>

        </a>
        <a className="contact-card" href="https://github.com/chaos-hunter" target="_blank" rel="noreferrer">
          <span className="contact-icon">⬡</span>
          <strong>GitHub</strong>

        </a>
    {/* <a className="contact-card" href="https://discord.com/users/1001158517329231912" target="_blank" rel="noreferrer">
          <span className="contact-icon">🎮</span>
          <strong>Discord</strong>

        </a> */}
      </div>

      <div className="contact-form">
        <p className="section-sub" style={{ marginTop: "1rem" }}>Send a Message</p>
        {sent ? (
          <div className="form-success">✓ Message sent! I'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="name@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Phone (optional)</label>
              <input className="form-input" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(123) 456-7890" />
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea className="form-textarea form-input" name="message" value={form.message} onChange={handleChange} required placeholder="Your message..." />
            </div>
            <button className="pf-btn pf-btn-primary" type="submit" disabled={sending} style={{ width: "100%", justifyContent: "center" }}>
              {sending ? "Sending…" : "Send Message →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function HobbiesSection() {
  const galleryItems = [
    { image: "/img/image2.JPG", text: "Table Mountain" },
    { image: "/img/image3.jpg", text: "Pickering Forest" },
    { image: "/img/image4.jpg", text: "St. Catharines" },
    { image: "/img/image5.PNG", text: "Dundas Square" },
    { image: "/img/image6.jpg", text: "Guelph Arboretum" },
    { image: "/img/image7.JPG", text: "Versailles" },
    { image: "/img/image8.jpg", text: "McMaster Sunset" },
    { image: "/img/image9.jpg", text: "CN Tower" },
    { image: "/img/image10.jpg", text: "Photo" },
    { image: "/img/image11.jpg", text: "Photo" },
    { image: "/img/image12.jpg", text: "Photo" },
    { image: "/img/image13.jpg", text: "Photo" },
  ];

  return (
    <section className="pf-section fade-in" id="Hobbies">
      <h2 className="section-title"><span className="grad-text">Hobbies</span></h2>

      <div style={{ height: "600px", position: "relative", width: "100%" }}>
        <CircularGallery
          items={galleryItems}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
     {/*<PSNStats />*/}
    </section>
  );
}
/*
function PSNStats() {
  const [profile, setProfile] = useState(null);
  const [trophies, setTrophies] = useState(null);
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = 'https://portfolio-m7go.onrender.com/api/psn';
    Promise.all([
      fetch(`${base}/profile`).then(r => r.json()),
      fetch(`${base}/trophies`).then(r => r.json()),
      fetch(`${base}/games`).then(r => r.json()),
    ]).then(([p, t, g]) => {
      setProfile(p);
      setTrophies(t);
      setGames(g);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "var(--muted)" }}>Loading PSN stats...</p>;
  if (!profile) return <p style={{ color: "var(--muted)" }}>Could not load PSN stats.</p>;

  return (
    <div style={{ marginTop: "3rem" }}>
      <p className="section-sub">PlayStation Stats</p>

      {Profile Header }
      <div className="pf-card" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "linear-gradient(135deg, #003791, #00439c)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.8rem", flexShrink: 0
        }}>🎮</div>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
            not__d4v1d
          </div>
          <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "0.2rem" }}>
            PlayStation Network
          </div>
        </div>
      </div>

      {Trophy Summary }
      {trophies && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Platinum", value: trophies.earnedTrophies?.platinum ?? 0, color: "#b0c4de", emoji: "🏆" },
            { label: "Gold", value: trophies.earnedTrophies?.gold ?? 0, color: "#ffd700", emoji: "🥇" },
            { label: "Silver", value: trophies.earnedTrophies?.silver ?? 0, color: "#c0c0c0", emoji: "🥈" },
            { label: "Bronze", value: trophies.earnedTrophies?.bronze ?? 0, color: "#cd7f32", emoji: "🥉" },
          ].map(t => (
            <div key={t.label} className="pf-card" style={{ textAlign: "center", padding: "1.2rem" }}>
              <div style={{ fontSize: "1.5rem" }}>{t.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: "1.3rem", color: t.color, margin: "0.3rem 0" }}>
                {t.value}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{t.label}</div>
            </div>
          ))}
        </div>
      )}

      { Recently Played }
      {games?.recentlyPlayedTitles?.length > 0 && (
        <>
          <p style={{ color: "var(--accent2)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "1rem" }}>
            Recently Played
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
            {games.recentlyPlayedTitles.slice(0, 6).map((game, i) => (
              <div key={i} className="pf-card" style={{ padding: "1rem", textAlign: "center" }}>
                {game.imageUrl && (
                  <img src={game.imageUrl} alt={game.name}
                    style={{ width: "100%", borderRadius: "8px", marginBottom: "0.6rem", objectFit: "cover" }}
                  />
                )}
                <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>{game.name}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
      */
// ---- ROOT ----
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home");

  const scrollTo = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    NAV_LINKS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="portfolio-root">
        <nav className="pf-nav">
          <div className="pf-logo" onClick={() => scrollTo("Home")}>DE</div>
          <ul className="pf-nav-links">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <button
                  className={activeSection === link ? "active" : ""}
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <HomeSection />
        <ResumeSection />
        <ProjectsSection />
        <ContactSection />
        {/* <HobbiesSection /> */}

        <footer className="pf-footer">
          <span>© 2025 David Entonu</span>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/david-e-218683129" target="_blank" rel="noreferrer">in</a>
            <a href="https://github.com/chaos-hunter" target="_blank" rel="noreferrer">⬡</a>
          </div>
        </footer>
      </div>
    </>
  );
}
