var express = require('express');
var router = express.Router();
let request = require('request')
let axios = require('axios')
const crypto = require('crypto')
const randomNumber = require('random-number');
const url = require('url');

router.post('/', function(req, res, next) {
    let data = req.body
    console.log("data", data)
    let key = "J0rC5a"
    let salt = 'J5OrgpgB'
    let txnid = randomNumber(-1000, 999999)
    let params = `${key}|${txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${salt}`

    data.hash = generateHash(params)
    data.key = key
    data.txnid = txnid
    data.surl = "https://tranquil-dawn-83649.herokuapp.com/payUBiz/success"
    data.furl = "https://tranquil-dawn-83649.herokuapp.com/payUBiz/failure"
    data.curl = "http://www.facebook.com"
    res.send(data)

});
function generateHash(params) {
    const hash512 = crypto.createHash('sha512')
    hash512.update(params)
    return  hash512.digest('hex')
}
function checkNull(param) {
    return param || ""
}

router.post('/success', function (req,res) {

    let data = res
    console.log("Success", data)



})

router.post('/failure', function (req,res) {

    let data = res
    console.log("Failure", data)



})


module.exports = router;