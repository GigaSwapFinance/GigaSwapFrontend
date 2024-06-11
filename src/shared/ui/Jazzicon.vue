<template>
  <div v-html="iconHTML" class="jazzicon" :style="style"></div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { generateJazzicon } from '@/shared/lib/utils/jazzicon'

const props = defineProps({
  address: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
    default: 18,
  },
})

const iconHTML = ref('<div></div>')
const style = computed(() => ({ width: `${props.size}px`, height: `${props.size}px` }))

onMounted(generateAvatar)

function generateAvatar() {
  iconHTML.value = generateJazzicon(props.address, props.size)
}
</script>