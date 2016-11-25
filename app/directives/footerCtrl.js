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

      $scope.footerConfig.event= {
          beforeChange: function (event, slick, currentSlide, nextSlide) {
         //   console.log('before change');
          },
          afterChange: function (event, slick, currentSlide, nextSlide) {
           console.log('before afterChange');
           // $scope.footerConfig.method.slickPlay();
           // $('.footerSlide')[0].slick.refresh();
           $scope.footerConfig = {
                dots: false,
                arrows: false,
                centerMode: true,
                slidesToShow: 6,
                centerPadding: '280px',
                autoplay: true,
                autoplaySpeed: 0,
                speed: 2000,
                cssEase: 'linear',
                focusOnselect:false,
                method:{}
             };
          }
     }

    this.services.getData().success((res)=>{
      console.log(res , "Footer");
      $scope.sponser=res;
    })
    .error(()=>{
      console.log("failed");
    })
  }

}
