const downloadHelper = (res, fName) => {
  // 判断响应头
  const cd = res?.headers['content-disposition'] || ''
  const ct = res?.headers['content-type'] || ''

  if (!ct || !cd) {
    const errInfo = {
      code: 10002,
      message: '下载信息不存在，请刷新重试！'
    }
    return Promise.reject(errInfo)
  }
  // attachment;filename=xxxx.xls
  // 切割文件名
  const fileNameEncode = cd?.split('filename=')[1]
  const fileName = decodeURIComponent(fileNameEncode) || fName || '文件.xls'
  const blob = new Blob([res.data], { type: ct })
  if (window.navigator.msSaveBlob) {
    // ie
    window.navigator.msSaveOrOpenBlob(blob, fileName)
    return
  }
  const oa = document.createElement('a')
  oa.style.display = 'none'
  oa.href = window.URL.createObjectURL(blob)
  oa.download = fileName
  document.body.appendChild(oa)
  oa.click()
  URL.revokeObjectURL(oa.href)
  document.body.removeChild(oa)
}

export function downLoadApi() {
  const params = {}
  return request({
    url: '/api/v2/download',
    method: 'post',
    data: params,
    responseType: 'blob'
  }).then((res) => downloadHelper(res))
}
