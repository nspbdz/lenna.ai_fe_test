import Api from '@/api/Api.js'


const base = 'v1'

class FetchServices {

  async PostRegister({ request }) {
    console.log(request);
    const res = await Api.doPost(`${base}/register`, request)
    console.debug('POST REGISTER', res)
    return res
  }



  async PostCreate({ request }) {
    const res = await Api.doPost(`${base}/user`, request)
    console.debug('User Create', res)
    return res
}

  async PostUpdate(id,data) {
    console.log(id, "data id");
    console.log(data,"dataaaa");
    const res = await Api.doPost(`${base}/referalupdate/${id}`, data)
    // const res = await Api.doPut(`${base}/user/${id}`, data)
    // const res = await Api.doPut(`${base}/user/16`, data)
    console.debug('User Update', res)
    return res
  }

  async PostLogin({ request }) {
    console.log(request);
    const res = await Api.doPost(`${base}/login`, request)
    console.debug('POST Login', res)
    return res
  }


  async GetUser() {
    const res = await Api.doGet(`${base}/users`,)
    console.debug('Get User ', res)
    return res
  }



  async GetUserById({ request }) {
    console.log(request, "requestan")
    const res = await Api.doGet(`${base}/user/`+request.id)
    console.debug('Get User ', res)
    return res
  }

}

export default new FetchServices()
