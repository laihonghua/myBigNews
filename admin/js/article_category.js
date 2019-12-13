$(function () {
    // 一开始发送请求  渲染页面
    getData();
    function getData() {
        $.get({
            url: BigNew.category_list,
            success: function (res) {
                let htmlStr = template('categoryList', res);
                $('tbody').html(htmlStr);


            },

        });
    };


    // 重置表单中的数据
    $('#btn-cancel').on('click', function () {
        // reset();  把指定表单所有内容重置未默认值
        $('form')[0].reset();
    })

    $('#myModal').on('show.bs.modal', function (e) {
        let dom = e.relatedTarget


        if (dom == $('#xinzengfenlei')[0]) {
            console.log(1);
            // $('#exampleModalLabel').text('新增文章分类');
            // $('#btn-confirm').text('新增').addClass('btn-success').removeClass('btn-primary');
            $('#exampleModalLabel').text('新增文章分类');
            $('#btn-confirm').text('新增').addClass('btn-success').removeClass('btn-primary');
            $('form')[0].reset();
            // 点击模态框操作按键 注册事件
            $('#btn-confirm').on('click', function () {
                // 获取表单信息
                let name = $('#recipient-name').val();
                let slug = $('#message-text').val();
                // 判断表单信息 为空的时候提示用户 并退出函数
                if (name == '' || slug == '') {
                    alert('重写');
                    return;

                }
                // 正常情况   发送post请求  将修改的数据反馈给服务器
                $.post({
                    url: BigNew.category_add,
                    data: {
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        // 请求成功隐藏模态框 重新获取数据渲染页面
                        if (res.code == 201) {
                            $('#myModal').modal('hide');
                            getData();



                        }
                    }
                })
            });
        }
        else {
            // 处理编辑分类的  事件
            $('#exampleModalLabel').text('编辑文章分类');
            $('#btn-confirm').text('编辑').addClass(' btn-primary').removeClass('btn-success');
            // $('form')[0].reset();
            // 获取ID
            let cateId = $(dom).attr('data-id');
            // console.log(cateId);
            // 发送请求
            $.get({

                url: BigNew.category_search,
                // 根据ID找到用户点击编辑的实例
                data: { id: cateId },
                success: function (res) {
                    if (res.code == 200) {
                        // 获取需要编辑的实例数据渲染页面
                        $('#recipient-name').val(res.data[0].name);
                        $('#message-text').val(res.data[0].slug);
                        $('#cateid').val(res.data[0].id)
                    };

                    // 点击操作按钮
                    $('#btn-confirm').on('click', function () {


                        // 获取编辑后的表单数据
                        let name = $('#recipient-name').val();
                        let slug = $('#message-text').val();
                        let id = $('#cateid').val();
                        // 发送请求
                        $.post({
                            url: BigNew.category_edit,
                            data: {
                                name: name,
                                slug: slug,
                                id: id
                            },
                            success: function (res) {

                                // 成功将模态框隐藏  重新获取数据 渲染页面
                                if (res.code === 200) {
                                    $('#myModal').modal('hide');
                                    getData();
                                };

                            }


                        });
                    })

                }




            });
        };



    });

    // 点击删除按钮  注册事件
    $('tbody').on('click', '#btn-delete', function () {
        // 获取id
        let daleteId = $(this).attr('data-id');
        // 危险操作 提示用户
        let ans = confirm('你确定要删除吗');
        // console.log(ans);
        // console.log(daleteId);
        // 如果点击确认  执行删除操作
        if (ans) {
            $.post({
                url: BigNew.category_delete,
                data: { id: daleteId },
                success: function (res) {
                    console.log(res);
                    if (res.code === 204) {
                        // 重新获取数据渲染页面
                        getData();
                    }
                }
            })
        }
    })

});




