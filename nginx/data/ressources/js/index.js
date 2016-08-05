function init() {
  // element.requestFullscreen();
  // screen.orientation.lock("portrait");
  // screen.lockOrientation;
  // screen.orientation.lock;
  // if( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  // alert("yeah")
  // }
  var currentUser;

  $('#modalLogin').modal();

  $('#currentProfile').slick({
    accessibility:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  });

  $('#razFormConnexion').click(function() {
  });

  $('#confirmFormConnexion').click(function() {
    connectDbApp($("#idConnexion")[0].value, $("#mdpConnexion")[0].value);
  });

  $('#choiceLike').click(function() {
    tinder($('#user' + $('#currentProfile').slick('slickCurrentSlide')).data("userid"), "like");
  });

  $('#choiceDislike').click(function() {
    tinder($('#user' + $('#currentProfile').slick('slickCurrentSlide')).data("userid"), "dislike");
  });

}

$(document).ready(init);
