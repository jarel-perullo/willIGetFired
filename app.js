var questionTemplate = $('#question').html();

var ref = firebase.database().ref('messages');

ref.on('value', function(snapshot) {
    var messages = snapshot.val();

    if (!messages) return;

    $('#messages').empty();

    for (var key in messages) {
        var msg = messages[key];
        msg.id = key;
        if (msg.votes) {
            msg.yesVotes = Object.keys(msg.votes).filter(function(k) {
                return msg.votes[k] === 'y'
            }).length;
            msg.noVotes = Object.keys(msg.votes).filter(function(k) {
                return msg.votes[k] === 'n'
            }).length;
        } else {
            msg.yesVotes = 0;
            msg.noVotes = 0;
        }
        renderMessage(msg);
    }
});

// var socket = io();
$('form').submit(function() {
    ref.push({ message: $('#m').val() });
    $('#m').val('');
    return false;
});

function formatMessage(msg) {
    return msg.message + '(Yes Votes:' + msg.yesVotes + ', No Votes:' + msg.noVotes + ' )';
}

function renderMessage(msg) {
    var totalVotes = (msg.yesVotes + msg.noVotes);
    msg.formatted = formatMessage(msg);
    msg.percent = totalVotes === 0 ? 0 : (msg.yesVotes / totalVotes * 100);

    var el = $(Mustache.render(questionTemplate, msg))

    el.find('.yes-button').on('click', function(e) {
        ref.child(msg.id).child('votes').push('y');
    });

    el.find('.no-button').on('click', function(e) {
        ref.child(msg.id).child('votes').push('n');
    });

    $('#messages').prepend(el);
}

// var listRef = new Firebase("https://willigetfired.firebaseio.com/presence/");
// var userRef = listRef.push();

// Add ourselves to presence list when online.
// var presenceRef = new Firebase("https://willigetfired.firebaseio.com/.info/connected");
// presenceRef.on("value", function(snap) {
//     if (snap.val()) {
//         // Remove ourselves when we disconnect.
//         userRef.onDisconnect().remove();

//         userRef.set(true);
//     }
// });

// Number of online users is the number of objects in the presence list.
// listRef.on("value", function(snap) {
//     console.log("# of online users = " + snap.numChildren());
// });