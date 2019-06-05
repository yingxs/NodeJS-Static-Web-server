const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

module.exports = async function(request,response,filePath){
    try {
        const stats = await stat(filePath)
        if (stats.isFile){
            response.statusCode = 200;
            response.setHeader('Content-Type','text/plain');
            fs.createReadStream(filePath).pipe(response);
            // fs.readFile(filePath,(error,data) => {
            //     response.end(data);
            // });
        } else if(stats.isDirectory) {
            const files =  readdir(filePath);
            response.statusCode = 200;
            response.setHeader('Content-Type','text/plain');
            response.end(files.join(','));
        }
    } catch(e) {
        response.statusCode = 404;
        response.setHeader("Content-Type","text/plain");
        response.end(filePath+"不是一个目录 或"+filePath+"不存在");
    }

}