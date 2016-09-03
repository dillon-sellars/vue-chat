import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const INIT_DATA = 'INIT_DATA'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SELECT_SESSION = 'SELECT_SESSION'

const now = new Date()
const store = new Vuex.Store({
  state: {
    // Current user
    user: {
      name: 'coffce',
      img: 'static/images/1.jpg',
    },
    // Session list
    sessions: [
      {
        id: 1,
        user: {
          name: 'Examples',
          img: 'static/images/2.png',
        },
        messages: [
          {
            content: 'Hello, this is a simple chat based on Vue + Vuex + Webpack built examples of chat records stored in localStorage, what can be asked by Github Issue asked me.',
            date: now,
          }, {
            content: 'Project address: https://dillon-sellars.github.io/vue-chat/',
            date: now,
          },
        ],
      },
      {
        id: 2,
        user: {
          name: 'webpack',
          img: 'static/images/3.jpg',
        },
        messages: [],
      },
    ],
    // The currently selected session
    currentSessionId: 1,
    // Filter out only the session that contains this key
    filterKey: '',
  },
  getters: {
    // Filtered list of conversations
    sessions: ({sessions, filterKey}) => {
      return sessions.filter(session => session.user.name.toLowerCase().includes(filterKey.toLowerCase()))
    },
    // Current session index
    currentId: ({currentSessionId}) => currentSessionId,
    currentSession: ({sessions, currentSessionId}) => sessions.find(session => session.id === currentSessionId),
  },
  mutations: {
    [INIT_DATA](state) {
      let data = localStorage.getItem('vue-chat-session')
      if (data) {
        state.sessions = JSON.parse(data)
      }
    },
    // Send a message
    [SEND_MESSAGE]({sessions, currentSessionId}, content) {
      let session = sessions.find(item => item.id === currentSessionId)
      session.messages.push({
        content: content,
        date: new Date(),
        self: true,
      })
    },
    // Select a conversation
    [SELECT_SESSION](state, id) {
      state.currentSessionId = id
    },
    // Search for
    setFilterKey(state, value) {
      state.filterKey = value
    },
  },
})

store.watch(
  (state) => state.sessions,
  (val) => {
    // console.log('CHANGE: ', val)
    localStorage.setItem('vue-chat-session', JSON.stringify(val))
  },
  {
    deep: true,
  },
)

export default store
