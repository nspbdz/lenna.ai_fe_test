<template>
  <v-container>
    <v-layout column align-center>
      <v-flex xs12>
        <v-card>
          <v-card-title class="headline">Chat</v-card-title>
          <v-divider />
          <v-card-text>
            <v-list>
              <v-list-item v-for="message in items" :key="message.id">
                <v-row>
                  <v-col cols="6" md="6">
                    <p v-if="message.receiver == userLogin && message.sender == id">
                      {{ message.message }}
                    </p>

                  </v-col>
                  <v-col cols="6" md="6">
                    <p v-if="message.receiver == id && message.sender == userLogin">
                      {{ message.message }}
                    </p>

                  </v-col>
                </v-row>

              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <form @submit.prevent="sendMessage(invalid)">
              <BaseInput v-model="formValues.chat" name="chat" placeholder="message" prepend-inner-icon="mdi-chat"
                rules="required">
              </BaseInput>
              <BaseButton block x-large type="submit">Masuk</BaseButton>

            </form>

            <!-- <v-text-field v-model="formValues.chat" label="Type your message here" solo
              @keyup.enter="sendMessage"></v-text-field>
            <v-btn color="primary" @click="sendMessage">Send</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  reactive,
  ref,
  useRouter,
  // useStore,
  computed,
  useStore,
  onMounted,
  useContext,

} from '@nuxtjs/composition-api'
export default {
  setup(context) {
    const { $auth } = useContext();
    const store = useStore()
    const router = useRouter()

    const id = ref([])
    const userLogin = ref($auth.state.user.data.user.id)

    const newMessage = ref("")
    const messages = ref([])



    const sendMessage = async () => {
      await store.dispatch('chat/postChat', formValues)
      realtimeChat();
      formValues.chat = ""

    }

    const realtimeChat = () => {
      store.dispatch('chat/getChat', id.value)

    }
    const items = computed(() => store.state.chat.items)


    onMounted(() => {
      id.value = router.currentRoute.params.id
      realtimeChat();
    })

    const formValues = reactive({
      chat: '',
      receiver: router.currentRoute.params.id,
    })

    setInterval(() => {
      realtimeChat();
    }, 3000);

    return {
      formValues,
      id,
      userLogin,
      items,
      newMessage,
      messages,
      sendMessage,
      realtimeChat,
    }

  }
}

</script>

<style>
.headline {
  text-align: center;
}
</style>
