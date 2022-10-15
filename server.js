const https = require(`https`)
const fs = require(`fs`)

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

  console.log('['+req.headers.origin+'] : '+req.method + ' ' + req.url + ' ['+getCookieValue(req.headers.cookie, 'mycookie')+']')

  if (req.headers.origin) {
      headers['Access-Control-Allow-Origin'] = req.headers.origin
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    res.writeHead(200, Object.assign(headers, {
        "Set-Cookie": `mycookie=test`,
        "Content-Type": `application/json`
    }))
    res.end(JSON.stringify({ number: 1 , name: 'John'}))
    return
  }

  res.writeHead(405, headers)
  res.end(`${req.method} is not allowed for the request.`)
}).listen(8443)
