# using-nock.js
Simple node app for playing around with [nock.js](https://github.com/nock/nock)

## installing 

`cd api
`
`run npm install`

## about
`http://localhost:3000/nock-record
`

records a random wikipedia article and puts it into a json 
so nock can pick it up for mocked calls. (Does a live call)


`http://localhost:3000/get-random-wiki`

makes live call to wiki


`http://localhost:3000/nock-run-black-box-one
`

used `nock.js` to get recorded json and return it 

`http://localhost:3000/nock-run-black-box-two
`

used `nock.js` to return a json object. Just an example you can mock different responses
for the exact same call
