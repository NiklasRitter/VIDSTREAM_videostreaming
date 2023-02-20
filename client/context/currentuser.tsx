import { Loader } from "@mantine/core";
import { createContext, ReactNode, useContext } from "react";
import { useQuery, RefetchOptions, RefetchQueryFilters } from "react-query";
import { getCurrentUser } from "../api";
import { CurrentUser, QueryKeys } from "../types";

const CurrentUserContext = createContext<{
  user: CurrentUser;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

/** Fetches the user */
function CurrentUserContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(
    QueryKeys.currentUser,
    getCurrentUser
  );

  return (
    <CurrentUserContext.Provider value={{ user: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </CurrentUserContext.Provider>
  );
}

const useCurrenUser = () => useContext(CurrentUserContext);

export { CurrentUserContextProvider, useCurrenUser };
