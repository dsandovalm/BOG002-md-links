const mdLinks = require('../index.js');

describe('Lectura de archivos', () => {
  it('Debe retornar un arreglo de objetos',  () => {
    expect.assertions(1);
    return mdLinks('./README-lab.md').then(data => {
      expect(typeof data).toBe('object');
    });
  });
  it('Debe retornar 65 links', () => {
    expect.assertions(1);
    return mdLinks('./README-lab.md').then(data => {
      expect(data.length).toBe(65);
    });
  });
  it('Debe retornar un arreglo de objetos',  () => {
    expect.assertions(1);
    return mdLinks('./test/testdir/testfile.md').then(data => {
      expect(typeof data).toBe('object');
    });
  });
  it('Debe retornar 6 links',  () => {
    expect.assertions(1);
    return mdLinks('./test/testdir/testfile.md').then(data => {
      expect(data.length).toBe(6);
    });
  });
});

describe('Lectura de carpetas', () => {
  it('Debe retornar un arreglo de objetos',  () => {
    expect.assertions(1);
    return mdLinks('./test/testdir').then(data => {
      expect(typeof data).toBe('object');
    });
  });
  it('Debe retornar 9 links', () => {
    expect.assertions(1);
    return mdLinks('./test/testdir/testfile.md').then(data => {
      console.log(data)
      expect(data.length).toBe(9);
    });
  });
});

describe('Validacion', () => {
  test('Debe retornar un arreglo de objetos', async (done) => {
    const response = await mdLinks('Users/julieth/Documents/Laboratoria/Duplas/MDLinks/README.md');
    expect(typeof response).toBe('object');
    done();
  });
  test('Debe retornar 4 links con status 200', async (done) => {
    const response = await mdLinks('Users/julieth/Documents/Laboratoria/Duplas/MDLinks/README.md');
    let valid = [];
    response.map((link) => {
      if(link.href === 200){
        valid.push(link)
      }
    })
    expect(valid.length).toBe(4);
    done();
  });
});

/*
describe('Validacion', () => {
  it('Debe retornar un arreglo de objetos',  () => {
    expect.assertions(1);
    return mdLinks('./test/testdir/testfile.md',{validate:true}).then(data => {
      expect(typeof data).toBe('object');
    });
  });
  it('Debe retornar 4 links con status 200',  () => {
    expect.assertions(1);
    return mdLinks('./test/testdir/testfile.md',{validate:true}).then(data => {
      console.log(data);
      expect(typeof data).toBe('object');
    });
  });
});
*/

describe('Errores', () => {
  it('Ruta que no existe',  () => {
    expect.assertions(1);
    return mdLinks('Users/julieth/Documents/Laboratoria/Duplas/MDLinks/README.md').then(data => {
      //expect(data).toBe('La ruta Users/julieth/Documents/Laboratoria/Duplas/MDLinks/README.md no existe');
    }).catch(error => {
      expect(error.message).toBe('La ruta Users/julieth/Documents/Laboratoria/Duplas/MDLinks/README.md no existe');
    });
  });
  it('Archivo txt',  () => {
    expect.assertions(1);
    return mdLinks('./test/testdir/testnotmd.txt').then(data => {
    }).catch((error) => {
      expect(error.message).toBe('El archivo no tiene una extensión válida');
    });
  });
});