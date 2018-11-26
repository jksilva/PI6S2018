
// myArray --> here we have the elements dragged for the workspace
var myArray = [];
// event on click if the block is on workspace open the menu and get into this variavle the value of the id of the button that take the action
var activeBlock;
// set of values of the blocks
var parameters= [];
// create a local database for the bocks that was used, if isn't there yet
var localDB = [{ "name" : "Scanner-input", "cod" : "// Declare the object and initialize with\n// predefined standard input object\nScanner sc = new Scanner(System.in);\n\n// String input\nchange_1 change_0 = sc.change_2();\n", "variables" : [ { "change_0" : "variableName", "default" : "name" }, { "change_1" : "typeofVar", "default" : "String" }, { "change_2" : "next line of type", "default" : "nextLine" } ], "imports" : "import java.util.Scanner;\n" }];


//check if the value of button is on localDB

function check(str){

  for (var i = 0; i < localDB.length; i++) {

    if (localDB[i].name ==str) {
      console.log(localDB[i]);
      var dataFound = localDB[i].name;
      var indexBD = i;
      parameters.push([localDB[indexBD].name,localDB[indexBD].variables])
    }else {
      if (i==(localDB.length-1)) {
        console.log(str,' not found');
        console.log(' trying to get on DB');
        var value = findBlock(str);
        localDB.push(value);
        console.log("add ",value);
        parameters.push([localDB[localDB.length-1].name,localDB[localDB.length-1].variables]);
      }

    }
  }


}



function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  if (ev.target.className=="drop-area") {
    var nodes = findAllBtn();
    if (nodes[0].childElementCount>1) {
      var teste = document.querySelector(".drop-area");
      teste.style.height = "auto";

      }

      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var newData = document.getElementById(data).cloneNode(true);
      newData.id = "b"+nodes[0].childElementCount;
      ev.target.appendChild(newData);

      // append to array
      myArray.push(newData.id);

  }
  console.log(myArray);
}

  function findAllBtn(){
  var blocks = document.querySelectorAll(".drop-area");
  console.log(blocks[0].childElementCount);
  return blocks;
}

//function for get and save the parameters values
function setParmsValues(){
    if (true) {

    }
}
// fill the right side hide menu with the parms that are allowed for the Function
function setParms(ev) {

 console.log('teste');

}
// after drop include on the array the information
function addArray(ev){
console.log('teste');
}

//remove from array when deleted
function delArray(ev){
console.log('teste');
}
// open the hide menu for seting the setParms
/* Set the width of the side navigation to 250px */
function openNav(ev) {
    if (ev.target.id[0]=='b') {
      document.getElementById("mySidenav").style.width = "250px";
      activeBlock = ev.target.id;
      console.log(activeBlock);
    }

}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    setParmsValues();

}
function deleteOne(ev) {
    document.getElementById(activeBlock).remove();
    arrayRemove(myArray,activeBlock);
    closeNav();
}

// create a function to remove element

function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}

// function for do a post request with some payload, for get the token
function postToken(emailAddress,password){
axios.post('http://localhost:3000/tokens',{
 emailAddress:emailAddress,
 password:password
}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}})
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});
}

// function for register users
function postUsers(fullName,emailAddress,password){
axios.post('http://localhost:3000/users',{
 fullName:fullName,
 emailAddress:emailAddress,
 password:password
}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}})
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});
}

// function for find one block at db
function findBlock(nameBlock){
axios.post('http://localhost:3000/blocks',{
 nameBlock:nameBlock
}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}})
.then(function (response) {
return response;
})
.catch(function (error) {
console.log(error);
});
}
