import { showFailedPopup } from '@/helpers/Utils'
import chatServices from '~/services/chatServices'

export const state = () => ({
  items: [],
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
  async postChat(context, payload) {
    const request = {
      message: payload.chat,
      receiver: payload.receiver,
    }
    try {
      const res = await chatServices.PostChat({ request })

      return res.data
    } catch (error) {
      showFailedPopup({ msg: error })
      console.error(error)
      throw error
    }
  },

  async getChat(context, payload) {
    try {
      const res = await chatServices.GetChat({ payload })
      context.commit('SET_ITEMS', res.data)
      return res
    } catch (error) {
      showFailedPopup({ msg: error })
      throw error
    }
  },
}
