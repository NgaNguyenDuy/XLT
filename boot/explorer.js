module.exports = function mountLoopBackExplorer(server) {
  var explorer;
  try {
    explorer = require('vsoft-explorer');
  } catch(err) {
    console.log(
      'Run `npm install vsoft-explorer` to enable the vFrame explorer'
    );
    return;
  }

  var restApiRoot = server.get('restApiRoot');

  var explorerApp = explorer(server, { basePath: restApiRoot });
  server.use('/vapi', explorerApp);
  server.once('started', function() {
    var baseUrl = server.get('url').replace(/\/$/, '');
    // express 4.x (loopback 2.x) uses `mountpath`
    // express 3.x (loopback 1.x) uses `route`
    var explorerPath = explorerApp.mountpath || explorerApp.route;
    console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
  });
};
