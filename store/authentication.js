// import fetchServices from '~/services/fetchServices'
import { showFailedPopup } from '@/helpers/Utils'

export const state = () => ({
  items: '',
})

export const getters = {
  items: (state) => state.items,
}

export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items
  },
}

export const actions = {
  async postLogin(context, payload) {
    try {
      console.log(payload)

      const response = await this.$auth.loginWith('local', { data: payload })
      console.log(response)
      const user = this.$auth.user
      user.scope = user.data[1]
      console.log(user.data);
      return response
    } catch (error) {
      showFailedPopup({ msg: error })
      throw error
    }
  },

  async postLogout(context, payload) {
    try {
      const response = await this.$auth.logout()
      console.log(response)
      return response
    } catch (error) {
      showFailedPopup({ msg: error })
      throw error
    }
  },
}
