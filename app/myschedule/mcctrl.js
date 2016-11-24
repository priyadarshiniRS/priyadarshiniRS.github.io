export default class mcctrl{
  /*@ngInject;*/
  constructor($scope ,$rootScope, $location,$http, detailfact,$stateParams, $localStorage ,$timeout,$state){
    this.location=$location;
    this.rs=$rootScope;
    this.timeout=$timeout;
    this.sp=$stateParams;
    this.scope=$scope;
    this.http=$http;
    this.state=$state;
    this.ls=$localStorage;
    this.detailfact=detailfact;
    this.detailfact.checkload();
    if(this.rs.profileData){
    this.ls.person=this.rs.profileData.values;

    this.detailfact.putlinkedin(this.ls.person).success((res)=>{
      console.log("linkedIn data sent", res);
      this.ls.attendeeId=res.id;
      console.log(res.id);
    })
  }
this.detailfact.myschedule(this.ls.attendeeId).success((res)=>{
  console.log("Myschu7dlke ressssssssssss",res);
  if(res.code==3||res.code==4){
           this.scope.errormsg="No Events";
         }
  else{
    this.scope.errormsg="";
       var dummyDay,tempMonth,mon;
       this.indexArray=[];
       this.newArray=[];
       this.newRes={};
       var day=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      this.days=['Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday'];
      this.newRes.date=String(String(res[0].startsOn.date).split(' ')[0]);
      this.newRes.printDate=String(this.newRes.date).split('-')[2];
      this.indexArray.push(this.newRes.date);
      dummyDay=String(moment(String(res[0].startsOn.date).split(' ')[0]).format('LLLL')).split(',')[0];
      tempMonth=String(moment(String(res[0].startsOn.date).split(' ')[0]).format('LL')).split(' ');
      mon=tempMonth[0]+' '+tempMonth[2];
      this.newRes.month=mon;
      this.newRes.day=dummyDay;
      this.newArray.push(this.newRes);
      this.newRes={};
console.log(String(String(res[0].startsOn.date).split(' ')[0]));
console.log(String(String(res[1].startsOn.date).split(' ')[0]));
      for(let p=1,j=0;p<res.length;p++){
        if(String(String(res[p-1].startsOn.date).split(' ')[0])==String(String(res[p].startsOn.date).split(' ')[0])){
          j++;
          console.log("same");
          continue;
        }
        else{
          let i=p-j;
          console.log("I value",i,p);
        this.newRes.date=String(String(res[p].startsOn.date).split(' ')[0]);
        this.newRes.printDate=String(this.newRes.date).split('-')[2];
        this.indexArray.push(this.newRes.date);
        dummyDay=String(moment(String(res[p].startsOn.date).split(' ')[0]).format('LLLL')).split(',')[0];
        tempMonth=String(moment(String(res[p].startsOn.date).split(' ')[0]).format('LL')).split(' ');
        mon=tempMonth[0]+' '+tempMonth[2];
        this.newRes.month=mon;
        this.newRes.day=dummyDay;
        this.newArray.push(this.newRes);
        this.newRes={};
      }
      }
      console.log("hgbfjikrabdfkjghrlukji",this.newArray,this.indexArray);
this.scope.res=this.newArray;
this.scope.currentTab=0;
  this.scope.myScheduleScroll = {
        infinite: false,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 1,
        method:{},
        focusOnSelect:true
      };
      }
      })
    }
      getDateEvents(dateVal,fullDate){
        this.scope.currentTab=this.indexArray.indexOf(fullDate);

        this.timeout(()=>{
            this.scope.myScheduleScroll.method.slickGoTo(this.scope.currentTab,false);
        },0)

        this.detailfact.getmyschedule(this.ls.attendeeId,fullDate).success((res)=>{
          if(res.code==3||res.code==4){
                   this.scope.errormsg="No Events";
                 }
          else{
            console.log(res);
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

               temp=String(res[0].endsOn.date).split(' ');
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
            this.scope.Array=res;
      }
            console.log("sceduleeeeeeeeeeeeeeeeeeeeeeeeee" , res);
      })
    }
    detailfun(id){
      this.timeout(() => {
         console.log('IT WORKS', this);
         this.state.go("details", {
            id
         });
      }, 0);
    }
}
