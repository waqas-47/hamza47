import { auth, provider, db } from './firebase-config.js';
import { signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const googleLoginBtn = document.getElementById('google-login');
const logoutBtn = document.getElementById('logout-btn');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

let currentUser = null;

// Login with Google
googleLoginBtn.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Signed in:", result.user.displayName);
  } catch (err) {
    alert(err.message);
  }
});

// Logout
logoutBtn.addEventListener('click', () => signOut(auth));

// Detect auth state
onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    loginScreen.classList.add('hidden');
    chatScreen.classList.remove('hidden');
    initChat();
  } else {
    loginScreen.classList.remove('hidden');
    chatScreen.classList.add('hidden');
  }
});

// Chat functionality
function initChat() {
  const messagesRef = collection(db, 'groupChat', 'main', 'messages');
  const q = query(messagesRef, orderBy('timestamp'));

  // Listen for messages
  onSnapshot(q, snapshot => {
    chatMessages.innerHTML = '';
    snapshot.forEach(doc => {
      const msg = doc.data();
      const div = document.createElement('div');
      div.classList.add('message');
      div.classList.add(msg.senderId === currentUser.uid ? 'self' : 'other');
      div.innerHTML = msg.senderId === currentUser.uid ?
        `<span>${msg.text}</span>` :
        `<img src="${msg.photo}" /><span>${msg.text}</span>`;
      chatMessages.appendChild(div);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // Send message
  sendBtn.onclick = async () => {
    const text = messageInput.value.trim();
    if (text === '') return;
    await addDoc(messagesRef, {
      text,
      senderId: currentUser.uid,
      senderName: currentUser.displayName,
      photo: currentUser.photoURL,
      timestamp: serverTimestamp()
    });
    messageInput.value = '';
  };
}
