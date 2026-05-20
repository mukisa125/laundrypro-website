import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  ClipboardList,
  Download,
  Mail,
  Menu,
  Moon,
  PackageCheck,
  Phone,
  Printer,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";

type ThemeMode = "dark" | "light";

const downloadLinks = {
  
  android: "href=https://github.com/mukisa125/laundrypro-downloads/releases/download/v1.0.0/LaundryPro.apk",
  windows: "https://github.com/mukisa125/laundrypro-downloads/releases/download/v1.0.0/LaundryPro_v3.exe",
};

const whatsappLinks = {
  general: "https://wa.me/256790090438?text=Hello%20LaundryPro%2C%20I%20would%20like%20to%20know%20more%20about%20the%20app.",
  enterprise: "https://wa.me/256790090438?text=I%20would%20like%20an%20enterprise%20plan",
};

const navItems = ["Home", "Features", "Workflow", "Plans", "Download", "Contact"];

const features = [
  ["POS System", "Create orders, receive payments, and print receipts from one counter workflow.", ReceiptText],
  ["Customer Management", "Keep profiles, balances, history, and communication records in one place.", Users],
  ["Finance & Reports", "Close the day with revenue, expenses, working capital, and balances visible.", BarChart3],
  ["Laundry Tracking", "Track clothes through receiving, washing, ironing, packing, and pickup.", PackageCheck],
  ["Staff Roles", "Give staff the right access for payroll, inventory, finance, and operations.", ShieldCheck],
  ["Offline + Online", "Keep serving customers even when internet access is unstable.", RefreshCw],
  ["Receipt Printing", "Generate clean customer receipts and order summaries for every transaction.", Printer],
  ["Mobile Access", "Review finance and operations from Android while desktop handles the front desk.", Smartphone],
];

const workflow = [
  ["Register Customer", "Save contact details and order preferences."],
  ["Tag Clothes", "Add garments, quantities, service type, and notes."],
  ["Track Stages", "Move orders through each laundry process."],
  ["Generate Invoice", "Create receipts with balances and payment method."],
  ["Delivery & Payment", "Confirm pickup, delivery, and final settlement."],
];

const plans = [
  {
    name: "Trial",
    price: "UGX 0",
    note: "Runs for 1 month",
    features: ["Basic features", "1 listed branch", "Good for testing LaundryPro"],
    action: "Start Trial",
    href: "#download",
    featured: false,
  },
  {
    name: "Starter",
    price: "UGX 50K",
    note: "Per branch",
    features: ["Basic features", "200 SMS", "200 emails", "Single branch operations"],
    action: "Choose Starter",
    href: "#download",
    featured: false,
  },
  {
    name: "Business",
    price: "UGX 100K",
    note: "Per branch",
    features: ["Everything in Starter", "500 SMS", "Unlimited emails", "Full customer service support"],
    action: "Choose Business",
    href: "#download",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    note: "For multi-branch teams",
    features: ["Everything in Business", "Multi-branch management", "Custom setup", "Priority guidance"],
    action: "Contact Us",
    href: whatsappLinks.enterprise,
    featured: false,
    external: true,
  },
];

const testimonials = [
  ["LaundryPro gave our front desk a cleaner flow. The closing report is now easy to verify every evening.", "Kenda Venture Holding", "Kampala"],
  ["The offline support is what made the system practical for us. Orders continue even when the network drops.", "Glow Laundry", "Mukono"],
  ["SMS updates reduced repeated calls from customers and helped our staff focus on processing work.", "FreshFold Services", "Entebbe"],
];

const trustStats = [
  ["Orders Tracked", 18500, "+"],
  ["Daily Reports", 9200, "+"],
  ["SMS Updates", 64000, "+"],
  ["Free Trial", 1, " Month"],
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Logo({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";

  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="LaundryPro home">
      <motion.div
        whileHover={{ rotate: -3, scale: 1.04 }}
        className={cn(
          "grid h-11 w-11 place-items-center rounded-xl border shadow-lg transition-colors",
          dark ? "border-blue-400/30 bg-white text-blue-600 shadow-blue-500/20" : "border-slate-200 bg-white text-blue-600 shadow-slate-200",
        )}
      >
        <div className="relative h-7 w-7 rounded-md border-2 border-current">
          <div className="absolute left-1 right-1 top-1 h-1 rounded-full bg-current" />
          <div className="absolute bottom-1.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400 to-blue-700" />
        </div>
      </motion.div>
      <div className="leading-none">
        <p className={cn("text-2xl font-black tracking-tight", dark ? "text-white" : "text-slate-950")}>
          Laundry<span className="text-blue-600">Pro</span>
        </p>
        <p className={cn("mt-1 hidden text-xs font-semibold sm:block", dark ? "text-white/55" : "text-slate-500")}>Manage Smarter. Grow Faster.</p>
      </div>
    </a>
  );
}

function BubbleBackground({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";
  const bubbles = [
    "left-[8%] top-[18%] h-24 w-24 animation-delay-0",
    "left-[24%] top-[68%] h-12 w-12 animation-delay-700",
    "left-[48%] top-[10%] h-16 w-16 animation-delay-1400",
    "left-[76%] top-[24%] h-14 w-14 animation-delay-2800",
    "left-[88%] top-[62%] h-24 w-24 animation-delay-3500",
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={cn("absolute -left-40 top-10 h-96 w-96 rounded-full blur-3xl", dark ? "bg-blue-600/16" : "bg-blue-200/60")} />
      <div className={cn("absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full blur-3xl", dark ? "bg-cyan-500/10" : "bg-cyan-200/50")} />
      {bubbles.map((bubble, index) => (
        <span
          key={bubble}
          className={cn(
            "animate-bubble-drift absolute rounded-full border backdrop-blur-sm",
            bubble,
            dark
              ? "border-blue-300/15 bg-blue-400/10 shadow-[0_0_45px_rgba(37,99,235,0.2)]"
              : "border-blue-200/60 bg-white/45 shadow-[0_18px_60px_rgba(37,99,235,0.12)]",
          )}
          style={{ animationDuration: `${13 + index * 1.2}s` }}
        />
      ))}
    </div>
  );
}

function Navbar({ theme, setTheme }: { theme: ThemeMode; setTheme: (theme: ThemeMode) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <nav
        className={cn(
          "mx-auto flex h-[72px] max-w-[1480px] items-center justify-between rounded-2xl border px-4 backdrop-blur-2xl transition-all duration-300 sm:px-5",
          scrolled ? "shadow-2xl" : "shadow-none",
          dark ? "border-white/10 bg-[#050d1c]/82 shadow-blue-950/20" : "border-slate-200/80 bg-white/85 shadow-blue-100/60",
        )}
      >
        <Logo theme={theme} />
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={cn("group relative text-sm font-bold transition", dark ? "text-white/75 hover:text-white" : "text-slate-700 hover:text-slate-950")}>
              {item}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(dark ? "light" : "dark")}
            className={cn(
              "relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl border px-3 text-sm font-black transition hover:-translate-y-0.5",
              dark ? "border-white/12 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
            )}
            aria-label="Toggle theme"
          >
            <motion.span initial={false} animate={{ rotate: dark ? 0 : 180 }} transition={{ duration: 0.35 }}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.span>
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={cn("grid h-11 w-11 place-items-center rounded-xl border lg:hidden", dark ? "border-white/12 text-white" : "border-slate-200 text-slate-900")}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className={cn("mx-auto mt-2 max-w-[1480px] rounded-2xl border p-3 shadow-2xl lg:hidden", dark ? "border-white/10 bg-[#07111f]/95 text-white" : "border-slate-200 bg-white text-slate-950")}
          >
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold hover:bg-blue-500/10">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function HeroDashboard({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 18 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  return (
    <motion.div
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="relative mx-auto max-w-[560px]"
    >
      <div className={cn("overflow-hidden rounded-[1.65rem] border p-4 shadow-2xl", dark ? "border-white/10 bg-white/[0.055] shadow-blue-950/40" : "border-slate-200 bg-white shadow-blue-100/80")}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-black">Kampala Central</p>
            <p className={cn("mt-1 text-xs", dark ? "text-white/45" : "text-slate-500")}>Today, 12 May 2026</p>
          </div>
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[["Orders", "528"], ["Revenue", "UGX 1.7M"], ["Pending", "71"]].map(([label, value]) => (
            <motion.div whileHover={{ y: -3 }} key={label} className={cn("rounded-2xl border p-4", dark ? "border-white/8 bg-white/[0.045]" : "border-slate-200 bg-slate-50")}> 
              <p className={cn("text-xs font-semibold", dark ? "text-white/45" : "text-slate-500")}>{label}</p>
              <p className="mt-2 text-xl font-black">{value}</p>
            </motion.div>
          ))}
        </div>
        <div className={cn("mt-4 rounded-2xl border p-4", dark ? "border-white/8 bg-[#0d1828]" : "border-slate-200 bg-white")}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-black">Weekly income</p>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-500">+18%</span>
          </div>
          <div className="flex h-36 items-end gap-3">
            {[36, 52, 42, 78, 68, 95, 58].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-700 to-sky-300"
              />
            ))}
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-24 hidden rounded-2xl border border-emerald-400/20 bg-emerald-500/95 px-4 py-3 text-white shadow-2xl shadow-emerald-900/20 sm:block"
      >
        <p className="text-xs font-bold text-white/75">Cleared today</p>
        <p className="text-lg font-black">UGX 338,000</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={cn("absolute -right-3 bottom-20 hidden rounded-2xl border px-4 py-3 shadow-2xl sm:block", dark ? "border-white/10 bg-[#101c2e] text-white shadow-blue-950/30" : "border-slate-200 bg-white text-slate-950 shadow-slate-200")}
      >
        <p className="text-xs font-bold opacity-60">SMS delivered</p>
        <p className="text-lg font-black">1,248</p>
      </motion.div>
    </motion.div>
  );
}

function Hero({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";

  return (
    <section id="home" className={cn("relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-7", dark ? "bg-[#07111f] text-white" : "bg-[#f7fbff] text-slate-950")}>
      <BubbleBackground theme={theme} />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div variants={stagger} initial="hidden" animate="show" className="pt-8">
          <motion.div variants={reveal} className={cn("mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black", dark ? "border-blue-400/20 bg-blue-500/10 text-blue-200" : "border-blue-100 bg-blue-50 text-blue-700")}>
            <Sparkles className="h-4 w-4" /> Built for serious laundry teams
          </motion.div>
          <motion.h1 variants={reveal} className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Smart Laundry Management Software for Modern Businesses
          </motion.h1>
          <motion.p variants={reveal} className={cn("mt-6 max-w-2xl text-lg leading-8 sm:text-xl", dark ? "text-white/68" : "text-slate-650 text-slate-700")}>
            Manage orders, POS, customer tracking, reporting, staff workflows, and laundry operations from one powerful platform.
          </motion.p>
          <motion.div variants={reveal} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <motion.a whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} href="#plans" className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500">
              Start Free Trial <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} href={whatsappLinks.general} target="_blank" rel="noreferrer" className={cn("inline-flex items-center justify-center gap-3 rounded-xl border px-7 py-4 text-base font-black shadow-lg transition", dark ? "border-white/15 bg-white/5 text-white shadow-blue-950/30 hover:bg-white/10" : "border-slate-300 bg-white text-slate-950 shadow-blue-100 hover:bg-slate-50")}>
              Book Demo <ChevronRight className="h-5 w-5" />
            </motion.a>
            <motion.a whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} href="#contact" className={cn("inline-flex items-center justify-center rounded-xl px-7 py-4 text-base font-black transition", dark ? "text-white/75 hover:text-white" : "text-slate-600 hover:text-slate-950")}>
              Contact Us
            </motion.a>
          </motion.div>
          <motion.div variants={reveal} className={cn("mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold", dark ? "text-white/75" : "text-slate-600")}>
            {['1 month free trial', 'Offline and online support', 'Android and Windows apps'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-blue-500" />{item}</span>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}>
          <HeroDashboard theme={theme} />
        </motion.div>
      </div>
      <motion.a
        href="#features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.1 }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
        className={cn("absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full border px-4 py-2 text-xs font-black lg:inline-flex", dark ? "border-white/10 text-white/55" : "border-slate-200 text-slate-500")}
      >
        Scroll to explore
      </motion.a>
    </section>
  );
}

function FeaturesSection({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";

  return (
    <section id="features" className={cn("px-4 py-20 sm:px-7", dark ? "bg-[#0b1626] text-white" : "bg-white text-slate-950")}>
      <div className="mx-auto max-w-[1320px]">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <p className="mb-3 text-sm font-bold text-blue-600">Features</p>
          <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Everything a real laundry operation needs, without clutter.</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, body, IconItem]) => (
            <motion.div
              variants={reveal}
              whileHover={{ y: -6 }}
              key={title as string}
              className={cn("group rounded-2xl border p-5 transition", dark ? "border-white/10 bg-white/[0.035] hover:border-blue-400/35 hover:bg-white/[0.055]" : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/60")}
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white transition group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-600/25">
                <IconItem className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black">{title as string}</h3>
              <p className={cn("mt-2 text-sm leading-6", dark ? "text-white/58" : "text-slate-600")}>{body as string}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WorkflowSection({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";

  return (
    <section id="workflow" className={cn("px-4 py-20 sm:px-7", dark ? "bg-[#07111f] text-white" : "bg-[#f7fbff] text-slate-950")}>
      <div className="mx-auto max-w-[1180px]">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <p className="mb-3 text-sm font-bold text-blue-600">How It Works</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">A clear workflow from counter to delivery.</h2>
        </motion.div>
        <div className="relative mt-14">
          <div className={cn("absolute left-6 top-0 hidden h-full w-px md:left-1/2 md:block", dark ? "bg-white/10" : "bg-slate-200")} />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }} className="space-y-5">
            {workflow.map(([title, body], index) => (
              <motion.div variants={reveal} key={title} className={cn("relative grid gap-5 md:grid-cols-2", index % 2 === 1 && "md:[&>div:first-child]:col-start-2")}>
                <div className={cn("rounded-2xl border p-6", dark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white shadow-lg shadow-blue-100/40")}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-sm font-black text-white">{index + 1}</span>
                    <h3 className="text-lg font-black">{title}</h3>
                  </div>
                  <p className={cn("text-sm leading-6", dark ? "text-white/60" : "text-slate-600")}>{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const frame = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function TrustSection({ theme }: { theme: ThemeMode }) {
  const [active, setActive] = useState(0);
  const dark = theme === "dark";

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % testimonials.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={cn("px-4 py-20 sm:px-7", dark ? "bg-[#0b1626] text-white" : "bg-white text-slate-950")}>
      <div className="mx-auto max-w-[1180px]">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map(([label, value, suffix]) => (
            <motion.div variants={reveal} key={label as string} className={cn("rounded-2xl border p-6", dark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-slate-50")}>
              <p className="text-3xl font-black"><Counter value={value as number} suffix={suffix as string} /></p>
              <p className={cn("mt-2 text-sm font-semibold", dark ? "text-white/55" : "text-slate-500")}>{label as string}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className={cn("mt-10 rounded-3xl border p-8", dark ? "border-white/10 bg-white/[0.035]" : "border-slate-200 bg-white shadow-xl shadow-blue-100/50")}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
              <p className="max-w-4xl text-2xl font-black leading-snug">"{testimonials[active][0]}"</p>
              <p className={cn("mt-6 text-sm font-bold", dark ? "text-white/55" : "text-slate-500")}>{testimonials[active][1]} - {testimonials[active][2]}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex gap-2">
            {testimonials.map((item, index) => (
              <button key={item[1]} type="button" onClick={() => setActive(index)} className={cn("h-2 rounded-full transition-all", index === active ? "w-8 bg-blue-600" : dark ? "w-2 bg-white/25" : "w-2 bg-slate-300")} aria-label={`Show testimonial ${index + 1}`} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PlansSection({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";

  return (
    <section id="plans" className={cn("px-4 py-20 sm:px-7", dark ? "bg-[#07111f] text-white" : "bg-[#f7fbff] text-slate-950")}>
      <div className="mx-auto max-w-[1320px]">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="mb-3 text-sm font-bold text-blue-600">Plans</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Choose the plan that fits your laundry business.</h2>
          <p className={cn("mt-4 max-w-2xl text-lg leading-8", dark ? "text-white/65" : "text-slate-600")}>Start with a free trial, then scale branch by branch as your operations grow.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <motion.div
              variants={reveal}
              whileHover={{ y: -6 }}
              key={plan.name}
              className={cn(
                "rounded-2xl border p-7 shadow-xl transition",
                plan.featured
                  ? "border-blue-500 bg-blue-600 text-white shadow-blue-600/25"
                  : dark
                    ? "border-white/10 bg-white/[0.04] shadow-blue-950/20"
                    : "border-slate-200 bg-white shadow-blue-100/60",
              )}
            >
              <p className="text-lg font-black">{plan.name}</p>
              <p className="mt-5 text-4xl font-black">{plan.price}</p>
              <p className={cn("mt-2 text-sm font-bold", plan.featured ? "text-white/75" : dark ? "text-white/55" : "text-slate-500")}>{plan.note}</p>
              <div className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <p key={feature} className={cn("flex items-start gap-3 text-sm font-semibold", plan.featured ? "text-white/85" : dark ? "text-white/70" : "text-slate-600")}>
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", plan.featured ? "text-white" : "text-blue-600")} />
                    {feature}
                  </p>
                ))}
              </div>
              <a href={plan.href} target={plan.external ? "_blank" : undefined} rel={plan.external ? "noreferrer" : undefined} className={cn("mt-8 inline-flex w-full justify-center rounded-lg px-5 py-3 font-black", plan.featured ? "bg-white text-blue-600" : "bg-blue-600 text-white")}>
                {plan.action}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DownloadSection({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";
  return (
    <section id="download" className={cn("relative overflow-hidden px-4 py-20 sm:px-7", dark ? "bg-[#0b1626] text-white" : "bg-white text-slate-950")}>
      <BubbleBackground theme={theme} />
      <div className="relative mx-auto max-w-[1120px]">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="mb-3 text-sm font-bold text-blue-600">Download</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Download LaundryPro for Android and Windows.</h2>
          <p className={cn("mt-4 max-w-2xl text-lg leading-8", dark ? "text-white/65" : "text-slate-600")}>Choose the app for your device and start managing your laundry business with a cleaner daily workflow.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["Windows Application", "For front desk, admin, and full business management.", "Download for Windows", MonitorIcon, "bg-blue-600", downloadLinks.windows],
            ["Android Application", "For owners and staff who need daily updates on the go.", "Download for Android", Smartphone, "bg-emerald-600", downloadLinks.android],
          ].map(([name, copy, action, IconItem, color, url]) => {
            const DownloadIcon = IconItem as typeof MonitorIcon;
            return (
              <motion.div variants={reveal} whileHover={{ y: -6 }} key={name as string} className={cn("rounded-2xl border p-8 shadow-xl", dark ? "border-white/10 bg-white/[0.04] shadow-blue-950/20" : "border-slate-200 bg-white shadow-blue-100/60")}>
                <div className={cn("mb-6 grid h-16 w-16 place-items-center rounded-2xl text-white", color as string)}>
                  <DownloadIcon className="h-8 w-8" />
                </div>
                <p className="text-2xl font-black">{name as string}</p>
                <p className={cn("mt-4 leading-7", dark ? "text-white/60" : "text-slate-600")}>{copy as string}</p>
                <a href={url as string} download className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-5 py-4 font-black text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500">
                  <Download className="h-5 w-5" />
                  {action as string}
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const MonitorIcon = ({ className = "" }: { className?: string }) => <ClipboardList className={className} />;

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.02 3.2A12.73 12.73 0 0 0 5.18 22.62L3.6 28.8l6.32-1.52A12.74 12.74 0 1 0 16.02 3.2Zm0 23.1a10.2 10.2 0 0 1-5.2-1.42l-.37-.22-3.75.9 1-3.64-.24-.38a10.17 10.17 0 1 1 8.56 4.76Zm5.62-7.62c-.3-.15-1.8-.9-2.08-1-.28-.1-.49-.15-.7.15-.2.3-.8 1-.98 1.18-.18.2-.36.22-.66.08-.3-.16-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.51.1-.2.05-.38-.03-.54-.07-.15-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.53.08-.8.38-.28.3-1.06 1.04-1.06 2.52s1.08 2.92 1.23 3.12c.15.2 2.12 3.24 5.13 4.54.72.31 1.27.5 1.7.64.72.23 1.37.2 1.9.12.58-.09 1.8-.74 2.05-1.45.25-.72.25-1.33.18-1.46-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLinks.general}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with LaundryPro on WhatsApp"
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-900/30 focus:outline-none focus:ring-4 focus:ring-emerald-300"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </motion.a>
  );
}

function Footer({ theme }: { theme: ThemeMode }) {
  const dark = theme === "dark";
  const contactLink = cn("grid h-12 w-12 place-items-center rounded-xl border transition hover:-translate-y-0.5", dark ? "border-white/10 hover:bg-white/5" : "border-slate-200 hover:bg-slate-50");

  return (
    <footer id="contact" className={cn("border-t px-4 py-12 sm:px-7", dark ? "border-white/10 bg-[#07111f]" : "border-slate-200 bg-white")}>
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto flex max-w-[1320px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Logo theme={theme} />
        <div className={cn("flex flex-wrap gap-3 text-sm font-bold", dark ? "text-white/70" : "text-slate-700")}>
          <a aria-label="Chat with LaundryPro on WhatsApp" className={contactLink} href={whatsappLinks.general} target="_blank" rel="noreferrer"><WhatsAppIcon className="h-6 w-6 text-[#25D366]" /></a>
          <a aria-label="Call LaundryPro" className={contactLink} href="tel:+256790090438"><Phone className="h-5 w-5 text-blue-600" /></a>
          <a aria-label="Email LaundryPro" className={contactLink} href="https://mail.google.com/mail/?view=cm&fs=1&to=laundryproapp@gmail.com" target="_blank" rel="noreferrer"><Mail className="h-5 w-5 text-blue-600" /></a>
        </div>
      </motion.div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const dark = theme === "dark";

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className={cn("min-h-screen overflow-x-hidden font-sans transition-colors duration-500", dark ? "bg-[#07111f] text-white" : "bg-white text-slate-950")}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Hero theme={theme} />
        <FeaturesSection theme={theme} />
        <WorkflowSection theme={theme} />
        <TrustSection theme={theme} />
        <PlansSection theme={theme} />
        <DownloadSection theme={theme} />
      </main>
      <Footer theme={theme} />
      <WhatsAppFab />
    </div>
  );
}
