<script lang="ts" setup>
import { form } from '@formkit/inputs';
import { useDevicesList, useUserMedia } from '@vueuse/core'
const router = useRouter()
const { user, setUser } = useAuth()

if (!user.value.isAuth) {
  router.push('/signin')
} 
const currentCamera = ref<string>()
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  },
})

const uid = Math.random().toString(36).substr(2, 9)
let $socket2: WebSocket
const waitForRes = ref(false)
const isDesconocido = ref(false)
onMounted(() => {
    // Configura los manejadores de eventos aquí
    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    $socket2 = new WebSocket(`${wsProtocol}//localhost:8764`)
    $socket2.onopen = () => {
      localStorage.setItem(`connection-${uid}`, uid)
      $socket2.send(uid)
    }


    $socket2.onmessage = ({ data }: any) => {
      console.log("data", data)
      if (data == "Desconocido") {
        isDesconocido.value = true
      } else {
        const { pending: dataPending, data: res } = useFetch('/api/attendances/output', {
          lazy: true,
          server: false,
          body: {
            ecode: user.value.user?.ecode
          },
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.value.token}`
          }
        })

      }
      // message.value = data
    }

    $socket2.onerror = error => {
      console.log(`Erro1r: ${error}`)
    }


    $socket2.onclose = function () {
      console.log("disconnected")
    }


})

onUnmounted(() => {
   console.log($socket2)
    // Cierra la conexión cuando el componente se desmonta
    if ($socket2 && $socket2.readyState == $socket2.OPEN) {
      $socket2.close()
    }
})
const video = ref<HTMLVideoElement>()
const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } },
})
let mediaRecorder: MediaRecorder;
let recordedBlobs = [];

watchEffect(() => {
  if (video.value) {
    video.value.srcObject = stream.value!
    // Create the MediaRecorder instance here
    mediaRecorder = new MediaRecorder(stream.value!);
    // mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(2000);
  }
})

const handleDataAvailable = (event) => {
  if (event.data && event.data.size > 0) {
    let formData = new FormData();
    formData.append("video", event.data, `segment.webm`);
    // set string localStorage.getItem(`connection-${uid}`)
    formData.append("sender", localStorage.getItem(`connection-${uid}`) || "unknown");

    formData.append("clave", "reconocimiento");

    if (waitForRes.value == false) {
      fetch('/api/socket', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          // console.log(response);
          waitForRes.value = true
        })
        .catch(error => {
          // console.error(error);
          waitForRes.value = false
        });
    }
    
  }
}

onUnmounted(() => {
    enabled.value = false
    mediaRecorder.stop();
})


</script>

<template>
  <div>
    <Container>
      <h1 class="text-center">Registro de sálida</h1>
      <!-- Create alert in tailwindcss -->
      <Alert v-if="isDesconocido">Desconocido</Alert>
      <div class="flex flex-col gap-4 text-center">
        <div>
          <button @click="enabled = !enabled">
            {{ enabled ? 'Stop' : 'Start' }}
          </button>
        </div>
        <div class="max-w-md mx-auto">
            <div v-for="camera of cameras" :key="camera.deviceId" class="px-2 py-1 cursor-pointer"
            :class="{ 'text-primary': currentCamera === camera.deviceId }" @click="currentCamera = camera.deviceId">
            {{ camera.label }}
            </div>
        </div>
        <div class="w-full">
            <div class="flex justify-center">
                <div>
                    <video ref="video" muted autoplay controls class="h-100 w-auto" />
                </div>
            </div>
        </div>
        
      </div>
    </Container>
  </div>
</template>

<style scoped></style>
