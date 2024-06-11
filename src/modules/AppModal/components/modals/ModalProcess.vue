<template>
  <div>process</div>
</template>

<!--<template>-->
<!--  <div class="process">-->
<!--    <div class="process__header">-->
<!--      <div class="process__header-title">{{ title }}</div>-->
<!--    </div>-->

<!--    <div class="process__body">-->
<!--      <div v-for="(step, stepIndex) in steps" :key="step.title" class="process__step" :class="{ '&#45;&#45;completed': step.isCompleted, '&#45;&#45;error': step.error }">-->
<!--        <div class="process__step-left">-->
<!--          <div v-if="isLoading && currentIndex === stepIndex" class="process__status &#45;&#45;loading"></div>-->
<!--          <Image v-else-if="step.error" src="./images/icons/close.svg" class="process__step-icon &#45;&#45;error" />-->
<!--          <Image v-else-if="currentIndex > stepIndex" src="./images/icons/checkmark-2.svg" class="process__step-icon &#45;&#45;completed" />-->
<!--          <div v-else class="process__status"></div>-->
<!--        </div>-->

<!--        <div class="process__step-info">-->
<!--          <div class="process__step-title">{{ step.title }}</div>-->

<!--          <div v-if="step.error" class="process__step-description">{{ step.error }}</div>-->
<!--          <div v-else class="process__step-description">{{ step.description || '...' }}</div>-->

<!--          <div class="process__step-buttons">-->
<!--            <button v-if="step.pendingTxHash" @click="onScanTransactionClick">{{ $t('process.scanButton') }}</button>-->
<!--            <button v-if="step.error" @click="onRetryClick">{{ $t('process.retryButton') }}</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div v-if="canClose" class="process__bottom">-->
<!--      <Button is-big class="process__bottom-button" @click="onCloseClick">{{ $t('process.closeButton') }}</Button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from 'vue'-->

<!--const canClose = ref(true)-->

<!--function onRetryClick() {-->
<!--  this.$store.commit('process/retry')-->
<!--}-->

<!--function onScanTransactionClick() {-->
<!--  this.$store.commit('process/scan')-->
<!--}-->

<!--function onCloseClick() {-->
<!--  this.$store.commit('process/close')-->
<!--}-->
<!--</script>-->

<!--<style lang="sass">-->
<!--.process-->
<!--  padding: 6px 6px-->

<!--  &__header-->
<!--    margin-bottom: 18px-->

<!--    &-title-->
<!--      font-size: 24px-->
<!--      font-weight: 600-->
<!--      user-select: none-->
<!--      cursor: default-->

<!--  &__bottom-->
<!--    margin-top: 18px-->
<!--    display: flex-->
<!--    gap: 12px-->

<!--    &-button-->
<!--      width: 100%-->

<!--  &__status-->
<!--    width: 34px-->
<!--    height: 34px-->
<!--    background: transparent-->
<!--    border-radius: 50%-->
<!--    border: solid var(&#45;&#45;grey-border-3) 5px-->

<!--    &.&#45;&#45;loading-->
<!--      background: transparent-->
<!--      border-color: var(&#45;&#45;yellow)-->
<!--      border-top: 5px solid transparent-->
<!--      animation: spin 1.6s linear infinite-->

<!--  &__step-->
<!--    display: flex-->

<!--    &.&#45;&#45;completed-->
<!--      .process__step-->
<!--        &-title-->
<!--          color: #43a047-->

<!--        &-description-->
<!--          color: #43a047-->

<!--    &.&#45;&#45;error-->
<!--      .process__step-->
<!--        &-title-->
<!--          color: var(&#45;&#45;red)-->

<!--        &-description-->
<!--          color: var(&#45;&#45;red)-->

<!--    &-left-->
<!--      margin-right: 14px-->

<!--    &-icon-->
<!--      width: 44px-->
<!--      height: 44px-->
<!--      min-width: 44px-->
<!--      min-height: 44px-->
<!--      color: var(&#45;&#45;grey-border-3)-->

<!--      &.&#45;&#45;completed-->
<!--        background-color: #43a047-->
<!--        border-radius: 50%-->
<!--        width: 28px-->
<!--        height: 28px-->
<!--        min-width: 28px-->
<!--        min-height: 28px-->
<!--        padding: 8px-->
<!--        color: var(&#45;&#45;white)-->

<!--      &.&#45;&#45;error-->
<!--        background-color: #f44336-->
<!--        border-radius: 50%-->
<!--        width: 28px-->
<!--        height: 28px-->
<!--        min-width: 28px-->
<!--        min-height: 28px-->
<!--        padding: 8px-->
<!--        color: var(&#45;&#45;white)-->

<!--    &-info-->
<!--      display: flex-->
<!--      flex-direction: column-->
<!--      justify-content: center-->

<!--    &-title-->
<!--      font-size: 17px-->

<!--    &-description-->
<!--      font-size: 15px-->
<!--      margin-top: 4px-->
<!--      color: var(&#45;&#45;grey-text)-->
<!--      line-height: 18px-->
<!--      word-break: break-word-->

<!--    &-buttons-->
<!--      margin-top: 4px-->

<!--      button-->
<!--        background-color: var(&#45;&#45;red-light)-->
<!--        color: var(&#45;&#45;red)-->
<!--        border: 1px solid transparent-->
<!--        padding: 0 6px-->
<!--        border-radius: 6px-->
<!--        cursor: pointer-->
<!--        outline: none-->
<!--        font-size: 14px-->
<!--        user-select: none-->
<!--        transition: all-->
<!--        transition-duration: 0.15s-->
<!--        word-break: keep-all-->

<!--        &:hover-->
<!--          color: var(&#45;&#45;text-primary)-->

<!--    &:not(:last-child)-->
<!--      margin-bottom: 16px-->

<!--</style>-->