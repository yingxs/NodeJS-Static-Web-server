const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig');
const route = require('./helper/route');

const server = http.createServer((request,response)=>{
    const filePath =  path.join(conf.root,request.url);
    route(request,response,filePath);
    
});


server.listen(conf.port,conf.hostname,()=>{
    const addr = 'http://'+conf.hostname+':'+conf.port;
    console.info('Server started at '+chalk.green(addr));

});