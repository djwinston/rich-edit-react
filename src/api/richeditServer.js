const http = require('http')

const requestListener = function (req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  if (req.url === '/richserver' && req.method === 'POST') {
    console.log('url richserver ===> ', req.url)
    
    req.on('data', (chunk) => {
      const resp = {chunkData: chunk, id: 100}
      console.table(`Data chunk available: ${resp.id}`)
      console.table(`Data chunk available: ${resp.chunkData}`)
    })
    req.on('end', () => {
      //end of data
      console.log('request end');

    })
    res.writeHead(200)
    res.end('RichEditor send document')
  } else {
    res.writeHead(200)
    res.end('Hello, World!')
  }
}

const server = http.createServer(requestListener)
server.listen(3030)
console.log('server started on port 3030')
