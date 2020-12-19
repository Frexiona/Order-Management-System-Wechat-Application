// pages/form/form.js
import language from '../../utils/language';
import {
    initalFetch
} from '../../utils/login';
import {
    initalTableBar
} from '../../utils/tools';

const languageObj = language._t();
const WXAPI = require('apifm-wxapi');
const fetchForm = async () => {
    const tokenObj = wx.getStorageSync('token');
    return WXAPI.jsonList({
        token: tokenObj.token,
        type: 'apifm-wxapi-create-order'
    })
}
// 取得counter的数量
const getCounter = async () => {
    const res = await fetchForm();

    if (res.data) return res.data.length + 1;

    return 1;
}

// 定义BarTitle
const setBarTitle = (that) => {
    wx.setNavigationBarTitle({
        title: that.data._t["newOrder"] || "新建订单(New Order)"
    })
}

Page({

    /**
     * Page initial data
     */
    //   data: {

    //   },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        initalFetch();
        // 初始化语言
        this.setData({
            _t: languageObj,
        })
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {},

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})

const dateObj = new Date();
const month = dateObj.getMonth() + 1;
const day = String(dateObj.getDate()).padStart(2, '0');
const year = dateObj.getFullYear();
const defaultData = {
    showTopTips: false,
    
    _t: {},

    date: `${year}-${month}-${day}`,

    uploadFileTips: `${languageObj['uploadFileTips']}`, // 文件上传提示

    formData: {

    },

    fileList: [],

    path: '',
}

const submitForm = async (formData, that) => {
    const tokenObj = wx.getStorageSync('token');
    const {
        name,
        email,
        radio,
        wordLimit,
        date,
        title,
        require
    } = formData;
    const counter = await getCounter();
    const myDate = new Date();
    const historyList = [{
        time: `${myDate.toLocaleString()}`,
        status: '20200101',
    }]


    that.setData({
        submitFormLoading: true
    })

    const content = `{
        "uid": "${tokenObj.uid}",
        "date": "${date}",
        "email": "${email}",
        "name": "${name}",
        "radio": "${radio}",
        "wordLimit":"${wordLimit}",
        "title": "${title}",
        "require": "${require}",
        "counter": "${counter}",
        "currStatus": "20200101",
        "precent": "0",
        "startTime": "${myDate.toLocaleString()}",
        "fileList": '${JSON.stringify(that.data.fileList)}',
        "historyList": '${JSON.stringify(historyList)}'
  }`;

    console.log("最后提交", content)



    /*                                                              此为订单创建时的JSON
         "uid": "${tokenObj.uid}",                                   用户唯一标识（暂时无用）
            "date": "${date}",                                       日期
            "email": "${email}",                                    邮箱
            "name": "${name}",                                      姓名
            "radio": "${radio}",                                    语言选择
            "wordLimit":"${wordLimit}",                             字数限制
            "title": "${title}",                                    标题
            "counter": "${counter}",                                订单的counter数
            "currStatus": "20200101",                               当前状态 默认为 订单开始
            "precent": "0",                                         百分比
            "startTime": "${myDate.toLocaleString()}",              订单开始时间
            "fileList": '${JSON.stringify(that.data.fileList)}',    文件列表
            "historyList": '${JSON.stringify(historyList)}'         历史状态list，我已经默认创建了第一条开始接单的状态，后台添加式请从当前list开始添加
    */
    WXAPI.jsonSet({
        type: 'apifm-wxapi-create-order',
        token: tokenObj.token,
        content,
        /*  
        注意以下几个字段：
            status 状态 2020001 代表进行中 2020003 代表结束
            describe 代表卡片页脚
            process  代表右上角文字状态
            startTime 表单提交时间，也代表开始时间
            finishTime 论文结束时间（订单完成时间） 默认为null
        */
    }).then(res => {
        if (res.code == 0) {
            wx.showToast({
                title: `${languageObj['submitSuc']}`,
                icon: 'success'
            })
            that.setData({
                submitFormLoading: false,
                formData:{
                    name:"",
                    email:"",
                    wordLimit:'',
                    title:'',
                    date: date,
                    require:'',
                    radio,
                }
            });
            wx.switchTab({
                url: '../status/status',
            })
        } else {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
        }
    })
}

Component({
    data: {
        ...defaultData,
        rules: [{
            name: 'radio',
            rules: {
                required: true,
                message: `${languageObj['languageLimit']}`
            },
        }, {
            name: 'name',
            rules: {
                required: true,
                message: `${languageObj['nameLimit']}`
            },
        }, {
            name: 'title',
            rules: {
                required: true,
                message: `${languageObj['titleLimit']}`
            },
        }, {
            name: 'email',
            rules: [{
                required: true,
                message: `${languageObj['emailLimit']}`
            }, {
                email: true,
                message: `${languageObj['emailFormLimit']}`
            }],
        }, {
            name: 'wordLimit',
            rules: {
                required: true,
                min: 0,
                max: 20000,
                message: `${languageObj['wordLimitReq']}`
            },
        }, {
            name: 'date',
            rules: {
                required: true,
                message: `${languageObj['dateLimit']}`
            },
        }, {
            name: 'require',
            rules: {
                required: true,
                message: `${languageObj['requireLimit']}`,
                maxLength: 200,
            },
        }],

        radioItems: [{
                name: `${languageObj["english"]}`,
                value: 'english',
                // checked: true
            },
            {
                name: `${languageObj["spanish"]}`,
                value: 'spanish'
            }
        ],

        uploadLoading: {
            status: false,
            text: languageObj['upload']
        },
        submitFormLoading: false,
    },
    attached: function () {
        this.setData({
            _t: languageObj,
        })
        setBarTitle(this)
    },
    methods: {
        radioChange: function (e) {
            var radioItems = this.data.radioItems;
            for (var i = 0, len = radioItems.length; i < len; ++i) {
                radioItems[i].checked = radioItems[i].value == e.detail.value;
            }

            this.setData({
                radioItems: radioItems,
                [`formData.radio`]: e.detail.value
            });
        },
        formReset: function(e){
            console.log(e)
        },
        bindDateChange: function (e) {
            this.setData({
                date: e.detail.value,
                [`formData.date`]: e.detail.value
            })
        },
        formInputChange(e) {
            const {
                field
            } = e.currentTarget.dataset
            this.setData({
                [`formData.${field}`]: e.detail.value
            })
        },
        bindTimeChange: function (e) {
            this.setData({
                time: e.detail.value
            })
        },
        requireChange: function (e) {
            const {
                field
            } = e.currentTarget.dataset
            this.setData({
                [`formData.${field}`]: e.detail.value
            })
        },
        uploadFile() {
            const that = this;
            const tokenObj = wx.getStorageSync('token');

            wx.chooseMessageFile({
                count: 1, //能选择文件的数量
                type: 'file', //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
                success(res) {
                    var size = res.tempFiles[0].size;
                    var filename = res.tempFiles[0].name;
                    var newfilename = filename + "";
                    const fileType = newfilename.indexOf(".pdf") == -1 && newfilename.indexOf(".doc") == -1 && newfilename.indexOf(".docx") == -1
                    const newFileList = that.data.fileList;


                    if (size > 2097152) {
                        wx.showToast({
                            title: `${languageObj['fileLimit']}`, // 这里如果更改了大小 en.js zh_cn的语言文件也要改
                            icon: "none",
                            mask: true
                        })
                    } else if (fileType) {
                        wx.showToast({
                            title: `${languageObj['fileTypeLimit']}`,
                            icon: "none",
                            mask: true
                        })
                    } else {
                        that.setData({
                            path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
                            uploadLoading: {
                                status: true,
                                text: 'uploading...'
                            },
                        })

                        // 通过url将文件上传上去

                        WXAPI.uploadFile(tokenObj.token, that.data.path).then(res => {
                                console.log("文件上传后的结果", res, filename)
                                newFileList.push({
                                    filename,
                                    url: res.data.url
                                });
                                that.setData({
                                    path: null,
                                    uploadLoading: {
                                        status: false,
                                        text: languageObj['upload']
                                    },
                                    fileList: newFileList
                                })
                            })
                            .catch(err => {
                                console.error("文件上传错误", err)
                                wx.showToast({
                                    title: `${err.errMsg}`,
                                    icon: "none",
                                    mask: true
                                })
                                that.setData({
                                    uploadLoading: {
                                        status: false,
                                        text: languageObj['upload']
                                    },
                                })
                            })



                    }
                }
            })

        },
        submitForm() {
            const token = wx.getStorageSync('token')
            if (!token) {
                wx.showToast({
                    title: '请先登录（please login）',
                    icon: 'none'
                })
                return
            }
            this.selectComponent('#form').validate((valid, errors) => {
 
                if (!valid) {
                    const firstError = Object.keys(errors)
                    if (firstError.length) {
                        this.setData({
                            error: errors[firstError[0]].message
                        })

                    }
                } else {
                    // wx.showToast({
                    //     title: '校验通过'
                    // })
                    console.log("表单数据", this.data.formData)

                    const {
                        wordLimit
                    } = this.data.formData;
                 
                    if (parseInt(wordLimit)) submitForm(this.data.formData, this);
                    else wx.showToast({
                        title: `${languageObj['wordLimitNum']}`,
                        icon: 'none',
                    })
                }
            })
        }

    },
    pageLifetimes: {
        show() {
            initalTableBar(1, this)
        }
    }
});