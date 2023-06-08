<script lang="ts" setup>
import { IAttendance } from '~/types/attendance';

const props = defineProps({
  lists: {
    type: Array as PropType<IAttendance[]>,
    required: true,
  },
})

</script>

<template>
  <div class="grid grid-cols-1 gap-4 ">
    <div v-for="attend in lists" :key="attend.attendanceid" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div class="min-w-0 flex-1">
        <p>
          Fecha: {{ attend.date }} |
          Hora entrada: {{ attend.timein }} |
          Hora Salida: {{ attend.timeout }} 
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
