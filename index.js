class vueFetch {
  static install(Vue) {
    !vueFetch.isInstall ? Vue.prototype.$fetch = new vueFetch(Vue) : vueFetch.isInstall = true
  }

  constructor(Vue) {
    this.Vue = Vue

    this.opts = {
      headers: {
        'content-type': 'application/json;charset=utf-8',
        'Accept': '*/*'
      },
      timeout: 100000,
      method: 'GET',
      mode: 'no-cors',
      credentials: 'include',
      cache: 'no-cache'
    }
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  timeout(to) {
    return new Promise(function (res, rej) {
      setTimeout(() => {
        rej(new Error("fetch timeout"))
      }, to)
    })
  }

  getUrl(url, data) {
    let q = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')

    return q.length > 0 ? url + "?" + q : url
  }
  //fixme improve code
  getBodyData(data) {
    let q = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    return q;
  }

  getOpts(opts) {
    let _opts = Object.assign({}, this.opts)
    for (let k in opts) {
      _opts[k] = opts[k]
    }
    return _opts
  }

  //get请求
  get(url, data = {}, opts = {}) {
    let _opts = this.getOpts(opts)
    _opts.method = 'GET'
    let _url = this.getUrl(url, data)

    return Promise.race([
      fetch(_url, _opts),
      this.timeout(_opts.timeout)
    ]).then(this.checkStatus)
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
    ]).then(this.checkStatus)
  }

}

vueFetch.isInstall = false

export default vueFetch
