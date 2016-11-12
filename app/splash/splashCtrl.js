export default class splashCtrl {
	/*@ngInject;*/
	constructor($scope,$location,$http,detailfact,$rootScope,$localStorage,$timeout) {
		console.log("Splash");
    this.scope=$scope;
		this.http=$http;
		this.location=$location;
		this.emp=detailfact;
		this.ls=$localStorage;
		this.rs=$rootScope;
		this.timeout=$timeout;
		this.ls.flag=0;
		this.rs.flag=0;

	this.timeout(()=> {
		this.location.path('eventlist');
		this.ls.flag=1;
		this.rs.flag=1;
  	this.ls.splash=0;
	},3000);//TODO, 	revert to 3000 while you build

}

}
