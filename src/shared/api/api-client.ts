type EntityType = "projects" | "tasks" | "home";
export async function fetchJson<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  try {
    // console.log(`fetchJson from ${url}`, options);
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }

    return json as T;
  } catch (error) {
    console.error(`An error occurred while fetching from ${url}`, error);
    throw error;
  }
}

export function createApi<T, CreateType = unknown, UpdateType = unknown>(
  apiUrl: string,
  resource: EntityType
) {
  return {
    fetchAll: async () => {
      try {
        return await fetchJson<T[]>(`${apiUrl}/${resource}`, {
          method: "GET",
        });
      } catch (error) {
        console.error(`An error occurred while fetching ${resource}`, error);
        throw error;
      }
    },

    update: async (data: UpdateType & { id: string }) => {
      try {
        return await fetchJson<T>(`${apiUrl}/${resource}/${data.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error(
          `An error occurred while updating ${resource} with ID ${data.id}`,
          error
        );
        throw error;
      }
    },

    create: async (data: CreateType) => {
      try {
        return await fetchJson<T>(`${apiUrl}/${resource}`, {
          method: "POST",
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error(`An error occurred while creating ${resource}`, error);
        throw error;
      }
    },

    fetchOne: async (id: string) => {
      try {
        return await fetchJson<T>(`${apiUrl}/${resource}/${id}`, {
          method: "GET",
        });
      } catch (error) {
        console.error(
          `An error occurred while fetching ${resource} with ID ${id}`,
          error
        );
        throw error;
      }
    },
  };
}
