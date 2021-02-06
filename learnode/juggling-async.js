const http = require('http');

const [, , url1, url2, url3] = process.argv;

const downloadContent = (url) => new Promise((resolve, reject) => {
    let result = '';
    
    http.get(url, (response) => {
        response.setEncoding('utf8');
        response.on('data', (data) => {
            result += data;
        });
    
        response.on('end',  () => {
            resolve(result);
        });
    
        response.on('error', (error) => reject(error));
    })
    .on('error', (error) => reject(error));
});

Promise.all([
    downloadContent(url1),
    downloadContent(url2),
    downloadContent(url3)
])
.then(([data1, data2, data3]) => {
    console.log(data1);
    console.log(data2);
    console.log(data3);
})