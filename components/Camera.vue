<script lang="ts" setup>
function startCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        let video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
      });
  } else {
    console.error("User Media not supported in this browser");
  }
}
</script>

<template>
  <div>
    <video autoplay id="video"></video>
    <button @click="startCamera">Start Camera</button>
  </div>
</template>

<style scoped></style>
