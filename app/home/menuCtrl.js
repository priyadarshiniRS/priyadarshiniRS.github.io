export default class menuCtrl {
		/*@ngInject;*/
		constructor($location,$rootScope,$scope,$timeout,$localStorage,detailfact,$window){
			this.scope=$scope;
			this.rs=$rootScope;
			this.ls=$localStorage;
			this.timeout=$timeout;
			this.window=$window;
			this.location=$location;
			this.window.localStorage.msflag=false;
			this.window.localStorage.bcflag=false;
			this.detailfact=detailfact;
			this.detailfact.checkload();
			this.ind=0;
		}
		linkedIn(ind){
			this.ind=ind;
			if(this.rs.login){
				console.log("logged innnnnnnnnnnnnnnnnnn");
				console.log(ind);
				if(ind==3)
					this.location.path("mc");
				if(ind==2)
					this.location.path("businesscard");
			}
			else{
				if(ind==2)
				$('#businesscard').modal('show');
				else if(ind==3)
				$('#myschedule').modal('show');
				// var checkLogin = confirm("Sign In through Linkedin? ");
	}
		}
		afterlogin(){
				if(this.ind==3){
				this.window.localStorage.msflag=3;
			}
				if(this.ind==2){
				this.window.localStorage.bcflag=2;
				console.log("businesscard",this.window.localStorage.bcflag);
			}

			console.log("did not logged innnnnnnnnnnnnnnnnnn");
			try{
			$(".IN-widget a")[0].click();
		}
		catch(e){
			IN.init();
			IN.parse();
			$(".IN-widget a")[0].click();
		}
	}
}
