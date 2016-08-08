function init() {
  // $('#modalLogin').modal();

  // $('#modalProfil').modal();

  $('#currentProfile').slick({
    accessibility:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  });

  $('#currentProfile').click(function() {
    var user = userList[$('#currentProfile').slick('slickCurrentSlide')];
    if (user.naissance != null)
      $("#ageProfil").text(20);           //A REVOIR -> Faire en fonction de la date de naissance

    if (user.pseudo == null || user.pseudo === "")
      $("#pseudoProfil").text(user.prenom);
    else
      $("#pseudoProfil").text(user.pseudo);

    if (user.phrase == null || user.phrase === "")
      $("#descriptionProfil").text("Je crois que j'ai rien à dire");
    else
      $("#descriptionProfil").text(user.phrase);

    $('#modalProfil').modal();
  });

  $('#razFormConnexion').click(function() {
  });

  $('#confirmFormConnexion').click(function() {
    connectDbApp($("#idConnexion")[0].value, $("#mdpConnexion")[0].value);
  });

  $('.choiceLike').click(function() {
    tinder($('#user' + $('#currentProfile').slick('slickCurrentSlide')).data("userid"), "like");
  });

  $('.choiceDislike').click(function() {
    tinder($('#user' + $('#currentProfile').slick('slickCurrentSlide')).data("userid"), "dislike");
  });

  $('#closeProfile').click(function() {
    $('#modalProfil').modal('hide');
  });

  $(".msgUser").click(function() {
    $('#modalTchat').modal();
  });

  $('#modalTchat').on('shown.bs.modal', function (e) {
    $("#modalConv").scrollTop($("#modalConv")[0].scrollHeight);
  });
}

$(document).ready(init);
