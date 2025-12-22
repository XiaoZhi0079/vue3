import { onRequest as __api_auth_js_onRequest } from "C:\\Users\\Administrator\\Desktop\\PasswordManager\\functions\\api\\auth.js"
import { onRequest as __api_passwords_js_onRequest } from "C:\\Users\\Administrator\\Desktop\\PasswordManager\\functions\\api\\passwords.js"

export const routes = [
    {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_auth_js_onRequest],
    },
  {
      routePath: "/api/passwords",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_passwords_js_onRequest],
    },
  ]