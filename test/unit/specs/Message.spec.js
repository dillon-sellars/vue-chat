import Message from '@/components/Message'
import Vuex from 'vuex'
import { mount } from 'avoriaz'

describe('Message.vue', () => {
  let store
  let getters

  beforeEach(() => {
    getters = {
      currentSession: () => {
        return {
          id: 1,
          user: {
            name: 'Examples',
            img: 'static/images/2.png',
          },
          messages: [
            {
              content: 'Welcome to Your Vue.js App',
              date: new Date(2017, 10, 14, 13, 5, 6),
            },
          ],
        }
      },
    }
    store = new Vuex.Store({
      modules: {
        chatModule: {
          namespaced: true,
          getters,
          state: {
            user: {
              name: 'steve',
              img: 'static/images/1.jpg',
            },
          },
        },
      },
    })
  })

  it('should render correct contents', () => {
    const wrapper = mount(Message, {store})
    const input = wrapper.find('.text')[0]
    expect(input.text()).to.equal('Welcome to Your Vue.js App')
    const msgDate = wrapper.find('.time')[0]
    expect(msgDate.text()).to.equal('1:05 pm')
    const avatar = wrapper.find('.avatar')[0]
    expect(avatar.getAttribute('src')).to.equal('static/images/2.png')
  })
})
