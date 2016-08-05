var socketDB = io.connect('http://'+host+':3001');
var likeList = new Array();

socketDB.on("auth", function(msg) {
  if (msg == true) {
    $('#modalLogin').modal('hide');
    getUsers();
  }
});

socketDB.on("error", function(msg){
  alert(msg);
});

socketDB.on("otherUsers", function(result){
  var add;
  for (i = 0; i < result.length; i++) {
    add = '<div id="user' + i + '" data-userid="' + result[i].id + '">' +
            '<div class="image">' +
              '<img src="http://gazettereview.com/wp-content/uploads/2016/03/facebook-avatar.jpg" alt="profile" />' +
            '</div>' +
            '<div class="information">' +
              '<h3>' + result[i].prenom + ' ' + result[i].nom + '</h3>' +
            '</div>' +
           '</div>';
    $('#currentProfile').slick('slickAdd', add);
  }
});

socketDB.on("like", function(user) {
  console.log(user);
});

socketDB.on("dislike", function(user) {
  console.log(user);
});

function connectDbApp(id, mdp) {
  socketDB.emit("auth", id, mdp);
}

function getUsers() {
  socketDB.emit("getUsers");
}

function tinder(user, choix) {
  socketDB.emit("tinder", user, choix);
}
