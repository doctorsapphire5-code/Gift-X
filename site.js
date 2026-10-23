import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvxJHLx5jHNP0Xc_Ev0GJoQrSo32jXvRk",
  authDomain: "software-c90ed.firebaseapp.com",
  projectId: "software-c90ed",
  storageBucket: "software-c90ed.firebasestorage.app",
  messagingSenderId: "480083163920",
  appId: "1:480083163920:web:00d40cab0388ac95738395",
  measurementId: "G-MC9WQEJPTS"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const here = location.pathname.split("/").pop() || "index.html";
const links = [["features.html","Features"],["pricing.html","Pricing"],["docs.html","Docs"],["blog.html","Blog"],["about.html","About"],["contact.html","Contact"]];
const li = links.map(([h,t]) => `<li class="hide-sm"><a href="${h}"${h===here?' aria-current="page"':''}>${t}</a></li>`).join("");
document.getElementById("hdr").innerHTML = `<header><div class="wrap bar"><a class="logo" href="index.html" aria-label="VYRO home">VYRO</a><nav aria-label="Main"><ul>${li}<li><a class="btn sm" id="authLink" href="login.html">Log in</a></li></ul></nav></div></header>`;
document.getElementById("ftr").innerHTML = `<footer><div class="wrap foot"><p>&copy; ${new Date().getFullYear()} VYRO. All rights reserved.</p><ul><li><a href="download.html">Download</a></li><li><a href="docs.html">Help</a></li><li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms of Service</a></li></ul></div></footer>`;

onAuthStateChanged(auth, (user) => {
  const a = document.getElementById("authLink");
  if (user) { a.textContent = "Log out"; a.href = "#"; a.onclick = async (e) => { e.preventDefault(); await signOut(auth); location.href = "index.html"; }; }
  else { a.textContent = "Log in"; a.href = "login.html"; a.onclick = null; }
});
