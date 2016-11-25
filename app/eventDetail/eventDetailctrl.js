export default class eventDetailctrl {
   /*@ngInject;*/
   constructor($scope, $window, $rootScope, $location, $http, detailfact, $stateParams, $localStorage, $state, $timeout) {


      this.location = $location;
      this.sp = $stateParams;
      this.scope = $scope;
      this.http = $http;
      this.window = $window;
      this.scope.atrate = false;
      this.ls = $localStorage;
      this.rs = $rootScope;
      this.scope.rate = 0;
      this.timeout = $timeout;
      this.state = $state;
      this.scope.show = false;
      this.scope.rateflag = true;
      this.scope.count = 0;
      this.scope.localrating = 0;
      this.scope.scheduleapiid = [];
      this.scope.attendence = false;
      this.scope.starflag = false;
      this.scope.single_event = [];
      this.detailfact = detailfact;
      this.scope.fab = "Web/ic_floating_button.png";
      this.ls.pd = localStorage.profileData;
      this.window.localStorage.atflag = false;
      this.scope.url=this.location.absUrl().split('?')[0];

      this.detailfact.getRateDetail(this.sp.id, this.ls.attendeeId).success((res) => {

            console.log("new one dude................>>", res);
            this.scope.detail = res;
            console.log(res, "ppppppppppppppppppppppppppppppp");
            var startDate = String(res.event[0].startsOn.date).split(' ');
            var starttime = String(String(startDate[1]).split('.')[0]).split(':');
            if (starttime[0] >= 12) {
               if (starttime[0] > 12) {
                  starttime[0] = starttime[0] - 12;
               }
               starttime[2] = "pm";
            } else {
               starttime[2] = "am";
            }
            var stime = starttime[0] + ":" + starttime[1] + " " + starttime[2];
            var startDate = String(res.event[0].endsOn.date).split(' ');
            var starttime = String(String(startDate[1]).split('.')[0]).split(':');
            if (starttime[0] >= 12) {
               if (starttime[0] > 12) {
                  starttime[0] = starttime[0] - 12;
               }
               starttime[2] = "pm";
            } else {
               starttime[2] = "am";
            }
            var etime = starttime[0] + ":" + starttime[1] + " " + starttime[2];
            this.scope.time = stime + "  " + "-" + "  " + etime;
            this.timeout(()=>{
              this.scope.eventDate = moment(String(res.event[0].startsOn.date).split(' ')[0]).format('dddd,Do MMM, YYYY');
            },0)
            this.eventdata();
            //compares date
            var d = moment().format().split('T');
            var date = new Date();
            var dd = new Date(res.event[0].endsOn.date);
            console.log(date.getTime(), ' ==>', dd.getTime(), dd);
            if (date.getTime() < dd.getTime()) {
               console.log("Enable rating");
               console.log(date, dd, "iffffffffffff");
               this.scope.rateflag = true;
            } else {
               this.scope.rateflag = false;
               console.log(date, dd, 'elseeeeeeeeeeeeeeeeee');
            }
         })
         .error((e) => {
            console.log("eeeeeeeeerrrrrrooooooorrrrrr dude,......", e);
         })
      if (this.rs.profileData) {
         this.ls.person = this.rs.profileData.values;
         this.detailfact.putlinkedin(this.ls.person).success((res) => {
            console.log("linkedIn data sent", res);
            this.ls.attendeeId = res.id;
         })

      } else {
         this.detailfact.getEventDetail(this.sp.id).success((res) => {
            console.log(res, "ppppppppppppppppppppppppppppppp");
            var startDate = String(res.event[0].startsOn.date).split(' ');
            var starttime = String(String(startDate[1]).split('.')[0]).split(':');
            if (starttime[0] >= 12) {
               if (starttime[0] > 12) {
                  starttime[0] = starttime[0] - 12;
               }
               starttime[2] = "pm";
            } else {
               starttime[2] = "am";
            }
            var stime = starttime[0] + ":" + starttime[1] + " " + starttime[2];
            var startDate = String(res.event[0].endsOn.date).split(' ');
            var starttime = String(String(startDate[1]).split('.')[0]).split(':');
            if (starttime[0] >= 12) {
               if (starttime[0] > 12) {
                  starttime[0] = starttime[0] - 12;
               }
               starttime[2] = "pm";
            } else {
               starttime[2] = "am";
            }
            var etime = starttime[0] + ":" + starttime[1] + " " + starttime[2];
            this.scope.time = stime + "  " + "-" + "  " + etime;
            this.timeout(()=>{
              this.scope.eventDate = moment(String(res.event[0].startsOn.date).split(' ')[0]).format('dddd,Do MMM, YYYY');
            },0)
            this.scope.detail = res;
            this.eventdata();
         })
      }
      this.detailfact.eventschedule(this.ls.attendeeId).success((res) => {
         console.log("hellooooooo this is myshedule in event detail", res);
         for (var i = 0; i < res.length; i++) {
            this.scope.scheduleapiid = res[i].id;
            console.log(res, this.scope.scheduleapiid, this.sp.id);
            if (this.scope.scheduleapiid == this.sp.id) {
               console.log("sameeeeeeeeeeeeeeeeeeeeeeeee to  sameeeeeeeeeeeeeeeeeeeeeeeeeeee");
               // if(this.rs.login){
               this.scope.rateflag = false;
               // }
               this.scope.attendence = true;
               break;
            }
         }
      })
   }

   eventdata() {
      console.log("called");
      this.window.localStorage.setItem('eventId', this.scope.detail.event[0].id);
      var dayConvert = {
         Mon: "Monday",
         Tue: "Tuesday",
         Wed: "Wednesday",
         Thu: "Thursday",
         Fri: "Friday",
         Sat: "Saturday",
         Sun: "Sunday"
      }
      var startDate = String(this.scope.detail.event[0].startsOn.date).split(' ');
      var starttime = String(String(startDate[1]).split('.')[0]).split(':');
      if (starttime[0] >= 12) {
         if (starttime[0] > 12) {
            starttime[0] = starttime[0] - 12;
         }
         starttime[2] = "pm";
      } else {
         starttime[2] = "am";
      }
      var stime = starttime[0] + ":" + starttime[1] + " " + starttime[2];
      var startDate = String(this.scope.detail.event[0].endsOn.date).split(' ');
      var starttime = String(String(startDate[1]).split('.')[0]).split(':');
      if (starttime[0] >= 12) {
         if (starttime[0] > 12) {
            starttime[0] = starttime[0] - 12;
         }
         starttime[2] = "pm";
      } else {
         starttime[2] = "am";
      }
      var etime = starttime[0] + ":" + starttime[1] + " " + starttime[2];
      this.scope.time = stime + "-" + etime;
      console.log("res is here............", this.scope.detail);
      this.scope.mainRating = this.scope.detail.myRating;
   }

   star() {
      this.scope.starflag = true;
   }

   speakerDetail(id) {
      this.ls.eventId = id;
      // this.location.path("speakerdetails/"+id);
      this.timeout(() => {
         console.log('IT WORKS', this);
         this.state.go("speakerdetails", {
            id
         });
      }, 0);
   }
   setflag() {
      var d = moment().format().split('T');
      var date = new Date();
      console.log("fffffffffffffffffffffffffffff");
      var dd = new Date(this.scope.detail.event[0].endsOn.date);
      console.log(date, dd, "dateepppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp");
      if (date > dd) {
         console.log("kkkkkkkkkkkkkkkkkkkkqqqqqqqqqqqqqqqqqqqqqqqqq");
         console.log(date, dd, "iffffffffffff");
         this.scope.dateexpire = true;
         console.log(this.scope.dateexpire, "date expired");
      } else {
         this.scope.dateexpire = false;
         console.log(date, dd, 'elseeeeeeeeeeeeeeeeee');
      }
      if (this.scope.show) {
         this.scope.fab = "Web/ic_floating_button.png";
      } else {
         this.scope.fab = "Web/ic_floating_button_closed.png";
      }
      this.scope.show = !this.scope.show;
   }
   sendrate(rate) {
      this.scope.detail.myRating = rate;
      if (rate) {
         this.detailfact.postRate(this.sp.id, this.ls.attendeeId, rate).success((res) => {
            console.log("rate sent to api", res);
         })
      }
   }

   attendToggle() {
      if (this.rs.login) {
         console.log("see this", this.rs.login);
         if (this.scope.attendence) {
            this.scope.atrate = false;
            this.scope.content = "You had chosen to attend this event. Please confirm if you do not want to attend this event.";
            // this.scope.attendence=!this.scope.attendence;
            // this.scope.attendence=false;
         } else {
            this.scope.content = "Please confirm if you really want to attend this event";
            this.scope.atrate = true;
            // this.scope.attendence=!this.scope.attendence;
            // this.scope.attendence=true;
         }
      }
      else {
         $('#attend').modal('show');
      }
    }
      showit() {
         this.window.localStorage.atflag = 1;
         try {
            $(".IN-widget a")[0].click();
            if (this.rs.login) {
               console.log("see this", this.rs.login);
               if (this.scope.attendence) {
                  this.scope.content = "You had chosen to attend this event. Please confirm if you do not want to attend this event.";
                  // this.scope.attendence=!this.scope.attendence;
                  // this.scope.attendence=false;
               } else {
                  this.scope.content = "Please confirm if you really want to attend this event";
                  // this.scope.attendence=!this.scope.attendence;
               }
            }
         } catch (e) {
            IN.init();
            IN.parse();
            $(".IN-widget a")[0].click();
            if (this.rs.login) {
               console.log("see this", this.rs.login);
               if (this.scope.attendence) {
                  this.scope.content = "You had chosen to attend this event. Please confirm if you do not want to attend this event.";
                  // this.scope.attendence=!this.scope.attendence;
                  this.scope.attendence = false;
               } else {
                  this.scope.content = "Please confirm if you really want to attend this event";
                  // this.scope.attendence=!this.scope.attendence;
                  this.scope.attendence = true;
               }
            }
         }
      }

attendence() {

   if (this.scope.attendence) {
      this.scope.rateflag = true;
      this.scope.attendence = false;
      this.detailfact.deleteevent(this.sp.id, this.ls.attendeeId).success((res) => {
         console.log("deleted !!!!!!!!");
         // $('.modal-backdrop').removeClass('in').addClass('out');
         // this.location.path("eventlist");
         // this.state.go("eventlist");
      })
   } else {
      // if(this.rs.login){
      this.scope.rateflag = false;
      // }
      this.scope.attendence = true;
      $('#confirm').modal('show');
      this.detailfact.postattendence(this.ls.attendeeId, this.sp.id).success((res) => {
         console.log("attendingggggggggggggggggggggggg", res);
      })
   }
}

}
