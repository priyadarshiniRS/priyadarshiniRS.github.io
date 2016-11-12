export default class menuCtrl {
		/*@ngInject;*/
		constructor($location,$scope,$timeout,$localStorage,detailfact){
			this.scope=$scope;
			//this.route=$route;
			this.ls=$localStorage;
			this.timeout=$timeout;
			this.location=$location;
			this.ls.myScheduleflag=false;
			this.detailfact=detailfact;
			this.detailfact.checkload();
			// this.myOnloadFunction();
		}
		linkedIn(){
			if(this.detailfact.checkuser()){
				console.log("logged innnnnnnnnnnnnnnnnnn");
				this.location.path("mc");
			}
			else{
				this.ls.myScheduleflag=true;
				console.log("did not logged innnnnnnnnnnnnnnnnnn");
				$(".IN-widget a")[0].click();
		}
		}
	}
