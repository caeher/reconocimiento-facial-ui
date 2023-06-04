<script lang="ts" setup>
import { AsyncData } from "#app";
import { RegisterFormSchema } from "../formkit/users"
import {RequestCreateUser} from "../types/user"
import { IUser } from "../types/user";

const openToast = ref(false)
const messageToast = ref('')

const router = useRouter()

async function onSubmit(forms: RequestCreateUser) {
  if(forms.password !== forms.password_confirm) {
    messageToast.value = 'Las contraseñas no coinciden'
    openToast.value = true
    return
  }
  
  const { data: userData, error: userError} = <AsyncData<IUser[], Error>>await useAsyncData('createUser', () => $fetch('/api/users', {
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
    router.push('/signin')

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
    <div class="md:h-screen flex items-center">
      <div class="w-full max-w-md mx-auto p-3 rounded-md md:shadow-md md:drop-shadow-md">
        <h1 class="text-center font-bold text-2xl">Registrarse</h1>
        <br />
        <FormKit type="form" @submit="onSubmit">
          <FormKitSchema :schema="RegisterFormSchema" />
        </FormKit>
        <p class="pb-3 pt-6">
          Ya tienes cuenta, ingresa aqui
          <NuxtLink href="/signin" class="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500">
            Signin</NuxtLink>
        </p>
      </div>
    </div>
    <Toast :open="openToast" :message="messageToast" @dismissed="onCloseToast" />

  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
}
</style>
