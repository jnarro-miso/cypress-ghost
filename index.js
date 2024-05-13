const compareImages = require("resemblejs/compareImages")
const fs = require('fs');

const browsers=[ "chromium"];
const options={
    "output": {
        "errorColor": {
            "red": 255,
            "green": 0,
            "blue": 255
        },
        "errorType": "movement",
        "largeImageThreshold": 1200,
        "useCrossOrigin": false,
        "outputDiff": true
    },
    "scaleToSameSize": true,
    "ignore": "antialiasing"
}

async function executeTest() {
  if (browsers.length === 0) {
      return;
  }
  let datetime = new Date().toISOString().replace(/:/g, ".");
  const results = {}; // Objeto para almacenar los resultados de todas las comparaciones

  for (const b of browsers) {
      if (!['chromium', 'webkit', 'firefox'].includes(b)) {
          continue;
      }

      const resultInfo = {}; 
      if (!fs.existsSync(`./results/${datetime}`)) {
          fs.mkdirSync(`./results/${datetime}`, { recursive: true });
      }

      const imagePairs = [
          {
              reference: './cypress/screenshots/EP06-EP07-EP08-EP09-EP010.cy.js/EP06-01-5.82.6.png',
              test: './cypress/screenshots/EP06-EP07-old.cy.js/EP06-01-3.42.0.png',
              nameTest:'EP07-1'
          },
          {
              reference: './cypress/screenshots/EP06-EP07-EP08-EP09-EP010.cy.js/EP06-02-5.82.6.png',
              test: './cypress/screenshots/EP06-EP07-old.cy.js/EP06-02-3.42.0.png',
              nameTest:'EP07-2'
          },
          {
            reference: './cypress/screenshots/EP06-EP07-EP08-EP09-EP010.cy.js/EP06-03-5.82.6.png',
            test: './cypress/screenshots/EP06-EP07-old.cy.js/EP06-03-3.42.0.png',
            nameTest:'EP07-3'
        },
        {
            reference: './cypress/screenshots/EP06-EP07-EP08-EP09-EP010.cy.js/EP06-04-5.82.6.png',
            test: './cypress/screenshots/EP06-EP07-old.cy.js/EP06-04-3.42.0.png',
            nameTest:'EP07-4'
        },
        {
            reference: './cypress/screenshots/EP06-EP07-EP08-EP09-EP010.cy.js/EP06-05-5.82.6.png',
            test: './cypress/screenshots/EP06-EP07-old.cy.js/EP06-05-3.42.0.png',
            nameTest:'EP07-5'
        },

          // Añade más pares de imágenes aquí...
      ];

      for (const pair of imagePairs) {
          const data = await compareImages(
              fs.readFileSync(pair.reference),
              fs.readFileSync(pair.test),
              options
          );
          // Almacena los resultados para este par de imágenes
          resultInfo[pair.reference + '_' + pair.test] = {
              reference: pair.reference,
              test: pair.test,
              nameTest: pair.nameTest,
              isSameDimensions: data.isSameDimensions,
              dimensionDifference: data.dimensionDifference,
              rawMisMatchPercentage: data.rawMisMatchPercentage,
              misMatchPercentage: data.misMatchPercentage,
              diffBounds: data.diffBounds,
              analysisTime: data.analysisTime
          };

          // Guarda la imagen de comparación
          fs.writeFileSync(`./results/${datetime}/compare-${pair.reference.replace(/\//g, '_')}-${pair.test.replace(/\//g, '_')}-${b}.png`, data.getBuffer());
      }

      // Almacena los resultados
      results[b] = resultInfo;
  }

  function browser(b, info) {
    let browserHTML = ''; // Variable para almacenar el HTML de un navegador específico
    for (const pairKey in info) {
        const pairInfo = info[pairKey];
        const referenceImage = pairInfo.reference;
        const testImage = pairInfo.test;
    

        // Construye el HTML para el par de imágenes
        browserHTML += `
        <div class=" browser" id="test0">
            <div class=" btitle">
                <h3>${pairInfo.nameTest}</h3>
                <p>Data: ${JSON.stringify(pairInfo)}</p>
            </div>
            <div class="imgline">
                <div class="imgcontainer">
                    <span class="imgname">Reference</span>
                    <img class="img2" src="../.${referenceImage}" id="refImage" label="Reference">
                </div>
                <div class="imgcontainer">
                    <span class="imgname">Test</span>
                    <img class="img2" src="../.${testImage}" id="testImage" label="Test">
                </div>
            </div>
            <div class="imgline">
                <div class="imgcontainer">
                    <span class="imgname">Diff</span>
                    <img class="imgfull" src="./compare-${referenceImage.replace(/\//g, '_')}-${testImage.replace(/\//g, '_')}-${b}.png" id="diffImage" label="Diff">
                </div>
            </div>
        </div>`;
    }
    return browserHTML;
}

function createReport(datetime, resInfo) {
    return `
    <html>
        <head>
            <title> VRT Report Resemble </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${Object.keys(resInfo).map(b => browser(b, resInfo[b])).join('')} <!-- Utiliza Object.keys para iterar sobre las claves de resInfo -->
            </div>
        </body>
    </html>`;
}


  // Crea el informe con todos los resultados
  fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, results));
  fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

  console.log('------------------------------------------------------------------------------------');
  console.log("Execution finished. Check the report under the results folder");
  return results;
}
(async ()=>console.log(await executeTest()))();