const STORE_KEY = "spectra_growthdesk_v1";

function getStore() {
  const raw = localStorage.getItem(STORE_KEY);
  if (raw) return JSON.parse(raw);

  const initial = {
    users: [
      {
        email: "admin@spectragrowthdesk.com",
        password: "admin123",
        role: "super_admin",
        name: "Super Admin"
      },
      {
        email: "client@example.com",
        password: "client123",
        role: "client",
        name: "Sarah Johnson",
        client_id: "skyline"
      }
    ],
    clients: [
      { id: "skyline", name: "Skyline Realty", plan: "Growth", status: "Active", posts_left: 6, pending: 3 },
      { id: "lumina", name: "Lumina Medspa", plan: "Momentum", status: "Active", posts_left: 12, pending: 0 },
      { id: "nova", name: "Nova Fitness", plan: "Starter", status: "Trial", posts_left: 8, pending: 1 }
    ],
    posts: [
      { id: "p1", client_id: "skyline", platform: "Instagram", title: "October Offer", status: "Needs approval", scheduled: "Thursday, 6:00 PM" },
      { id: "p2", client_id: "skyline", platform: "LinkedIn", title: "Client Success Story", status: "Needs approval", scheduled: "Friday, 9:00 AM" },
      { id: "p3", client_id: "lumina", platform: "TikTok", title: "Skincare Myth", status: "Scheduled", scheduled: "Saturday, 7:00 PM" }
    ],
    audit: []
  };

  localStorage.setItem(STORE_KEY, JSON.stringify(initial));
  return initial;
}

function saveStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

function logAction(action, client = "Platform") {
  const store = getStore();
  store.audit.unshift({
    time: new Date().toLocaleString(),
    admin: "Super Admin",
    action,
    client
  });
  saveStore(store);
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const store = getStore();

  const user = store.users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid email or password.");
    return false;
  }

  sessionStorage.setItem("sgd_user", JSON.stringify(user));
  logAction("User logged in", user.role === "client" ? user.client_id : "Platform");

  window.location.href = user.role === "client" ? "client.html" : "admin.html";
  return false;
}

function logout() {
  sessionStorage.removeItem("sgd_user");
  window.location.href = "login.html";
}

function approve(button) {
  const card = button.closest(".card");
  const title = card ? card.querySelector("h3").textContent : "Post";

  const store = getStore();
  const post = store.posts.find(p => p.title === title);

  if (post) {
    post.status = "Approved";
    saveStore(store);
  }

  button.textContent = "Approved";
  button.style.background = "#10B981";
  button.disabled = true;

  logAction("Post approved", post ? post.client_id : "Client");
}

function approveAll() {
  const store = getStore();

  store.posts
    .filter(post => post.status === "Needs approval")
    .forEach(post => post.status = "Approved");

  saveStore(store);

  document.querySelectorAll(".approve .btn-primary").forEach(button => {
    if (!button.disabled) {
      button.textContent = "Approved";
      button.style.background = "#10B981";
      button.disabled = true;
    }
  });

  alert("All available posts approved and scheduled.");
  logAction("Bulk approval completed", "All client workspaces");
}

async function generate() {
  const topic = document.getElementById("topic").value.trim() || "your latest offer";
  const result = document.getElementById("ai-result");

  result.style.display = "block";
  result.innerHTML = "<p class='muted'>Generating on-brand draft…</p>";

  const draft = await fakeAIGenerate(topic);

  result.innerHTML = `
    <span class="badge green">Draft ready</span>
    <h3 style="margin-top:10px">${draft.title}</h3>
    <p class="muted"><strong>Hook:</strong> ${draft.hook}</p>
    <p class="muted"><strong>Caption:</strong> ${draft.caption}</p>
    <p class="muted"><strong>CTA:</strong> ${draft.cta}</p>
    <button class="btn btn-primary" style="margin-top:14px" onclick="approve(this)">Send to approval</button>
  `;

  logAction("AI draft generated", "Client workspace");
}

async function fakeAIGenerate(topic) {
  await new Promise(resolve => setTimeout(resolve, 700));

  return {
    title: topic.charAt(0).toUpperCase() + topic.slice(1),
    hook: "Ready to make your next move easier?",
    caption: `Discover a smarter way to move forward with ${topic}. Our team makes the process simple, clear, and built around your goals.`,
    cta: "Send us a DM to get started."
  };
}

async function publishPost(postId) {
  const store = getStore();
  const post = store.posts.find(p => p.id === postId);

  if (!post) return;

  post.status = "Published";
  saveStore(store);

  logAction(`Post published to ${post.platform}`, post.client_id);

  return { ok: true, postId };
}

async function startCheckout(plan) {
  logAction(`Checkout started for ${plan}`, "Billing");
  alert(`Redirecting to secure checkout for the ${plan} plan.`);
}

function viewAsClient() {
  logAction("Opened client workspace in View-as-Client mode", "Client workspace");
  alert("Opening client workspace in View-as-Client mode.
All actions will be recorded in the audit log.");
}

function adminApprove(button) {
  button.textContent = "Approved by admin";
  button.style.background = "#10B981";
  button.disabled = true;

  logAction("Admin approved post on behalf of client", "Client workspace");
}

function createClient() {
  const name = prompt("Client business name:");
  if (!name) return;

  const store = getStore();
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  store.clients.push({
    id,
    name,
    plan: "Starter",
    status: "Trial",
    posts_left: 12,
    pending: 0
  });

  saveStore(store);
  logAction("Created new client workspace", name);
  alert(`${name} workspace created.`);
}