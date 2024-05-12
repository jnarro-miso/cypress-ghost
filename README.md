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

### Tests de Cypress:
```bash
npm run test:cypress
```

### Tests de Kraken

- Hacer ejecutable el script
```bash
chmod +x runKrakenTests.sh
```

- Ejecutar el script que correr los escenarios
```bash
./runKrakenTests.sh
```