<script lang="ts" setup>
import { form } from '@formkit/inputs';
import { useDevicesList, useUserMedia } from '@vueuse/core'

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

    fetch('/api/socket', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        // console.log(response);
      })
      .catch(error => {
        // console.error(error);
      });
  }
}


// const { $socket } = useNuxtApp()
// onMounted(() => {
//   $socket.onopen = () => {
//     console.log("conected")
//     // Captura el video y envía los fotogramas al servidor
//     captureVideoFrames(video).then(frames => {
//       console.log(frames)
//       frames.forEach(frame => {
//         $socket.send(frame);
//       });
//     });
//     $socket.send("Hello from client")
//   }

//   $socket.onmessage = ({ data }: any) => {
//     console.log("data", data)
//     // message.value = data
//   }
//   $socket.onclose = function () {
//     console.log("disconnected")
//   }
//   $socket.onerror = (error) => {
//     console.log('WebSocket Error: ', error);
//   };

// })

// async function captureVideoFrames(video) {
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   const frames = [];

//   for (let i = 0; i < video.duration; i++) {
//     video.currentTime = i;
//     await new Promise(r => setTimeout(r, 1000));  // Espera 1 segundo
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);
//     frames.push(canvas.toDataURL('image/jpeg', 0.8));  // Codifica el fotograma como una imagen JPEG y lo agrega a la lista de fotogramas
//   }

//   return frames;
// }

</script>

<template>
  <div>
    <div class="flex flex-col gap-4 text-center">
        <div>
          <button @click="enabled = !enabled">
            {{ enabled ? 'Stop' : 'Start' }}
          </button>
        </div>

        <div>
          <div v-for="camera of cameras" :key="camera.deviceId" class="px-2 py-1 cursor-pointer"
            :class="{ 'text-primary': currentCamera === camera.deviceId }" @click="currentCamera = camera.deviceId">
            {{ camera.label }}
          </div>
        </div>
        <div>
          <video ref="video" muted autoplay controls class="h-100 w-auto" />
        </div>
      </div>
  </div>
</template>

<style scoped></style>
