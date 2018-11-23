

var block = new BlockControler();
var name = document.querySelector("#btn_1");
name.innerHTML = "ola mundo";
var dropTarget = document.querySelectorAll(".card > .card-body")

var blocks = document.querySelectorAll(".col-md-11 > a");
blocks.forEach((blk,index)=>{
  blk.addEventListener('drag',e=>{
    e.dataTransfer.setData("text", e.target.id);
  });
});

dropTarget.forEach((dropT,index)=>{
  dropT.addEventListener('drop',e=>{
    e.preventDefault();
    let data = e.dataTransfer.getData("text", e.target.id);
    console.log(data);
    e.target.appendChild(document.getElementById(data));
  });
});
