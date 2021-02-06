process.on('message', (message) => {
    console.log('[CHILD]: received message', message);
    
    const data = `${message.data} child data`;
    console.log('[CHILD]: sending data', `"${data}"`);
   
    process.send({ data });
});