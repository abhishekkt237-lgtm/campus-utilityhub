import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, doc, setDoc } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Protect page
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

document.getElementById("saveDetails").addEventListener("click", async () => {
  const user = auth.currentUser;

  const fullName = document.getElementById("fullName").value;
  const role = document.getElementById("role").value;

  if (!fullName || !role) {
    alert("Fill all details");
    return;
  }

  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    role: role,
    email: user.email
  });

  // redirect to main page
  window.location.href = "dashboard.html";
});
