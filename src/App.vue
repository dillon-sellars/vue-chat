<template>
  <div id="app">
    <div class="sidebar">
      <card></card>
      <list></list>
    </div>
    <div class="main">
      <message></message>
      <text-entry></text-entry>
    </div>
  </div>
</template>

<script>
  import Card from '@/components/Card'
  import List from '@/components/List'
  import TextEntry from '@/components/TextEntry'
  import Message from '@/components/Message'
  import {mapMutations} from 'vuex'
  import {INIT_DATA} from './store'

  export default {
    name: 'app',
    components: {Card, List, TextEntry, Message},
    methods: {
      ...mapMutations({
        'initData': INIT_DATA,
      }),
    },
    created() {
      console.info('App.created')
      this.initData()
    },
  }
</script>

<style lang="less" scoped>
  #app {
    margin: 20px auto;
    width: 800px;
    height: 600px;
    overflow: hidden;
    border-radius: 3px;
    .sidebar, .main {
      height: 100%;
    }
    .sidebar {
      float: left;
      width: 200px;
      color: #f4f4f4;
      background-color: #2e3238;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }
    .text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .message {
      height: ~'calc(100% - 160px)';
    }
  }
</style>
