"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  aboutMeSections,
  footer,
  experiences,
  heroVideo,
  navItems,
  profile,
  projects,
  researchAchievements,
  skillGroups,
  socialLinks,
} from "@/data/resumeData";

const sectionIds = navItems.map((item) => item.id);

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="space-y-1.5">
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-heading)] md:text-[2rem]">{title}</h2>
      <p className="text-xs tracking-[0.16em] text-[var(--color-muted)]">{subtitle}</p>
    </div>
  );
}
type SocialMeta = {
  hint: string;
  action: string;
  icon: "mail" | "chat" | "code" | "briefcase" | "download" | "note";
};

function splitName(fullName: string) {
  const normalized = fullName.replace(/\uFF08/g, "(").replace(/\uFF09/g, ")");
  const matched = normalized.match(/^([^()]+?)(?:\s*[(]([^()]+)[)])?$/);
  if (!matched) {
    return { primary: fullName, secondary: "" };
  }

  return {
    primary: matched[1].trim(),
    secondary: (matched[2] ?? "").trim(),
  };
}

function getSocialMeta(name: string, href: string): SocialMeta {
  if (name === "Email") return { hint: "Primary contact", action: "Send email", icon: "mail" };
  if (name === "WeChat") return { hint: "Direct channel", action: "Scan QR", icon: "chat" };
  if (name === "GitHub") return { hint: "Code portfolio", action: "Open profile", icon: "code" };
  if (name === "Resume") return { hint: "Latest version", action: "Download PDF", icon: "download" };
  if (name === "Xiaohongshu") return { hint: "Creator channel", action: "View ID", icon: "note" };
  if (href.includes("fiverr") || href.includes("upwork")) {
    return { hint: "Freelance profile", action: "Open profile", icon: "briefcase" };
  }

  return { hint: "Contact entry", action: "Open link", icon: "briefcase" };
}

function SocialIcon({ type }: { type: SocialMeta["icon"] }) {
  if (type === "mail") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4 8 8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M5 6h14v9H8l-3 3z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "code") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="m9 8-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "download") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "note") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M6 4h9l3 3v13H6z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 11h6M9 15h6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M4 8h16v12H4zM8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ResearchImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!hasMultiple || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [hasMultiple, isPaused, images.length]);

  if (images.length === 0) {
    return <div className="mb-4 aspect-[16/10] w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]" />;
  }

  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % images.length);

  return (
    <div
      className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--color-border)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Image alt={`${title}-image-${activeIndex + 1}`} className="object-cover" fill src={images[activeIndex]} />

      {hasMultiple && (
        <>
          <button
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-[color:rgba(255,249,242,0.88)] px-2 py-1 text-xs text-[var(--color-text)] transition hover:border-[var(--color-hover)] hover:text-[var(--color-hover)]"
            onClick={prevSlide}
            type="button"
          >
            ←
          </button>
          <button
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-[color:rgba(255,249,242,0.88)] px-2 py-1 text-xs text-[var(--color-text)] transition hover:border-[var(--color-hover)] hover:text-[var(--color-hover)]"
            onClick={nextSlide}
            type="button"
          >
            →
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((image, idx) => (
              <button
                aria-label={`Go to image ${idx + 1}`}
                className={`h-1.5 rounded-full transition ${idx === activeIndex ? "w-4 bg-[var(--color-hover)]" : "w-1.5 bg-[color:rgba(138,119,104,0.45)] hover:bg-[color:rgba(138,119,104,0.7)]"}`}
                key={image}
                onClick={() => setActiveIndex(idx)}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
function ProjectMedia({
  media,
  title,
}: {
  media: { type: "image" | "video"; src: string; cover?: string }[];
  title: string;
}) {
  const safeMedia = media.length > 0 ? media : [{ type: "image" as const, src: "/website-assets/projects/project-01/cover.jpg" }];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const active = safeMedia[Math.min(activeIndex, safeMedia.length - 1)];
  const isImageCarousel = safeMedia.every((item) => item.type === "image") && safeMedia.length > 1;

  const prev = () => setActiveIndex((prevIndex) => (prevIndex - 1 + safeMedia.length) % safeMedia.length);
  const next = () => setActiveIndex((prevIndex) => (prevIndex + 1) % safeMedia.length);

  return (
    <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
      {active.type === "video" ? (
        isPlaying ? (
          <video className="h-full w-full object-cover" controls playsInline src={active.src} />
        ) : (
          <button className="group relative h-full w-full" onClick={() => setIsPlaying(true)} type="button">
            <Image alt={`${title} Cover`} className="object-cover" fill src={active.cover ?? "/website-assets/projects/project-01/cover.jpg"} />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[color:rgba(255,249,242,0.9)] text-sm text-[var(--color-text)] transition group-hover:border-[var(--color-hover)] group-hover:text-[var(--color-hover)]">
              ▶
            </span>
          </button>
        )
      ) : (
        <Image alt={`${title} Image ${activeIndex + 1}`} className="object-cover" fill src={active.src} />
      )}

      {isImageCarousel && (
        <>
          <button aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-[color:rgba(255,249,242,0.88)] px-2 py-1 text-xs text-[var(--color-text)] transition hover:border-[var(--color-hover)] hover:text-[var(--color-hover)]" onClick={prev} type="button">←</button>
          <button aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)] bg-[color:rgba(255,249,242,0.88)] px-2 py-1 text-xs text-[var(--color-text)] transition hover:border-[var(--color-hover)] hover:text-[var(--color-hover)]" onClick={next} type="button">→</button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {safeMedia.map((item, idx) => (
              <button aria-label={`Go to image ${idx + 1}`} className={`h-1.5 rounded-full transition ${idx === activeIndex ? "w-4 bg-[var(--color-hover)]" : "w-1.5 bg-[color:rgba(138,119,104,0.45)] hover:bg-[color:rgba(138,119,104,0.7)]"}`} key={`${item.src}-${idx}`} onClick={() => setActiveIndex(idx)} type="button" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export function ResumePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [activeSkillGroup, setActiveSkillGroup] = useState(skillGroups[0].name);
  const [activeAboutKey, setActiveAboutKey] = useState(aboutMeSections[0].key);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);

  const currentSkillGroup =
    skillGroups.find((group) => group.name === activeSkillGroup) ?? skillGroups[0];
  const activeAboutSection = aboutMeSections.find((item) => item.key === activeAboutKey) ?? aboutMeSections[0];

  const displayName = splitName(profile.name);
  const identityHighlights = [
    { label: "研究方向", value: "身体素养 / 运动零食 / 久坐人群" },
    { label: "研究兴趣", value: "Sports + AI Agent" },
    { label: "出生日期", value: "2002 / 01" },
    { label: "家庭住址", value: "广东 · 广州" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.2,
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-18%] top-[-14%] h-96 w-96 rounded-full bg-[var(--color-button)]/28 blur-3xl" />
        <div className="absolute bottom-[-26%] right-[-14%] h-[30rem] w-[30rem] rounded-full bg-[color:rgba(201,122,61,0.16)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color:rgba(246,239,229,0.88)] backdrop-blur-2xl">
        <nav className="mx-auto max-w-6xl px-4 py-3.5 md:px-8">
          <div className="flex items-center justify-between">
            <button
              className="text-sm font-semibold tracking-[0.24em] text-[var(--color-heading)]"
              onClick={() => scrollToSection("hero")}
              type="button"
            >
              LANSENLIN
            </button>
            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    activeSection === item.id
                      ? "bg-[color:rgba(201,122,61,0.14)] text-[var(--color-button)]"
                      : "text-[var(--color-text)] hover:bg-[var(--color-card)] hover:text-[var(--color-heading)]"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition ${
                  activeSection === item.id
                    ? "bg-[color:rgba(201,122,61,0.14)] text-[var(--color-button)]"
                    : "border border-[var(--color-border)] text-[var(--color-text)]"
                }`}
                onClick={() => scrollToSection(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-24 pt-10 md:px-8 md:pt-14">
        <section className="grid gap-10 md:grid-cols-[1.28fr_1fr] md:items-start" id="hero">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 34 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >

            <h1 className="space-y-0.5 leading-none">
              <span className="block bg-gradient-to-r from-[var(--color-heading)] to-[var(--color-text)] bg-clip-text text-5xl font-semibold tracking-tight text-transparent md:text-6xl">
                {displayName.primary}
              </span>
              {displayName.secondary && (
                <span className="block pt-1 text-[11px] font-normal tracking-[0.06em] text-[var(--color-muted)] md:text-xs">
                  {displayName.secondary}
                </span>
              )}
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-[var(--color-heading)] md:text-[1.45rem]">{profile.role}</p>
            <p className="mt-3.5 max-w-2xl text-[15px] leading-7 text-[var(--color-text)] md:text-base">{profile.bio}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {profile.ctas.map((cta, index) => (
                <motion.a
                  key={cta.label}
                  className={`rounded-full px-5 py-2.5 text-sm transition ${
                    cta.primary
                      ? "bg-[var(--color-button)] text-[var(--color-button-text)] shadow-[0_10px_24px_rgba(185,102,46,0.28)] hover:bg-[var(--color-hover)]"
                      : "border border-[var(--color-secondary-border)] text-[var(--color-text)] hover:border-[var(--color-hover)] hover:bg-[var(--color-card)] hover:text-[var(--color-heading)]"
                  }`}
                  href={cta.href}
                  initial={{ opacity: 0, y: 14 }}
                  rel={cta.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                  target={cta.href.endsWith(".pdf") ? "_blank" : undefined}
                  transition={{ delay: 0.2 + index * 0.06, duration: 0.45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {cta.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-8 max-w-2xl">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_14px_36px_rgba(120,84,52,0.14)]">
                {isHeroVideoPlaying ? (
                  <video className="h-full w-full object-cover" controls playsInline src={heroVideo.src} />
                ) : (
                  <button
                    aria-label={`播放视频：${heroVideo.title}`}
                    className="group relative h-full w-full"
                    onClick={() => setIsHeroVideoPlaying(true)}
                    type="button"
                  >
                    <Image alt={heroVideo.title} className="object-cover" fill src={heroVideo.cover} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:rgba(47,36,28,0.28)] via-transparent to-transparent" />
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[color:rgba(255,249,242,0.92)] text-base text-[var(--color-heading)] shadow-[0_10px_24px_rgba(120,84,52,0.2)] transition group-hover:border-[var(--color-hover)] group-hover:text-[var(--color-hover)]">
                      ▶
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <p className="text-sm font-medium text-[color:rgba(255,248,241,0.95)]">{heroVideo.title}</p>
                      <p className="mt-1 text-xs text-[color:rgba(255,248,241,0.82)]">{heroVideo.description}</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel neon-outline relative overflow-hidden rounded-3xl p-7"
            initial={{ opacity: 0, y: 26 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            <div className="pointer-events-none absolute -right-14 top-[-40px] h-32 w-32 rounded-full bg-[color:rgba(201,122,61,0.18)] blur-2xl" />
            <div className="pointer-events-none absolute bottom-[-36px] left-[-26px] h-24 w-24 rounded-full bg-[color:rgba(201,122,61,0.12)] blur-2xl" />

            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">Identity Card</p>
                <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-[10px] tracking-[0.18em] text-[var(--color-muted)]">
                  PROFILE
                </span>
              </div>

              <div className="mb-5 flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-[var(--color-border)]">
                  <Image alt="Avatar" className="object-cover" fill src={profile.avatar} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-heading)]">{displayName.primary}</p>
                  {displayName.secondary && (
                    <p className="mt-1 text-xs tracking-[0.12em] text-[var(--color-muted)]">{displayName.secondary}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {identityHighlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3"
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.25 + index * 0.08, duration: 0.4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-[11px] tracking-[0.16em] text-[var(--color-muted)]">{item.label}</p>
                    <p className="mt-1.5 text-sm leading-6 text-[var(--color-heading)]">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Focus Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs text-[var(--color-text)]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.35 + index * 0.05, duration: 0.35 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section className="space-y-6" id="about" initial="hidden" variants={reveal} viewport={{ once: true, amount: 0.25 }} whileInView="show">
          <SectionHeader title="About Me" subtitle="关于我" />
          <div className="grid gap-3 md:grid-cols-3">
            {aboutMeSections.map((item) => {
              const isActive = activeAboutKey === item.key;
              return (
                <button
                  key={item.key}
                  className={`glass-panel card-hover rounded-2xl px-5 py-4 text-left transition ${
                    isActive
                      ? "border-[var(--color-hover)] shadow-[0_10px_24px_rgba(185,102,46,0.16)]"
                      : "border-[var(--color-border)]"
                  }`}
                  onClick={() => setActiveAboutKey(item.key)}
                  type="button"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">Section</p>
                  <p className="mt-2 text-base font-medium text-[var(--color-heading)]">{item.tabLabel}</p>
                </button>
              );
            })}
          </div>

          <motion.article
            key={activeAboutSection.key}
            className="glass-panel rounded-2xl p-5 md:p-6"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-heading)]">{activeAboutSection.title}</h3>
              {activeAboutSection.description && (
                <p className="mt-2 text-sm text-[var(--color-text)]">{activeAboutSection.description}</p>
              )}
            </div>

            {activeAboutSection.key === "education" && activeAboutSection.educationGroups && (
              <div className="space-y-5">
                {activeAboutSection.educationGroups.map((group) => (
                  <article key={group.schoolEn} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 md:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-semibold text-[var(--color-heading)]">{group.schoolCn}</h4>
                        <p className="text-xs tracking-[0.08em] text-[var(--color-muted)]">{group.schoolEn}</p>
                      </div>
                      <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-muted)]">
                        {group.period}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text)]">{group.summary}</p>
                    {(() => {
                      const featured = group.images.find((img) => img.role === "featured") ?? group.images[0];
                      const secondary = group.images.filter((img) => img.src !== featured.src);

                      const getAspect = (aspect?: "landscape" | "portrait" | "square") => {
                        if (aspect === "portrait") return "aspect-[3/4]";
                        if (aspect === "square") return "aspect-square";
                        return "aspect-[4/3]";
                      };

                      return (
                        <div className="mt-4 grid gap-3 md:grid-cols-6">
                          <div className="relative overflow-hidden rounded-lg border border-[var(--color-border)] md:col-span-4">
                            <div className="aspect-[16/10]">
                              <Image alt={`${group.schoolEn}-featured`} className="object-cover" fill src={featured.src} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 md:col-span-2 md:grid-cols-2">
                            {secondary.map((img, idx) => (
                              <div key={img.src} className={`relative overflow-hidden rounded-lg border border-[var(--color-border)] ${getAspect(img.aspect)} ${idx === 0 ? "col-span-2" : "col-span-1"}`}>
                                <Image alt={`${group.schoolEn}-secondary-${idx + 1}`} className="object-cover" fill src={img.src} />
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </article>
                ))}
              </div>
            )}

            {activeAboutSection.key === "certifications" && activeAboutSection.certifications && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activeAboutSection.certifications.map((cert) => (
                  <article key={cert.image} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--color-border)]">
                      <Image alt={cert.name} className="object-cover" fill src={cert.image} />
                    </div>
                    <h4 className="mt-3 text-sm font-medium text-[var(--color-heading)]">{cert.name}</h4>
                    {cert.note && <p className="mt-1 text-xs text-[var(--color-muted)]">{cert.note}</p>}
                  </article>
                ))}
              </div>
            )}

            {activeAboutSection.key === "hobbies" && activeAboutSection.hobbies && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {activeAboutSection.hobbies.map((hobby) => (
                  <figure key={hobby.image} className="group relative overflow-hidden rounded-xl border border-[var(--color-border)]">
                    <div className="relative aspect-square">
                      <Image alt={hobby.name} className="object-cover transition duration-300 group-hover:scale-[1.03]" fill src={hobby.image} />
                    </div>
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:rgba(47,36,28,0.55)] to-transparent px-2.5 py-2 text-[11px] tracking-[0.08em] text-white/95 opacity-0 transition group-hover:opacity-100">
                      {hobby.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </motion.article>
        </motion.section>
        <motion.section className="space-y-6" id="education" initial="hidden" variants={reveal} viewport={{ once: true, amount: 0.28 }} whileInView="show">
          <SectionHeader title="Research Achievements" subtitle="科研成果" />
          <div className="grid gap-4 md:grid-cols-2">
            {researchAchievements.map((item) => (
              <motion.article
                key={`${item.title}-${item.year}`}
                className="glass-panel card-hover rounded-2xl p-5"
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{ y: -4 }}
              >
                <ResearchImageCarousel images={item.images} title={item.conference} />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-[11px] text-[var(--color-muted)]">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.award && (
                      <span className="rounded-full border border-[var(--color-hover)] bg-[color:rgba(185,102,46,0.14)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-hover)]">
                        {item.award}
                      </span>
                    )}
                    <span className="text-xs text-[var(--color-muted)]">{item.year}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs tracking-[0.06em] text-[var(--color-muted)]">{item.conference}</p>
                <h3 className="mt-2 text-base font-semibold leading-7 text-[var(--color-heading)]">{item.title}</h3>
                <p className="mt-2 text-xs text-[var(--color-muted)]">作者：{item.authors}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text)]">{item.summary}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>
        <motion.section className="space-y-6" id="projects" initial="hidden" variants={reveal} viewport={{ once: true, amount: 0.22 }} whileInView="show">
          <SectionHeader title="Projects" subtitle="项目经历" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                className="glass-panel card-hover rounded-2xl p-5"
                key={project.title}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{ y: -4 }}
              >
                <ProjectMedia media={project.media} title={project.title} />
                <h3 className="text-base font-semibold leading-7 text-[var(--color-heading)]">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text)]">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-xs text-[var(--color-text)]"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
        <motion.section className="space-y-6" id="skills" initial="hidden" variants={reveal} viewport={{ once: true, amount: 0.28 }} whileInView="show">
          <SectionHeader title="Skills" subtitle="个人技能" />
          <div className="grid gap-5 md:grid-cols-[240px_1fr]">
            <aside className="glass-panel rounded-2xl p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Skill Matrix</p>
              <div className="space-y-2">
                {skillGroups.map((group) => (
                  <button
                    key={group.name}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                      activeSkillGroup === group.name
                        ? "bg-[color:rgba(201,122,61,0.14)] text-[var(--color-button)]"
                        : "bg-[var(--color-card)] text-[var(--color-text)] hover:bg-[var(--color-card)] hover:text-[var(--color-heading)]"
                    }`}
                    onClick={() => setActiveSkillGroup(group.name)}
                    type="button"
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </aside>
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-base font-medium text-[var(--color-heading)]">{currentSkillGroup.name}</h3>
              <div className="mt-5 space-y-4">
                {currentSkillGroup.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[var(--color-heading)]">{skill.name}</span>
                      <span className="text-[var(--color-muted)]">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[color:rgba(138,119,104,0.22)]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-button)] to-[var(--color-hover)]"
                        initial={{ width: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        viewport={{ once: true }}
                        whileInView={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="space-y-6" id="experience" initial="hidden" variants={reveal} viewport={{ once: true, amount: 0.28 }} whileInView="show">
          <SectionHeader title="Experience" subtitle="经历" />
          <div className="grid gap-4 md:grid-cols-2">
            {experiences.map((item) => (
              <motion.article
                key={`${item.organization}-${item.period}`}
                className="glass-panel card-hover rounded-2xl p-5"
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-[var(--color-heading)]">{item.organization}</h3>
                  <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-muted)]">{item.period}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">身份：{item.role}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text)]">{item.summary}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>
        <motion.section className="space-y-6" id="social" initial="hidden" variants={reveal} viewport={{ once: true, amount: 0.28 }} whileInView="show">
          <SectionHeader title="Contact" subtitle="联系入口" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {socialLinks.map((item) => {
              const meta = getSocialMeta(item.name, item.href);
              const isLink = item.href !== "#";
              const shouldOpenNew = item.href.endsWith(".pdf") || item.href.startsWith("http") || item.href.startsWith("mailto:");

              return (
                <motion.a
                  key={item.name}
                  className="group glass-panel card-hover interactive-card neon-edge relative flex min-h-40 flex-col justify-between rounded-2xl p-5"
                  href={item.href}
                  rel={shouldOpenNew ? "noreferrer" : undefined}
                  target={shouldOpenNew ? "_blank" : undefined}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div className="pointer-events-none absolute right-4 top-4 text-[color:rgba(138,119,104,0.72)] transition group-hover:text-[var(--color-hover)]">
                    {isLink ? "->" : "--"}
                  </div>

                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-[11px] tracking-[0.14em] text-[var(--color-text)]">
                      <SocialIcon type={meta.icon} />
                      <span>{meta.hint}</span>
                    </div>
                    <p className="text-base font-medium text-[var(--color-heading)]">{item.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{item.value}</p>
                    {item.qrImage && (
                      <div className="relative mt-4 aspect-square w-24 overflow-hidden rounded-lg border border-[var(--color-border)]">
                        <Image alt="WeChat QR" className="object-cover" fill src={item.qrImage} />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-muted)]">
                    <span>{meta.action}</span>
                    <span className="transition group-hover:text-[var(--color-hover)]">{isLink ? "Open" : "Info"}</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.section>
      </main>

      <footer className="mx-auto flex max-w-6xl items-center justify-between border-t border-[var(--color-border)] px-4 py-7 text-xs text-[var(--color-muted)] md:px-8">
        <span>© {new Date().getFullYear()} {displayName.primary}</span>
        <span>{footer.text}</span>
      </footer>
    </div>
  );
}




































