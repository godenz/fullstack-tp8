var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
 
var server = http.createServer(function(request, response) {
    var elPath = request.url;
//    console.log("la url ", elPath, "    la extensión ", path.extname(elPath));

    // Si no tiene extensión o la petición no es GET error 400 invalid
    if (path.extname(elPath) === '' || request.method !== 'GET') {
        response.writeHead(400, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream("invalid.html").pipe(response);
    } 

    else {
        // si no existe el arhivo en el directorio relativo al actual
        if (fs.existsSync('.' + elPath) === false) {
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            fs.createReadStream("notFound.html").pipe(response);        
        }   
        else {            
            //  lo muestro
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            fs.createReadStream('.' + elPath).pipe(response);
        }

    }

});

//server.listen(8000, function() {
server.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP, function() {
    console.log('ahora si estoy escuchando');
});
