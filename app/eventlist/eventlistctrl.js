export default class eventlistctrl{
  /*@ngInject;*/

  constructor($scope , $location , detailfact , $localStorage,$timeout,$state){
    this.location=$location;
    this.ls=$localStorage;
    this.timeout=$timeout;
    this.scope=$scope;
    this.scope.count=0;
    this.scope.Array=[[]];
    this.state=$state;
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
      var todayDate=Date.parse(moment().format().split('T')[0]);
      detailfact.getDetails().success(res => {
      this.tempobj={};
      this.tempobj1={};
      this.tempobj2={};
      for(var i=0;i<res.length;i++){
          this.scope.errormsg="";
          var temp=String(res[i].startsOn.date).split(' ');
          // var dateofEvent=temp[0];
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
          res[i].date=temp[0];
          var tempdate=String(temp[0]).split('-');
          console.log(tempdate);
          res[i].Eventdate=tempdate[2];
          res[i].Eventyear=tempdate[0];
          for(var j=0;j<12;j++){
            if(tempdate[1]==(j+1)){
          res[i].Eventmonth=this.months[j];
            }

          }

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
      this.scope.filteredArray=res;


      var dummyDate=Date.parse(String(moment(res[0].startsOn.date).format().split('T')[0]));
          console.log(dummyDate<todayDate);
          for(let i=1;i<=res.length-1;i++){
            if(dummyDate<todayDate){
              dummyDate=Date.parse(String(moment(res[i].startsOn.date).format().split('T')[0]));
              console.log(i,"if",dummyDate);
              continue;
            }
            else{
              dummyDate=moment(dummyDate).format().split('T')[0]
              console.log(i,"else",new Date(moment(dummyDate).format().split('T')[0]));
              var showDate=dummyDate
              var showDay=moment(dummyDate).format('LLLL').split(',')[0];
              while(true){
                      if(showDay=="Saturday"){
              	break;
              	}
                     else{

              	dummyDate=moment(dummyDate).subtract(1,'days').format().split('T')[0];
              	showDay=moment(dummyDate).format('LLLL').split(',')[0];
              	}
              }
              this.timeout(()=>{
              this.indexArr=[];
              this.dateArr=[];
              this.dateObj={};
                  for(let i=0;i<7;i++){
                     this.indexArr.push(dummyDate);
                     this.dateObj.date=dummyDate;
                     this.dateObj.printDate=dummyDate.split('-')[2];
                     var tempMonth=String(moment(dummyDate).format('LL')).split(' ');
                     this.dateObj.month=tempMonth[0]+" "+tempMonth[2];
                     this.dateObj.day=moment(dummyDate).format('LLLL').split(',')[0];
                     this.dateArr.push(this.dateObj);
                     this.dateObj={};
                     dummyDate=moment(dummyDate).add(1,'days').format().split('T')[0];
                  }
              this.timeout(()=>{
              this.scope.final=this.dateArr;
              this.scope.currentTab=this.indexArr.indexOf(showDate);
            },0);
              },0)
              break;
            }

          }
   })
   .error((error)=>{
    //  console.log("ERROR",error);
   })

    this.scope.slickConfig2 = {
          infinite: false,
          speed: 300,
          slidesToShow: 8,
          slidesToScroll: 7,
          centerMode:false,
          method:{},
          focusOnSelect:true,
          // initialSlide:this.scope.currentTab,
          arrows:false
        };

}
  getevents(date){
    var tempArr=[];
    var print=[];

    console.log("seeeee",this.indexArr,date,this.scope.currentTab);


    this.timeout(()=>{
        this.scope.slickConfig2.method.slickGoTo(this.scope.currentTab);
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
  this.timeout(() => {
     console.log('IT WORKS', this);
     this.state.go("details", {
        id
     });
  }, 0);

}

calendar(){
  this.ls.calendarflag=1;
}
calEvent(dummyDate){
  dummyDate=moment(dummyDate).format().split('T')[0];
          var showDate=dummyDate;
          var showDay=moment(dummyDate).format('LLLL').split(',')[0];
          while(true){
                  if(showDay=="Saturday"){
            break;
            }
                 else{

            dummyDate=moment(dummyDate).subtract(1,'days').format().split('T')[0];
            showDay=moment(dummyDate).format('LLLL').split(',')[0];
            }
          }
          this.timeout(()=>{
          this.indexArr=[];
          this.dateArr=[];
          this.dateObj={};
              for(let i=0;i<7;i++){
                 this.indexArr.push(dummyDate);
                 this.dateObj.date=dummyDate;
                 this.dateObj.printDate=dummyDate.split('-')[2];
                 var tempMonth=String(moment(dummyDate).format('LL')).split(' ');
                 this.dateObj.month=tempMonth[0]+" "+tempMonth[2];
                 this.dateObj.day=moment(dummyDate).format('LLLL').split(',')[0];
                 this.dateArr.push(this.dateObj);
                 this.dateObj={};
                 dummyDate=moment(dummyDate).add(1,'days').format().split('T')[0];
              }
                  this.timeout(()=>{
                  this.scope.final=this.dateArr;
                  this.scope.currentTab=this.indexArr.indexOf(showDate);
                  this.getevents(showDate);
                },0);
          },0)

}

search_event(){
  this.scope.showbox=!this.scope.showbox;
  this.scope.searchFlag= !this.scope.searchFlag;
}

}
