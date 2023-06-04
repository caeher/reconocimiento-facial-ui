<script lang="ts" setup>
import { PropType } from 'vue';
import { IVideo } from '~/types/video';
defineProps({
  videos: {
    type: Array as PropType<IVideo[]>,
    required: true
  }
})

</script>

<template>
  <div>
    <div v-for="video in videos" :key="video.videoid" class="p-3 mb-3 rounded-lg border drop-shadow-sm shadow-sm">
      <!-- items para mostrar video en fila -->
      <div class="flex justify-between">
        <div>
          <p>{{ video.url }}</p>
        </div>
        <div>
          <!-- SVG trash -->
          <svg width="20px" height="20px" viewBox="-3 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Group_21" data-name="Group 21" transform="translate(-379 -89)">
                <path id="Path_23" data-name="Path 23"
                  d="M417,95h-9V93a4,4,0,0,0-4-4h-8a4,4,0,0,0-4,4v2h-9a4,4,0,0,0-4,4v4h.988a2.8,2.8,0,0,1,3.02,2.129l3.532,27.015A5.638,5.638,0,0,0,392,137h16a5.637,5.637,0,0,0,5.459-4.843l3.529-27c.014-.087.36-2.122,3.024-2.153H421V99A4,4,0,0,0,417,95Zm-23-2a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v2h-2v-.5a1.5,1.5,0,0,0-1.5-1.5h-5a1.5,1.5,0,0,0-1.5,1.5V95h-2Zm-13,6a2,2,0,0,1,2-2h34a2,2,0,0,1,2,2v2H381Zm34.009,5.871-3.534,27.039A3.637,3.637,0,0,1,408,135H392a3.638,3.638,0,0,1-3.476-3.1l-3.536-27.051a4.442,4.442,0,0,0-.8-1.847h31.621A4.5,4.5,0,0,0,415.009,104.871Z"
                  fill="#303033"></path>
                <g id="Group_20" data-name="Group 20">
                  <rect id="Rectangle_9" data-name="Rectangle 9" width="4" height="18" transform="translate(398 110)"
                    fill="#7d50f9"></rect>
                  <path id="Path_24" data-name="Path 24" d="M406,110h4l-2,18h-2Z" fill="#7d50f9"></path>
                  <path id="Path_25" data-name="Path 25" d="M390,110h4v18h-2Z" fill="#7d50f9"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
