import { useEffect, useState } from "react";
import { useStore, useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export function useDashboard() {
  const store = useStore() as any;
  const dispatch = useDispatch();
  const [injected, setInjected] = useState(false);

  const counterValue = useSelector((state: any) => state.counter?.value ?? 0);
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (store && store.injectReducer) {
      store.injectReducer("counter", counterSlice.reducer);
      setInjected(true);
    }
  }, [store]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: async () => {
      const { apiFetch } = await import("shared_remote/apiHelper");
      const hostApiUrl =
        process.env.NEXT_PUBLIC_HOST_API_URL || "http://localhost:3341";
      return apiFetch<{
        stats: {
          totalAccounts: number;
          activeAccounts: number;
          blockedAccounts: number;
          pendingKyc: number;
        };
        accounts: Array<{
          id: string;
          name: string;
          accountNumber: string;
          type: string;
          status: string;
          balance: number;
        }>;
      }>(`${hostApiUrl}/api/accounts`);
    },
    enabled: typeof window !== "undefined",
  });

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return {
    counterValue,
    auth,
    injected,
    data,
    isLoading,
    error,
    refetch,
    handleIncrement,
    handleDecrement,
  };
}
