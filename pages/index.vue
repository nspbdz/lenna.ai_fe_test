<template>
  <div>
    <!-- {{ list[0].name }} -->
    <template v-for="item in list">
      {{ item?.name }}
    </template>

    <v-card max-width="450" class="mx-auto">
      <v-toolbar color="cyan" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Chat App</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list three-line>
        <div v-for="item in list" :key="item">
          <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

          <v-list-item v-else :key="item?.id" @click="handleClick(item?.id)">
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item?.name"></v-list-item-title>
              <v-list-item-subtitle v-html="item?.email"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
  </div>

</template>

<script>
import {
  // reactive,
  // ref,
  useRouter,
  useStore,
  onMounted,
  computed
} from '@nuxtjs/composition-api'
export default {
  layout: 'auth',
  setup() {
    const store = useStore()
    const route = useRouter()


    onMounted(() => {
      store.dispatch("user/getUser");
      // rubah ke hit api semua data user
    });
    const list = computed(() => {
      // rubah ke ammbil semua data user

      return store.getters["user/items"];
    });
    console.log(list, 'list')
    const handleClick = (e) => {
      console.log(e, 'id')
      route.push(`auth/chat/${e}`)
    }

    return {
      handleClick,
      list,
    }
  }
}
//   data: () => ({
//     items: [
//       { header: '' },
//       {
//         avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
//         title: 'Brunch this weekend?',
//         subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
//       },
//       { divider: true, inset: true },
//       {
//         avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
//         title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
//         subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
//       },
//       { divider: true, inset: true },
//       {
//         avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
//         title: 'Oui oui',
//         subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
//       },
//       { divider: true, inset: true },
//       {
//         avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
//         title: 'Birthday gift',
//         subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
//       },
//       { divider: true, inset: true },
//       {
//         avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
//         title: 'Recipe to try',
//         subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
//       },
//     ],
//   }),
// }
</script>
