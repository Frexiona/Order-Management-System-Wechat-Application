function getLanguage() {
  //返回缓存中的language属性 (en / zh_CN) 	
  return wx.getStorageSync('Language') || 'zh_CN'
};

function translate(){
  //返回翻译的对照信息
<<<<<<< HEAD
  console.log(" getLanguage()", require('./zh_CN.js'))
=======
>>>>>>> develope/1.1.0
  return require('./'+ getLanguage() + '.js').default;
}

function translateTxt(desc){
  //翻译	
  return translate()[desc] || 'No translate';
}

module.exports = {
  getLanguage: getLanguage,
  _t: translate,
  _: translateTxt,
}