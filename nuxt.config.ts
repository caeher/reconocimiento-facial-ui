// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: { shim: false },
    runtimeConfig: {
        DB_CLIENT: "mariadb",
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASSWORD: "",
        DB_NAME: "facialapp",
        JWT_SECRET: "secret"
    },
    plugins: [
        '~/plugins/websockets.client.ts',
    ],
    modules: [
        '@nuxtjs/tailwindcss',
        '@formkit/nuxt',
        '@sidebase/nuxt-session'
    ],
    formkit: {
        defaultConfig: true,
        // defaultConfig: false,
        configFile: './formkit.config.js',
    },
    session: {
        // Module is enabled
        isEnabled: true,
        session: {
            // Sessions expire after 1 hour
            expiryInSeconds: 60 * 60,
            // Session ids are 64 characters long
            idLength: 64,
            // All session data is stored in a "sub-storage" that uses the `sessions` prefix
            storePrefix: 'sessions',
            // The session cookie same site policy is `lax`
            cookieSameSite: 'lax',
            // `Secure` attribute of session cookie is set to `true`
            cookieSecure: true,
            // `HttpOnly` attribute of session cookie is set to `true`
            cookieHttpOnly: true,
            // In-memory storage is used (these are `unjs/unstorage` options)
            storageOptions: {
                driver: 'memory',
                options: {}
            },
            // The request-domain is strictly used for the cookie, no sub-domains allowed
            domain: false,
            // Sessions aren't pinned to the user's IP address
            ipPinning: false,
            // Expiration of the sessions are not reset to the original expiryInSeconds on every request
            rolling: false
        },
        api: {
            // The API is enabled
            isEnabled: true,
            // `PATCH, GET, POST, DELETE /api/session` HTTP requests are possible
            methods: ['patch', 'get', 'post', 'delete'],
            // The sessions endpoints are mounted at `/api/session`
            basePath: '/api/session'
        }
    }
})
