export type UrlLink = `https://pokeapi.co/api/v2/${string}/${string}`;
import type { Auth0Client } from "@auth0/auth0-spa-js";

export interface PaginatedResponse<T> {
  count: number;
  next: UrlLink | null;
  previous: UrlLink | null;
  results: T[];
}

export async function jsonFetch<T>(url: string, client: Auth0Client): Promise<T> {
  const accessToken = await client.getTokenSilently({
    authorizationParams: {
      audience: "https://localhost:3005",
    },
  });
  const response = await fetch(`http://localhost:3005/api/fetch?url=${url}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const results = await response.json();
  return results.data;
}

export async function fetchCacheAll<T>(client: Auth0Client): Promise<T> {
  console.log(client);
  const accessToken = await client.getTokenSilently({
    authorizationParams: {
      audience: "https://localhost:3005",
      scope: "openid profile email",
    },
  });
  const response = await fetch(`http://localhost:3005/api/cache/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const results = await response.json();
  return results.data;
}

export async function clearCache<T>(client: Auth0Client): Promise<T> {
  const accessToken = await client.getTokenSilently();
  const response = await fetch(`http://localhost:3005/api/cache/clear`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const results = await response.json();

  if (results.message) {
    console.log(`${results.message}`);
  }
  return results.data;
}

export const BASE_URL = "https://pokeapi.co/api/v2";
