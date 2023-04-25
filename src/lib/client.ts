import { SERVER_URL } from "./config";
import jwtDecode from "jwt-decode";
import {
  createClient,
  cacheExchange,
  fetchExchange,
  makeOperation,
} from "@urql/svelte";
import { authExchange } from "@urql/exchange-auth";
import { setUserState } from "./store";
import { redirect } from "@sveltejs/kit";
import type { ClientOptions } from "@urql/svelte"

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

export interface IAccessToken {
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
export const deleteAccessToken = () => typeof localStorage !== "undefined" && localStorage.removeItem(ACCESS_TOKEN);

export const setRefreshTokenExp = (val: string) =>
  localStorage.setItem(EXP, val);
export const getRefreshTokenExp = () => {
  return typeof localStorage !== "undefined" ? localStorage.getItem(EXP) : null;
};
export const deleteRefreshTokenExp = () => typeof localStorage !== "undefined" && localStorage.removeItem(EXP);

const isTokenExpired = (exp: number): boolean => Date.now() >= exp * 1000;

export const logout = () => {
  setUserState(null);
  redirect(300, "/login")
}

export interface AuthState {
  access_token: string;
  sub: number;
  iat: number;
  exp: number;
}

// export const clientOpts = {
//   url: SERVER_URL + "/query",
//   fetch: fetch,
//   fetchOptions: () => {
//     const token = getAccessToken();
//     return {
//       credentials: "include",
//       headers: { Authorization: token ? `Bearer ${token}` : "" },
//     };
//   },
//   exchanges: [
//     dedupExchange,
//     cacheExchange,
//     authExchange<AuthState>({
//       addAuthToOperation: ({ authState, operation }) => {
//         if (!authState || !authState.access_token) {
//           return operation;
//         }
//         const fetchOptions =
//           typeof operation.context.fetchOptions === "function"
//             ? operation.context.fetchOptions()
//             : operation.context.fetchOptions || {};

//         return makeOperation(operation.kind, operation, {
//           ...operation.context,
//           fetchOptions: {
//             ...fetchOptions,
//             headers: {
//               ...fetchOptions.headers,
//               Authorization: `Bearer ${authState.access_token}`,
//             },
//           },
//         });
//       },
//       getAuth: async ({ authState }) => {
//         if (!authState) {
//           const access_token = getAccessToken();
//           // console.log("called");
//           if (access_token) {
//             const { sub, iat, exp } = jwtDecode<IAccessToken>(access_token);
//             return { access_token, sub, iat, exp };
//           }
//           try {
//             if (!getRefreshTokenExp()) return null;
//             const expiry_date = Number(getRefreshTokenExp());
//             if (isTokenExpired(expiry_date)) return null;
//             // if refresh token valid then ask for access token
//             const token = await fetchRefresh();
//             if (!token) return null;
//             const { sub, iat, exp } = jwtDecode<IAccessToken>(token);
//             setAccessToken(token); // localstorage
//             return { access_token: token, sub, iat, exp };
//           } catch (err) {
//             console.error(err);
//             return null;
//           }
//         }
//         deleteAccessToken(); // localstorage
//         deleteRefreshTokenExp();
//         // logout() // redirect
//         return null;
//       },
//       willAuthError: ({ authState }) => {
//         return !authState || isTokenExpired(authState.exp);
//       },
//       didAuthError: ({ error }) => {
//         return error.graphQLErrors.some(
//           (e) => e.extensions?.code === "BAD_USER_INPUT"
//         );
//       },
//     }),
//     fetchExchange,
//   ],
// }

async function initializeAuthState() {
  const access_token = getAccessToken();
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


export const clientOpts: ClientOptions = {
  url: SERVER_URL + "/query",
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      credentials: "include",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    };
  },

  exchanges: [
    cacheExchange,
    authExchange(async utils => {
      const data = await initializeAuthState()
      return {
        addAuthToOperation: (operation) => {
          if (data == null) {
            return makeOperation(operation.kind, operation, {
              ...operation.context,
              authState: null,
            });
          }
          const newOperation = makeOperation(operation.kind, operation, {
            ...operation.context,
            authState: data,
          });
          return utils.appendHeaders(newOperation, {
            Authorization: `Bearer ${data.access_token}`,
          });
        },

        willAuthError: (operation) => {
          return !operation.context.authState || isTokenExpired(operation.context.authState.exp);
        },
        didAuthError: (error, _operation) => {
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === "BAD_USER_INPUT"
          );
        },
        async refreshAuth() {
          const attemptRefreshToken = async () => {
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
          const data = await attemptRefreshToken()
          if (data) return; // if acces token found 
          deleteAccessToken(); // localstorage
          deleteRefreshTokenExp();
          logout() // redirect
        },
      };
    }),
    fetchExchange,
  ],
};


export const createClientWithFetch = (f: any) => {
  let c = createClient({
    url: SERVER_URL + "/query",
    fetch: f,
    exchanges: [fetchExchange]
  })
  return c
}

export const client = createClient(clientOpts)