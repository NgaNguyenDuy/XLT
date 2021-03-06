var vf = require('vf'),
    boot = require('vsoft-boot'),
    debug = require('debug')('xlt:vframe'),
    app = vf();

// request pre-processing middleware
app.use(vf.compress());

// using Favicon
app.use(vf.favicon());

// -- Add your pre-processing middleware here --
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Bootstrap application
boot(app, __dirname);


// The access token is only available after boot
app.use(vf.token({
    model: app.models.accessToken
}));

app.use(vf.cookieParser(app.get('cookieSecretXLTPrj')));

app.use(vf.session({
    secret: 'xltprj2015',
    saveUninitialized: true,
    resave: true
}));



 /*var Role = app.models.Role;
 var RoleMapping = app.models.RoleMapping;

 Role.create({
     name: 'teacher'
 }, function(err, role) {
     if (err) return debug(err);
//     debug(role);
     console.log(role);
     role.principals.create({
         principalType: RoleMapping.USER,
         principalId: "545a10f0e7d2e7ae551a78d3"
     }, function(err, principal) {
         if (err) return debug(err);
         debug(principal);
     });
 });
*/




// User.login({"email": "kyo1508@gmail.com", "password": "123456"}, function(err, accessToken) {
//     console.log(accessToken);
//     // User.logout(accessToken.id, function(err) {
//     //     console.log('Logout successful');
//     // });
// });


app.use(vf.urlNotFound());
app.use(vf.errorHandler());

app.start = function() {
    return app.listen(function() {
        app.emit('started');
        console.log('Server was running at %s', app.get('url'));
    });
};


// if(require.main === module) {
app.start();
// }
