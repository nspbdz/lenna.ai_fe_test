import userServices from '~/services/userServices'
import { showFailedPopup } from '~/helpers/Utils'

export const state = () => ({
  items: [],
  userById: [],
})

export const getters = {
  items: (state) => state.items,
  userById: (state) => state.userById,
}

export const mutations = {
  SET_USER(state, items) {
    state.status = items
  },
  SET_USERBYID(state, items) {
    state.userById = items
  },
  SET_DATAUSER(state, items) {
    state.items = items
  },
}

export const actions = {
  async getUser(context, payload) {
    console.log('getUser')

    try {
      const res = await userServices.GetUser()
      context.commit('SET_DATAUSER', res.data)
      console.log(res, 'list user')
      return res.data
    } catch (error) {
      showFailedPopup({ msg: error })
      console.error(error)
      throw error
    }
  },

  async login(context, payload) {
    try {
      const res = await this.$auth.loginWith('local', {
        data: payload,
      })
      console.log(this.$auth)
      console.log(res, 'res')
    } catch (error) {
      showFailedPopup({ msg: '' })
      console.error(error)
      // throw error
    }
  },

  async logout(context) {
    try {
      await this.$auth.logout()
    } catch (error) {
      showFailedPopup({ msg: error })
      console.error(error)
      throw error
    }
  },
  async getSidebar(context, payload) {
    try {
      const res = await userServices.GetSidebar({})
      context.commit('SET_SIDEBAR', res)
      console.log(res)
      return res
    } catch (error) {
      showFailedPopup({ msg: error })
      console.error(error)
      throw error
    }
  },


  async getUserById(context, payload) {
    console.log(payload.value)
    const request = {
      id: payload.value,
    }
    try {
      const res = await userServices.GetUserById({ request })
      context.commit('SET_USERBYID', res)
      console.log(res)
      return res
    } catch (error) {
      showFailedPopup({ msg: error })
      console.error(error)
      throw error
    }
  },

}
