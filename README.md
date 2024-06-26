# Ghost e2e

## Team

| Nombre | Correo electrónico |
| --- | ---|
| Andrea Villamizar | af.villamizarr1@uniandes.edu.co |
| Angello Villegas | a.villegasc2@uniandes.edu.co |
| Nelson Leonel Fonseca | n.fonsecao@uniandes.edu.co |
| Zamir Narro | j.narro@uniandes.edu.co |

## Entorno:
- Node v16.20.2
- Cypress 13.8.1
- Ghost 5.82.6 desplegado en https://ghost-rpq7.onrender.com/
- Ghost 3.42.0 desplegado en https://ghost-l9hj.onrender.com/

## Instalación

- Clonar el repositorio
```bash
git clone git@github.com:jnarro-miso/ghost-e2e.git
```

- Instalar dependencias
```bash
npm install
```

## Ejecución

### Semana 7(*):
Para ejecutar las pruebas con estrategias de generación de datos en conjunto:
```bash
npm run test:cypress
```

O hacerlo de manera individual:
```bash
cypress run --spec "cypress/e2e/10Escenarios-a-piori.cy.js"
cypress run --spec "cypress/e2e/10Escenarios-aleatorios.cy.js"
cypress run --spec "cypress/e2e/10Escenarios-pseudoAleatorio.cy.js"
cypress run --spec "cypress/e2e/pages.cy.js"
cypress run --spec "cypress/e2e/posts.cy.js"
```
---

### Tests de Cypress:
```bash
npm run test:cypress
```

### Tests de Kraken

- Hacer ejecutable el script
```bash
chmod +x runKrakenTests.sh
```

- Ejecutar el script que corre los escenarios
```bash
./runKrakenTests.sh
```

### Backstop a pruebas de cypress.
- instalar de forma global la herramienta, 
```bash
npm install -g backstopjs
```

- Correr las pruebas de cypress para generar los screenshots
```bash
npm run test:cypress
```

- Definir las imagenes de referencia:
```bash
backstop reference
```

- Ejecutar los test:
```bash
backstop test
```

### Resemble a pruebas de cypress
- Instalar reseblejs:
```bash
npm install resemblejs
```

- Ejecutar el script:
```bash
node index.js
```

- Revisar reporte en la carpeta `results` (situada en la raíz del proyecto).

* Ojo: Para ver el reporte y sus recursos (CSS e imágenes) es necesario lanzar un 
servidor de desarrollo local. Una opción es instalando http-server
```bash
npm install -g http-server
```

Y ejecutar
```bash
http-server [path]
```