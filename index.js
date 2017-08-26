import Vue from 'vue'

class vueFetch {
  static install(Vue) {
    !vueFetch.isInstall ? Vue.prototype.$fetch = new vueFetch(Vue) : vueFetch.isInstall = true
  }

  constructor(Vue) {
    this.Vue = Vue
    this.opts = {
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      acceptType: 'JSON',
      timeout: 30000,
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache'
    }
  }

  errorFormat(msg) {
    reurn `vuefetch error: ${msg}`
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  timeout(to) {
    return new Promise(function (res, rej) {
      setTimeout(() => {
        let error = new Error("fetch timeout")
        error.response = this.errorFormat("fetch timeout no response")
        rej(error)
      }, to)
    })
  }

  //工具函数，数组转换成url
  getUrl(url, data={}) {
    let q = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    return q.length > 0 ? url + "?" + q : url
  }

  //深拷贝，headers存在引用情况
  getOpts(opts) {
    let _opts = Object.assign({}, this.opts)
    for (let k in opts) {
      _opts[k] = opts[k]
    }
    return _opts
  }

  fetchBackHandler(acceptType) {
    switch(acceptType) {
      case 'json':
        return res => res.json()
      default:
        return res => res.json()
    }
  }

  //获取数据
  fetchData({url, opts, data, acceptType}) {
    let _url = this.getUrl(url, data)
    let _handler = this.fetchBackHandler(acceptType)
    //可能报错
    return Promise.race([
      fetch(url, opts),
      this.timeout(opts.timeout)
    ])
    .then(this.checkStatus)
    .then(res =>  _handler(res))
  }

  //get请求
  get(url, data = {}, opts = {}, acceptType='json') {
    let _opts = this.getOpts(opts)
    let _data = data
    let _acceptType = acceptType
    _opts.method = 'GET'
    let promiseResult = this.fetchData({url: url, opts:_opts, data: _data, acceptType: _acceptType})
    return promiseResult
  }

  //post请求
  post(url, data = {}, opts = {}) {
    let _opts = this.getOpts(opts)
    let _data = JSON.stringify(data)
    _opts.method = 'POST'
    _opts.body = _data
    return Promise.race([
      fetch(url, _opts),
      this.timeout(_opts.timeout)
    ])
    .then(this.checkStatus)
  }
}
vueFetch.isInstall = false

export default vueFetch
