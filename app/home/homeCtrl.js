export default class homeCtrl {
		/*@ngInject;*/
		constructor($location,$scope,$rootScope,$timeout,$localStorage,detailfact,$window){
			this.scope=$scope;
			this.rs=$rootScope;
			this.window=$window;
			this.ls=$localStorage;
			this.timeout=$timeout;
			this.location=$location;
			this.ls.person={};
			this.detailfact=detailfact;
			this.detailfact.checkload();
			this.myOnloadFunction();
		}
		myOnloadFunction(){

			if(this.rs.profileData){
			this.ls.person=this.rs.profileData.values;
			this.detailfact.putlinkedin(this.ls.person).success((res)=>{
				console.log("linkedIn data sent", res);
				this.ls.attendeeId=res.id;
			})
		}
		}
			logout(){
				$('#logout').modal('show');
				// var checkLogout=confirm("Do you want to logout?");
		}

		afterlogout(){
			console.log("logout calllllllllllleeeeeeeeeeedddddddddddddd");
			IN.User.logout(()=> {
				this.timeout(() =>{
					this.rs.login=false;
					this.rs.profileData="";
					this.window.localStorage.bcflag=0;
					this.window.localStorage.msflag=0;
					this.window.localStorage.atflag=0;
					this.location.path('eventlist');
				}, 0);
		 });
		}
}
