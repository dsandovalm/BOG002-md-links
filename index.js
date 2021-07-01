const fs = require('fs');
const path = require('path');
const getDir = require('./lib/getFiles').getDir;
const readFile = require('./lib/reader');

function splitArrays(matrix){
  let split = [];
  matrix.forEach(array => {
    array.forEach(element => {
      split.push(element);
    })
  })
  return split;
}

function mdLinks (pathName, options = {validate:false}) {
  // Retorna una promesa que resuelve los links o un error
  return new Promise(
    function (resolve,reject){
      //Comprueba si la ruta existe
      if(fs.existsSync(pathName)){
        let extension = path.extname(pathName);
        switch (extension){

          case '.md':
            readFile(pathName, options.validate).then( (result) => {
              resolve(result);
            }).catch((error) => {
              reject(new Error(error));
            });
            break;

          case '':
            //Leer carpeta
            let dirFiles = [];
            getDir(pathName, dirFiles, ['node_modules']);
            let promises = dirFiles.map(filePath => {
              return readFile(filePath, options.validate)
            })
            Promise.all(promises).then((values) => {
              resolve(splitArrays(values));
              //resolve(links)
            }).catch((error) => {
              reject(new Error(error));
            });
            break;

          default:
            reject( new Error(`El archivo no tiene una extensión válida`));
            break;
        }
      } else {
        reject( new Error(`La ruta ${pathName} no existe`));
      } 
    }
  )
}

module.exports = (pathName, options) => {
  return mdLinks(pathName, options)
};
