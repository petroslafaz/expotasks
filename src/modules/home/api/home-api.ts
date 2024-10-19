import { Home } from "../schema/home-schema";
import { fetchJson } from "@/shared/api/api-client";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export async function fetchAll() {
  try {
    return fetchJson<Home[]>(`${apiUrl}/home`, {
      method: "GET",
    });
  } catch (error) {
    console.error("An error occurred while fetching home", error);
    throw error;
  }
}
