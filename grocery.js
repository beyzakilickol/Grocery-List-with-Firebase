let categoryTextBox = document.getElementById("categoryTextBox")
let categoryAddButton = document.getElementById("categoryAddButton")
let categoryContainer = document.getElementById("categoryContainer")
let cardCategoryName = document.getElementById("cardCategoryName")
let itemListContainer = document.getElementById("itemListContainer")
let addItemsButton = document.getElementById("addItemsButton")
let itemTextBox = document.getElementById("itemTextBox")
let itemAddButton = document.getElementById("itemAddButton")
let mainContainer = document.getElementById("main-container")

  let itemListArr = []
const database = firebase.database()
const categories = database.ref("categories")


itemAddButton.addEventListener("click", function(){

     itemListArr.push(itemTextBox.value)
console.log(itemListArr)
})

categoryAddButton.addEventListener("click", function(){

    let categoryName = categories.child(categoryTextBox.value)
    categoryName.set(itemListArr)
    itemListArr = []


  })

let allObj =[]
  //--------------------------
  function configureObservers() {

    categories.on('value',function(snapshot){

        snapshot.forEach(function(childSnapshot){

           allObj.push({name : childSnapshot.key, item: childSnapshot.val()})



        })

        // we know that all Categories and items are populated
        displayData()
    })
  }
  //  <button id="addItemsButton">Add items</button>

  function displayData(){
let count = 1
  allObj.map(function(each){

    let data =   `<div id="category-container">
        <h2 id="cardCategoryName">${each.name} </h2>

        <ul id=${count}>

        </ul>

      </div>`

    mainContainer.insertAdjacentHTML("beforeend", data)
    each.item.map(function(item){
      let itemList =`<li>${item}</li>`
      let listID = document.getElementById(count)
      listID.insertAdjacentHTML("beforeend",itemList)


    })



count++


})
}
configureObservers()
