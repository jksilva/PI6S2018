
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
      ev.target.appendChild(document.getElementById(data).cloneNode(true));
  }else  {


  }
  console.log(ev.target.className);
}

  function findAllBtn(){
  var blocks = document.querySelectorAll(".drop-area");
  console.log(blocks[0].childElementCount);
  return blocks;
}

function drop2(ev){
  if(ev.target.className == "") {
    ev.target.remove(ev);
    console.log('teste');
  }else {
    console.log('else condition');
  }
  console.log(ev.target);

}
