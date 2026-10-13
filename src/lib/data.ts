export const personalInfo = {
  name: "Shoron",
  title: "Software Engineer",
  email: "silomentus@gmail.com",
  location: "Dhaka, Bangladesh",
  summary:
    "I am a Computer Science graduate from North South University currently working as a Software Engineer. My work focuses on backend development, API design, and building reliable, scalable software solutions.",
  socials: {
    github: "https://github.com/silomentus",
    linkedin: "https://www.linkedin.com/in/md-harun-or-rashid-shoron/",
    facebook: "https://facebook.com/shoronhr", 
    instagram: "https://instagram.com/shoronhr", 
  },
  // Web3Forms access key — get yours free at https://web3forms.com
  web3formsKey: "4f412ec2-2fbc-49ba-9644-a2a0ec1c561e",
};

export const experience = [
  {
    company: "Appinion BD LTD.",
    website: "https://appinionbd.com",
    parentCompany: {
      name: "SAJIDA Foundation",
      url: "https://www.sajida.org/",
    },
    role: "Software Engineer",
    department: "Web Development",
    duration: "Jul 2025 - Present",
    description:
      "A software and technology solutions company empowering organizations with intelligent, scalable digital platforms to simplify complex workflows, accelerate growth, and drive impactful transformation across fintech, enterprise, banking, e-commerce, and healthcare sectors.",
    responsibilities: [
      "Build and maintain production backend services in PHP (Laravel) and MySQL across multiple enterprise platforms, adhering strictly to MVC architecture, Service-Repository pattern, and REST API conventions",
      "Delivered backend modules for a flagship Microfinance Management System serving 7,000+ field officers, 700+ managers, and 790,000+ active members across 390+ branches, including loan generation and lifecycle management, field disbursement/collection, and credit-evaluation workflows",
      "Developed features for enterprise HR and productivity platforms: HRM system with a KPI Management module for organizational performance tracking, employee recognition logic, and a role-based ticketing module",
      "Contributed to banking management systems, developing backend modules and integrations supporting core banking operations and administrative workflows",
      "Built a complete Hospital & Clinic Management System and engineered robust backend services for e-commerce platforms",
      "Optimized performance-critical SQL queries behind member search, runtime loan schedules, and transaction records, achieving 15–20% latency improvements through query refactoring, indexing, and execution plan optimizations",
      "Collaborate cross-functionally with business analysts, mobile app developers, and UI/UX designers; manage version control through Git/GitHub with structured branching, code reviews, and pull-request workflows",
    ],
    tech: ["PHP", "Laravel", "MySQL", "REST APIs", "Docker", "Git"],
  },
];

export const industryProjects = [
  {
    title: "Field Force Automation (FFA)",
    subtitle: "Enterprise Mobile Workforce & Field Operations",
    description:
      "An enterprise workforce management platform engineered to streamline remote agent coordination, task distribution, and operational activity logging across distributed field teams. Built robust backend APIs supporting reliable data synchronization, field verification workflows, role-based access control, and centralized operational reporting.",
    tech: ["PHP", "Laravel", "MySQL", "REST APIs", "RBAC", "Data Sync"],
    category: "Enterprise Systems",
    type: "industry",
  },
  {
    title: "Cooperative ERP & Governance System",
    subtitle: "Organizational ERP & Financial Administration",
    description:
      "A comprehensive enterprise resource planning (ERP) platform developed to manage organizational membership records, financial ledgers, and governance workflows across distributed branches. Architected automated computation modules for dividend distributions, shareholder equity accounting, and secure multi-branch administrative reporting.",
    tech: ["PHP", "Laravel", "MySQL", "ACID Transactions", "REST APIs", "Security"],
    category: "Enterprise ERP",
    type: "industry",
  },
  {
    title: "Core Microfinance Engine",
    subtitle: "Core Banking & Credit Lifecycle (790K+ Members)",
    description:
      "A high-reliability core microfinance system engineered to handle loan lifecycle processing, runtime repayment schedule generation, and account governance for 790,000+ members across 390+ branches. Implemented credit evaluation workflows, double-entry financial ledger integrity, and secure API integrations for 7,000+ field collection officers.",
    tech: ["PHP", "Laravel", "MySQL", "Accounting Engine", "REST APIs", "Query Optimization"],
    category: "Fintech & Banking",
    type: "industry",
  },
  {
    title: "Enterprise Banking Operations Suite",
    subtitle: "Banking Workflow & Operational Resource Management",
    description:
      "An integrated enterprise operations suite developed to optimize organizational procurement workflows, corporate expense monitoring, and fixed-asset lifecycle tracking. Built multi-level approval state machines, budget allocation ledgers, and administrative audit logging for corporate banking operations.",
    tech: ["PHP", "Laravel", "MySQL", "REST APIs", "State Machines", "Audit Logging"],
    category: "Banking Operations",
    type: "industry",
  },
  {
    title: "Hospital & Clinic Management System",
    subtitle: "Healthcare Administration & Clinical Operations",
    description:
      "A comprehensive medical platform engineered for end-to-end clinic and hospital management. Built secure backend services for patient registration, appointment scheduling, electronic medical records (EMR), doctor rosters, and billing automation with strict access control.",
    tech: ["PHP", "Laravel", "MySQL", "REST APIs", "EMR", "Healthcare"],
    category: "Healthcare Systems",
    type: "industry",
  },
  {
    title: "Enterprise E-Commerce Backend Engine",
    subtitle: "Digital Commerce & Order Fulfillment Architecture",
    description:
      "A scalable e-commerce backend platform handling multi-category product catalogs, cart state management, promotional coupon engines, secure payment gateway integrations, and transactional order dispatch workflows.",
    tech: ["PHP", "Laravel", "MySQL", "REST APIs", "Payment Gateway", "Order Logistics"],
    category: "E-Commerce",
    type: "industry",
  },
];

export const academicProjects = [
  {
    title: "Automated Test Case Generation",
    subtitle: "Senior Design Capstone (CSE499A/B)",
    description:
      "An automated software engineering tool that parses functional software requirements and UI specifications to synthesize structured test cases, streamlining verification and reducing manual quality assurance overhead.",
    tech: ["Python", "AI", "Software Testing", "NLP"],
    category: "Software Engineering",
    type: "academic",
  },
  {
    title: "Enhanced Sleep Disorder Prediction (BiLSTM + KNN)",
    subtitle: "Directed Research (CSE498R)",
    description:
      "Designed a sequential hybrid deep learning framework integrating recurrent neural architectures (BiLSTM) and KNN for clinical sleep disorder classification, validated with comparative benchmark analysis against traditional ML models.",
    tech: ["Python", "TensorFlow", "BiLSTM", "KNN", "Keras"],
    category: "AI / Deep Learning",
    type: "academic",
  },
  {
    title: "Action Recognition via Knowledge Distillation",
    subtitle: "Pattern Recognition & Neural Networks (CSE465)",
    description:
      "A computer vision framework utilizing teacher-student knowledge distillation to compress deep convolutional video action models while preserving high classification accuracy on resource-constrained devices.",
    tech: ["PyTorch", "CNN", "Knowledge Distillation", "OpenCV"],
    category: "AI / Computer Vision",
    type: "academic",
  },
  {
    title: "Sleep Disorder Prediction System (ML)",
    subtitle: "Machine Learning (CSE445)",
    description:
      "A predictive clinical intelligence model analyzing polysomnographic and biometric patient features to classify sleep disorder pathology using ensemble machine learning pipelines.",
    tech: ["Python", "Scikit-Learn", "Pandas", "ML Models"],
    category: "Machine Learning",
    type: "academic",
  },
  {
    title: "Food Donation App — AAHAR",
    subtitle: "Software Engineering Project (CSE327)",
    description:
      "A social-impact mobile platform engineered in Java for Android to mitigate urban food wastage by connecting donors with recipients through real-time donation tracking and distribution logistics.",
    tech: ["Java", "Android", "Firebase", "Material UI"],
    category: "Mobile Development",
    type: "academic",
  },
  {
    title: "Electricity Bill Management System",
    subtitle: "Junior Design Project (CSE299)",
    description:
      "An automated utility billing and account management system featuring tariff computation algorithms, consumer payment tracking, and structured relational database design with role-based access.",
    tech: ["PHP", "MySQL", "Database Design", "Web Architecture"],
    category: "Database Systems",
    type: "academic",
  },
  {
    title: "Supermarket Management System",
    subtitle: "Database Management Systems (CSE311)",
    description:
      "A transactional database management system handling multi-branch inventory tracking, sales point-of-sale operations, and relational SQL persistence with full ACID compliance and real-time reporting.",
    tech: ["SQL", "MySQL", "Database Design", "PHP"],
    category: "Database Systems",
    type: "academic",
  },
];

export const projects = [...industryProjects, ...academicProjects];

export const skills = {
  languages: [
    { name: "PHP", icon: "php" },
    { name: "Python", icon: "python" },
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Java", icon: "java" },
    { name: "C/C++", icon: "cplusplus" },
    { name: "SQL", icon: "sql" },
    { name: "HTML5", icon: "html5" },
    { name: "CSS3", icon: "css3" },
  ],
  backend: [
    "Laravel Framework",
    "RESTful API Architecture",
    "Eloquent ORM",
    "Service-Repository Pattern",
    "Queues & Background Jobs",
    "Database Schema Modeling",
    "Query Optimization & Indexing",
    "Sanctum & JWT Authentication",
    "MVC Architecture",
    "Microservice Concepts",
  ],
  aiml: [
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-Learn",
    "OpenCV",
    "Pandas",
    "Neural Networks (CNNs & RNNs)",
    "BiLSTM Architectures",
    "Vision Transformers (ViTs)",
    "Knowledge Distillation",
    "Prompt Engineering",
  ],
  tools: [
    "Docker",
    "Git",
    "GitHub",
    "MySQL",
    "Postman",
    "VS Code",
    "PyCharm",
    "Jupyter Notebook",
    "Google Colab",
    "Linux / Bash",
  ],
  concepts: [
    "OOP & Clean Architecture",
    "Data Structures & Algorithms",
    "Software Design Patterns",
    "ACID Database Transactions",
    "API Security & RBAC",
    "Performance Profiling",
  ],
};

export const education = [
  {
    degree: "Bachelor of Science in Computer Science and Engineering (BSc in CSE)",
    institution: "North South University, Dhaka",
    duration: "Jul 2020 – Dec 2024",
    result: "Computer Science & Engineering Graduate",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Mirpur Cantonment Public School & College",
    duration: "2019",
    result: "Science Division",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Monipur High School & College",
    duration: "2017",
    result: "Science Division",
  },
];

export const blogs = [
  {
    title: "How AI Coding Tools Doubled My Output as a Software Engineer",
    description:
      "A practical reflection on how modern AI-assisted workflows accelerate scaffolding, debugging, and rapid technical learning—while system architecture, domain logic, code review, and engineering accountability remain vital human responsibilities.",
    category: "Developer Productivity",
    platform: "Appinion BD Limited",
    url: "https://appinionbd.com/blog/how-ai-coding-tools-doubled-my-output-as-a-software-engineer",
    readTime: "5 min read",
    tags: ["AI Coding", "Developer Workflows", "Software Engineering", "Productivity"],
  },
  {
    title: "How One Paper Changed the Way Computers See",
    description:
      "An exploration of how Self-Attention mechanisms and Transformer architectures broke out of NLP into Vision Transformers (ViTs), reshaping modern computer vision by modeling global spatial relationships across image patches.",
    category: "AI & Computer Vision",
    platform: "Appinion BD Limited",
    url: "https://appinionbd.com/blog/how-one-paper-changed-the-way-computers-see",
    readTime: "6 min read",
    tags: ["Vision Transformers", "Deep Learning", "Attention Mechanism", "Computer Vision"],
  },
];

export const navLinks = [
  { name: "Overview", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Research", href: "#research" },
  { name: "Writing", href: "#writing" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

/* ─── Design-specific content (Stitch: "Modern Portfolio Redesign") ─── */

export type Accent = "primary" | "secondary" | "tertiary" | "cyan";

export const heroFocus: { label: string; title: string; sub: string; accent: Accent; icon: "server" | "brain" | "grad" }[] = [
  { label: "Enterprise Scale", title: "Fintech & ERP Microservices", sub: "High-throughput APIs @ Appinion BD", accent: "primary", icon: "server" },
  { label: "Research & ML", title: "Deep Learning & Vision Transformers", sub: "BiLSTM, PyTorch & Distillation", accent: "secondary", icon: "brain" },
  { label: "Academic Foundation", title: "BSc in Computer Science & Eng.", sub: "North South University", accent: "tertiary", icon: "grad" },
];

export const heroRoles = [
  "Software Engineer & Backend Architect",
  "Laravel & PHP Specialist",
  "Applied AI / ML Researcher",
  "API Design & System Architecture",
];

export const experienceHighlights: { title: string; body: string; accent: Accent; icon: "terminal" | "bank" | "badge" | "gauge" }[] = [
  {
    title: "Core Laravel & MySQL Services",
    body: "Build and maintain backend services in PHP (Laravel) and MySQL across multiple production systems, adhering strictly to MVC architecture, Service-Repository pattern, and REST API design conventions.",
    accent: "primary",
    icon: "terminal",
  },
  {
    title: "Fintech & Microfinance Lifecycle",
    body: "Delivered backend modules for a nationwide Microfinance platform serving 7,000+ field officers, 700+ managers, and 790,000+ members across 390+ branches with real-time disbursement.",
    accent: "tertiary",
    icon: "bank",
  },
  {
    title: "Enterprise HRM & Performance KPIs",
    body: "Develop features for enterprise HR and productivity platforms: KPI Management module for organizational performance tracking, employee recognition logic, and role-based ticketing workflows.",
    accent: "secondary",
    icon: "badge",
  },
  {
    title: "Query Optimization & Integrity",
    body: "Optimized critical SQL queries behind search and transaction records, delivering 15–20% latency improvements through query refactoring, indexing, and execution plan optimizations.",
    accent: "cyan",
    icon: "gauge",
  },
];

export const industryMeta: { tag: string; status: string; accent: Accent }[] = [
  { tag: "Enterprise Workforce", status: "In Production", accent: "primary" },
  { tag: "Organizational ERP", status: "Active System", accent: "secondary" },
  { tag: "Fintech Engine", status: "High Reliability", accent: "tertiary" },
  { tag: "Banking Operations", status: "State Machine", accent: "cyan" },
  { tag: "Clinical Platform", status: "In Production", accent: "primary" },
  { tag: "Digital Commerce", status: "Active System", accent: "secondary" },
];

export const academicFilters = [
  { key: "all", label: "All" },
  { key: "se", label: "Software Engineering" },
  { key: "dl", label: "AI / Deep Learning" },
  { key: "cv", label: "Computer Vision" },
  { key: "ml", label: "Machine Learning" },
  { key: "mob", label: "Mobile Dev" },
] as const;

export const academicMeta: { cat: (typeof academicFilters)[number]["key"]; label: string; stack: string; accent: Accent }[] = [
  { cat: "se", label: "Senior Design Capstone", stack: "Python / AI", accent: "primary" },
  { cat: "dl", label: "Directed Research", stack: "BiLSTM", accent: "secondary" },
  { cat: "cv", label: "Pattern Recognition", stack: "PyTorch", accent: "cyan" },
  { cat: "ml", label: "Clinical ML", stack: "Scikit-Learn", accent: "tertiary" },
  { cat: "mob", label: "Social Impact App", stack: "Android / Java", accent: "primary" },
  { cat: "se", label: "Junior Design", stack: "PHP / Relational DB", accent: "secondary" },
  { cat: "se", label: "Database Systems", stack: "Relational SQL", accent: "tertiary" },
];
