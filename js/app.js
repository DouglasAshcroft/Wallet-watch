fetch('https://api.coinlore.net/api/global/')
.then(rawResponse => { 
  if(!rawResponse.ok){
    throw new Error(`code: ${rawResponse.status}, status text: ${rawResponse.statusText}`)
  } 
  return rawResponse.json() 
})
.then(jsonifiedResponse => console.log("Jsonified data: ", jsonifiedResponse))
.catch( error => console.log(error))