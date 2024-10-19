import { fetchJson, createApi } from "./api-client";

// Mock the global fetch function
global.fetch = jest.fn();

// Mock console.error to prevent error messages cluttering the test output
console.error = jest.fn();

// Mock the process.env
const mockApiUrl = "http://api.example.com";

describe("fetchJson", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data successfully", async () => {
    const mockData = { id: 1, name: "Test" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchJson("/test", { method: "GET" });
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "/test",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });
});

describe("createApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const api = createApi<
    { id: string; name: string },
    { name: string },
    { name: string }
  >(mockApiUrl, "projects");

  describe("fetchAll", () => {
    it("should fetch all items", async () => {
      const mockData = [
        { id: "1", name: "Project 1" },
        { id: "2", name: "Project 2" },
      ];
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await api.fetchAll();
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/projects`,
        expect.objectContaining({
          method: "GET",
        })
      );
    });
  });

  describe("fetchOne", () => {
    it("should fetch a single item", async () => {
      const mockData = { id: "1", name: "Project 1" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await api.fetchOne("1");
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/projects/1`,
        expect.objectContaining({
          method: "GET",
        })
      );
    });
  });

  describe("create", () => {
    it("should create a new item", async () => {
      const newItem = { name: "New Project" };
      const mockResponse = { id: "3", name: "New Project" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.create(newItem);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/projects`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(newItem),
        })
      );
    });
  });

  describe("update", () => {
    it("should update an existing item", async () => {
      const updateData = { id: "1", name: "Updated Project" };
      const mockResponse = { id: "1", name: "Updated Project" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await api.update(updateData);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/projects/1`,
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(updateData),
        })
      );
    });
  });

  describe("error handling", () => {
    it("should handle errors in fetchAll", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(api.fetchAll()).rejects.toThrow("Network error");
      expect(console.error).toHaveBeenCalled();
    });
  });
});
