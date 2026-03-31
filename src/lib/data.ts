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
    role: "Junior Software Engineer",
    department: "Web Development",
    duration: "Jul 2025 - Present",
    description:
      "Appinion is a software development company and a sister concern of Sajida Foundation , providing technology solutions for financial services and enterprise operations.",
    descriptionLinks: {
      "Sajida Foundation": "https://www.sajida.org/",
    },
    responsibilities: [
      "Develop and maintain backend applications using PHP (Laravel) and MySQL, following MVC architecture and RESTful API standards",
      "Contribute to Sajida Foundation's Field Force Management System",
      "Work on Appinion's HRM platform and related backend services",
      "Support backend development for enterprise solutions, including API integrations",
      "Collaborate with team members on debugging, query optimization, and version control using Git",
    ],
    tech: ["PHP", "Laravel", "MySQL", "REST API", "Git"],
  },
];

export const projects = [
  {
    title: "Automated Test Case Generation",
    subtitle: "Senior Design I & II",
    description:
      "A tool that automatically generates test cases from software requirements and UI specifications, streamlining the testing process and reducing manual effort.",
    tech: ["Python", "AI", "Software Testing", "NLP"],
    category: "Software Engineering",
  },
  {
    title: "Sleep Disorder Prediction (Deep Learning)",
    subtitle: "Directed Research",
    description:
      "Hybrid deep learning framework integrating a hybrid model for sleep disorder prediction with comparative analysis across ML and neural network models.",
    tech: ["Python", "TensorFlow", "BiLSTM", "KNN", "Keras"],
    category: "AI / Deep Learning",
  },
  {
    title: "Action Recognition via Knowledge Distillation",
    subtitle: "Pattern Recognition & Neural Network",
    description:
      "Knowledge distillation approach to create efficient action recognition models, achieving comparable accuracy to larger models while significantly reducing model size.",
    tech: ["PyTorch", "CNN", "Knowledge Distillation", "OpenCV"],
    category: "AI / Computer Vision",
  },
  {
    title: "Sleep Disorder Prediction (ML)",
    subtitle: "Machine Learning",
    description:
      "Machine learning system to predict sleep disorders by analyzing patient health data and sleep patterns using various ML models.",
    tech: ["Python", "Scikit-Learn", "Pandas", "ML Models"],
    category: "Machine Learning",
  },
  {
    title: "Food Donation App — AAHAR",
    subtitle: "Software Engineering",
    description:
      "Android application to reduce food wastage by facilitating donations to needy individuals, featuring real-time donation tracking and efficient resource allocation.",
    tech: ["Java", "Android", "Firebase", "Material UI"],
    category: "Mobile Development",
  },
  {
    title: "Supermarket Management System",
    subtitle: "Database Management System",
    description:
      "Database-driven system to manage inventory, sales, and customer transactions with SQL-based real-time updates.",
    tech: ["SQL", "MySQL", "Database Design", "PHP"],
    category: "Database Systems",
  },
];

export const skills = {
  languages: [
    { name: "PHP", icon: "php" },
    { name: "Laravel", icon: "laravel" },
    { name: "Python", icon: "python" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Java", icon: "java" },
    { name: "C/C++", icon: "cplusplus" },
    { name: "TypeScript", icon: "typescript" },
    { name: "HTML", icon: "html5" },
    { name: "CSS", icon: "css3" },
  ],
  backend: [
    "RESTful API Development",
    "API Integration",
    "MVC Architecture",
    "Authentication & Authorization",
    "Database Design",
    "Query Optimization",
  ],
  aiml: [
    "TensorFlow",
    "Keras",
    "PyTorch",
    "Scikit-Learn",
    "OpenCV",
    "Pandas",
    "Neural Networks",
    "CNNs",
    "RNNs",
    "Knowledge Distillation",
  ],
  tools: ["Git", "GitHub", "VS Code", "PyCharm", "Jupyter Notebook", "Google Colab", "MySQL"],
  concepts: [
    "OOP",
    "Data Structures & Algorithms",
    "Software Design Patterns",
    "Prompt Engineering",
    "AI-assisted Development",
  ],
};

export const education = [
  {
    degree: "Bachelor of Science in Computer Science and Engineering (BSc in CSE)",
    institution: "North South University, Dhaka",
    duration: "Jul 2020 – Dec 2024",
    result: "CGPA: Hmmm... want to know? Ask me!",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Mirpur Cantonment Public School & College",
    duration: "2019",
    result: "GPA: Hmmm... want to know? Ask me!",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Monipur High School & College",
    duration: "2017",
    result: "GPA: Hmmm... want to know? Ask me!",
  },
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];
