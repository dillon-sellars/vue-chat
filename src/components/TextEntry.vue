<template>
  <div class="text">
    <textarea placeholder="Press Enter to send" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {SEND_MESSAGE} from '../store'

  export default {
    data() {
      return {
        content: '',
      }
    },
    methods: {
      ...mapMutations('chatModule', {
        'sendMessage': SEND_MESSAGE,
      }),
      onKeyup(e) {
        if (e.keyCode === 13 && this.content.length) {
          this.sendMessage(this.content)
          this.content = ''
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .text {
    height: 160px;
    border-top: solid 1px #ddd;
    textarea {
      padding: 10px;
      height: 100%;
      width: 100%;
      border: none;
      outline: none;
      font-family: "Micrsofot Yahei";
      resize: none;
    }
  }
</style>
