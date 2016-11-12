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
     url : 'http://192.168.120.180/conference_app_2016_php_backend/web/app.php/sponsor',
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
   // return this.http.get('http://192.168.120.180/conference_app_2016_php_backend/web/app.php/sponsor');
 }
 getDetails () {
   console.log("Details");
 return this.http({
   method : 'get',
   url : 'http://192.168.120.180/conference_app_2016_php_backend/web/app.php/event',
   headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
   })
 }
// detailfact.$inject = ['$http'];
 getDateDetail(date){
   return this.http({
     method : 'get',
     url : 'http://192.168.120.180/conference_app_2016_php_backend/web/app.php/event?date='+date,
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
 }
 getEventDetail(id){
   return this.http({
     method : 'get',
     url : 'http://192.168.120.180/conference_app_2016_php_backend/web/app.php/event?id='+id,
     headers:{'apisecret': 'df89c67afe0ec6d78ccfdba740ee2db5'}
     })
 }
 getlinkedin(){
   return this.http.get('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81fma376rzn0jt?format=json');
 }
}
