export default class homeCtrl {
		/*@ngInject;*/
		constructor($location,$scope,$timeout,$localStorage,detailfact){
			this.scope=$scope;
			//this.route=$route;
			this.ls=$localStorage;
			this.timeout=$timeout;
			this.location=$location;
			this.ls.login=false;
			this.scope.login=false;
			this.detailfact=detailfact;
			this.detailfact.checkload();
			this.myOnloadFunction();
		}
		myOnloadFunction(){
			if(document.querySelector('#linkedInTag')) {
				console.log("Query Selector");
				IN.init();
				try{
					IN.parse();
				}
				catch(e){
					this.ls.login=true;
					this.scope.login=true;
				}
			}
				console.log("Inside onloadFunction");
				IN.Event.on(IN, "auth",()=>{
					console.log("IN",IN.ENV.auth.oauth_token);
					this.scope.$apply(()=>{
							this.scope.login=true;
							this.ls.login=true;
					})

					IN.API.Profile("me").fields("first-name", "last-name", "email-address","picture-url","headline","id","industry")
				.result( (data) =>{
					console.log(data.values,this.scope.login);
					var headLine=data.values[0].headline.split(' ');
					var companyName=headLine[headLine.length-1];
					console.log("flaggggggggggggggggggggg value",this.ls.myScheduleflag);
					if(this.ls.myScheduleflag){
						this.location.path("mc");
					}
				}).error(function (data) {
						console.log("Error",data);
					});
				});
		}
			logout(){
				console.log("Inside Logout");
				IN.User.logout(()=> {
					this.timeout(() =>{
						this.scope.login=false;
						this.ls.login=false;
	          this.location.path('eventlist');
					}, 0);

       });
			}
}
