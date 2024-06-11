<template>
  <div class="modal-trade-settings">
    <ModalCloseButton @click="emit('closeModal')" />

    <div class="modal-trade-settings__title">Creation settings</div>

    <div class="modal-trade-settings__body">
      <div v-if="isDirect" class="modal-trade-settings__section">
        <SettingWithCheckbox v-model="tradeStore.isWhitelistEnabled">Whitelisted address</SettingWithCheckbox>

        <template v-if="tradeStore.isWhitelistEnabled">
          <Input v-model="tradeStore.whitelistedAddress" placeholder="0x... address" />
          <WarningBlock>Only the whitelisted address will be able to interact with your trade</WarningBlock>
        </template>
      </div>

      <template v-if="!isDirect">
        <div class="modal-trade-settings__section">
          <SettingWithCheckbox v-model="tradeStore.isBuyLimitEnabled">Buy limit per wallet</SettingWithCheckbox>

          <template v-if="tradeStore.isBuyLimitEnabled">
            <Input
                v-if="receiveAsset"
                v-model="buyLimit"
                is-number
                :decimals="2"
                placeholder="0.00"
                :symbol="receiveAsset?.symbol"
                :symbol-icon="receiveAsset?.logoURI"
            />

            <WarningBlock v-else>Select tokens to set the buy limit</WarningBlock>
          </template>
        </div>

        <Line />

        <div class="modal-trade-settings__section">
          <SettingWithCheckbox v-model="tradeStore.isVestingEnabled">
            Vesting (anti-dump protection)
          </SettingWithCheckbox>

          <template v-if="tradeStore.isVestingEnabled">
            <div class="modal-trade-settings__section-subtitle">Released immediately</div>
            <Input
                v-model="tradeStore.vestingReleasedOnBuy"
                is-number
                :decimals="2"
                placeholder="0.00"
                symbol="%"
            />

            <div class="modal-trade-settings__section-subtitle">Period length</div>
            <Input
                v-model="tradeStore.vestingPeriodLengthInHours"
                is-number
                placeholder="0"
                :decimals="0"
                symbol="hours"
            />

            <div class="modal-trade-settings__section-subtitle">Released per period</div>
            <Input
                v-model="tradeStore.vestingReleasedOnPeriod"
                is-number
                :decimals="2"
                placeholder="0.00"
                symbol="%"
            />
          </template>
        </div>
      </template>
    </div>

    <BigButton class="modal-trade-settings__button" @click="emit('closeModal')">Save</BigButton>
  </div>
</template>

<script setup>
import ModalCloseButton from '@/modules/AppModal/components/ModalCloseButton.vue'
import SettingWithCheckbox from '@/components/SettingWithCheckbox.vue'
import WarningBlock from '@/shared/ui/WarningBlock.vue'
import Line from '@/shared/ui/Line.vue'
import Input from '@/shared/ui/Input.vue'
import { useTradeStore } from '@/stores'
import InlineTip from '@/shared/ui/InlineTip.vue'
import { onMounted, ref, watch } from 'vue'
import { decimalsOff, decimalsOn } from '@/shared/lib/utils/token'
import BigButton from '@/shared/ui/BigButton.vue'

const props = defineProps({
  receiveAsset: {
    type: Object,
  },

  isDirect: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['closeModal'])
const tradeStore = useTradeStore()

const buyLimit = ref(null)

watch(() => buyLimit.value, () => {
  tradeStore.buyLimit = decimalsOn(buyLimit.value, props.receiveAsset.decimals)
})

onMounted(() => {
  if (Number(tradeStore.buyLimit)) {
    if (!props.receiveAsset) {
      buyLimit.value = null
    }

    buyLimit.value = decimalsOff(tradeStore.buyLimit, props.receiveAsset.decimals)
  }
})
</script>

<style scoped lang="sass">
.modal-trade-settings
  padding: 24px
  max-width: 500px
  width: 100%
  font-family: var(--font-1)

  &__title
    font-weight: 700
    font-size: 24px
    margin-bottom: 24px

  &__body
    display: flex
    flex-direction: column
    gap: 16px
    //padding: 16px 0 0

  &__section
    display: flex
    flex-direction: column
    gap: 16px

    &.--disabled
      pointer-events: none
      opacity: 0.5

    &-subtitle
      font-size: 14px

  &__button
    width: 100%
    margin-top: 24px
</style>