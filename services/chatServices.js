import Api from '~/api/Api.js'
const base = 'v1'

class FetchServices {
  async GetChat({ request, payload }) {
    console.log(payload, 'chatserv')
    const res = await Api.doGet(`${base}/chat/${payload}`)
    // console.debug('GET FETCH', res)
    return res
  }

  async PostChat({ request }) {
    const res = await Api.doPost(`${base}/chat`, request)
    console.debug('User Create', res)
    return res
  }
}

export default new FetchServices()
