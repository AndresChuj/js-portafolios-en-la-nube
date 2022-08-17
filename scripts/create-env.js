//para trabajar con un modulo de node que nos permite trabajar con el sistema operativo y nos permite guardar o enviar datos
const fs = require('fs');

fs.writeFileSync('./.env', `API=${process.env.API}\n`)