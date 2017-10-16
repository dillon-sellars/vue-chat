/* eslint-disable no-unused-expressions */
import TextEntry from '@/components/TextEntry'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import * as sinon from 'sinon'

const match = sinon.match

describe('TextEntry.vue', () => {
  let store
  let mutations

  beforeEach(() => {
    mutations = {
      'SEND_MESSAGE': sinon.stub(),
    }
    store = new Vuex.Store({
      modules: {
        chatModule: {
          namespaced: true,
          mutations,
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

  it('should call SEND_MESSAGE as pass along content', () => {
    const wrapper = mount(TextEntry, {mutations, store})
    wrapper.setData({content: 'a message from me'})
    const textArea = wrapper.find('div.text textarea')[0]
    expect(textArea.value()).to.equal('a message from me')
    textArea.trigger('keyup.enter')
    expect(mutations.SEND_MESSAGE).to.have.been.calledWith(match.any, match('a message from me'))
    expect(textArea.text()).to.be.empty
  })
})
