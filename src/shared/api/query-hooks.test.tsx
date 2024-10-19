import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor, act } from "@testing-library/react-native";
import { createEntityHooks } from "./query-hooks";

// Mock API
const mockApi = {
  fetchAll: jest.fn(),
  fetchOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

type TestEntity = { id: string; name: string };
type CreateTestEntity = Omit<TestEntity, "id">;
type UpdateTestEntity = Partial<CreateTestEntity>;

// Set up new QueryClient and wrapper per test
// to ensure isolated and predictable behavior in tests
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Create hooks for testing
const {
  useCreateEntity,
  useUpdateEntity,
  useFetchAllEntities,
  useFetchOneEntity,
} = createEntityHooks<TestEntity, CreateTestEntity, UpdateTestEntity>(
  "testEntity",
  mockApi
);

describe("Entity Hooks", () => {
  let wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;

  beforeEach(() => {
    wrapper = createWrapper();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("useCreateEntity", () => {
    it("should create an entity and invalidate the query", async () => {
      const newEntity: CreateTestEntity = { name: "New Entity" };
      mockApi.create.mockResolvedValueOnce({ id: "1", ...newEntity });

      const onSuccess = jest.fn();
      const onError = jest.fn();

      const { result } = renderHook(
        () => useCreateEntity({ onSuccess, onError }),
        { wrapper }
      );

      await act(async () => {
        await result.current.mutateAsync(newEntity);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockApi.create).toHaveBeenCalledWith(newEntity);
      expect(result.current.data).toMatchObject(newEntity);
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it("should call onError when creation fails", async () => {
      const newEntity: CreateTestEntity = { name: "New Entity" };
      const error = new Error("Creation failed");
      mockApi.create.mockRejectedValueOnce(error);

      const onSuccess = jest.fn();
      const onError = jest.fn();

      const { result } = renderHook(
        () => useCreateEntity({ onSuccess, onError }),
        { wrapper }
      );

      await act(async () => {
        await result.current.mutateAsync(newEntity).catch(() => {});
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(mockApi.create).toHaveBeenCalledWith(newEntity);
      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  describe("useUpdateEntity", () => {
    it("should update an entity and invalidate the query", async () => {
      const updateEntity: UpdateTestEntity & { id: string } = {
        id: "1",
        name: "Updated Entity",
      };
      mockApi.update.mockResolvedValueOnce(updateEntity);

      const onSuccess = jest.fn();
      const onError = jest.fn();

      const { result } = renderHook(
        () => useUpdateEntity({ onSuccess, onError }),
        { wrapper }
      );

      await act(async () => {
        await result.current.mutateAsync(updateEntity);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockApi.update).toHaveBeenCalledWith(updateEntity);
      expect(result.current.data).toMatchObject(updateEntity);
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it("should call onError when update fails", async () => {
      const updateEntity: UpdateTestEntity & { id: string } = {
        id: "1",
        name: "Updated Entity",
      };
      const error = new Error("Update failed");
      mockApi.update.mockRejectedValueOnce(error);

      const onSuccess = jest.fn();
      const onError = jest.fn();

      const { result } = renderHook(
        () => useUpdateEntity({ onSuccess, onError }),
        { wrapper }
      );

      await act(async () => {
        await result.current.mutateAsync(updateEntity).catch(() => {});
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(mockApi.update).toHaveBeenCalledWith(updateEntity);
      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  describe("useFetchEntities", () => {
    it("should fetch entities successfully", async () => {
      const entities: TestEntity[] = [
        { id: "1", name: "Entity 1" },
        { id: "2", name: "Entity 2" },
      ];
      mockApi.fetchAll.mockResolvedValueOnce(entities);

      const onSuccess = jest.fn();
      const onError = jest.fn();

      const { result } = renderHook(
        () => useFetchAllEntities({ onSuccess, onError }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockApi.fetchAll).toHaveBeenCalled();
      expect(result.current.data).toEqual(entities);
      expect(onSuccess).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });

    it("should handle fetch error", async () => {
      const error = new Error("Fetch failed");
      mockApi.fetchAll.mockRejectedValueOnce(error);

      const onSuccess = jest.fn();
      const onError = jest.fn();

      const { result } = renderHook(
        () => useFetchAllEntities({ onSuccess, onError }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(mockApi.fetchAll).toHaveBeenCalled();
      expect(result.current.error).toEqual(error);
      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  describe("useFetchEntity", () => {
    it("should fetch a single entity successfully", async () => {
      const entity: TestEntity = { id: "1", name: "Entity 1" };
      mockApi.fetchOne.mockResolvedValueOnce(entity);

      const { result } = renderHook(() => useFetchOneEntity("1"), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockApi.fetchOne).toHaveBeenCalledWith("1");
      expect(result.current.data).toEqual(entity);
    });

    it("should handle fetch error for a single entity", async () => {
      const error = new Error("Fetch failed");
      mockApi.fetchOne.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useFetchOneEntity("1"), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(mockApi.fetchOne).toHaveBeenCalledWith("1");
      expect(result.current.error).toEqual(error);
    });
  });
});
