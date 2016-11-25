export default class detailfact {

 /*@ngInject;*/
 constructor($http,$rootScope,$localStorage) {
   this.http = $http;
   this.ls=$localStorage;
   this.rs=$rootScope;
   console.log("services");
 }
checkload(){
 if(this.ls.splash===0){
   this.rs.flag=1;
   this.ls.flag=1;
   return true;
 }
 else return false;
}
checkuser(){
 if(this.ls.login==true){
   return true;
 }
 return false;
}
 getData () {
   console.log("inside getData");
   return this.http({
     method : 'get',
     url : 'http://35.154.47.65/sponsor',
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
 }
 getDetails () {
   console.log("Details");
 return this.http({
   method : 'get',
   url : 'http://35.154.47.65/event',
   headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
   })
 }

 postRate (eventid,personid,rate) {
   console.log("Details");
 return this.http({
   method : 'post',
   url : 'http://35.154.47.65/event',
   headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5','Content-Type':'application/x-www-form-urlencoded'},
   transformRequest: function(obj) {
      var str = [];
      for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
  },
   data:{"attendeeId":personid, "eventId":eventid, "rate":rate}
   })
 }
// detailfact.$inject = ['$http'];
 getDateDetail(date){
   return this.http({
     method : 'get',
     url : 'http://35.154.47.65/event?date='+date,
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
 }
 getEventDetail(id){
   return this.http({
     method : 'get',
     url : 'http://35.154.47.65/event?id='+id,
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
 }
 deleteevent(id,aid){
   return this.http({
     method : 'post',
     url : 'http://35.154.47.65/event?id='+id+'&attendeeId='+aid+'&remove=1',
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
 }
 getRateDetail(id,aid){
   return this.http({
     method : 'post',
     url : 'http://35.154.47.65/event?id='+id+'&attendeeId='+aid,
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
 }
 putlinkedin(obj){
   console.log(obj[0]);
   return this.http({
     method : 'post',
     url : 'http://35.154.47.65/register',
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5','Content-Type':'application/x-www-form-urlencoded'},
     transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
     data:{"firstName":obj[0].firstName,
                    "lastName":obj[0].lastName,
                     "email":obj[0].emailAddress,
                     "designation":obj[0].positions.values[0].title,
                     "company":obj[0].positions.values[0].company.name,
                     "profilePicture":obj[0].pictureUrl}

     })
 }
 getattendeelist(){
   return this.http({
     method : 'get',
     url : 'http://35.154.47.65/attendee',
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
 }
 getmyschedule(id,date){
   return this.http({
     method : 'get',
     url : 'http://35.154.47.65/schedule?id=' + id + '&date=' + date,
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
   })
}
myschedule(id){
  return this.http({
    method : 'get',
    url : 'http://35.154.47.65/schedule?id=' + id,
    headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
  })
}
eventschedule(id){
  return this.http({
    method : 'get',
    url : 'http://35.154.47.65/schedule?id=' + id,
    headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
  })
}
 getSpeakerDetail(id){
   return this.http({
     method : 'get',
     url : 'http://35.154.47.65/speaker?id='+id,
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
   })
}
 postattendence(attendeeId, eventId){
   console.log("eventId",eventId);
   return this.http({
     method : 'post',
     url : 'http://35.154.47.65/event',
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5','Content-Type':'application/x-www-form-urlencoded'},
     transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    },
     data:{"attendeeId":attendeeId, "eventId":eventId}
     })
 }
}
