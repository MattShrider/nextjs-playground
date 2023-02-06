import type { User } from "@/types/types";

import { useMutation, useQueryClient, UseQueryResult } from "react-query";
import { useSupabaseClient } from "@/lib/supabase";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

export const GET_USER_KEY = "user";

export interface UseUserOptions {
  redirectWhenAuthenticated?: string;
  redirectWhenUnAuthenticated?: string;
}

export const useUser = (
  opts: UseUserOptions = {}
): UseQueryResult<User | null> => {
  const client = useSupabaseClient();
  const router = useRouter();
  return useQuery<User | null>(
    GET_USER_KEY,
    () =>
      client.auth.getSession().then(({ data, error }) => {
        if (error) throw error;

        return data.session?.user ?? null;
      }),
    {
      onSuccess(data) {
        if (opts.redirectWhenAuthenticated && data) {
          router.push(opts.redirectWhenAuthenticated);
        } else if (opts.redirectWhenUnAuthenticated && !data) {
          router.push(opts.redirectWhenUnAuthenticated);
        }
      },
    }
  );
};

export const LOG_OUT_KEY = "logout";
export const useSignOut = (redirectOnSignout = "/") => {
  const client = useSupabaseClient();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(
    LOG_OUT_KEY,
    async () => {
      await axios.get("/api/logout");
      return client.auth.signOut();
    },
    {
      onSuccess() {
        queryClient.cancelQueries();
        queryClient.invalidateQueries();
        router.push(redirectOnSignout);
      },
    }
  );
};
