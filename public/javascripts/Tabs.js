$(document).ready(function() {
    $("#chats").click(function() {
        $("#myChat").toggle();
    });
});

$('form').submit(function(e) {
    e.preventDefault();
    socket.emit('chat_massege', $('#txt').val());
    $('#txt').val('');
    return false;
});
//append caul
/* socket.on('chat_massege', function(msg) {
    $('#masseges').append($('<li>').html(msg))
});
//append text massege
socket.on('is_online', function(username) {
    $('#masseges').append($('<li>').html(username))
});
var username = prompt('Please tell me youe name');
socket.emit('username', username) */