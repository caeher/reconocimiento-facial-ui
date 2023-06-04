<script lang="ts" setup>
const { $socket } = useNuxtApp()
const uid = Math.random().toString(36).substr(2, 9)
const message = ref("")
onMounted(() => {
   $socket.onopen = () => {
    console.log("conected")
    localStorage.setItem(`connection-${uid}`, uid)
    // this.send(uid)
  }

  $socket.onmessage = ({ data }: any) => {
    console.log("data", data)
    message.value = data
  }
  $socket.onclose = function () {
    console.log("disconnected")
  }
})
const sendMessage = () => {
    fetch("/api/socket", {
      method: "POST",
      body: JSON.stringify({ message: Math.random(), sender: localStorage.getItem(`connection-${uid}`) }),
      headers: {
        "Access-Control-Allow-Credentials": "false",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(data =>{
        console.log("sent")
    })
}
</script>

<template>
  <div>
    <button @click="sendMessage">Send ping</button>

    <p>Mensaje: {{ message }}</p>
  </div>
</template>

<style scoped></style>
