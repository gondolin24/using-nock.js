const Bottle = require('bottlejs')

const FetchKit = require('../fetch/FetchKit')

var bottle = new Bottle();
const fetch = new FetchKit()
function wrapper(){
    return new FetchKit()
}

bottle.service('WIKI', wrapper);

module.exports = bottle
// bottle.container.beer
