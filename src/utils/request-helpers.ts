export type UrlLink = `https://pokeapi.co/api/v2/${string}/${string}`;

export interface PaginatedResponse<T> {
  count: number;
  next: UrlLink | null;
  previous: UrlLink | null;
  results: T[];
}

export async function jsonFetch<T>(url: string, client: any): Promise<T> {
  const accessToken = await client.getTokenSilently();
  const response = await fetch(`http://localhost:3005/api/fetch?url=${url}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const results = await response.json();

  //   if (results.message) {
  //     console.log(`${results.message} - ${url}`);
  //   }

  return results.data;
}

export async function fetchCacheAll<T>(client: any): Promise<T> {
  const accessToken = await client.getTokenSilently();
  const response = await fetch(`http://localhost:3005/api/cache/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const results = await response.json();

  //   if (results.message) {
  //     console.log(`${results.message} `);
  //   }
  return results.data;
}

export async function clearCache<T>(client: any): Promise<T> {
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
