import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const META_PIXEL_ID = "25752058891159282";
const META_PIXEL_SCRIPT_ID = "meta-pixel-script";
const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";
const PROFESSOR_PHOTO_SOURCE_URL =
  "https://raw.githubusercontent.com/proflucasmpc/turma-coletiva-academia-matematica/main/index.html";

type CookieConsent = "accepted" | "rejected" | null;

type MetaPixelFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

type MetaPixelWindow = Window & {
  fbq?: MetaPixelFunction;
  _fbq?: MetaPixelFunction;
};

function readStoredCookieConsent(): CookieConsent {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedConsent = window.localStorage.getItem(
      COOKIE_CONSENT_STORAGE_KEY,
    );

    if (storedConsent === "accepted" || storedConsent === "rejected") {
      return storedConsent;
    }
  } catch (error) {
    console.error("Não foi possível ler a preferência de cookies.", error);
  }

  return null;
}

function saveCookieConsent(consent: Exclude<CookieConsent, null>) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, consent);
  } catch (error) {
    console.error("Não foi possível salvar a preferência de cookies.", error);
  }
}

function loadMetaPixel() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const metaWindow = window as MetaPixelWindow;

  if (metaWindow.fbq) {
    return;
  }

  let fbq: MetaPixelFunction;

  fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
      return;
    }

    fbq.queue.push(args);
  }) as MetaPixelFunction;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = (...args: unknown[]) => fbq(...args);

  metaWindow.fbq = fbq;
  metaWindow._fbq = fbq;

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement("script");

    script.id = META_PIXEL_SCRIPT_ID;
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    const firstScript = document.getElementsByTagName("script")[0];

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

function ProfessorPhotoEnhancement() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      window.location.pathname !== "/"
    ) {
      return;
    }

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const aboutSection = Array.from(document.querySelectorAll("section")).find(
      (section) =>
        section.textContent?.includes("QUEM PREPAROU ESTE MATERIAL") &&
        section.textContent?.includes("Prof. Lucas MPC"),
    );

    if (!aboutSection) {
      return;
    }

    async function loadProfessorPhoto() {
      try {
        const response = await fetch(PROFESSOR_PHOTO_SOURCE_URL, {
          cache: "force-cache",
        });

        if (!response.ok || cancelled) {
          return;
        }

        const html = await response.text();
        const match = html.match(
          /<div class="teacher-photo">[\s\S]*?<img src="(data:image\/webp;base64,[^"]+)"/,
        );

        if (!match?.[1] || cancelled) {
          return;
        }

        const grid = aboutSection.querySelector(".grid");
        const photoFrame = grid?.firstElementChild as HTMLElement | null;
        const photoInner = photoFrame?.firstElementChild as HTMLElement | null;

        if (!photoFrame || !photoInner) {
          return;
        }

        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        photoFrame.style.width = isMobile ? "190px" : "240px";
        photoFrame.style.height = isMobile ? "238px" : "300px";
        photoFrame.style.padding = "6px";
        photoFrame.style.overflow = "hidden";
        photoFrame.style.borderRadius = "26px";
        photoFrame.style.background = "#061426";
        photoFrame.style.boxShadow = "0 18px 50px rgba(0, 0, 0, 0.28)";

        photoInner.style.width = "100%";
        photoInner.style.height = "100%";
        photoInner.style.borderRadius = "20px";
        photoInner.style.backgroundImage = `url("${match[1]}")`;
        photoInner.style.backgroundSize = "cover";
        photoInner.style.backgroundPosition = "center top";
        photoInner.style.backgroundRepeat = "no-repeat";
        photoInner.replaceChildren();
        photoInner.setAttribute("role", "img");
        photoInner.setAttribute("aria-label", "Prof. Lucas MPC");
      } catch (error) {
        console.error("Não foi possível carregar a foto do Prof. Lucas.", error);
      }
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            void loadProfessorPhoto();
          }
        },
        { rootMargin: "700px 0px" },
      );

      observer.observe(aboutSection);
    } else {
      void loadProfessorPhoto();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  return null;
}

function VideoPlayOverlayEnhancement() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      window.location.pathname !== "/"
    ) {
      return;
    }

    let currentVideo: HTMLVideoElement | null = null;
    let currentWrapper: HTMLElement | null = null;

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Reproduzir vídeo");
    button.setAttribute("data-vsl-central-play", "true");
    button.style.position = "absolute";
    button.style.left = "50%";
    button.style.top = "50%";
    button.style.transform = "translate(-50%, -50%)";
    button.style.width = "92px";
    button.style.height = "92px";
    button.style.borderRadius = "9999px";
    button.style.border = "3px solid rgba(255,255,255,0.55)";
    button.style.background = "#f6c423";
    button.style.color = "#020817";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.cursor = "pointer";
    button.style.zIndex = "999";
    button.style.boxShadow = "0 16px 45px rgba(0,0,0,0.5)";
    button.style.transition =
      "transform 160ms ease, filter 160ms ease, opacity 160ms ease";
    button.innerHTML =
      '<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

    const showButton = () => {
      button.style.display = "flex";
    };

    const hideButton = () => {
      button.style.display = "none";
    };

    const handleClick = () => {
      if (currentVideo) {
        void currentVideo.play();
      }
    };

    const handleEnter = () => {
      button.style.transform = "translate(-50%, -50%) scale(1.08)";
      button.style.filter = "brightness(1.08)";
    };

    const handleLeave = () => {
      button.style.transform = "translate(-50%, -50%) scale(1)";
      button.style.filter = "none";
    };

    button.addEventListener("click", handleClick);
    button.addEventListener("mouseenter", handleEnter);
    button.addEventListener("mouseleave", handleLeave);

    const detachFromVideo = () => {
      if (!currentVideo) {
        return;
      }

      currentVideo.removeEventListener("play", hideButton);
      currentVideo.removeEventListener("pause", showButton);
      currentVideo.removeEventListener("ended", showButton);
      currentVideo = null;
      currentWrapper = null;
    };

    const ensureOverlay = () => {
      const video = Array.from(document.querySelectorAll("video")).find((item) => {
        const source = item.querySelector("source");
        return (
          item.getAttribute("poster")?.includes("capa-vsl-combo") ||
          source?.getAttribute("src")?.includes("combo-treine-ate-passar")
        );
      }) as HTMLVideoElement | undefined;

      if (!video) {
        return;
      }

      const wrapper = video.parentElement as HTMLElement | null;

      if (!wrapper) {
        return;
      }

      if (currentVideo !== video) {
        detachFromVideo();
        currentVideo = video;
        currentWrapper = wrapper;
        currentVideo.addEventListener("play", hideButton);
        currentVideo.addEventListener("pause", showButton);
        currentVideo.addEventListener("ended", showButton);
      }

      currentWrapper.style.position = "relative";

      if (!button.isConnected || button.parentElement !== currentWrapper) {
        currentWrapper.appendChild(button);
      }

      if (currentVideo.paused || currentVideo.ended) {
        showButton();
      } else {
        hideButton();
      }
    };

    ensureOverlay();

    const intervalId = window.setInterval(ensureOverlay, 400);
    const mutationObserver = new MutationObserver(ensureOverlay);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.clearInterval(intervalId);
      mutationObserver.disconnect();
      detachFromVideo();
      button.removeEventListener("click", handleClick);
      button.removeEventListener("mouseenter", handleEnter);
      button.removeEventListener("mouseleave", handleLeave);
      button.remove();
    };
  }, []);

  return null;
}

function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredCookieConsent();

    setConsent(storedConsent);
    setHasCheckedConsent(true);

    if (storedConsent === "accepted") {
      loadMetaPixel();
    }
  }, []);

  function acceptCookies() {
    saveCookieConsent("accepted");
    setConsent("accepted");
    loadMetaPixel();
  }

  function rejectCookies() {
    saveCookieConsent("rejected");
    setConsent("rejected");
  }

  if (!hasCheckedConsent || consent !== null) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-white/10 bg-[#010817]/95 px-4 py-5 shadow-2xl backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2
            id="cookie-consent-title"
            className="text-base font-semibold text-white"
          >
            Sua privacidade é importante
          </h2>

          <p
            id="cookie-consent-description"
            className="mt-1 text-sm leading-relaxed text-white/75"
          >
            Utilizamos cookies e tecnologias da Meta para medir visitas e
            melhorar nossos anúncios. O Pixel da Meta somente será ativado se
            você clicar em “Aceitar”. Você pode recusar e continuar utilizando
            o site normalmente.{" "}
            <Link
              to="/privacidade"
              className="font-medium text-yellow-400 underline underline-offset-2 hover:text-yellow-300"
            >
              Consulte a Política de Privacidade
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={rejectCookies}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/25 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Recusar
          </button>

          <button
            type="button"
            onClick={acceptCookies}
            className="btn-gold inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Página não encontrada
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn-gold inline-flex items-center justify-center rounded-md px-4 py-2 text-sm"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-app px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Você pode tentar novamente ou voltar ao início.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gold inline-flex items-center justify-center rounded-md px-4 py-2 text-sm"
          >
            Tentar novamente
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route =
  createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title:
            "Combo Treine Até Passar 3 em 1 | Prof. Lucas MPC",
        },
        {
          name: "description",
          content:
            "Aprenda a interpretar, pratique com 2.000 questões e teste-se em 80 simulados de Matemática para concursos. Combo digital por apenas R$ 10,00.",
        },
        { name: "author", content: "Prof. Lucas MPC" },
        {
          property: "og:title",
          content:
            "Combo Treine Até Passar 3 em 1 | Prof. Lucas MPC",
        },
        {
          property: "og:description",
          content:
            "Aprenda a interpretar, pratique com 2.000 questões e teste-se em 80 simulados de Matemática para concursos. Combo digital por apenas R$ 10,00.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "Combo Treine Até Passar 3 em 1 | Prof. Lucas MPC",
        },
        {
          name: "twitter:description",
          content:
            "Aprenda a interpretar, pratique com 2.000 questões e teste-se em 80 simulados de Matemática para concursos. Combo digital por apenas R$ 10,00.",
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  });

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ProfessorPhotoEnhancement />
      <VideoPlayOverlayEnhancement />
      <CookieConsentBanner />
    </QueryClientProvider>
  );
}