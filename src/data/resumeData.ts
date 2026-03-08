export type NavItem = {
  id: string;
  label: string;
};

export type Cta = {
  label: string;
  href: string;
  primary?: boolean;
};

export type BasicInfoItem = {
  label: string;
  value: string;
};

export type AboutMeItem = {
  key: "education" | "certifications" | "hobbies";
  tabLabel: string;
  title: string;
  description?: string;
  educationGroups?: {
    schoolCn: string;
    schoolEn: string;
    period: string;
    summary: string;
    images: {
      src: string;
      role?: "featured" | "secondary";
      aspect?: "landscape" | "portrait" | "square";
    }[];
  }[];
  certifications?: {
    name: string;
    note?: string;
    image: string;
  }[];
  hobbies?: {
    name: string;
    image: string;
  }[];
};

export type ResearchAchievementItem = {
  conference: string;
  title: string;
  year: string;
  type: string;
  authors: string;
  award?: string;
  summary: string;
  images: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  details: string;
};

export type ProjectItem = {
  title: string;
  summary: string;
  tech: string[];
  cover?: string;
  media: {
    type: "image" | "video";
    src: string;
    cover?: string;
  }[];
};

export type SkillItem = {
  name: string;
  level: number;
};

export type SkillGroup = {
  name: string;
  skills: SkillItem[];
};

export type SocialItem = {
  name: string;
  value: string;
  href: string;
  qrImage?: string;
};

export type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  summary: string;
};

export const navItems: NavItem[] = [
  { id: "hero", label: "首页" },
  { id: "about", label: "About Me" },
  { id: "education", label: "科研成果" },
  { id: "projects", label: "项目经历" },
  { id: "skills", label: "个人技能" },
  { id: "experience", label: "Experience" },
  { id: "social", label: "联系入口" },
];

export const profile = {
  name: "蓝森林（Rambo Lan）",
  role: "Sports + AI + Automation Practitioner",
  avatar: "/website-assets/avatar.jpg",
  resumeUrl: "/website-assets/resume.pdf",
  tags: ["Sports Science", "Badminton Practice", "AI Agent", "Workflow Automation", "Global Communication"],
  bio: "我专注于 Sports + AI + Automation 的交叉实践，兼具运动训练一线经验、科研分析能力与中英日沟通能力。长期深耕羽毛球教学与训练场景，擅长把训练经验、运动数据与 AI 自动化流程连接成可落地的解决方案。",
  ctas: [
    { label: "查看项目", href: "#projects", primary: true },
    { label: "下载简历", href: "/website-assets/resume.pdf" },
  ] as Cta[],
};

export const heroVideo = {
  cover: "/website-assets/hero/cover.jpg",
  src: "/website-assets/hero/intro.mp4",
  title: "Personal Intro Video",
  description: "自我介绍 / 训练展示 / 项目展示",
};


export const basicInfo: BasicInfoItem[] = [
  { label: "发展方向", value: "Sports + AI + Automation" },
  { label: "硕士院校", value: "北京体育大学 · 运动训练" },
  { label: "本科背景", value: "仲恺农业工程学院 · 日语" },
  { label: "专项领域", value: "羽毛球教学与训练" },
  { label: "语言能力", value: "英语 IELTS 6.0 / 日语" },
  { label: "分析工具", value: "Python / SPSS / Matlab" },
  { label: "运动数据", value: "IMU / Polar 数据采集与分析" },
  { label: "职业定位", value: "AI Agent 与自动化工作流搭建" },
];

export const aboutMeSections: AboutMeItem[] = [
  {
    key: "education",
    tabLabel: "教育背景",
    title: "Education Background",
    description: "按学校分组展示学习阶段与校园影像。",
    educationGroups: [
      {
        schoolCn: "北京体育大学",
        schoolEn: "Beijing Sport University",
        period: "2022 - 2025",
        summary: "运动训练硕士阶段，聚焦训练监控、负荷评估与表现优化方法。",
        images: [
          { src: "/website-assets/education/bsu/bsu-02.jpg", role: "featured", aspect: "landscape" },
          { src: "/website-assets/education/bsu/bsu-04.jpg", role: "secondary", aspect: "landscape" },
          { src: "/website-assets/education/bsu/bsu-01.jpg", role: "secondary", aspect: "portrait" },
          { src: "/website-assets/education/bsu/bsu-03.jpg", role: "secondary", aspect: "portrait" },
        ],
      },
      {
        schoolCn: "仲恺农业工程学院",
        schoolEn: "Zhongkai University of Agriculture and Engineering",
        period: "2018 - 2022",
        summary: "本科阶段（日语背景），形成跨文化表达与多语沟通能力。",
        images: [
          { src: "/website-assets/education/zhku/zhku-01.jpg", role: "featured", aspect: "landscape" },
          { src: "/website-assets/education/zhku/zhku-02.jpg", role: "secondary", aspect: "landscape" },
          { src: "/website-assets/education/zhku/zhku-03.jpg", role: "secondary", aspect: "portrait" },
        ],
      },
    ],
  },
  {
    key: "certifications",
    tabLabel: "职业证书",
    title: "Certifications & Credentials",
    description: "职业资质与专项认证展示。",
    certifications: [
      {
        name: "教师资格证",
        note: "教学资质",
        image: "/website-assets/certifications/teacher-certificate.jpg",
      },
      {
        name: "羽毛球社会体育指导员一级",
        note: "社会体育指导资质",
        image: "/website-assets/certifications/badminton-social-instructor-level1.jpg",
      },
      {
        name: "羽毛球裁判员一级",
        note: "竞赛执裁资质",
        image: "/website-assets/certifications/badminton-referee-level1.jpg",
      },
      {
        name: "筋膜刀认证（BISU）",
        note: "运动恢复方向",
        image: "/website-assets/certifications/bisu-fascia-knife-certificate.jpg",
      },
      {
        name: "公共营养师三级",
        note: "营养与体能支持",
        image: "/website-assets/certifications/nutritionist-level3.jpg",
      },
    ],
  },
  {
    key: "hobbies",
    tabLabel: "兴趣爱好",
    title: "Interests & Lifestyle",
    description: "以图片为主的兴趣照片墙。",
    hobbies: [
      { name: "Badminton", image: "/website-assets/hobbies/badminton.jpg" },
      { name: "Boxing", image: "/website-assets/hobbies/boxing.jpg" },
      { name: "Cycling", image: "/website-assets/hobbies/cycling.jpg" },
      { name: "Fitness", image: "/website-assets/hobbies/fitness.jpg" },
      { name: "Golf", image: "/website-assets/hobbies/golf.jpg" },
      { name: "Guitar", image: "/website-assets/hobbies/guitar.jpg" },
      { name: "Hiking", image: "/website-assets/hobbies/hiking.jpg" },
      { name: "Paddleboarding", image: "/website-assets/hobbies/paddleboarding.jpg" },
    ],
  },
];

export const researchAchievements: ResearchAchievementItem[] = [
  {
    conference: "2025 羽毛球运动科学前沿国际学术会议（广州）",
    title: "不同强度血流限制训练干预羽毛球运动员下肢肌群力量与耐力的对比分析",
    year: "2025",
    type: "专题报告",
    authors: "蓝森林",
    summary:
      "聚焦不同强度血流限制训练对羽毛球运动员下肢肌群力量与耐力的影响，对专项训练干预效果进行对比分析，并在羽毛球运动科学前沿国际学术会议中以专题报告形式交流展示。",
    images: [
      "/website-assets/research/conference-2025/certificate-2025.jpg",
      "/website-assets/research/conference-2025/photo-2025-01.jpg",
    ],
  },
  {
    conference: "2026 第八届国际体育科学大会",
    title: "数字化赋能下商业赛事服务创新与用户体验升级路径探析——基于林丹杯的案例考察",
    year: "2026",
    type: "专题报告",
    authors: "蓝森林；杨昊平",
    award: "专题报告一等奖",
    summary:
      "围绕数字化赋能背景下体育商业赛事服务创新与用户体验升级路径展开研究，以林丹杯为案例进行分析，并获得国际体育科学大会专题报告一等奖。",
    images: [
      "/website-assets/research/conference-2026/certificate-2026.jpg",
      "/website-assets/research/conference-2026/photo-2026-01.jpg",
    ],
  },
];

export const education: EducationItem[] = [
  {
    school: "北京体育大学",
    degree: "运动训练硕士",
    period: "2022 - 2025",
    details: "系统学习运动训练理论与方法，持续开展训练监控、负荷评估与表现优化相关研究和实践。",
  },
  {
    school: "仲恺农业工程学院",
    degree: "本科（日语背景）",
    period: "2018 - 2022",
    details: "建立了扎实的日语能力与跨文化沟通素养，支持国际资料阅读、学术表达与多语协作。",
  },
];

export const projects: ProjectItem[] = [
  {
    title: "北体研究生创新拔尖项目《羽毛球频闪干预对预判能力的影响》",
    summary: "负责实验训练内容设计；运用Python对数据进行清洗、统计分析与可视化分析。",
    tech: ["Python", "Data Analysis", "Visualization", "Badminton Research"],
    cover: "/website-assets/projects/project-01/cover.jpg",
    media: [
      {
        type: "video",
        src: "/website-assets/projects/project-01/video-01.mp4",
        cover: "/website-assets/projects/project-01/cover.jpg",
      },
    ],
  },
  {
    title: "北体博士研究生论文课题《基于IMU的羽毛球击球负荷指标构建与应用》",
    summary: "利用IMU捕捉击球动作；同步Polar监测生理强度；使用SPSS统计分析，构建负荷指标。",
    tech: ["IMU", "Polar", "SPSS", "Load Monitoring"],
    cover: "/website-assets/projects/project-02/cover.jpg",
    media: [
      { type: "image", src: "/website-assets/projects/project-02/cover.jpg" },
      { type: "image", src: "/website-assets/projects/project-02/photo-01.jpg" },
      { type: "image", src: "/website-assets/projects/project-02/photo-02.jpg" },
    ],
  },
  {
    title: "北体运动科学实验《多感官视域下注意的局限性与改善效应研究》",
    summary: "使用Matlab设计多感官注意力实验程序；操控不同感官输入条件，探究注意力分配机制。",
    tech: ["Matlab", "Experiment Design", "Attention Research", "Multisensory"],
    cover: "/website-assets/projects/project-03/cover.jpg",
    media: [
      {
        type: "video",
        src: "/website-assets/projects/project-03/video-01.mp4",
        cover: "/website-assets/projects/project-03/cover.jpg",
      },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "语言",
    skills: [
      { name: "普通话", level: 100 },
      { name: "英语", level: 70 },
      { name: "日语", level: 60 },
    ],
  },
  {
    name: "分析与建模",
    skills: [
      { name: "Matlab", level: 80 },
      { name: "SPSS", level: 70 },
      { name: "R", level: 65 },
      { name: "Python", level: 65 },
    ],
  },
  {
    name: "AI与Agent",
    skills: [
      { name: "ChatGPT", level: 80 },
      { name: "Codex", level: 70 },
      { name: "Claude Code", level: 70 },
      { name: "NotebookLM", level: 60 },
    ],
  },
];


export const experiences: ExperienceItem[] = [
  {
    organization: "美国 Skagit Valley College",
    role: "交流项目学员",
    period: "2016.07 - 2016.08",
    summary: "赴美参加全英交流项目，学习学校特色课程，提升英语口语沟通与跨文化交流能力。",
  },
  {
    organization: "广州焦点羽毛球俱乐部",
    role: "教练员",
    period: "2023.09 - 2024.08",
    summary: "负责羽毛球训练教学与队员培养，输送 2 名队员进入广州市集训队、2 名队员进入东莞市集训队。",
  },
  {
    organization: "北京万柳高尔夫俱乐部",
    role: "助教",
    period: "2024.09 - 2024.12",
    summary: "协助老师教授高尔夫选修课，并学习高端体育俱乐部的运营与管理理念。",
  },
  {
    organization: "广州中学",
    role: "体育老师",
    period: "2025.09 - 2025.11",
    summary: "负责中学羽毛球校队与特长生训练，积累基层中小学体育教学与训练经验。",
  },
];
export const socialLinks: SocialItem[] = [
  { name: "Email", value: "lanrambo94@gmail.com", href: "mailto:lanrambo94@gmail.com" },
  {
    name: "WeChat",
    value: "Scan QR for collaboration and direct contact",
    href: "#",
    qrImage: "/website-assets/wechat-qr.jpg",
  },
  { name: "GitHub", value: "@bboudeli22", href: "https://github.com/bboudeli22" },
  { name: "Fiverr", value: "Freelance service profile", href: "https://www.fiverr.com/s/5r2LK9v" },
  {
    name: "Upwork",
    value: "Freelancer profile",
    href: "https://www.upwork.com/freelancers/~014d1c170250805b22?mp_source=share",
  },
  { name: "Resume", value: "Download latest PDF", href: "/website-assets/resume.pdf" },
  { name: "Xiaohongshu", value: "ID 94103981960", href: "#" },
];

export const footer = {
  text: "Building at the intersection of Sports, AI and Automation.",
};




















