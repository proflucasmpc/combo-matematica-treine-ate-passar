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

  // Impede que o Pixel seja inicializado mais de uma vez.
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

  // Evita diferenças entre o HTML do servidor e o navegador.
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
      <CookieConsentBanner />
    </QueryClientProvider>
  );
}
