let saleCollection = document.querySelector('#sale-collection')
let submitBtn = document.querySelector('input.submit')
let saleForm = document.querySelector('.add-sales-form')

//GET fetch
fetch(`http://localhost:3000/sale`)
.then(res => res.json())
.then(function(salesArr){
   salesArr.forEach(function(saleObj){
       addSalesPost(saleObj)
   })})

//Helper functions renders images from DB to front page
function addSalesPost(saleObj){
    let saleCardDiv = document.createElement('div')
        saleCardDiv.className = "card";
    
    let saleDescriptionH2 = document.createElement('h2')
        saleDescriptionH2.innerText = saleObj.description
    
    let saleImg = document.createElement('img')
        saleImg.src = saleObj.image
        saleImg.alt = saleObj.description
        saleImg.className = "sale-avatar"

    let saleEmail = document.createElement('h3')
        saleEmail.innerText = saleObj.email
    
    let salePrice = document.createElement('p')
        salePrice.innerText = `$${saleObj.price}`
    
    saleCardDiv.append(saleDescriptionH2, saleImg, saleEmail, salePrice)
    saleCollection.append(saleCardDiv)
    
}

 
 
 // Stable Element Evt Listener on global level
   // Rare for you to do this inside of another event listener
   
 saleForm.addEventListener("submit", function(e){
   e.preventDefault()
   let newImage = e.target.image.value
   let newEmail = e.target.email.value
   let newPrice = parseInt(e.target.price.value)
   let newDescription = e.target.description.value

 
   fetch("http://localhost:3000/sale", {
     method: 'POST', 
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       description: newDescription,
       image: newImage,
       email: newEmail, 
       price: newPrice
      
     })
   })
     .then(res => res.json())
     .then(function(newSale){
       addSalesPost(newSale)
     })
 
 
 })