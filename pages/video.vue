<script lang="ts" setup>
import { Console } from 'console';
import { useDropZone } from '@vueuse/core'
import { IVideo } from '~/types/video';
import { PlusIcon } from '@heroicons/vue/20/solid'
const router = useRouter()
const { user, setUser } = useAuth()

if (!user.value.isAuth) {
  router.push('/signin')
}
// import {FormKit} from '@formkit/nuxt'

const dropZoneRef = ref<HTMLDivElement>()

const filesData = ref<File[]>([])
async function onDrop(files: File[] | null) {
  filesData.value = []
  filesData.value = files!
}
const { data: files, refresh } = await useAsyncData('videos', async () => await $fetch('/api/videos', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${user.value.token}`
  }
}))
console.log(files)
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

const handleUploadFiles = async (): Promise<void> => {
  files.value = []
  const body = new FormData();
  for (let i = 0; i < filesData.value!.length; i++) {
    body.append('file', filesData.value![i])
  }
  console.log(body)
  await useFetch('/api/videos', {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${user.value.token}`
    }
  })
  await refresh()
  // filesData.value = []
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files) {
    filesData.value = []
    for (let i = 0; i < files.length; i++) {
      filesData.value.push(files[i])
    }
  }
}

async function deleteVideo (videoid:number) {
  const { data: dataDelete, error: errorDelete} = await useAsyncData('videos', async () => await $fetch('/api/videos', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.value.token}`
    }
  }))

  console.log(dataDelete, errorDelete)
}

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
</script>

<template>
  <Container>
    <div class="flex justify-center bg-slate-100 p-6">

      <div ref="dropZoneRef" class="flex items-center justify-center w-full">

        <div class="max-w-lg w-full rounded p-4 bg-white shadow-slate-300 outline-1 outline-slate-200 outline"
          :class="{ 'outline-1 outline-slate-400': isOverDropZone }">
          <label for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span>
                or
                drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" @change="onFileChange" />
          </label>
          <div v-if="filesData.length === 0" class="text-center text-slate-300 grid justify-center"
            :class="{ 'text-slate-400': isOverDropZone }">
            <div>Drop Items Here</div>
          </div>
          <div v-else>
            <UploadedVideos :files-data="filesData" />
            <button @click="handleUploadFiles"
              class="bg-blue-700 text-white text-sm uppercase px-4 py-2 rounded-full mt-4 w-full font-bold">Upload
              Files</button>

          </div>
        </div>
      </div>


    </div>


    <div class="mt-12">
      <template v-if="files">
        <ListOfVideos :videos="files" />
      </template>
    </div>
  </Container>
</template>

<style scoped></style>
