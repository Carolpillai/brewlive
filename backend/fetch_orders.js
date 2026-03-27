const http = require('http');

http.get('http://localhost:5050/debug-orders', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    require('fs').writeFileSync('debug_output.json', data);
    console.log('Done');
    process.exit(0);
  });
}).on('error', (err) => {
  console.error(err);
  process.exit(1);
});
