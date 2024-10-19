import { useQuery } from "@tanstack/react-query";
import * as homeApi from "../api/home-api";

const QUERY_KEY = "home";
type UseTaskProps = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

export function useFetchAll({ onSuccess, onError }: UseTaskProps) {
  const queryFn = async () => {
    try {
      const data = await homeApi.fetchAll();
      onSuccess();
      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError(err);
      throw err;
    }
  };

  const query = useQuery({ queryKey: [QUERY_KEY], queryFn });

  return query;
}
