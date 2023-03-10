import { SERVER_URL } from "./config";
import jwtDecode from "jwt-decode";
import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  makeOperation,
} from "@urql/svelte";
import { authExchange } from "@urql/exchange-auth";

const fetchRefresh = async (): Promise<null | string> => {
  try {
    const response = await fetch(`${SERVER_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) throw new Error(await response.text());
    const result: { ok: boolean; access_token: string } = await response.json();
    if (!result.ok) return null;
    return result.access_token;
  } catch (err) {
    return null;
  }
};

interface IAccessToken {
  sub: number;
  iat: number;
  exp: number;
}

const ACCESS_TOKEN = "access_token";
const EXP = "exp";
export const getAccessToken = () => {
  return typeof localStorage !== "undefined"
    ? localStorage.getItem(ACCESS_TOKEN)
    : null;
};
export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN, token);
export const deleteAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const setRefreshTokenExp = (val: string) =>
  localStorage.setItem(EXP, val);
export const getRefreshTokenExp = () => {
  return typeof localStorage !== "undefined" ? localStorage.getItem(EXP) : null;
};
export const deleteRefreshTokenExp = () => localStorage.removeItem(EXP);

const isTokenExpired = (exp: number): boolean => Date.now() >= exp * 1000;

interface AuthState {
  access_token: string;
  sub: number;
  iat: number;
  exp: number;
}

export const client = createClient({
  url: SERVER_URL + "/query",
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      credentials: "include",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    };
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange<AuthState>({
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState || !authState.access_token) {
          return operation;
        }
        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.access_token}`,
            },
          },
        });
      },
      getAuth: async ({ authState }) => {
        if (!authState) {
          const access_token = getAccessToken();
          console.log("called");
          if (access_token) {
            const { sub, iat, exp } = jwtDecode<IAccessToken>(access_token);
            return { access_token, sub, iat, exp };
          }
          try {
            if (!getRefreshTokenExp()) return null;
            const expiry_date = Number(getRefreshTokenExp());
            if (isTokenExpired(expiry_date)) return null;
            // if refresh token valid then ask for access token
            const token = await fetchRefresh();
            if (!token) return null;
            const { sub, iat, exp } = jwtDecode<IAccessToken>(token);
            setAccessToken(token); // localstorage
            return { access_token: token, sub, iat, exp };
          } catch (err) {
            console.error(err);
            return null;
          }
        }
        deleteAccessToken(); // localstorage
        deleteRefreshTokenExp();
        // logout() // redirect
        return null;
      },
      willAuthError: ({ authState }) => {
        return !authState || isTokenExpired(authState.exp);
      },
      didAuthError: ({ error }) => {
        return error.graphQLErrors.some(
          (e) => e.extensions?.code === "BAD_USER_INPUT"
        );
      },
    }),
    fetchExchange,
  ],
});
