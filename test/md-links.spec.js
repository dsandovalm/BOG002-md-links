const mdLinks = require('../index.js');

jest.setTimeout(60000);

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
    return mdLinks('./test/testdir').then(data => {
      expect(data.length).toBe(9);
    });
  });
});

describe('Validacion', () => {
  it('Debe retornar un arreglo de objetos', () => {
    expect.assertions(1);
    return mdLinks('./test/testdir/testfile.md', {validate:true}).then(data => {
      expect(typeof data).toBe('object');
    });
  });

  /*test('Debe retornar un arreglo de objetos', async (done) => {
    const response = await mdLinks('./test/testdir/testfile.md', {validate:true});
    expect(typeof response).toBe('object');
    done();
  });*/
  it('Debe retornar 4 links con status 200', () => {
    expect.assertions(1);
    return mdLinks('./test/testdir/testfile.md', {validate:true}).then(data => {
      let valid = 0;
      data.map((link) => {
        if(link.status === 200){
          valid++
        }
      })
      expect(valid).toBe(4);
    });
  });
  /*
  test('Debe retornar 4 links con status 200', async (done) => {
    const response = await mdLinks('./test/testdir/testfile.md',{validate:true});
    let valid = 0;
    response.map((link) => {
      console.log(link.status)
      if(link.status === 200){
        valid++
      }
    })
    expect(valid).toBe(4);
    done();
  });*/
});

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
