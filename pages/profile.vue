<script lang="ts" setup>

const router = useRouter()
const {user, setUser} = useAuth()

if(!user.value.isAuth) {
  router.push('/signin')
}

const {data, error} = await useAsyncData('profile', async () => $fetch('/api/users/profile', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${user.value.token}`
  }
}))

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
</script>

<template>
  <div>
    <Container>
      <template v-if="data">
        <UserInfo :user-info="data"/>
      </template>
      <template v-else>
        <div class="flex justify-center items-center h-screen">
          <!-- <Loader /> -->
        </div>
      </template>
    </Container>
  </div>
</template>

<style scoped></style>
