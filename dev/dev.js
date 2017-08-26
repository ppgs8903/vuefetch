import Vue from 'vue'
import vuefetch from '../index'

Vue.use(vuefetch)

var vuefechDemo = new Vue({
  el: '#vuefechDemo',
  data: {
    vuefech_get: '请求中'
  },
  methods: {
    //发送get请求
    getJson: function() {
      return this.$fetch.get('/api/get', {
        methord: 'get',
        type: 'json'
      })
    }
  },
  mounted: function() {
    let s = this.getJson()
    s.then(data => {
      this.vuefech_get = data
    })
  }
})
