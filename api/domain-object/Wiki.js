class Wiki {
    constructor(data) {
        this.data = data
    }

    getData() {
        return this.data
    }
}

//lol this does not work
function register(bottleInstance) {
    //replace the static sync functions
    bottleInstance.factory('DomainObject',  function (container, randomParam) {
        const fetch = container.WIKI
        // const response = await fetch.getRandomWiki()
        if (randomParam === 'eduardo') {
            return new Wiki({
                eduardo: 'eduardo was here'
            })
        }
        return new Wiki('hello')
    })
}

module.exports = {Wiki, register}
