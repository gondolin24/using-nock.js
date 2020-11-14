const Bottle = require('bottlejs')
const WIKI = require('../domain-object/Wiki')
const FetchKit = require('../fetch/FetchKit')

var bottle = new Bottle();

bottle.service('WIKI', () => {
    return new FetchKit()
});

WIKI.register(bottle)


module.exports = bottle
// bottle.container.beer
