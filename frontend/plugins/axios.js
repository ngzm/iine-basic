export default function ({ $axios }) {

  // $axios.onRequest(config => {
  //   console.log('axiosリクエスト発生 url=' + config.url)
  // })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      return Promise.resolve({});
    }
    return Promise.reject(error)
  })
}
