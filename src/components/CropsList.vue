<template>
  <div class="crops-list">
    <div class="crops-list__title heading-4">Select crops to harvest</div>

    <div class="crops-list__body">
      <div
          v-for="asset in assets"
          class="crops-list__crop"
          :class="{ '--selected': isAssetSelected(asset) }"
          @click="onAssetClick(asset)"
      >
        <Image
            :src="asset.logoURI"
            alternative-src="/images/icons/question-mark.svg"
            class="crops-list__crop-icon"
        />

        <div class="crops-list__crop-title">{{ asset.symbol }}</div>

        <div class="crops-list__crop-value">
          <Number>{{ decimalsOff(asset.amount, asset.decimals) }}</Number>
        </div>

        <Image
            v-if="isAssetSelected(asset)"
            src="/images/icons/checkmark-2.svg"
            class="crops-list__crop-checkmark"
        />
      </div>
    </div>

    <div class="crops-list__bottom">
      <BigButton
          v-if="!selectedAssetAddresses.length && !isNativeSelected"
          is-disabled
          class="crops-list__bottom-button"
      >Select crops</BigButton>

      <BigButton
          v-else
          class="crops-list__bottom-button"
          @click="onHarvestClick"
      >Harvest {{ cropAmountToHarvest }} crops</BigButton>
    </div>
  </div>
</template>

<script setup>
import { decimalsOff } from '@/shared/lib/utils/token'
import Number from '@/shared/ui/Number.vue'
import { computed, ref } from 'vue'
import BigButton from '@/shared/ui/BigButton.vue'

const emit = defineEmits(['harvest'])

defineProps({
  assets: {
    type: Array,
    required: true,
  },
})

const selectedAssetAddresses = ref([])
const isNativeSelected = ref(false)
const cropAmountToHarvest = computed(() => {
  let amount = selectedAssetAddresses.value.length

  if (isNativeSelected.value) {
    amount += 1
  }

  return amount
})

function isAssetSelected(asset) {
  return asset.type === 'currency' ? isNativeSelected.value : selectedAssetAddresses.value.includes(asset.address)
}

function onAssetClick(asset) {
  if (asset.type === 'currency') {
    return isNativeSelected.value = !isNativeSelected.value
  }

  const isAlreadySelected = selectedAssetAddresses.value.some(address => address === asset.address)

  if (isAlreadySelected) {
    selectedAssetAddresses.value = selectedAssetAddresses.value.filter(address => address !== asset.address)
  } else {
    selectedAssetAddresses.value.push(asset.address)
  }
}

function onHarvestClick() {
  emit(
      'harvest',
      {
        assetAddresses: selectedAssetAddresses.value,
        withNative: isNativeSelected.value,
      }
  )
}
</script>

<style scoped lang="sass">
.crops-list
  background-color: var(--background-default)
  border-radius: 16px
  padding: 32px
  max-width: 620px
  width: 100%

  &__body
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    flex-wrap: wrap
    gap: 12px

  &__crop
    display: flex
    flex-direction: column
    align-items: center
    gap: 8px
    border-radius: 12px
    border: 1px solid var(--background-stroke)
    padding: 10px
    cursor: pointer
    position: relative
    user-select: none
    text-align: center
    transition: background-color 400ms ease, box-shadow 400ms ease

    &.--selected
      box-shadow: var(--shadow-primary)

    &:hover
      background-color: var(--background-light)

    &-icon
      height: 30px
      width: 30px
      border-radius: 50%

    &-title
      font-weight: 500

    &-value
      font-size: 12px
      color: var(--color-secondary)

    &-checkmark
      position: absolute
      top: 6px
      right: 6px
      height: 20px
      width: 20px
      color: var(--color-secondary)

  &__bottom
    margin-top: 24px

    &-button
      width: 100%

  @media screen and (max-width: $breakpointTablet)
    padding: 24px 16px

    &__body
      grid-template-columns: 1fr 1fr 1fr
</style>