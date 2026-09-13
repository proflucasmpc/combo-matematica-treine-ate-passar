import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  Menu,
  X,
  Target,
  Timer,
  TrendingUp,
  BookOpenCheck,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  Users,
  RefreshCcw,
  Award,
  Brain,
  ClipboardList,
  ListChecks,
  Rocket,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: SalesPage,
});

// ============================================
// CONFIGURAÇÕES EDITÁVEIS
// ============================================
const CHECKOUT_URL = "https://pay.hotmart.com/C107593539W";
const WHATSAPP_URL = "https://wa.me/5511960189699?text=Ol%C3%A1%2C%20professor%20Lucas.%20Quero%20saber%20mais%20sobre%20o%20Combo%20Treine%20At%C3%A9%20Passar%203%20em%201.";

const TRACKING_PARAMETERS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "sck",
  "fbclid",
] as const;

function buildCheckoutUrlWithTracking(): string {
  if (typeof window === "undefined") {
    return CHECKOUT_URL;
  }

  const checkoutUrl = new URL(CHECKOUT_URL);
  const landingPageParameters = new URLSearchParams(window.location.search);

  TRACKING_PARAMETERS.forEach((parameter) => {
    const value = landingPageParameters.get(parameter);

    if (value) {
      checkoutUrl.searchParams.set(parameter, value);
    }
  });

  return checkoutUrl.toString();
}

function useCheckoutUrl() {
  const [checkoutUrl, setCheckoutUrl] = useState(CHECKOUT_URL);

  useEffect(() => {
    setCheckoutUrl(buildCheckoutUrlWithTracking());
  }, []);

  return checkoutUrl;
}
// Depoimentos reais. Enquanto estiver vazio, a seção pública fica oculta.
type Testimonial = {
  name: string;
  concurso: string;
  text: string;
  image?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};
const TESTIMONIALS: Testimonial[] = [];
// ============================================

const NAV_LINKS = [
  { href: "#o-que-recebe", label: "O que você recebe" },
  { href: "#economia", label: "Economia do combo" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#duvidas", label: "Dúvidas" },
];

function SalesPage() {
  return (
    <div className="bg-app min-h-screen text-foreground">
      <Header />
      <main>
        <Hero />
        <VideoSalesLetter />
        <SavingsComparison />
        <Problem />
        <Solution />
        <WhatYouGet />
        <Benefits />
        <ForWho />
        <HowToUse />
        <PerceivedValue />
        <SocialProof />
        <AboutTeacher />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
function VideoSalesLetter() {
  const checkoutUrl = useCheckoutUrl();

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            VEJA COMO FUNCIONA
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Conheça o combo completo em{" "}
            <span className="text-gradient-gold">apenas 30 segundos</span>
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-primary/30 bg-black shadow-2xl">
          <video
            className="block aspect-video w-full"
            controls
            playsInline
            preload="metadata"
            poster="/images/capa-vsl-combo.jpg"
          >
            <source
              src="https://80-simulados-matematica.netlify.app/videos/combo-treine-ate-passar-sem-musica.mp4"
              type="video/mp4"
            />
            Seu navegador não consegue reproduzir este vídeo.
          </video>
        </div>

        <div className="mt-6 text-center">
          <a
            href={checkoutUrl}
            className="cta-primary inline-flex items-center justify-center gap-2 px-7 py-4 text-base"
          >
            QUERO O COMBO 3 EM 1
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Acesso imediato • Pagamento único • Garantia de 7 dias
          </p>
        </div>
      </div>
    </section>
  );
}

function SavingsComparison() {
  const checkoutUrl = useCheckoutUrl();
  const products = [
    {
      title: "80 Simulados de Matemática",
      value: "R$ 10,00",
      detail: "Provas completas com gabarito para testar seu desempenho.",
      image: "/images/80-simulados-pdf.webp",
      format: "MATERIAL DIGITAL EM PDF",
    },
    {
      title: "2.000 Questões por Assunto",
      value: "R$ 7,92",
      detail: "Prática organizada para fortalecer os conteúdos mais cobrados.",
      image: "/images/2000-questoes-pdf.webp",
      format: "MATERIAL DIGITAL EM PDF",
    },
    {
      title: "O Segredo da Interpretação",
      value: "R$ 10,00",
      detail: "Curso com cinco aulas para compreender melhor os enunciados.",
      image: "/images/segredo-interpretacao-plataforma.webp",
      format: "PLATAFORMA COM 5 AULAS",
    },
  ];

  return (
    <section id="economia" className="border-t border-border/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">VANTAGEM DO COMBO</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Os três recursos trabalham juntos — e você paga{" "}
            <span className="text-gradient-gold">menos que comprando separadamente</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Primeiro você aprende a interpretar, depois pratica por assunto e, por fim,
            testa seu desempenho em simulados completos.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={`visual-${product.title}`}
              className="card-surface border border-border/60"
            >
              <div className="flex h-[430px] items-center justify-center bg-[#061426] p-4 sm:h-[500px]">
                <img
                  src={product.image}
                  alt={`${product.title} — ${product.format}`}
                  className="h-full w-full object-contain object-center"
                  loading="eager"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold tracking-[0.14em] text-primary">
                  {product.format}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <div className="card-surface p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">
              COMPRANDO SEPARADAMENTE
            </p>
            <div className="mt-5 space-y-4">
              {products.map((product) => (
                <div
                  key={product.title}
                  className="flex items-start justify-between gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {product.detail}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-foreground">
                    {product.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
              <span className="text-sm text-muted-foreground">Total individual</span>
              <span className="font-display text-3xl font-bold text-foreground line-through decoration-destructive">
                R$ 27,92
              </span>
            </div>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <ArrowRight className="h-8 w-8 text-primary" />
          </div>

          <div className="card-surface relative overflow-hidden border-primary/40 p-6 ring-gold-soft sm:p-8">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <span className="relative inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              ECONOMIZE R$ 17,92
            </span>
            <p className="relative mt-5 text-xs font-semibold tracking-widest text-primary">
              COMBO TREINE ATÉ PASSAR — 3 EM 1
            </p>
            <h3 className="relative mt-2 font-display text-2xl font-bold text-foreground">
              Leve os três por apenas
            </h3>
            <div className="relative mt-4 flex items-end gap-3">
              <span className="font-display text-5xl font-bold text-gradient-gold sm:text-6xl">
                R$ 10
              </span>
              <span className="pb-2 text-sm text-muted-foreground">pagamento único</span>
            </div>
            <p className="relative mt-3 text-sm font-semibold text-primary">
              Aproximadamente 64% de economia.
            </p>

            <ul className="relative mt-6 space-y-3 text-sm text-foreground/90">
              {[
                "Os três produtos reunidos em uma única compra",
                "Acesso imediato pela Hotmart",
                "Acesso vitalício ao material",
                "7 dias de garantia",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={checkoutUrl}
              className="btn-gold relative mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm sm:text-base"
            >
              QUERO ECONOMIZAR E LEVAR O COMBO <ArrowRight className="h-5 w-5" />
            </a>
            <p className="relative mt-3 text-center text-xs text-muted-foreground">
              Compra segura • Liberação após a confirmação do pagamento
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-primary/25 bg-primary/5 p-5 text-center">
          <p className="font-display text-lg font-semibold text-foreground sm:text-xl">
            Por menos do que custaria comprar apenas um dos produtos de R$ 10,
            você recebe o treinamento completo em três etapas.
          </p>
        </div>
      </div>
    </section>
  );
}
/* -------------------- HEADER -------------------- */
function Header() {
  const checkoutUrl = useCheckoutUrl();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled
          ? "border-b border-border/60 bg-[#010817]/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg btn-gold text-sm">L</span>
          <span className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
            Prof. Lucas MPC
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={checkoutUrl}
          className="btn-gold hidden rounded-lg px-4 py-2.5 text-sm md:inline-flex"
        >
          QUERO O COMBO 3 EM 1
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-[#010817]/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={checkoutUrl}
              className="btn-gold mt-2 rounded-lg px-4 py-3 text-center text-sm"
            >
              QUERO O COMBO 3 EM 1
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  const checkoutUrl = useCheckoutUrl();
  const highlights = [
    "Curso O Segredo da Interpretação",
    "2.000 questões por assunto",
    "80 simulados completos",
    "Gabarito dos simulados",
    "Acesso imediato",
    "Acesso vitalício",
    "Pagamento único",
    "Garantia de 7 dias",
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> COMBO TREINE ATÉ PASSAR — 3 EM 1
          </span>

          <h1 className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Aprenda a interpretar. Treine por assunto.{" "}
            <span className="text-gradient-gold">Teste-se antes da prova.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Tenha acesso a um sistema completo com curso de interpretação de questões, 2.000 questões por assunto e 80 simulados de Matemática para concursos públicos.
          </p>

          <p className="mt-4 max-w-xl text-sm text-muted-foreground/90 sm:text-base">
            Três etapas em uma única oferta: interprete o enunciado, pratique os conteúdos e teste seu desempenho antes da prova.
          </p>

          <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-foreground/90">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-primary/20 bg-surface/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-muted-foreground line-through">Valor individual: R$ 27,92</p>
              <p className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                por apenas <span className="text-gradient-gold">R$ 10,00</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Pagamento único. Sem mensalidade.</p>
            </div>
            <a
              href={checkoutUrl}
              className="btn-gold shrink-0 rounded-xl px-6 py-4 text-center text-sm sm:text-base"
            >
              QUERO O COMBO 3 EM 1
            </a>
          </div>

          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" /> Acesso imediato e seguro pela Hotmart.
          </p>
        </div>

        <div className="relative">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

function HeroMockup() {
  const questions = [
    "1) Se x + 12 = 30, qual o valor de x?",
    "2) Um produto de R$ 80 tem desconto de 15%. Qual o preço final?",
    "3) A razão entre 45 e 60 é equivalente a:",
    "4) Qual o MMC entre 12 e 18?",
  ];
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />

      <div className="rounded-[1.75rem] border border-border/70 bg-gradient-to-b from-surface-2 to-surface p-3 shadow-2xl ring-gold-soft">
        <div className="rounded-[1.35rem] bg-[#050b1c] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-md btn-gold text-xs">M</div>
              <div>
                <p className="text-xs text-muted-foreground">Combo Treine Até Passar</p>
                <p className="text-sm font-semibold">Interpretar • Treinar • Simular</p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-xs">
              <Timer className="h-3.5 w-3.5 text-primary" /> 42:18
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>Progresso</span>
              <span>7 de 10</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-primary to-primary-glow" />
            </div>
          </div>

          <ul className="space-y-2.5">
            {questions.map((q, i) => (
              <li
                key={q}
                className="flex items-start gap-3 rounded-lg border border-border/60 bg-surface/60 p-3"
              >
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs text-foreground/85">{q}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between">
            <button className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
              Anterior
            </button>
            <button className="btn-gold rounded-md px-4 py-2 text-xs">Próxima questão</button>
          </div>
        </div>
      </div>

      <div className="absolute -top-3 -left-3 rotate-[-6deg] rounded-full btn-gold px-3 py-1.5 text-xs">
        3 EM 1
      </div>
      <div className="absolute -right-3 -bottom-3 rotate-[6deg] rounded-full border border-primary/40 bg-surface px-3 py-1.5 text-xs text-primary">
        ACESSO VITALÍCIO
      </div>
    </div>
  );
}

/* -------------------- PROBLEM -------------------- */
function Problem() {
  const items = [
    { icon: Brain, text: "Assiste às aulas, mas esquece rapidamente." },
    { icon: ClipboardList, text: "Entende a resolução, mas não consegue resolver sozinho." },
    { icon: Timer, text: "Perde muito tempo em uma única questão." },
    { icon: BookOpenCheck, text: "Erra por falta de interpretação." },
    { icon: ListChecks, text: "Não sabe quais assuntos precisa revisar." },
    { icon: Target, text: "Sente ansiedade quando encontra uma questão de Matemática." },
    { icon: RefreshCcw, text: "Resolve questões aleatórias sem acompanhar a evolução." },
  ];

  return (
    <section className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-primary">
          DIAGNÓSTICO
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-3xl font-bold leading-tight sm:text-4xl">
          Você estuda Matemática, mas ainda não sabe se conseguiria{" "}
          <span className="text-gradient-gold">acertar as questões da prova</span>?
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="card-surface p-5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="mt-4 text-sm text-foreground/90">{text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="font-display text-xl font-semibold sm:text-2xl">
            O problema muitas vezes não é falta de inteligência.{" "}
            <span className="text-gradient-gold">É falta de treinamento direcionado.</span>
          </p>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Você não precisa apenas consumir mais teoria. Precisa testar seus conhecimentos,
            identificar seus erros e aprender a corrigir suas dificuldades antes da prova.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SOLUTION -------------------- */
function Solution() {
  return (
    <section id="como-funciona" className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">A SOLUÇÃO</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Um treinamento completo para{" "}
            <span className="text-gradient-gold">transformar estudo em desempenho</span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground sm:text-base">
            O <strong className="text-foreground">Combo Treine Até Passar</strong> reúne três recursos complementares: interpretação de questões, treino por assunto e simulados completos.
          </p>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Você aprende a compreender o enunciado, pratica com 2.000 questões e depois mede sua evolução com 80 simulados.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="card-surface p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground">
              ESTUDO PASSIVO
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-foreground">
              Você acha que aprendeu…
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[
                "Assistir a várias aulas.",
                "Copiar fórmulas.",
                "Acreditar que entendeu.",
                "Descobrir as dificuldades somente na prova.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-destructive/20 text-destructive">
                    <X className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-6 ring-gold-soft sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-primary">TREINAMENTO PRÁTICO</p>
            <h3 className="mt-2 font-display text-xl font-bold text-foreground">
              Você comprova o que sabe.
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-foreground/90">
              {[
                "Resolver questões.",
                "Testar o conhecimento.",
                "Identificar os erros.",
                "Revisar de forma direcionada.",
                "Acompanhar a evolução.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- WHAT YOU GET -------------------- */
function WhatYouGet() {
  const checkoutUrl = useCheckoutUrl();
  const items = [
    {
      icon: ClipboardList,
      title: "Curso O Segredo da Interpretação",
      desc: "Cinco aulas para identificar dados, compreender o que a questão pede e escolher uma estratégia de resolução.",
    },
    {
      icon: ListChecks,
      title: "2.000 questões por assunto",
      desc: "Pratique os principais conteúdos de Matemática de forma organizada e direcionada.",
    },
    {
      icon: ClipboardList,
      title: "80 simulados completos",
      desc: "Teste seus conhecimentos, seu tempo e sua preparação antes da prova.",
    },
    {
      icon: ListChecks,
      title: "Gabarito de todos os simulados",
      desc: "Confira seus resultados e identifique rapidamente quais questões precisam ser revisadas.",
    },
    {
      icon: Target,
      title: "Questões voltadas a concursos",
      desc: "Treinamento direcionado aos conteúdos e formatos de concursos de nível médio, policiais, administrativos e municipais.",
    },
    {
      icon: Rocket,
      title: "Acesso imediato",
      desc: "Após a confirmação do pagamento, você acessa o material pela plataforma.",
    },
    {
      icon: BadgeCheck,
      title: "Acesso vitalício",
      desc: "Estude no seu ritmo e revise os simulados sempre que desejar.",
    },
    {
      icon: RefreshCcw,
      title: "Novos materiais e atualizações",
      desc: "Sempre que houver atualização ou inclusão de novos simulados, o acesso continua.",
    },
    {
      icon: Users,
      title: "Grupo exclusivo no WhatsApp",
      desc: "Espaço para orientações, avisos, dicas de estudo e conteúdos sobre Matemática para concursos.",
    },
    {
      icon: BookOpenCheck,
      title: "Aulas e conteúdos complementares",
      desc: "Materiais de apoio sobre assuntos importantes e dificuldades comuns dos concurseiros.",
    },
  ];

  return (
    <section id="o-que-recebe" className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">O QUE VOCÊ RECEBE</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Veja tudo o que você receberá por{" "}
            <span className="text-gradient-gold">apenas R$ 10,00</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-surface p-5 transition-transform hover:-translate-y-1">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={checkoutUrl} className="btn-gold inline-flex rounded-xl px-7 py-4 text-sm">
            QUERO O COMBO 3 EM 1
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------- BENEFITS -------------------- */
function Benefits() {
  const items = [
    "Melhorar a interpretação dos enunciados.",
    "Diminuir o tempo gasto em cada questão.",
    "Reconhecer padrões das bancas.",
    "Identificar os assuntos com mais dificuldade.",
    "Revisar somente aquilo que realmente precisa.",
    "Desenvolver mais segurança.",
    "Criar resistência para resolver uma prova completa.",
    "Aprender com os próprios erros.",
    "Acompanhar a evolução entre um simulado e outro.",
    "Reduzir o medo da Matemática.",
  ];

  return (
    <section id="beneficios" className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">BENEFÍCIOS</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            O que pode mudar quando você começa a{" "}
            <span className="text-gradient-gold">treinar da maneira certa</span>
          </h2>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((t) => (
            <li key={t} className="card-surface flex items-start gap-3 p-4">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                <TrendingUp className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm text-foreground/90">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="font-display text-lg font-semibold sm:text-xl">
            Você não precisa dominar toda a Matemática para começar.{" "}
            <span className="text-gradient-gold">
              Precisa começar a praticar para desenvolver o domínio.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FOR WHO -------------------- */
function ForWho() {
  const para = [
    "Está começando a estudar para concursos.",
    "Já estuda, mas sente dificuldade em Matemática.",
    "Não sabe quais conteúdos precisa revisar.",
    "Quer praticar antes da prova.",
    "Possui pouco tempo disponível.",
    "Prefere aprender resolvendo questões.",
    "Deseja acompanhar sua evolução.",
    "Quer um material acessível e direto ao ponto.",
  ];
  const naoIndicado = [
    "Procura uma promessa de aprovação sem estudar.",
    "Não está disposto a resolver questões.",
    "Acredita que apenas comprar um material será suficiente.",
    "Deseja um curso completo de Matemática com centenas de horas de teoria.",
  ];
  return (
    <section className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card-surface p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary">PARA QUEM É</p>
            <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Este material foi criado para você que…
            </h3>
            <ul className="mt-6 space-y-3">
              {para.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
              NÃO É INDICADO PARA QUEM
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Este material não é para você que…
            </h3>
            <ul className="mt-6 space-y-3">
              {naoIndicado.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-destructive/20 text-destructive">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- HOW TO USE -------------------- */
function HowToUse() {
  const steps = [
    {
      title: "Aprenda a interpretar",
      desc: "Comece pelas aulas de interpretação para compreender melhor os enunciados.",
    },
    {
      title: "Treine por assunto",
      desc: "Use as 2.000 questões para fortalecer cada conteúdo e localizar suas dificuldades.",
    },
    {
      title: "Faça os simulados",
      desc: "Resolva as provas completas, controle o tempo e confira o desempenho no gabarito.",
    },
    {
      title: "Revise seus erros",
      desc: "Volte aos assuntos em que teve dificuldade e refaça as questões até consolidar o aprendizado.",
    },
  ];
  return (
    <section className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">COMO UTILIZAR</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Um método simples para{" "}
            <span className="text-gradient-gold">usar o combo em três etapas</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card-surface relative p-6">
              <div className="font-display text-4xl font-bold text-primary/30">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-sm text-foreground/90 sm:text-base">
            <span className="font-semibold text-primary">Dica:</span> Não utilize o erro apenas para
            medir seu resultado. Utilize o erro para direcionar seu próximo estudo.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- PERCEIVED VALUE -------------------- */
function PerceivedValue() {
  const checkoutUrl = useCheckoutUrl();
  const stages = [
    {
      number: "01",
      title: "Interprete melhor",
      text: "Aprenda a identificar os dados e entender exatamente o que a questão pede.",
    },
    {
      number: "02",
      title: "Pratique por assunto",
      text: "Use as 2.000 questões para atacar os conteúdos em que você mais precisa evoluir.",
    },
    {
      number: "03",
      title: "Teste-se antes da prova",
      text: "Resolva os 80 simulados, confira o gabarito e transforme cada erro em revisão.",
    },
  ];

  return (
    <section className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            UMA COMPRA, TRÊS ETAPAS
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Não é apenas mais material. É uma sequência para{" "}
            <span className="text-gradient-gold">saber o que fazer com ele</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {stages.map((stage) => (
            <div key={stage.number} className="card-surface p-6">
              <span className="font-display text-4xl font-bold text-primary/35">
                {stage.number}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {stage.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="card-surface p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-primary">
              O CUSTO DE ADIAR O TREINO
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
              É melhor descobrir suas dificuldades agora do que no dia da prova.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Cada simulado revela os assuntos que ainda precisam de revisão. Assim, você
              troca a sensação de “acho que sei” por uma visão concreta do seu desempenho.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-foreground/90">
                Você tem 7 dias para acessar e avaliar o material, conforme as regras
                apresentadas no checkout da Hotmart.
              </p>
            </div>
          </div>

          <div className="card-surface p-6 text-center ring-gold-soft sm:p-8">
            <p className="text-sm text-muted-foreground">Separadamente</p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground line-through decoration-destructive">
              R$ 27,92
            </p>
            <p className="mt-5 text-sm text-muted-foreground">No combo completo</p>
            <p className="mt-1 font-display text-5xl font-bold text-gradient-gold">
              R$ 10,00
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">Você economiza R$ 17,92</p>
            <a
              href={checkoutUrl}
              className="btn-gold mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm"
            >
              COMEÇAR MEU TREINAMENTO <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Pagamento único • Acesso imediato • Sem mensalidade
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- SOCIAL PROOF -------------------- */
function SocialProof() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">DEPOIMENTOS</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Resultados começam quando o aluno{" "}
            <span className="text-gradient-gold">deixa de apenas assistir e começa a praticar</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-surface p-6">
              {t.rating ? (
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k} className={k < t.rating! ? "" : "opacity-25"}>
                      ★
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="mt-3 text-sm text-foreground/90">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-primary">
                    {t.name[0]}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.concurso}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- ABOUT TEACHER -------------------- */
function AboutTeacher() {
  return (
    <section className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-[auto_1fr]">
        <div className="mx-auto flex h-40 w-40 shrink-0 items-center justify-center rounded-3xl border border-primary/30 bg-surface md:mx-0">
          <div className="grid h-32 w-32 place-items-center rounded-2xl btn-gold">
            <div className="text-center leading-tight">
              <div className="font-display text-3xl font-bold">MPC</div>
              <div className="text-[10px] tracking-widest">MATEMÁTICA</div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            QUEM PREPAROU ESTE MATERIAL
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Prof. Lucas MPC</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Professor de Matemática para concursos públicos, criador da Academia da Matemática e de
            materiais voltados ao treinamento prático de candidatos. Seu trabalho é ajudar
            concurseiros a compreender questões, desenvolver raciocínio e estudar Matemática de
            maneira mais objetiva.
          </p>
          <p className="mt-4 border-l-2 border-primary pl-4 font-display text-lg italic text-foreground">
            "Aqui você aprende Matemática para passar, não apenas para decorar."
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- GUARANTEE -------------------- */
function Guarantee() {
  return (
    <section className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="card-surface relative overflow-hidden p-8 sm:p-10">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="shrink-0">
              <div className="relative grid h-28 w-28 place-items-center rounded-full border-2 border-primary/60 bg-primary/10">
                <ShieldCheck className="h-12 w-12 text-primary" />
                <div className="absolute -bottom-2 rounded-full btn-gold px-3 py-1 text-[10px] tracking-widest">
                  7 DIAS
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-primary">GARANTIA</p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Você tem 7 dias para conhecer o material
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Após a compra, você poderá acessar o produto e verificar se ele atende às suas
                necessidades. Caso não fique satisfeito, poderá solicitar o reembolso dentro do
                prazo de garantia oferecido pela plataforma, conforme as regras aplicáveis à compra.
              </p>
              <p className="mt-4 font-display text-lg font-semibold text-foreground">
                Seu risco é mínimo.{" "}
                <span className="text-gradient-gold">
                  Seu treinamento começa com interpretação, prática e simulação.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */
const FAQS = [
  {
    q: "O material é físico ou digital?",
    a: "É um combo digital. O acesso aos materiais será liberado pela Hotmart após a confirmação do pagamento.",
  },
  {
    q: "Como receberei o combo?",
    a: "Após a compra, você receberá no e-mail informado as orientações para acessar os três recursos do combo.",
  },
  { q: "O pagamento é mensal?", a: "Não. O valor de R$ 10,00 é pago uma única vez." },
  {
    q: "Por quanto tempo terei acesso?",
    a: "O acesso ao combo é permanente, conforme as condições apresentadas nesta oferta e no checkout.",
  },
  { q: "O material possui gabarito?", a: "Sim. Os simulados acompanham seus respectivos gabaritos." },
  {
    q: "Os simulados servem para qual concurso?",
    a: "O material é voltado principalmente para concursos públicos que cobram Matemática em nível básico ou intermediário, especialmente concursos de nível médio, policiais, administrativos e municipais.",
  },
  {
    q: "Sou muito ruim em Matemática. O material serve para mim?",
    a: "Sim. O material pode ajudar a identificar suas dificuldades. Entretanto, é necessário revisar os assuntos das questões erradas e manter uma rotina de prática.",
  },
  {
    q: "O material garante minha aprovação?",
    a: "Não. Nenhum material pode garantir aprovação. Os simulados são ferramentas de preparação e treinamento. O resultado depende da dedicação, da constância e do desempenho do aluno.",
  },
  {
    q: "Posso acessar pelo celular?",
    a: "Sim. A página e a área de acesso funcionam em celulares, tablets e computadores.",
  },
  {
    q: "Existe garantia?",
    a: "Sim. A compra conta com o prazo de garantia informado na página e no checkout da plataforma.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Perguntas <span className="text-gradient-gold">frequentes</span>
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="card-surface overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-semibold text-foreground sm:text-base">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FINAL CTA -------------------- */
function FinalCTA() {
  const checkoutUrl = useCheckoutUrl();
  const items = [
    "Curso de interpretação",
    "2.000 questões",
    "80 simulados",
    "Gabaritos",
    "Acesso imediato",
    "Acesso vitalício",
    "Grupo exclusivo",
    "Pagamento único",
  ];
  return (
    <section className="border-t border-border/40 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="card-surface relative overflow-hidden p-8 text-center ring-gold-soft sm:p-12">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Award className="h-3.5 w-3.5" /> Última chamada
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
            A próxima questão que você errar durante o treinamento pode ser justamente aquela que{" "}
            <span className="text-gradient-gold">deixará de errar no dia da prova.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Comece agora com o curso de interpretação, as 2.000 questões por assunto e os 80 Simulados de Matemática para Concursos Públicos.
          </p>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2">
            {items.map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-sm text-foreground/90">
                <Check className="h-4 w-4 text-primary" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-xs text-muted-foreground">APENAS</p>
            <p className="font-display text-5xl font-bold text-gradient-gold sm:text-6xl">
              R$ 10,00
            </p>
          </div>

          <a
            href={checkoutUrl}
            className="btn-gold mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base"
          >
            SIM, QUERO O COMBO 3 EM 1 <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            Compra segura • Acesso imediato • Garantia de 7 dias
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 pb-24 pt-14 md:pb-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg btn-gold text-sm">L</span>
            <span className="font-display text-base font-bold">Prof. Lucas MPC</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Combo Treine Até Passar — interpretação, 2.000 questões e 80 simulados de Matemática.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">INFORMAÇÕES</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/termos" className="text-foreground/80 hover:text-primary">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="/privacidade" className="text-foreground/80 hover:text-primary">
                Política de Privacidade
              </a>
            </li>
            <li>
             <a
  href={WHATSAPP_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="text-foreground/80 hover:text-primary"
>
  Fale pelo WhatsApp
</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">AVISOS</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Os resultados dependem do esforço individual de cada aluno. Esta página não possui
            vínculo com bancas organizadoras ou órgãos públicos.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-border/40 px-4 pt-6 text-center text-xs text-muted-foreground">
        © {year} Prof. Lucas MPC. Todos os direitos reservados.
      </div>
    </footer>
  );
}

/* -------------------- STICKY MOBILE BAR -------------------- */
function MobileStickyBar() {
  const checkoutUrl = useCheckoutUrl();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-[#010817]/95 px-3 py-2.5 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <p className="truncate text-[11px] text-muted-foreground">COMBO 3 EM 1</p>
          <p className="text-sm font-bold text-gradient-gold">R$ 10,00</p>
        </div>
        <a
          href={checkoutUrl}
          className="btn-gold ml-auto shrink-0 rounded-lg px-4 py-2.5 text-xs"
        >
          QUERO AGORA
        </a>
      </div>
    </div>
  );
}
