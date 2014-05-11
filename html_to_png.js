
var page = require('webpage').create()
var system = require('system')
var args = system.args
var address = args[1] 
var picName = args[2]
var userWidth = args[3]
var userHeight = args[4]

var defaultSize = {
    width: userWidth || 1200,
    height: userHeight || 768
}

if(args.length < 3){
    console.log("please pass two more parameters: 'url address' and 'picture name'")
}
page.viewportSize = {width: defaultSize.width, height: defaultSize.height}
page.zoomFactor = 0.5

page.open(address, function() {
    page.render(picName+'.png')
    phantom.exit()
});
