/* eslint-disable no-unused-expressions */
import List from '@/components/List'
import { mount } from 'avoriaz'
import store from '@/store.js'
import * as sinon from 'sinon'

const match = sinon.match

describe('List.vue', () => {
  let selectSessionSpy

  beforeEach(() => {
    store.state.chatModule.sessions = [
      {
        id: 1,
        user: {
          name: 'Examples',
          img: 'static/images/2.png',
        },
      },
      {
        id: 2,
        user: {
          name: 'gample',
          img: 'static/images/3.png',
        },
      },
    ]

    selectSessionSpy = sinon.spy(store._mutations['chatModule/SELECT_SESSION'][0])
    store._mutations['chatModule/SELECT_SESSION'][0] = selectSessionSpy
  })

  it('should render current session as active', () => {
    const wrapper = mount(List, {store})
    // console.info('wrapper', wrapper)
    const session1 = wrapper.find('li')[0]
    expect(session1.text().trim()).to.equal('Examples')
    expect(session1.hasClass('active')).to.equal(true)

    const avatar1 = wrapper.find('.avatar')[0]
    expect(avatar1.getAttribute('src')).to.equal('static/images/2.png')
    expect(avatar1.getAttribute('alt')).to.equal('Examples')

    const session2 = wrapper.find('li')[1]
    expect(session2.text().trim()).to.equal('gample')
    expect(session2.hasClass('active')).to.equal(false)

    const avatar2 = wrapper.find('.avatar')[1]
    expect(avatar2.getAttribute('src')).to.equal('static/images/3.png')
    expect(avatar2.getAttribute('alt')).to.equal('gample')
  })

  it('should call selectSession mutation when different session clicked', () => {
    const wrapper = mount(List, {store})
    const session2 = wrapper.find('li')[1]
    session2.trigger('click')

    expect(selectSessionSpy).to.have.been.calledWith(match(2))
    // By using real store we can watch vdom get updated - mocking / stubbing the mutation doesn't propagate the change
    const session1 = wrapper.find('li')[0]
    expect(session1.hasClass('active')).to.equal(false)
    expect(session2.hasClass('active')).to.equal(true)
  })
})
