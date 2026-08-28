import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useTransition, type FormEvent } from "react";
import {
  Gamepad2,
  Sparkles,
  Gift,
  HeartHandshake,
  Vote,
  Crown,
  ShieldCheck,
  Users,
  Lightbulb,
  Handshake,
  Compass,
  Menu,
  X,
  Instagram,
  Send,
  Twitter,
  ArrowLeft,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import logo from "@/assets/logo.png.asset.json";
import heroPeople from "@/assets/hero-people.png.asset.json";
import mindCity from "@/assets/mind-city.png.asset.json";
import appPhone from "@/assets/app-phone.png.asset.json";
import { ThemeToggle } from "@/components/theme-toggle";
import { submitForm } from "@/lib/submissions.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نورویش | با هم شادتریم" },
      {
        name: "description",
        content:
          "نورویش جایی برای تجربه، مشارکت و ایجاد ارزش است. بازی کن، امتیاز بگیر و بخشی از ارزش را به جامعه برگردان. همین حالا پیش‌ثبت‌نام کن.",
      },
      { property: "og:title", content: "نورویش | با هم شادتریم" },
      {
        property: "og:description",
        content:
          "رشد من، رشد ما و رشد ایران. با پیش‌ثبت‌نام در نورویش، شانس قرار گرفتن بین ۱۰۰۰ کاربر ویژه را داشته باش.",
      },
    ],
  }),
  component: Landing,
});

const NAV = [
  { label: "نورویش", href: "#what" },
  { label: "درباره ما", href: "#about" },
  { label: "کاربران ویژه", href: "#special" },
  { label: "تبلیغات", href: "#ads" },
  { label: "همکاری", href: "#build" },
];

const WORDS = ["شادتریم", "قوی‌تریم", "موفق‌تریم", "آگاه‌تریم", "رشد می‌کنیم"];

function useRotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return WORDS[i];
}

function SectionTag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo.url} alt="لوگوی نورویش" className="h-11 w-11 object-contain" />
          <span className="text-xl font-extrabold tracking-tight">نورویش</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#register"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            پیش‌ثبت‌نام
          </a>
          <button
            type="button"
            aria-label="منو"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-bold text-accent-foreground"
            >
              پیش‌ثبت‌نام
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const word = useRotatingWord();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="aurora -right-24 top-0 h-80 w-80 bg-petal-teal" />
      <div className="aurora -left-20 top-40 h-72 w-72 bg-petal-rose" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1fr_1.05fr] lg:pb-24 lg:pt-20">
        <div>
          <SectionTag>پیش‌ثبت‌نام باز است</SectionTag>
          <h1 className="mt-6 text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl lg:text-6xl">
            با هم{" "}
            <span key={word} className="text-gradient-accent inline-block animate-in fade-in slide-in-from-bottom-2 duration-500">
              {word}.
            </span>
          </h1>
          <h2 className="mt-5 text-lg font-bold text-foreground/90 sm:text-xl">
            نورویش جایی برای تجربه، مشارکت و ایجاد ارزش است.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
            ما باور داریم وقتی آدم‌ها در کنار هم قرار می‌گیرند، مشارکت‌های کوچک می‌توانند به
            اتفاق‌های بزرگ‌تری تبدیل شوند؛ اتفاق‌هایی که هم برای خودمان ارزش دارند و هم می‌توانند
            برای جامعه اثرگذار باشند.
          </p>
          <p className="mt-3 font-bold">نورویش از همین باور شروع شده است.</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#register"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-bold text-accent-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              پیش‌ثبت‌نام نورویش
              <ArrowLeft className="h-4 w-4" />
            </a>
            <span className="text-sm text-muted-foreground">
              با پیش‌ثبت‌نام، زودتر از شروع نورویش باخبر می‌شوی.
            </span>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-7 shadow-[var(--shadow-soft)]">
            <Crown className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <p>
              <span className="font-bold">۱۰۰۰ نفر اولی</span> که وارد نورویش شوند و اولین بازی خود
              را انجام دهند، کاربران ویژه نورویش خواهند بود.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-10 bottom-12 top-16 rounded-full bg-secondary/50 blur-3xl" />
          <img
            src={heroPeople.url}
            alt="گروهی از جوانان ایرانی با پس‌زمینه شهر و طبیعت"
            className="animate-float relative w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <SectionTag>مسئله</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.4] sm:text-4xl">
            هر روز مشارکت می‌کنیم؛ اما این مشارکت چه چیزی می‌سازد؟
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
            <p>
              هر روز بخشی از وقت و توجه ما صرف دیدن، شنیدن، بازی کردن، خرید کردن، انتخاب کردن و
              تعامل با چیزهای مختلف می‌شود.
            </p>
            <p>
              ما در دنیایی زندگی می‌کنیم که توجه انسان‌ها ارزشمند است؛ اما همیشه سهمی از این ارزش
              به خود انسان یا جامعه بازنمی‌گردد.
            </p>
            <p>از طرف دیگر، مشکلات اجتماعی، اقتصادی و فرهنگی اطراف ما کم نیستند.</p>
          </div>

          <div className="card-soft mt-8 p-6">
            <p className="text-sm font-bold text-accent">نورویش از یک سؤال شروع شد:</p>
            <p className="mt-3 text-xl font-extrabold leading-9">
              آیا می‌توان تجربه‌ای ساخت که در آن مشارکت کردن فقط مصرف کردن نباشد؟
            </p>
            <p className="mt-3 leading-8 text-muted-foreground">
              تجربه‌ای که در آن رشد و منفعت فردی بتواند در کنار ایجاد ارزش برای دیگران و جامعه قرار
              بگیرد.
            </p>
            <p className="mt-4 font-bold">پاسخ ما به این سؤال، نورویش است.</p>
          </div>
        </div>

        <img
          src={mindCity.url}
          alt="ذهنی پر از ایده‌ها، شهر و طبیعت"
          className="w-full object-contain"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function WhatIsIt() {
  return (
    <section id="what" className="surface-panel relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          نورویش چیست؟
        </span>
        <h2 className="mt-6 text-3xl font-extrabold leading-[1.4] sm:text-4xl">
          قرار نیست فقط چیزی را ببینی و از کنارش عبور کنی.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 opacity-85">
          نورویش تلاش می‌کند تجربه‌هایی ایجاد کند که در آنها{" "}
          <span className="font-bold opacity-100">مشارکت، تعامل و انتخاب</span> معنا داشته باشد.
          اینجا می‌توانی بازی کنی، تجربه کنی، امتیاز به دست بیاوری، انتخاب کنی و در فعالیت‌های مختلف
          مشارکت داشته باشی. اما داستان به منفعت شخصی تو ختم نمی‌شود.
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-xl font-bold leading-9">
          در نورویش، بخشی از ارزشی که در این مسیر ایجاد می‌شود می‌تواند دوباره به جامعه برگردد.
        </p>
        <p className="mt-5 leading-8 opacity-85">
          به همین دلیل، برای ما «رشد من» و «خیر ما» دو مسیر جدا از هم نیستند. نورویش می‌خواهد این دو
          را در کنار هم قرار دهد.
        </p>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: Gamepad2,
    title: "بازی کن",
    text: "پازل‌های نورویش را حل کن و با تجربه‌های مختلف درگیر شو.",
  },
  {
    icon: Sparkles,
    title: "امتیاز بگیر",
    text: "با فعالیت‌هایت امتیاز جمع کن و از آن در مسیر تجربه نورویش استفاده کن.",
  },
  {
    icon: Gift,
    title: "جایزه بگیر",
    text: "امتیازهایت را برای دریافت کارت‌های قرعه‌کشی هدیه استفاده کن.",
  },
  {
    icon: HeartHandshake,
    title: "اثر اجتماعی بگذار",
    text: "با فعالیت‌هایت بخشی از ارزش ایجادشده را به حل مشکلات جامعه اختصاص بده.",
  },
];

function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <img src={appPhone.url} alt="پیش‌نمایش اپلیکیشن نورویش" className="w-full" loading="lazy" />
        <div>
          <SectionTag>اولین تجربه نورویش</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.4] sm:text-4xl">
            بازی کن. مشارکت کن. اثر بگذار.
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            اولین نسخه نورویش ساده شروع می‌شود؛ اما ایده پشت آن ساده نیست.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {STEPS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-soft p-5 transition-transform hover:-translate-y-1">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm font-bold text-accent">این فقط اولین قدم نورویش است.</p>
        </div>
      </div>
    </section>
  );
}

function Voting() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <div className="card-soft overflow-hidden">
        <div className="grid gap-10 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <SectionTag>انتخاب با توست</SectionTag>
            <h2 className="mt-5 text-3xl font-extrabold leading-[1.4] sm:text-4xl">
              هر ماه، یک انتخاب برای یک اثر واقعی
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              در نورویش قرار نیست همه تصمیم‌ها را دیگران به جای ما بگیرند. در ابتدای هر ماه، سه
              مجموعه برای حمایت معرفی می‌شوند و کاربران می‌توانند انتخاب کنند که وجوه اختصاص‌یافته
              به فعالیت‌های اجتماعی آن ماه، به کدام مجموعه اختصاص پیدا کند.
            </p>
            <p className="mt-5 font-bold leading-8">
              چون مشارکت برای ما فقط انجام دادن نیست؛ انتخاب کردن هم بخشی از آن است.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { n: "۰۱", t: "تو انتخاب می‌کنی." },
              { n: "۰۲", t: "رأی‌ها جمع می‌شوند." },
              { n: "۰۳", t: "انتخاب نهایی مشخص می‌شود." },
              { n: "۰۴", t: "و نتیجه اعلام خواهد شد." },
            ].map((s) => (
              <div
                key={s.n}
                className="flex items-center gap-4 rounded-2xl border border-border bg-muted px-5 py-4"
              >
                <span className="text-sm font-black text-accent">{s.n}</span>
                <span className="font-semibold">{s.t}</span>
              </div>
            ))}
            <div className="flex items-start gap-3 rounded-2xl bg-secondary p-5 text-secondary-foreground">
              <Vote className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-bold">اولین رأی‌گیری نورویش به‌زودی آغاز می‌شود.</p>
                <p className="mt-1 text-sm opacity-80">
                  جزئیات مجموعه‌ها و مبلغ اختصاص‌یافته پس از نهایی شدن اعلام خواهد شد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecialUsers() {
  return (
    <section id="special" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionTag>۱۰۰۰ کاربر ویژه</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.4] sm:text-4xl">
            جزو اولین‌ها باش.
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
            <p>
              نورویش را قرار نیست از روز اول برای همه شروع کنیم. می‌خواهیم اولین گروهی که وارد
              نورویش می‌شوند، کسانی باشند که از همان ابتدا با ما همراه شده‌اند.
            </p>
            <p>
              بعد از شروع،{" "}
              <span className="font-bold text-foreground">
                ۱۰۰۰ نفری که زودتر از دیگران وارد نرم‌افزار شوند و اولین بازی خود را انجام دهند،
                کاربران ویژه نورویش خواهند بود.
              </span>
            </p>
            <p>
              کاربران ویژه در ادامه مسیر نورویش، فرصت‌های اختصاصی بیشتری برای مشارکت خواهند داشت؛ از
              مزایای ویژه گرفته تا فرصت اثرگذاری بر برخی تصمیم‌های مهم در مسیر رشد نورویش.
            </p>
          </div>
          <p className="mt-6 text-lg font-bold">
            اگر می‌خواهی از همان ابتدا همراه باشی، الان بهترین زمان است.
          </p>
          <a
            href="#register"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-accent-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
          >
            پیش‌ثبت‌نام نورویش
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>

        <div className="surface-panel rounded-[2rem] p-10 text-center">
          <Crown className="mx-auto h-10 w-10 text-accent" />
          <p className="mt-6 text-6xl font-black">۱۰۰۰</p>
          <p className="mt-2 text-lg font-bold">کاربر ویژه نورویش</p>
          <p className="mt-4 text-sm leading-7 opacity-80">
            پیش‌ثبت‌نام کن. ما زمان شروع نورویش را زودتر به تو اطلاع می‌دهیم.
          </p>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-5 py-16 text-center lg:py-24">
      <SectionTag>درباره نورویش</SectionTag>
      <h2 className="mt-5 text-3xl font-extrabold leading-[1.4] sm:text-4xl">
        نورویش از یک باور شروع شد.
      </h2>
      <div className="mt-6 space-y-4 leading-8 text-muted-foreground">
        <p>ما باور داریم تغییر فقط زمانی اتفاق می‌افتد که خودمان بخشی از آن باشیم.</p>
        <p>
          جامعه بهتر، اقتصاد بهتر و فرهنگ بهتر فقط با تصمیم‌های بزرگ و از بالا ساخته نمی‌شوند. از
          رفتارهای ما شروع می‌شوند. از انتخاب‌های ما. از مسئولیتی که می‌پذیریم. از اینکه چقدر حاضر
          هستیم رشد کنیم و چقدر حاضر هستیم در کنار رشد خودمان، برای دیگران هم ارزش ایجاد کنیم.
        </p>
        <p className="font-bold text-foreground">
          ما نورویش را برای ساختن همین مسیر شروع کرده‌ایم.
        </p>
        <p>
          مسیرِ رشد فردی، مشارکت و ایجاد ارزش؛ مسیری که در آن منفعت من مجبور نیست در مقابل خیر ما
          قرار بگیرد.
        </p>
      </div>
      <p className="text-gradient-accent mt-8 text-2xl font-black sm:text-3xl">
        رشد من، رشد ما و رشد ایران.
      </p>
    </section>
  );
}

const VALUES = [
  {
    icon: Compass,
    title: "از خودمان شروع می‌کنیم.",
    text: "قبل از اینکه از دیگران انتظار تغییر داشته باشیم، تغییر را از خودمان آغاز می‌کنیم.",
  },
  {
    icon: Users,
    title: "هرکس مسئولیتی دارد.",
    text: "ساختن آینده بهتر فقط مسئولیت گروه خاصی نیست. هرکدام از ما، در اندازه خودمان، سهمی در آن داریم.",
  },
  {
    icon: Lightbulb,
    title: "منفعت من، در کنار خیر ما.",
    text: "می‌توان راهی ساخت که رشد فردی و خیر جمعی در کنار یکدیگر قرار بگیرند.",
  },
  {
    icon: Handshake,
    title: "با هم می‌سازیم.",
    text: "وقتی انسان‌های مختلف کنار هم قرار می‌گیرند، می‌توانند چیزهایی بسازند که هیچ‌کدام به‌تنهایی قادر به ساختنش نیستند.",
  },
  {
    icon: ShieldCheck,
    title: "اعتماد، تعهد و شفافیت.",
    text: "اعتماد چیزی نیست که فقط درباره‌اش حرف بزنیم. باید با عمل، تعهد و شفافیت ساخته شود.",
  },
];

function Values() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <div className="text-center">
        <SectionTag>باورهای ما</SectionTag>
        <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
          چیزهایی که می‌خواهیم همیشه به آنها پایبند بمانیم.
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="card-soft p-6 transition-transform hover:-translate-y-1">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
          </div>
        ))}
        <div className="surface-panel flex items-center justify-center rounded-[var(--radius-2xl)] p-6 text-center text-2xl font-black">
          با هم بهتر می‌شویم.
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/30";
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {textarea ? (
        <textarea name={name} rows={4} required className={cls} />
      ) : (
        <input name={name} type={type} required className={cls} />
      )}
    </label>
  );
}

function useFormSubmit(type: "pre_register" | "ads" | "cooperation", successMessage: string) {
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const data = {
      type,
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim() || undefined,
      business: String(fd.get("business") ?? "").trim() || undefined,
      field: String(fd.get("field") ?? "").trim() || undefined,
      contact: String(fd.get("contact") ?? "").trim() || undefined,
      message: String(fd.get("message") ?? "").trim() || undefined,
    };
    startTransition(async () => {
      try {
        await submitForm({ data });
        setSent(true);
        toast.success(successMessage);
        form.reset();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "خطا در ارسال فرم. دوباره تلاش کن.");
      }
    });
  };
  return { sent, pending, onSubmit };
}

function Ads() {
  const { sent, onSubmit } = useSubmitted();
  return (
    <section id="ads" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionTag>برای کسب‌وکارها</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.4] sm:text-4xl">
            تبلیغ کن؛ اما فقط دیده نشو.
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
            <p>
              مخاطب امروز هر روز با تبلیغات زیادی روبه‌رو می‌شود. اما بسیاری از آنها فقط دیده
              می‌شوند و چند لحظه بعد فراموش می‌شوند. نورویش می‌خواهد این تجربه را متفاوت کند.
            </p>
            <p className="font-bold text-foreground">
              تبلیغ در نورویش می‌تواند بخشی از یک تجربه باشد.
            </p>
            <p>
              کسب‌وکار شما می‌تواند در قالب یک پازل تعاملی با مخاطب ارتباط برقرار کند؛ مخاطب تبلیغ
              را فقط نمی‌بیند، بلکه با آن تعامل می‌کند و برای حل آن وقت می‌گذارد.
            </p>
            <p>
              اگر کسب‌وکارت در حال رشد است، می‌توانی از همین حالا برای حضور در نورویش درخواست بدهی.
            </p>
          </div>
        </div>

        <div className="card-soft p-7">
          <h3 className="text-lg font-bold">فرم تبلیغات</h3>
          {sent ? (
            <p className="mt-6 flex items-center gap-2 rounded-xl bg-muted p-4 text-sm font-semibold">
              <Check className="h-4 w-4 text-accent" /> درخواست شما ثبت شد؛ به‌زودی تماس می‌گیریم.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <Field label="نام و نام خانوادگی" name="name" />
              <Field label="نام کسب‌وکار" name="business" />
              <Field label="شماره تماس" name="phone" type="tel" />
              <Field label="حوزه فعالیت" name="field" />
              <button
                type="submit"
                className="w-full rounded-full bg-accent px-6 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                می‌خواهم در نورویش تبلیغ کنم
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function BuildWithUs() {
  const { sent, onSubmit } = useSubmitted();
  return (
    <section id="build" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="card-soft order-2 p-7 lg:order-1">
          <h3 className="text-lg font-bold">پیام به نورویش</h3>
          {sent ? (
            <p className="mt-6 flex items-center gap-2 rounded-xl bg-muted p-4 text-sm font-semibold">
              <Check className="h-4 w-4 text-accent" /> پیامت رسید. ممنون که وقت گذاشتی.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <Field label="نام" name="name" />
              <Field label="راه ارتباطی" name="contact" />
              <Field label="پیام" name="message" textarea />
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                ارسال برای نورویش
              </button>
            </form>
          )}
        </div>

        <div className="order-1 lg:order-2">
          <SectionTag>نورویش را با ما بساز</SectionTag>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.4] sm:text-4xl">
            هنوز اول راهیم؛ و می‌خواهیم صدای تو را بشنویم.
          </h2>
          <ul className="mt-6 space-y-3 leading-8 text-muted-foreground">
            {[
              "ممکن است ایده‌ای داشته باشی که ما به آن فکر نکرده‌ایم.",
              "ممکن است چیزی در نورویش ببینی که می‌تواند بهتر باشد.",
              "ممکن است انتقادی داشته باشی.",
              "یا شاید فکر می‌کنی می‌توانی در ساختن نورویش به ما کمک کنی.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-bold">فرقی نمی‌کند پیشنهادت چیست؛ با ما در میان بگذار.</p>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const { sent, onSubmit } = useSubmitted();
  return (
    <section id="register" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <div className="surface-panel relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-center lg:px-16">
        <img
          src={logo.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 opacity-20"
        />
        <h2 className="text-3xl font-extrabold sm:text-4xl">با هم شروع می‌کنیم.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 opacity-85">
          نورویش تازه در ابتدای مسیر است. اگر می‌خواهی زودتر از شروع آن باخبر شوی و فرصت قرار گرفتن
          بین <span className="font-bold opacity-100">۱۰۰۰ کاربر ویژه نورویش</span> را داشته باشی،
          همین حالا پیش‌ثبت‌نام کن.
        </p>
        <p className="mt-4 font-bold">اولین قدم ساده است.</p>

        {sent ? (
          <div className="mx-auto mt-9 max-w-lg rounded-3xl bg-background/10 p-8 backdrop-blur">
            <p className="text-2xl font-black">ثبت شد! 👋</p>
            <p className="mt-3 leading-8 opacity-85">
              تو در لیست پیش‌ثبت‌نام نورویش قرار گرفتی. وقتی زمان شروع نورویش نزدیک شود، زودتر از
              بقیه باخبرت می‌کنیم.
            </p>
            <p className="mt-4 font-bold">حالا نوبت شروع است.</p>
            <p className="mt-1 text-sm opacity-85">
              شاید یکی از ۱۰۰۰ کاربر ویژه نورویش باشی.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <input
              required
              name="name"
              placeholder="نام"
              className="flex-1 rounded-full border border-white/15 bg-background/10 px-5 py-3.5 text-sm outline-none placeholder:opacity-70 focus:ring-2 focus:ring-accent"
            />
            <input
              required
              name="phone"
              type="tel"
              placeholder="شماره موبایل"
              className="flex-1 rounded-full border border-white/15 bg-background/10 px-5 py-3.5 text-sm outline-none placeholder:opacity-70 focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-7 py-3.5 font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              پیش‌ثبت‌نام
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-12 text-center sm:flex-row sm:justify-between sm:text-right">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="لوگوی نورویش" className="h-12 w-12 object-contain" />
          <div>
            <p className="text-lg font-extrabold">نورویش</p>
            <p className="text-sm text-muted-foreground">با هم بهتر می‌شویم.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[
            { Icon: Instagram, label: "اینستاگرام" },
            { Icon: Send, label: "تلگرام" },
            { Icon: Twitter, label: "توییتر" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#top"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">© نورویش</p>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problem />
        <WhatIsIt />
        <Experience />
        <Voting />
        <SpecialUsers />
        <About />
        <Values />
        <Ads />
        <BuildWithUs />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
