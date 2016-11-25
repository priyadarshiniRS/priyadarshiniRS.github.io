export default class businesscardCtrl{
  /*@ngInject;*/
  constructor($scope , $location,$http, detailfact,$stateParams, $localStorage,$window,$timeout){
    this.location=$location;
    this.rp=$stateParams;
    this.window=$window;
    this.scope=$scope;
    this.timeout=$timeout;
    this.http=$http;
    this.scope.attendeelist={};
    this.ls=$localStorage;
    this.detailfact=detailfact;
    this.scope.yespic=false;
    this.scope.url=this.location.absUrl().split('?')[0];
    console.log(this.ls.phone);
    if(!this.ls.phone){
      console.log("irotp");
    // this.ls.person[0].pnumber=0;
  }
  this.timeout(()=>{
    console.log("ajay",this.ls);
    this.scope.person=this.ls.person[0];
    this.scope.editperson=angular.copy(this.ls.person[0]);
    console.log(this.ls.person[0]);
  }, 0);

  }
  updateprofile(){
  console.log("this.scope.person");
  if(this.scope.yespic){
    this.scope.person.pictureUrl=JSON.parse(this.window.localStorage.pic);
  }
  this.ls.person[0]=this.scope.editperson;
  this.location.path("businesscard");
  console.log("phonenumber" , this.scope.editperson.pnumber);
  if(this.scope.editperson.pnumber){
    this.ls.phone=true;
  }
  }
  goback(){
    console.log(this.ls.person);
    this.location.path("businesscard");
  }
  shareLinkedin(){
    if(this.scope.show){
      this.scope.fab="Web/ic_floating_button.png";
    }
    else{
      this.scope.fab="Web/ic_floating_button_closed.png";
    }
    this.scope.show=!this.scope.show;
  var payload = {
    "comment": this.location.absUrl().split('?')[0]+"\nName:"+this.scope.person.firstName+"\nDesignation:"+this.scope.person.positions.values[0].title+"\ncompany:"+this.scope.person.positions.values[0].company.name,
    "visibility": {
      "code": "anyone"
    }
  };

  IN.API.Raw("/people/~/shares?format=json")
    .method("POST")
    .body(JSON.stringify(payload))
    .result((data)=>{
      console.log(data);
      window.open(data.updateUrl, '_blank');
    })
  }
}
