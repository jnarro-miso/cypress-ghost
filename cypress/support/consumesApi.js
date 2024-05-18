// curl -H "X-API-Key: b6e534e0" https://my.api.mockaroo.com/apriori_1.json GET

export function fetchDataFromAPI() {
    const url = 'https://my.api.mockaroo.com/apriori_1.json';
    const apiKey = 'b6e534e0';
  
    return fetch(url, {
      headers: {
        'X-API-Key': apiKey
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error en la solicitud a la API');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }