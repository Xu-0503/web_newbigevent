$.ajaxPrefilter(function (options) {

    options.url = 'http://127.0.0.1:9090' + options.url

    /**
     * options.url字符串-> ' /api' ' /my'
     * indexOf(' /api') !== -1返回的是当前字符串所在的索引位置
     * startsWith / endsWith 用来判断当前某个字符或者字符串在哪个位置开始/结束返回的布尔值
     * includes用来判断当前某个字符或者字符串是否出现在目标字符串里面返回的布尔值
     */

    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
            // 强制清空 token
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = './login.html'
        }
    }
})
