export interface IProps {
  title: string
  steps: IStep[]
  onFinish: Function
}

export interface IStep {
  title: string
  description: string
  action: Function
}