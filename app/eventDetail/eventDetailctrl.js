export default class eventDetailctrl{
  /*@ngInject;*/
  constructor($scope , $location,$http, detailfact,$stateParams, $localStorage){
    this.loc=$location;
    this.location=$location;
    this.sp=$stateParams;
    this.scope=$scope;
    this.http=$http;
    this.ls=$localStorage;
    this.scope.rate=0;
    this.scope.show=false;
    this.scope.rateflag=false;
    this.scope.count=0;
    this.scope.attendence=false;
    this.scope.starflag=false;
    this.scope.single_event=[];
    this.services=detailfact;
    this.scope.fab="Web/ic_floating_button.png";
    console.log(this.sp);
    // this.services.getDetails().success((res)=>{
    //   console.log("hiiiiiiiiiiiiiiiiiiiiiii" ,res);
    //   this.scope.detail=res;
  // })
    console.log(this.rp);
    this.services.getEventDetail(this.sp.id).success((res)=>{
      console.log(res,"ppppppppppppppppppppppppppppppp");
      this.scope.detail=res;
  })
}
star(){
      this.scope.starflag=true;
  }

  speakerDetail(id,eid){
    this.ls.eventId=eid;
    console.log(this.ls.eventId,eid);
    this.location.path("speakerdetails/"+id);
  }
  setflag(){
    if(this.scope.show){
      this.scope.fab="Web/ic_floating_button.png";
    }
    else{
      this.scope.fab="Web/ic_floating_button_closed.png";
    }
    this.scope.show=!this.scope.show;
  }
  attendToggle(){
    if(this.scope.attendence){
    this.scope.content="You had chosen to attend this event. Please confirm if you do not want to attend this event.";
    this.scope.attendence=!this.scope.attendence;
  }
  else{
    this.scope.content="Please confirm if you really want to attend this event";
    this.scope.attendence=!this.scope.attendence;
    }
  }
  attendence(){
    if(!this.scope.attendence){
        this.scope.rateflag=false;
    }
    else{
        this.scope.rateflag=true;
    }
  }
}
