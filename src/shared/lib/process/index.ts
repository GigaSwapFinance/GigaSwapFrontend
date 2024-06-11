import type { IProps, IStep } from './types'
import { useProcessStore } from '@/stores'

const processStore = useProcessStore()

class Process {
  private title = ''
  private currentIndex = 0
  private steps: any[] = []
  private onFinish: Function = () => ({})
  private onlyFinish: Function = () => ({})
  private isVisible: boolean = true
  private canClose: boolean = false
  private isLoading: boolean = false

  constructor(props: IProps) {
    this.title = props.title
    this.steps = props.steps
    this.onFinish = props.onFinish
    // this.onlyFinish = onlyFinish

    processStore.title = props.title
    // processStore.steps = props.steps

    this.callStepAction()
  }

  next() {
    this.currentIndex += 1
    this.callStepAction()
  }

  retry() {
    this.steps[this.currentIndex].error = ''
    this.callStepAction()
  }

  handleError(error: any) {
    const text = error.message

    if (text.includes('not mined')) {
      console.log('tx hash error', error.txHash)
      this.steps[this.currentIndex].pendingTxHash = error.txHash
    }

    this.setCanClose(true)
    this.setIsLoading(false)

    this.steps[this.currentIndex].error = text || 'Something went wrong...'
  }

  editStep(payload: any) {
    const currentStep = this.steps[this.currentIndex]
    this.steps[this.currentIndex] = { ...currentStep, ...payload }
  }

  finish() {
    this.currentIndex = this.steps.length
    this.setCanClose(true)
  }

  close() {
    this.isVisible = false
    // setTimeout(() => this.commit('events/finishProcess', null, { root: true }), LOADING_DELAY)
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  setCanClose(canClose: boolean) {
    this.canClose = canClose
  }

  async callStepAction() {
    this.setCanClose(false)
    this.setIsLoading(true)

    try {
      const onLast = async () => {
        if (this.onFinish) {
          await this.onFinish()
        }

        this.onlyFinish ? this.finish() : this.close()
      }

      const isLast = this.currentIndex === this.steps.length - 1
      const step = this.steps[this.currentIndex]

      if (!step) {
        return onLast()
      }

      await step.action()

      if (!step.finishManually) {
        if (isLast) {
          return onLast()
        }

        await this.next()
      }
    } catch (e) {
      console.log('Process error', e)
      this.handleError(e)
    }
  }
}

export default Process