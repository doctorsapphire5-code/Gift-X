import { app, auth } from "../site.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

export const db = getFirestore(app);
export const $ = s => document.querySelector(s);
export const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
export const fmt = t => (t && t.toDate) ? t.toDate().toLocaleString() : "";

const pages = [["index.html","Dashboard"],["users.html","Users"],["messages.html","Messages"],["posts.html","Posts"]];

export function start(title, run) {
  const here = location.pathname.split("/").pop() || "index.html";
  $("#app").innerHTML = `<div class="adm"><aside><a class="logo" href="index.html">VYRO <small>Admin</small></a>
    <nav aria-label="Admin">${pages.map(([h,t]) => `<a href="${h}"${h===here?' aria-current="page"':''}>${t}</a>`).join("")}</nav>
    <a href="../index.html">View website</a><button class="link" id="out" type="button">Log out</button></aside>
    <section><h1>${title}</h1><div id="main"><p class="muted">Loading...</p></div></section></div>`;
  $("#out").onclick = async () => { await signOut(auth); location.href = "login.html"; };
  onAuthStateChanged(auth, async u => {
    if (!u) { location.href = "login.html"; return; }
    try {
      if (!(await getDoc(doc(db, "admins", u.uid))).exists()) {
        $("#main").innerHTML = '<p class="err">This account does not have admin access.</p>';
        await signOut(auth); return;
      }
      await run(u);
    } catch (e) { console.error(e); $("#main").innerHTML = '<p class="err">Could not load data. Check your Firestore rules and try again.</p>'; }
  });
}
