$(function () {
    var layer = layui.layer

    var $image = $('#image')

    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片!')
        }

        var file = e.target.files[0]

        var imgURL = URL.createObjectURL(file)
        // 重新初始化裁剪区域
        $image
            .cropper('destroy')// 销毁旧的裁剪区域
            .attr('src', imgURL)// 重新设置图片路径
            .cropper(options)// 重新初始化裁剪区域
    })

    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // console.log(dataURL);
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功!')
                // 刷新页面
                window.parent.getUserInfo()
            }
        })

    })
})
