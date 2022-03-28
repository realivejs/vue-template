interface Window {
  openNewWindow: (url: string) => void
  changeFrameUrl: (url: string) => void
  switchRoute: (route: typeof import('vue-router').RawLocation) => void
  Utils: {
    atob: (value: string) => string
    btoa: (value: string) => string
  }
}
