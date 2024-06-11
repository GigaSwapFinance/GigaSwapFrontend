import { defineStore } from 'pinia'

const MOBILE_BREAKPOINT = 768

const useLayoutStore = defineStore('layout', () => {
  return {
    isMobile: window.innerWidth <= MOBILE_BREAKPOINT,
    isDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,

    modalName: '',
    modalProps: {},
    isModalFullHeight: false,

    isLoading: false,

    openModal(name: string, props: Object = {},) {
      this.modalName = name
      this.modalProps = props
      this.isModalFullHeight = props.isModalFullHeight || false
    },

    closeModal() {
      this.modalName = ''
      this.modalProps = {}
      this.isModalFullHeight = false
    },

    startLoading() {
      this.isLoading = true
    },

    stopLoading() {
      this.isLoading = false
    },
  }
})

window.addEventListener('resize', () => {
  const layoutStore = useLayoutStore()
  layoutStore.isMobile = window.innerWidth <= MOBILE_BREAKPOINT
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const body = document.querySelector('body')

  if (e.matches) {
    body?.setAttribute('data-theme', 'dark')
  } else {
    body?.setAttribute('data-theme', 'light')
  }
})

export default useLayoutStore