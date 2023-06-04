import { loginUserInfo } from "~/types/user"

export default defineNuxtRouteMiddleware(async (to, from) => {
    

    if (!process.server) {
        const { user, setUser } = useAuth()
        const token = localStorage.getItem('token')

        if (!token) {
            const { data, error } = await useAsyncData('isAuth', async () => await $fetch('/api/auth', {
                method: "POST"
            }))
            if (data.value.token) {
                localStorage.setItem('token', data.value.token)
                setUser(data.value.decoded.user, data.value.token)
            } else {
                navigateTo('/signin')
            }
        } else {

            const { data, error } = await useAsyncData('isAuth', async () => await $fetch('/api/auth/refresh', {
                method: "POST",
                body: { token }
            }))

            if (error.value) {
                localStorage.removeItem('token')
                navigateTo('/signin')
            } else {
                if (data.value.user) {
                    setUser(data.value.user, token)
                } else {
                    localStorage.removeItem('token')
                    navigateTo('/signin')
                }
            }
            
        }
        

    }

    // if (!user.value.isAuth) {
    //     return navigateTo('/signin')
    // }
    // navigateTo('/')

})
