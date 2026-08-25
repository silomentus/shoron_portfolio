export const personalInfo = {
  name: "Shoron",
  title: "Software Engineer",
  email: "silomentus@gmail.com",
  location: "Dhaka, Bangladesh",
  summary:
    "I am a Computer Science graduate from North South University currently working as a Junior Software Engineer. My work focuses on backend development, API design, and building reliable, scalable software solutions.",
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
    role: "Junior Software Engineer",
    department: "Web Development",
    duration: "Jul 2025 - Present",
    description:
      "A software and technology solutions company empowering organizations with intelligent, scalable digital platforms to simplify complex workflows, accelerate growth, and drive impactful transformation across fintech, enterprise, and social-impact sectors.",
    responsibilities: [
      "Build and maintain backend services in PHP (Laravel) and MySQL across multiple production systems, following MVC architecture and REST API conventions",
      "Deliver backend modules across fintech, non-profit/NGO, and microfinance sectors, including loan generation and lifecycle management, a Microfinance Management System for field-level disbursement and collection, and credit-evaluation workflows used by field officers in production",
      "Develop features for enterprise HR and productivity platforms, including an HRM system with a KPI Management module for organizational performance tracking, employee recognition logic, and a role-based ticketing module",
      "Contribute to banking management systems, building backend modules and integrations that support core banking operations and administrative workflows",
      "Improve application performance and responsiveness through query optimization, indexing, and backend logic refinement",
      "Collaborate cross-functionally with BAs, mobile developers, and UI/UX designers; manage version control through Git/GitHub with structured branching, code reviews, and pull-request workflows",
    ],
    tech: ["PHP", "Laravel", "MySQL", "REST API", "Git"],
  },
];

export const industryProjects = [
  {
    title: "Sajida Field Force Automation (FFA)",
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
    subtitle: "Core Banking & Credit Lifecycle Management",
    description:
      "A high-reliability core microfinance system engineered to handle loan lifecycle processing, multi-tier repayment schedules, and account management. Implemented structured credit evaluation workflows, double-entry financial ledger integrity, and secure backend service integrations for field officers and operational staff.",
    tech: ["PHP", "Laravel", "MySQL", "Accounting Engine", "REST APIs", "Optimization"],
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
];

export const academicProjects = [
  {
    title: "Automated Test Case Generation",
    subtitle: "Senior Design I & II (Capstone Project)",
    description:
      "An automated software engineering tool that parses functional software requirements and UI specifications to synthesize structured test cases, streamlining verification and reducing manual quality assurance overhead.",
    tech: ["Python", "AI", "Software Testing", "NLP"],
    category: "Software Engineering",
    type: "academic",
  },
  {
    title: "Sleep Disorder Prediction (Deep Learning)",
    subtitle: "Directed Research",
    description:
      "A hybrid deep learning framework integrating recurrent neural architectures (BiLSTM) for clinical sleep disorder classification, validated with comparative empirical benchmark analysis across machine learning models.",
    tech: ["Python", "TensorFlow", "BiLSTM", "Keras"],
    category: "AI / Deep Learning",
    type: "academic",
  },
  {
    title: "Action Recognition via Knowledge Distillation",
    subtitle: "Pattern Recognition & Neural Networks",
    description:
      "A computer vision framework utilizing teacher-student knowledge distillation to compress deep convolutional video action models while preserving high classification accuracy on resource-constrained devices.",
    tech: ["PyTorch", "CNN", "Knowledge Distillation", "OpenCV"],
    category: "AI / Computer Vision",
    type: "academic",
  },
  {
    title: "Sleep Disorder Prediction (ML)",
    subtitle: "Machine Learning Research",
    description:
      "A predictive clinical intelligence model analyzing polysomnographic and biometric patient features to classify sleep disorder pathology using ensemble machine learning pipelines.",
    tech: ["Python", "Scikit-Learn", "Pandas", "ML Models"],
    category: "Machine Learning",
    type: "academic",
  },
  {
    title: "Food Donation App — AAHAR",
    subtitle: "Software Engineering Project",
    description:
      "A social-impact mobile platform engineered to mitigate urban food wastage by bridging donors with distribution logistics through real-time allocation algorithms.",
    tech: ["Java", "Android", "Firebase", "Material UI"],
    category: "Mobile Development",
    type: "academic",
  },
  {
    title: "Supermarket Management System",
    subtitle: "Database Management Systems",
    description:
      "A transactional database management system handling multi-branch inventory tracking, sales point-of-sale operations, and relational SQL persistence with ACID compliance.",
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
    "Database Schema Design",
    "Query Optimization & Indexing",
    "Authentication & Security (Sanctum / JWT)",
    "MVC Architecture",
    "API Integration & Webhooks",
    "Microservice Concepts",
  ],
  aiml: [
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-Learn",
    "OpenCV",
    "Pandas",
    "Neural Networks",
    "CNNs & BiLSTM",
    "Vision Transformers (ViTs)",
    "Knowledge Distillation",
  ],
  tools: ["Git", "GitHub", "MySQL", "Postman", "VS Code", "PyCharm", "Jupyter Notebook", "Google Colab"],
  concepts: [
    "OOP & Clean Architecture",
    "Data Structures & Algorithms",
    "Software Design Patterns",
    "Database Normalization",
    "Prompt Engineering",
    "AI-assisted Development",
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
  { name: "Works", href: "#projects" },
  { name: "Blogs", href: "#blogs" },
  { name: "Stack", href: "#skills" },
  { name: "Connect", href: "#contact" },
];
