// function DB(){
  module.exports = function (){
  this.init = function(){
    this.setReport("B0");
    // craniaxjs.setReport("X10");
    this.setMask(1);
    this.setMask(35346832);
    this.setRules({
      prompt: "Bienvenida.vox",
      menu: "MAIN_VENTAPAQUETES",
      // backend: "setSegmentCategory"
    });
  }

  this.errLength = function() {
    // insert repo

    craniaxjs.exitHandler();
  }

  this.setSegmentCategory = function(segment){ 
    segment = segment.split('|')

    this.setInfoSession("category", segment[1])
    this.setInfoSession("segment", 'postpago')

    this.setRules({
      // backend: "getGlobalPromo"
      menu: "main"
    })
  }

  this.getDuration = function() {
    var date = new Date()
    var mil = date.getMilliseconds()
    // var min = Math.floor(mil / 60000)
    // var sec = ((mil % 60000) / 1000).toFixed(0)
    // (min < 10 ? '0' : '') + min + ":" + (sec < 10 ? '0' : '') + sec
    return mil
  }

  this.getDate = function() {
    var date = new Date()
    return date.getDate() + '/' +
      (date.getMonth() + 1) + '/' +
      date.getFullYear() + ' ' +
      (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' +
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':' +
      (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
  }

  this.getGlobalPromo = function(){
  }

  this.getBalanceTransfer = function(){}
}
