import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

type UseEntityProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

type EntityApi<T, CreateType, UpdateType> = {
  fetchAll: () => Promise<T[]>;
  fetchOne: (id: string) => Promise<T>;
  create: (data: CreateType) => Promise<T>;
  update: (data: UpdateType & { id: string }) => Promise<T>;
};

export function createEntityHooks<T, CreateType, UpdateType>(
  entityName: string,
  api: EntityApi<T, CreateType, UpdateType>
) {
  const QUERY_KEY = entityName;

  function useCreateEntity({
    onSuccess,
    onError,
  }: UseEntityProps = {}): UseMutationResult<T, Error, CreateType> {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        onSuccess?.();
      },
      onError: (error: Error) => {
        onError?.(error);
      },
    });
  }

  function useUpdateEntity({
    onSuccess,
    onError,
  }: UseEntityProps = {}): UseMutationResult<
    T,
    Error,
    UpdateType & { id: string }
  > {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: api.update,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        onSuccess?.();
      },
      onError: (error: Error) => {
        onError?.(error);
      },
    });
  }

  function useFetchAllEntities({
    onSuccess,
    onError,
  }: UseEntityProps = {}): UseQueryResult<T[], Error> {
    const queryFn = async () => {
      try {
        const data = await api.fetchAll();
        onSuccess?.();
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        onError?.(err);
        throw err;
      }
    };
    return useQuery({ queryKey: [QUERY_KEY], queryFn });
  }

  function useFetchOneEntity(
    id: string,
    options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
  ): UseQueryResult<T, Error> {
    return useQuery<T, Error>({
      queryKey: [entityName, id],
      queryFn: () => api.fetchOne(id),
      ...options,
    });
  }

  return {
    useCreateEntity,
    useUpdateEntity,
    useFetchAllEntities,
    useFetchOneEntity,
  };
}
