export default function ({ app, $axios }) {
  // $axios.onRequest(config => {
  //   console.log('axiosリクエスト発生 url=' + config.url)
  // })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      return Promise.resolve({})
    } else if ([401, 403].includes(code)) {
      app.$auth.logout()
    }
    return Promise.reject(error)
  })
}
