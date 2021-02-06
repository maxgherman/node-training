const https = require('https');

if(process.argv[2] === 'str') {

    // Data as string
    https.get('https://nodejs.org/api/string_decoder.html',
    (response) => {
        response.setEncoding('utf8');

        let responseData = '';
        response.on('data', (data) => {
            responseData += data;
        });

        response.on('end', ()=> {
            console.log('Finished\n', responseData);
        });

        response.on('error', console.log);
    })
    .on('error', console.log);
}

if(process.argv[2] === 'bfr') {

    // Data as string
    https.get('https://www.google.com', (response) => {
        
        const responseData = []
        response.on('data', (chunk) => {
            responseData.push(chunk);
        });

        response.on('end', ()=> {
            console.log('Finished\n', responseData);
            console.log('Result',  Buffer.concat(responseData).toString('utf8'));
        });

        response.on('error', console.log);
    })
    .on('error', console.log);
}

if(process.argv[2] === 'pipe') {
    https.get('https://www.google.com', (response) => {
        response.setEncoding('utf8');
        response.pipe(process.stdout);

        response.on('error', console.log);
    })
    .on('error', console.log);
}

