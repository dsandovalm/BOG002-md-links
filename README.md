# MD Links

Este módulo de **node.js** encuentra y muestra los links que se encuentran en un archivo `.md`, o de todos los archivos `.md` encontrados en una carpeta.

## Instrucciones

### Instalación

El módulo se puede instalar escribiendo en consola `npm i @dsandovalm/md-links`

### Uso

mdLinks recibe como parametros una ruta (obligatorio) y un objeto con opciones y retorna una promesa que resuelve un arreglo de links o un error. 

Los links contienen la ruta del archivo en que se encontraron, el link y el texto en la etiqueta y adicionalmente el estado http del link y un mensaje de ok o fail cuando se validan.

## Documentación

Para importarlo en tu proyecto necesitarás colocar `const mdLinks = require('@dsandovalm/md-links')`

```

const mdLinks = require("md-links");

/*

  Input
  
    ruta :string // Obligatorio. La ruta relativa o absoluta del archivo .md o una carpeta
    
    opciones :objeto // Opcional. Opciones adicionales para ejecutar la función
      validate :booleano // 
      
  Output :link[]
  
    link = 
      {
        file :string, // La ruta del archivo donde se encontró el link
        href :string, // La URL del link
        text :string, // El texto que aparece en la etiqueta del link
        
        // - - - Atributos que se incluyen solo cuando validate = true
        ok :string, // Este es ok o fail
        status :number // El estado http del link
      }
    
*/

mdLinks("./some/example.md")
  .then(links => {
    // => [{ file, href, text }, ...]
  })
  .catch(console.error);
  
  mdLinks("./some/example.md", {validate:true})
  .then(links => {
    // => [{ file, href, text, ok, status }, ...]
  })
  .catch(console.error);

```

Para usarlo desde la consola

md-links <ruta> muestra un listado de los links encontrados

![image](https://user-images.githubusercontent.com/58996746/124075369-5a090200-da0a-11eb-8671-f1b75493e54a.png)

md-links <ruta> --stats muestra la cantidad de links encontrados en el archivo
  
![image](https://user-images.githubusercontent.com/58996746/124075516-98062600-da0a-11eb-9aa7-5c7a5a17b6bf.png)

md-links <ruta> --validate muestra un listado de los links encontrados junto a su estado de validación

![image](https://user-images.githubusercontent.com/58996746/124075699-e74c5680-da0a-11eb-91c7-5aa331ecaec8.png)

md-links sin parametros, md-links help, o md-links seguido por un comando no valido muestra el menu de ayuda principal

```
PowerShell> md-links

    md-links [path] <options>
        busca un archivo .md o carpeta en la ruta y muestra un listado de los links
    md-links [cmd] <options>
        version ............ muestra la version actual del paquete
        help ............... muestra el menu de ayuda

md-links help path 

    md-links [path] <options>
        validate .............. valida el estado de los links encontrados en el/los archivo(s)
        stats ................. muestra la cantidad de links encontrados
```


![md-links](https://user-images.githubusercontent.com/58996746/124073992-6e4bff80-da08-11eb-8d30-86a499f00365.png)


@dsandovalm/md-links 
