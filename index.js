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
    
    let salePrice = document.createElement('h4')
        salePrice.innerText = `$${saleObj.price}`
    
    let likeButton = document.createElement("button")
        likeButton.className = "like-btn"
        likeButton.innerText = "Like"

    let likesP = document.createElement('p')
        likesP.innerText = `${saleObj.likes} Likes`

    let deleteButton = document.createElement('button')
        deleteButton.className = "delete-btn"
        deleteButton.innerText = "X Delete post"

    saleCardDiv.append(saleDescriptionH2, saleImg, saleEmail, salePrice, likesP, likeButton, deleteButton)
    saleCollection.append(saleCardDiv)
    //event listers where unstable elements are created
    likeButton.addEventListener("click", function(){
    
        fetch(`http://localhost:3000/sale/${saleObj.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            likes: saleObj.likes + 1
          })
        })
          .then(res => res.json())
          .then(function(updatedSalesObj){
            saleObj.likes = updatedSalesObj.likes
            likesP.innerText = `${updatedSalesObj.likes} Likes`
          })
    })

      deleteButton.addEventListener("click", function(e){

        fetch(`http://localhost:3000/sale/${saleObj.id}`, {
          method: "DELETE"
        })
      })
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
       price: newPrice,
       likes:0
      
     })
   })
     .then(res => res.json())
     .then(function(newSale){
       addSalesPost(newSale)
     })
 
 
 })