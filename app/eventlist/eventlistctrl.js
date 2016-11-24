export default class eventlistctrl{
  /*@ngInject;*/

  constructor($scope , $location , detailfact , $localStorage,$timeout){
    this.location=$location;
    this.ls=$localStorage;
    this.timeout=$timeout;
    this.scope=$scope;
    this.scope.count=0;
    this.scope.Array=[[]];
    // this.filter=$filter;
    this.scope.searchFlag=0;
    this.ls.calendarflag=0;
    this.scope.EventArray=[];
    this.detailfact=detailfact;
    this.count=7;
    $scope.search="";
    this.scope.variable=true;
    console.log("Login",this.ls.login);
    this.scope.dt=new Date();
    this.detailfact.checkload();
    this.scope.options={
      showWeeks: false,
      minDate:new Date('2016-11-01'),
      maxDate:new Date('2017-01-31')
    }
    this.scope.listConfig = {
              infinite: false,
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1,
              method: {}
            };
        this.scope.events={};
        var day=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      this.days=['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
      this.months=['January','February','March','April','May','June','July','August','September','October','November','December'];
      var today=new Date();
      var temp=String(today).split(' ');
      var todayDate=temp[2];
      detailfact.getDetails().success(res => {
      this.tempobj={};
      this.tempobj1={};
      this.tempobj2={};
      this.scope.filteredArray=res;
      //seach controller
      this.dateArray=[];
      this.dayArray=[];
      this.scope.final=[];
      this.indexArray=[];
      var d,tempMonth;
      var firstDate=new Date('11-01-2016');
      firstDate=String(firstDate).split(' ');
      var dayIndex=day.indexOf(firstDate[0]);

      for(let i=1,j=0;i<=30;i++,j++,dayIndex++){
        if(i<10){
        i="0"+String(i);
        }
        dayIndex=dayIndex%7;
        this.tempobj.day=this.days[dayIndex];
        d=moment('2016-11-'+i).format().split('T')[0];
        this.tempobj.date=d;
        this.tempobj.printDate=String(i);
        tempMonth=String(moment(d).format('LL')).split(' ');
        this.tempobj.month=tempMonth[0]+' '+tempMonth[2];
        this.scope.final.push(this.tempobj);
        this.tempobj={};
        this.dayArray.push(this.days[dayIndex]);
        this.dateArray.push(String(i));
        this.indexArray.push(d);
      }

      var firstDate=new Date('12-01-2016');
      firstDate=String(firstDate).split(' ');
      var dayIndex=day.indexOf(firstDate[0]);
      for(let i=1,j=0;i<=31;i++,j++,dayIndex++){
        if(i<10){
        i="0"+String(i);
        }
        dayIndex=dayIndex%7;
        this.tempobj1.day=this.days[dayIndex];
        d=moment('2016-12-'+i).format().split('T')[0];
        this.tempobj1.date=d;
        tempMonth=String(moment(d).format('LL')).split(' ');
        this.tempobj1.month=tempMonth[0]+' '+tempMonth[2];
        this.tempobj1.printDate=String(i);
        this.scope.final.push(this.tempobj1);
        this.tempobj1={};
        this.dayArray.push(this.days[dayIndex]);
      this.dateArray.push(String(i));
      this.indexArray.push(d);

      }

      var firstDate=new Date('01-01-2017');
      firstDate=String(firstDate).split(' ');
      var dayIndex=day.indexOf(firstDate[0]);
      for(let i=1,j=0;i<=31;i++,j++,dayIndex++){
        if(i<10){
        i="0"+String(i);
        }
        dayIndex=dayIndex%7;
        this.tempobj2.day=this.days[dayIndex];
        d=moment('2017-01-'+i).format().split('T')[0];
        this.tempobj2.date=d;
        tempMonth=String(moment(d).format('LL')).split(' ');
        this.tempobj2.month=tempMonth[0]+' '+tempMonth[2];
        this.tempobj2.printDate=String(i);
        this.scope.final.push(this.tempobj2);
        this.tempobj2={};
        this.dayArray.push(this.days[dayIndex]);
      this.dateArray.push(String(i));
      this.indexArray.push(d);

      }
    todayDate=Date.parse(String(moment().format().split('T')[0]));
    // console.log("today Date",Date.parse(this.indexArray[this.indexArray.length-1])>todayDate);
      for(let i=this.indexArray.length-1;Date.parse(this.indexArray[i])>todayDate;i--){
          this.detailfact.getDateDetail(this.indexArray[i]).success((res)=>{
            if(res.code==3||res.code==4){
              i--;
              // console.log(i);
            }
            else{
              // console.log(i,this.indexArray[i],"i ,this.indexArray[i]");
              this.scope.currentTab=i;
            }
          })
      }
   })
   .error((error)=>{
    //  console.log("ERROR",error);
   })

    this.scope.slickConfig2 = {
          infinite: false,
          speed: 300,
          slidesToShow: 7,
          slidesToScroll: 7,
          centerMode:false,
          method:{},
          focusOnSelect:true,
          initialSlide:this.scope.currentTab
        };

}
  getevents(date){
    var tempArr=[];
    var print=[];

    this.scope.currentTab=this.indexArray.indexOf(date);
    // console.log("seeeee",this.indexArray,date,this.scope.currentTab);


    this.timeout(()=>{
        this.scope.slickConfig2.method.slickGoTo(this.scope.currentTab,false);
    },0)
        this.detailfact.getDateDetail(date).success((res)=>{
          this.scope.EventArray=res;
          // console.log(this.scope.EventArray,"ssssssssssssssssssss");
          if(res.code==3||res.code==4){
                   this.scope.errormsg="No Events";
                 }
          else{
        for(var i=0;i<res.length;i++){
          this.scope.errormsg="";
          var temp=String(res[i].startsOn.date).split(' ');
          var stime=String(temp[temp.length-1]).split('.');
          var starttime=String(stime[0]).split(':');
          if(starttime[0]>=12){
            if(starttime[0]>12){
              starttime[0]=starttime[0]-12;
            }
            starttime[2]="pm";
          }
          else{
            starttime[2]="am";
          }
          res[i].startTime=starttime[0]+":"+starttime[1];
          res[i].period=starttime[2];

           temp=String(res[i].endsOn.date).split(' ');
           stime=String(temp[temp.length-1]).split('.');
           var starttime=String(stime[0]).split(':');
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
      // this.scope.Array=[ [{name:'Loading...'}] ];
        //
        // this.scope.load=false;
        // this.timeout(()=>{
         this.scope.Array=print;
          //this.scope.load=true;
        // },0)
      }


      })
  }
detailfun(id){
  this.location.path("details/"+id);

}

calendar(){
  this.ls.calendarflag=1;
}
calEvent(dt){
  var caldate=moment(dt).format().split('T');
  this.getevents(caldate[0]);

}

search_event(){
  this.scope.showbox=!this.scope.showbox;
  this.scope.searchFlag= !this.scope.searchFlag;
}

}
