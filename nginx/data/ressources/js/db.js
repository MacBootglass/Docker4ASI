var socketDB = io.connect('http://'+host+':3001');
var userList;
var currentUserConv;

socketDB.on("auth", function(msg) {
  if (msg == true) {
    $('#modalLogin').modal('hide');
    getUsers();
  }
});


socketDB.on("getUsers", function(result){
  userList = result;
  var add1;
  var add2;
  var pseudo;

  for (i = 0; i < result.length; i++) {
    if (result[i].pseudo == null || result[i].pseudo === "")
      pseudo = result[i].prenom;
    else
      pseudo = result[i].pseudo;

    add1 = '<div id="user' + i + '" data-userid="' + result[i].id + '">' +
            '<div class="image">' +
              '<img src="http://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg" alt="profile" />' +
            '</div>' +
            '<div class="information">' +
              '<h3>' + pseudo + '</h3>' +
            '</div>' +
           '</div>';

    add2 = '<div class="msgUser" data-dest="' + result[i].id + '" + data-num="' + i + '">' +
            '<div class="msgImg">' +
              '<img src="http://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg" alt="profile" />' +
            '</div>' +
            '<div class="msgInfo">' +
              '<div>' +
                '<span class="msgPseudo">' + pseudo + '</span>' +
              '</div>' +
              '<div>' +
                '<span class="msgContent"> </span>' +
              '</div>' +
            '</div>' +
          '</div>';

    $('#currentProfile').slick('slickAdd', add1);
    $('#msgList').append(add2);
  }

  $(".msgUser").click(function() {
    // var pseudo = userList[$($('.msgUser[data-dest="' + $(this).data('dest') + '"]')[0]).data("num")].pseudo;
    currentUserConv = $(this).data('dest');
    $("#userModalTchat").text($('.msgUser[data-dest="' + currentUserConv + '"] > .msgInfo > div > .msgPseudo').text());
    socketDB.emit("recoverMessages", currentUserConv);
  });
});

socketDB.on("recoverMessages", function(rows) {
  for (var i = 0; i < rows.length; i++)
    if (currentUserConv === rows[i].dest)
      $("#convModalTchat").append('<div class="msgAuth"><div>' + rows[i].msg + '</div></div>');
    else
      $("#convModalTchat").append('<div class="msgDest"><div>' + rows[i].msg + '</div></div>');
  $('#modalTchat').modal();
});

socketDB.on("error", function(msg){
  alert(msg);
});

socketDB.on("like", function(user) {
  console.log(user);
});

socketDB.on("dislike", function(user) {
  console.log(user);
});

function connectDbApp(id, mdp) {
  userId = id;
  socketDB.emit("auth", id, mdp);
}

function getUsers() {
  socketDB.emit("getUsers");
}

function tinder(user, choix) {
  socketDB.emit("tinder", user, choix);
}
