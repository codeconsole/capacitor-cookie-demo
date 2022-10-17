const https = require(`https`)
const fs = require(`fs`)
const url = require('url');

// const options = {
//   key: fs.readFileSync(`cert/privkey.pem`),
//   cert: fs.readFileSync(`cert/fullchain.pem`)
// }

const options = {
  key: fs.readFileSync(`cert/privkey.pem`),
  cert: fs.readFileSync(`cert/fullchain.pem`)
}

const getCookieValue = (cookies, name) => (
  cookies?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

https.createServer(options, function(req,res){
  // https://stackoverflow.com/questions/44405448/how-to-allow-cors-with-node-js-without-using-express
  var headers = {
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 30 * 24 * 60 * 60, // 30 days
  }

  console.log('[Origin:'+req.headers.origin+'] : '+req.method + ' ' + req.url + ' ['+getCookieValue(req.headers.cookie, 'mycookie')+']')

  if (req.headers.origin) {
      headers['Access-Control-Allow-Origin'] = req.headers.origin
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    const query = url.parse(req.url, true).query
    if (query.cookie) {
      if (query.cookie == 'delete') {
        headers["Set-Cookie"] = 'mycookie=deleted; Max-Age=-1; SameSite=None; Secure'
      } else {
        headers["Set-Cookie"] = 'mycookie=cookie;'+(query.cookie == 'samesite'?' SameSite=None; Secure':'')
      }
    }
    res.writeHead(200, Object.assign(headers, {
        "Content-Type": `application/json`
    }))

    var myCookie = getCookieValue(req.headers.cookie, 'mycookie')
    var result = {
      "Cookie": myCookie? 'mycookie='+myCookie : '',
      "Set-Cookie": headers["Set-Cookie"]
    }

    var json = JSON.stringify(result)
    if (query.callback) {
      res.end(`${query.callback}(${json});`)
    } else {
      res.end(json)
    }
    return
  }

  res.writeHead(405, headers)
  res.end(`${req.method} is not allowed for the request.`)
}).listen(8443)
