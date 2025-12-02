import { createAuth0Client } from "@auth0/auth0-spa-js";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export async function initAuth0() {
  try {
    const auth0Client = await createAuth0Client({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://localhost:3005",
        scope: "openid profile email offline_access",
      },
      cacheLocation: "localstorage",
      useRefreshTokens: true,
    });

    console.log("✅ Auth0 client created");

    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
      await handleRedirectCallback(auth0Client);
    }

    const isAuth = await auth0Client.isAuthenticated();
    console.log("🔐 Is authenticated:", isAuth);

    return auth0Client;
  } catch (err: unknown) {
    console.error("❌ Auth0 initialization error:", getErrorMessage(err));
  }
}

async function handleRedirectCallback(auth0Client: any) {
  try {
    const result = await auth0Client.handleRedirectCallback();
    console.log("📦 Callback result:", result);
    window.history.replaceState({}, document.title, window.location.pathname);
    console.log("🧹 URL cleaned:", window.location.href);
  } catch (err: unknown) {
    console.error("❌ Callback error:", getErrorMessage(err));
  }
}
