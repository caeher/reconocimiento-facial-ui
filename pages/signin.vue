<script lang="ts" setup>
import { AsyncData } from "#app";
import { LoginFormSchema } from "../formkit/users"
import { RequestSignIn, loginUserInfo } from "../types/user"
import { IUser } from "../types/user";
const router = useRouter()

const {user, setUser} = useAuth()
 if (user.value.isAuth) {
  router.push('/profile')
}

const openToast = ref(false)
const messageToast = ref('')

async function onSubmit(forms: RequestSignIn) {

  const { data: userData, error: userError} = <AsyncData<{ user: loginUserInfo, token: string}, Error>>await useAsyncData('createUser', () => $fetch('/api/auth/signin', {
    method: 'POST',
    body: forms,
  }))

  if (userError.value) {
    console.log(userError)
    messageToast.value = userError.value?.data.message
    openToast.value = true
    return
  }

  if (userData) {
    messageToast.value = "Usuario creado con exito"
    openToast.value = true
    setUser(userData.value.user, userData.value.token)
    setTimeout(() => {
      router.push('/profile')
    }, 2000)
    return
  }

}

function onCloseToast() {
  openToast.value = false
}

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="h-full">
    <div class="md:h-screen mt-12 md:mt-0 flex items-center">
      <div class="w-full max-w-md mx-auto p-3 rounded-md md:shadow-md md:drop-shadow-md">
        <h1 class="text-center font-bold text-2xl">Iniciar sesión</h1>
        <br />
        <FormKit type="form" @submit="onSubmit">
          <FormKitSchema :schema="LoginFormSchema" />
        </FormKit>
          <p class="pb-3 pt-6">
          No tienes cuenta, registrate aqui 
          <NuxtLink href="/signup" class="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500">Signup</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
html,body {
  height: 100%;
}
</style>
