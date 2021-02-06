console.log(
    process.argv.slice(2)
    .reduce((acc, curr) => acc + Number(curr), 0)
)