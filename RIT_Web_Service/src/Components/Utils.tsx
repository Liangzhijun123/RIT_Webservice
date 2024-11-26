const proxyServer = "https://people.rit.edu/~dsbics/proxy/";
const apiUrl = "https://ischool.gccis.rit.edu/api/";

export async function getData<T>(endpoint: string): Promise<T | undefined> {
  try {
    const response = await fetch(proxyServer + apiUrl + endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}