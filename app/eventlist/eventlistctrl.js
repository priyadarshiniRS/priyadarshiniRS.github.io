
export default class eventlistctrl{
  /*@ngInject;*/

  constructor($scope , $location , detailfact , $localStorage,$timeout){
    this.loc=$location;
    this.ls=$localStorage;
    this.timeout=$timeout;
    this.scope=$scope;
    this.scope.count=0;
    this.ls.calendarflag=0;
    this.detailfact=detailfact;
    this.ls=$localStorage;
    this.count=7;
    // this.scope.events=[];
    this.scope.dt=new Date();

    this.detailfact.checkload();
    this.scope.options={
      showWeeks: false
    }
    this.scope.listConfig = {
              infinite: false,
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1,
              method: {}
            };
        this.scope.events={};
        // console.log(this.scope.events);

      this.days=['Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday'];
      var today=new Date();
      var temp=String(today).split(' ');
      var todayDate=temp[2];
      detailfact.getDetails().success(res => {
      this.dateArray=[];
      // var date = new Date(Date.parse(res[0].startsOn.date));
      // var temp=String(res[0].startsOn.date).split(' ');
      // var ndate=String(temp[0]).split('-');
      // var starttab=ndate[ndate.length-1];
      //
      // var temp=String(res[res.length-1].endsOn.date).split(' ');
      // var ndate=String(temp[0]).split('-');
      // var endtab=ndate[ndate.length-1];

      for(let i=1,j=0;i<=30;i++,j++){
        if(i==todayDate){
          this.scope.currentTab=j;
        }
        if(i<10){
        i="0"+String(i);
        }
      this.dateArray.push(String(i));
      }
  this.scope.details= this.dateArray;
  console.log("nowwwwwwwwwpofhjgoojmdsp[fo]",this.scope.currentTab);

   })
   .error((error)=>{
    //  console.log("ERROR",error);
   })

    this.scope.slickConfig2 = {
          infinite: false,
          speed: 300,
          slidesToShow: 7,
          slidesToScroll: 1,
          method:{},
          focusOnSelect:true
        };


}
  getevents(date){
    var tempArr=[];
    var print=[];
    console.log("index",this.dateArray.indexOf(date));
    this.scope.currentTab=this.dateArray.indexOf(date);

    this.timeout(()=>{
        this.scope.slickConfig2.method.slickGoTo(this.scope.currentTab,false);
    },1000)
        this.detailfact.getDateDetail("2016-11-"+date).success((res)=>{
          if(res.code==3||res.code==4){
                   this.scope.errormsg="No Events";
                 }
          else{
        for(var i=0;i<res.length;i++){
          this.scope.errormsg="";
          var temp=String(res[i].startsOn.date).split(' ');
          var stime=String(temp[temp.length-1]).split('.');
          var starttime=String(stime[0]).split(':');
          console.log(starttime[0]+":"+starttime[1]);
          if(starttime[0]>=12){
            if(starttime[0]>12){
              starttime[0]=starttime[0]-12;
            }
            starttime[2]="pm";
          }
          else{
            starttime[2]="am";
          }
          res[i].startTime=starttime[0]+":"+starttime[1]+" "+starttime[2];

           temp=String(res[i].endsOn.date).split(' ');
           stime=String(temp[temp.length-1]).split('.');
           var starttime=String(stime[0]).split(':');
           console.log(starttime[0]+":"+starttime[1]);
           if(starttime[0]>=12){
             if(starttime[0]>12){
               starttime[0]=starttime[0]-12;
             }
             starttime[2]="pm";
           }
           else{
             starttime[2]="am";
           }
           res[i].endTime=starttime[0]+":"+starttime[1]+" "+starttime[2];


        }

        for(i=0;i<res.length-1;i++){
          if(res[i].startTime==res[i+1].startTime){
            tempArr.push(res[i]);
          }
          else if(tempArr.length===0){
            tempArr.push(res[i]);
            print.push(tempArr);
            tempArr=[];
          }
          else{
            tempArr.push(res[i]);
            print.push(tempArr);
            tempArr=[];
          }
        }
        if(res.length==1){
          tempArr.push(res[i]);
          print.push(tempArr);
          tempArr=[];
        }
        else if(res[i].startTime!=res[i-1].startTime){
        tempArr.push(res[i]);
        print.push(tempArr);
        tempArr=[];
      }
      else if(tempArr.length!=0){
        tempArr.push(res[i]);
        print.push(tempArr);
        tempArr=[];
      }
        this.scope.Array=print;
      }
      })
  }
detailfun(id){
  this.loc.path("details/"+id)

}

calendar(){
  this.ls.calendarflag=1;
  console.log("calendar");
}
calEvent(dt){
  console.log("Date clicked",dt);
  var caldate=String(dt).split(' ');
  console.log("Date",caldate[2]);
  this.scope.slickConfig2.method.slickGoTo((caldate[2]-1));
  this.getevents(caldate[2]);
}



}
