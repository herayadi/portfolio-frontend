/* ============================================
   DATA — All CV Data (Real)
   Updated from LinkedIn Profile
   ============================================ */

const DATA = {
  personal: {
    name: "Heri Rahmat Suryadi",
    role: "Middleware Developer | API & ESB Expert",
    tagline:
      "Driving performance and scalability with clean integration, smart automation, and solid architecture",
    email: "herir1497@gmail.com",
    linkedin: "https://www.linkedin.com/in/heri-rahmat-suryadi/",
    github: "https://github.com/herayadi",
    location: "West Jakarta, Jakarta, Indonesia",
    avatar: "assets/images/heri.webp",
    cvFile: "assets/files/HeriRahmat_CV.pdf",
    bioEn: "Middleware Developer with a proven ability to design and integrate APIs, manage enterprise service bus (ESB) systems, and streamline complex workflows. Specialized in webMethods and TIBCO, supported by industry certifications and practical expertise in enterprise integration. Adept at building API-driven solutions, executing data migration strategies, and enhancing overall system performance.",
    bioId: "Middleware Developer dengan kemampuan terbukti dalam merancang dan mengintegrasikan API, mengelola sistem Enterprise Service Bus (ESB), serta menyederhanakan alur kerja yang kompleks. Spesialis dalam webMethods dan TIBCO, didukung oleh sertifikasi industri dan keahlian praktis dalam integrasi perusahaan. Ahli dalam membangun solusi berbasis API, mengeksekusi strategi migrasi data, dan meningkatkan kinerja sistem secara keseluruhan.",
  },

  about: {
    bio: [], // Populated by i18n
    philosophy: [
      {
        icon: "🔗",
        title: "Reliability",
        description:
          "Building fault-tolerant systems that operate 24/7 with graceful degradation and self-healing capabilities.",
      },
      {
        icon: "⚡",
        title: "Scalability",
        description:
          "Designing architectures that scale horizontally, handling millions of transactions without breaking a sweat.",
      },
      {
        icon: "📊",
        title: "Observability",
        description:
          "Implementing comprehensive monitoring, logging, and tracing for complete system visibility.",
      },
    ],
    stats: [
      { value: 4, suffix: "+", label: "Years Experience" },
      { value: 12, suffix: "+", label: "Projects Delivered" },
      { value: 1, suffix: "M+", label: "Daily Transactions" },
      { value: 99.9, suffix: "%", label: "System Uptime" },
    ],
  },

  experience: [
    {
      company: "PT Bank Rakyat Indonesia (Persero) Tbk",
      roleEn: "IT Project Officer",
      roleId: "IT Project Officer",
      startDate: "2025-12-01",
      current: true,
      descriptionEn: "Managing middleware architecture and IT delivery within the bank's project office.",
      descriptionId: "Mengelola arsitektur middleware dan pengiriman IT di dalam kantor proyek bank.",
      impact: [
        "Leading middleware architecture design for enterprise-grade integration platforms.",
        "Coordinating cross-functional teams for strategic IT delivery projects.",
        "Ensuring system scalability and performance alignment with banking standards."
      ],
      tech: ["Project Management", "Enterprise Architecture", "API Strategy", "SDLC"],
    },
    {
      company: "Indocyber Global Teknologi (Client: Bank BSI)",
      roleEn: "Junior Software Developer",
      roleId: "Junior Software Developer",
      startDate: "2025-05-01",
      endDate: "2025-11-30",
      descriptionEn: "Developed integration services for Bank Syariah Indonesia (BSI) environments.",
      descriptionId: "Mengembangkan layanan integrasi untuk lingkungan Bank Syariah Indonesia (BSI).",
      impact: [
        "Built robust integration services connecting multiple business systems.",
        "Collaborated on client-side software development for banking operations.",
        "Optimized existing codebases for better performance and maintainability."
      ],
      tech: ["Java", "API Gateway", "Integration Server", "Kafka", "SQL Server"],
    },
    {
      company: "Indocyber Global Teknologi (Client: AIA Central)",
      roleEn: "Webmethod Engineer • IT Delivery",
      roleId: "Webmethod Engineer • IT Delivery",
      startDate: "2024-04-01",
      endDate: "2025-03-31",
      descriptionEn: "Managed ESB environments and API development for AIA insurance systems.",
      descriptionId: "Mengelola lingkungan ESB dan pengembangan API untuk sistem asuransi AIA.",
      impact: [
        "Successfully delivered integrations for projects: RPE Alife, RPE Anya, RPE Blast, RPE iRecrut, iPos, PHS Saver.",
        "Configured and maintained webMethods Integration Server and Microservices Runtime.",
        "Automated deployment workflows using Bitbucket and CI/CD principles."
      ],
      tech: ["webMethods Integration Server", "Microservices Runtime", "Bitbucket", "SQL Server", "Postman"],
    },
    {
      company: "PT Indocyber Global Teknologi",
      roleEn: "Middleware Developer",
      roleId: "Middleware Developer",
      startDate: "2022-03-01",
      endDate: "2024-04-30",
      descriptionEn: "Worked on various integration projects including WIS, IMM, and Mini Bank.",
      descriptionId: "Bekerja pada berbagai proyek integrasi termasuk WIS, IMM, dan Mini Bank.",
      impact: [
        "Developed API Rest JSON/XML providers with JDBC Adapters for MySQL and Oracle.",
        "Integrated marketplace APIs for Blibli, JD.ID, Shopee, TikTokShop, and Tokopedia.",
        "Conducted R&D for Mini Bank using TIBCO BusinessWorks and webMethods suite."
      ],
      tech: ["webMethods", "TIBCO BusinessWorks", "WSO2", "MySQL", "Oracle", "PHP", "Laravel"],
    },
  ],

  projects: [
    {
      id: "wis-integration",
      title: "Wm Integration System (WIS)",
      category: "integration",
      icon: "🏗️",
      briefEn: "Advanced API provider system using webMethods Integration Server and JDBC Adapters.",
      briefId: "Sistem penyedia API canggih menggunakan webMethods Integration Server dan JDBC Adapter.",
      problemEn: "Need for a centralized system to manage diverse data sources and expose them as clean REST APIs.",
      problemId: "Kebutuhan akan sistem terpusat untuk mengelola berbagai sumber data dan mengeksposnya sebagai REST API yang bersih.",
      solutionEn: "Implemented webMethods Integration Server with JDBC Adapters for MySQL/Oracle and built logic flows for data transformation.",
      solutionId: "Mengimplementasikan webMethods Integration Server dengan JDBC Adapter untuk MySQL/Oracle dan membangun alur logika untuk transformasi data.",
      architecture: "graph LR\n  Client-->|REST/JSON|IS[webMethods IS]\n  IS-->|JDBC|DB[(MySQL/Oracle)]\n  IS-->|Logic|Flow[Flow Services]\n  Flow-->|Transform|Response[Client Response]",
      tech: ["webMethods IS", "JDBC Adapter", "MySQL", "Oracle"],
      resultEn: "Reduced integration complexity and improved data accessibility for downstream systems.",
      resultId: "Mengurangi kompleksitas integrasi dan meningkatkan aksesibilitas data untuk sistem hilir.",
    },
    {
      id: "imm-marketplace",
      title: "Integrated Marketplace Management",
      category: "api",
      icon: "🛍️",
      briefEn: "Omnichannel marketplace integration handling Blibli, Shopee, Tokopedia, and more.",
      briefId: "Integrasi marketplace omnichannel yang menangani Blibli, Shopee, Tokopedia, dan lainnya.",
      problemEn: "Fragmented inventory and order management across multiple e-commerce platforms.",
      problemId: "Manajemen inventaris dan pesanan yang terfragmentasi di berbagai platform e-commerce.",
      solutionEn: "Developed a unified integration layer using WSO2 and webMethods to sync data across all major Indonesian marketplaces.",
      solutionId: "Mengembangkan lapisan integrasi terpadu menggunakan WSO2 dan webMethods untuk menyinkronkan data di semua marketplace utama di Indonesia.",
      architecture: "graph TD\n  Marketplace[Shopee/Tokopedia]-->|Webhooks|IS[webMethods IS]\n  IS-->|Process|Core[Core System]\n  Core-->|Update|Marketplace",
      tech: ["WSO2", "webMethods", "PHP", "Laravel", "REST API"],
      resultEn: "Enabled real-time inventory sync and centralized order processing for 5+ platforms.",
      resultId: "Memungkinkan sinkronisasi inventaris waktu nyata dan pemrosesan pesanan terpusat untuk 5+ platform.",
    },
  ],

  skills: {
    integration: {
      title: "Integration & ESB",
      icon: "🔗",
      items: [
        { name: "webMethods Suite", level: 95 },
        { name: "TIBCO BusinessWorks", level: 85 },
        { name: "WSO2 API Manager", level: 80 },
        { name: "Enterprise Service Bus", level: 90 },
      ],
    },
    messaging: {
      title: "Messaging & APIs",
      icon: "📨",
      items: [
        { name: "REST JSON / XML", level: 95 },
        { name: "SOAP / WSDL", level: 90 },
        { name: "Apache Kafka", level: 80 },
        { name: "TIBCO Messaging", level: 75 },
      ],
    },
    backend: {
      title: "Development & DB",
      icon: "⚙️",
      items: [
        { name: "Java", level: 85 },
        { name: "PHP / Laravel", level: 80 },
        { name: "SQL Server / Oracle", level: 90 },
        { name: "MySQL / JDBC", level: 90 },
      ],
    },
    tools: {
      title: "Tools & DevOps",
      icon: "🚀",
      items: [
        { name: "Postman / SoapUI", level: 95 },
        { name: "Bitbucket / Git", level: 85 },
        { name: "Docker", level: 75 },
        { name: "ARIS Modeler", level: 85 },
      ],
    },
  },

  education: [
    {
      school: "Universitas Negeri Makassar",
      degree: "Bachelor of Education (B.Ed.)",
      field: "Physics",
      period: "2016 — 2021",
    },
  ],

  certifications: [
    { name: "Software AG Certified webMethods API Management Associate" },
    { name: "Software AG Certified webMethods Integration Professional" },
    { name: "Software AG Certified webMethods Integration Associate" },
    { name: "Software AG Certified ARIS Modeler Associate" },
    { name: "TCA - TIBCO BusinessWorks™" },
    { name: "TCP - TIBCO BusinessWorks™" },
  ],
};
