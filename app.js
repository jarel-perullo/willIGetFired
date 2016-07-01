
var questionTemplate = $('#question').html();

// var socket = io();
$('form').submit(function() {
    ref.push({ message: $('#m').val() });
    $('#m').val('');
    return false;
});

function renderMessage(msg) {
    msg.totalVotes = (msg.yesVotes + msg.noVotes);
    msg.yesVotes = msg.yesVotes;
    msg.percent = msg.totalVotes === 0 ? 0 : (msg.yesVotes / msg.totalVotes * 100);

    var el = $(Mustache.render(questionTemplate, msg))

    el.find('.yes-button').on('click', () => ref.child(msg.id).child(`votes/${firebase.auth().currentUser.uid}`).set('y'));
    el.find('.no-button').on('click', () => ref.child(msg.id).child(`votes/${firebase.auth().currentUser.uid}`).set('n'));

    $('#messages').prepend(el);
}

function renderMessages (messages) {
  $('#messages').empty();
  for (var key in messages) {
      var msg = messages[key];
      msg.id = key;
      if (msg.votes) {
          msg.yesVotes = Object.keys(msg.votes).filter(k => msg.votes[k] === 'y').length;
          msg.noVotes = Object.keys(msg.votes).filter(k =>  msg.votes[k] === 'n').length;
      } else {
          msg.yesVotes = 0;
          msg.noVotes = 0;
      }
      renderMessage(msg);
  }
}

// Get request for initial data
fetch('https://will-i-get-fired-2.firebaseio.com/messages.json')
.then(res => res.json())
.then(data => {
  renderMessages(data);
  
  container.classList.remove('hidden');
  if (navigator.onLine) {
    document.body.classList.remove('offline')
  } else 
    document.body.classList.add('offline')
});


// Init firebase
firebase.initializeApp({
    apiKey: "AIzaSyDQHBPSvMei6l52yJpGn_BorTgXmej2b3w",
    authDomain: "will-i-get-fired-2.firebaseapp.com",
    databaseURL: "https://will-i-get-fired-2.firebaseio.com",
});

const offlineMessage = document.querySelector('.offline-message');
const container = document.querySelector('.container');

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    firebase.auth().signInAnonymously();
  }
});

window.addEventListener('online', () => document.body.classList.remove('offline'));
window.addEventListener('offline', () => document.body.classList.add('offline'));

document.querySelector('input#m').addEventListener('input', function (evt) {
  console.log('CHANGE', evt.target.value);
  const options = { keys: ['message'] };
  const messageVals = Object.keys(MESSAGES).map(k => MESSAGES[k]);
  const fuse = new Fuse(messageVals, options);
  const result = fuse.search(evt.target.value)
  if (evt.target.value) {
    renderMessages(result);
  } else {
    renderMessages(MESSAGES);
  }
  
});

const ref = firebase.database().ref('messages');

ref.on('value', function(snapshot) {
  window.MESSAGES = snapshot.val();
  renderMessages(window.MESSAGES);
});

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(reg => console.log('Service Worker Registered', reg));
}
