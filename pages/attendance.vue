<script lang="ts" setup>
const router = useRouter()
const { user, setUser } = useAuth()

if (!user.value.isAuth) {
  router.push('/signin')
}
const { data: attendances, refresh } = await useAsyncData('attendances', async () => await $fetch('/api/attendances', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${user.value.token}`
  }
}))

console.log(attendances)

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
</script>

<template>
  <div>
    <Container>
      <ListAttendance  :lists="attendances" />
    </Container>
  </div>
</template>

<style scoped></style>
