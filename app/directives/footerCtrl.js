export default class footerCtrl {
  /*@ngInject;*/
  constructor(detailfact,$scope) {
    this.services=detailfact;
    console.log(this.services);
    $scope.footerConfig = {
         dots: false,
         arrows: false,
         centerMode: true,
         slidesToShow: 6,
         centerPadding: '280px',
         autoplay: true,
         autoplaySpeed: 0,
         speed: 2000,
         cssEase: 'linear'
      };
    this.services.getData().success((res)=>{
      console.log(res , "Footer");
      $scope.sponser=res;
    })
    .error(()=>{
      console.log("failed");
    })
  }
}
