class BlockControler{

  construtor(){
    this._name = "input";
    this._id;
    this.initialize();
    this.initButtonsEvents();
  }

  initialize(){
    console.log("teste")
  }
  get name(){
    return this._name;
  }

  set name(name){
    this._name = name;
  }
  get id(){
    return this._id;
  }

  set id(id){
    this._id = id;
  }
  initButtonsEvents(){
    let blocks = document.querySelector(".col-md-11 > a");
    blocks.addEventListener('click',e=>{
      console.log(e);
    })
  }
}
