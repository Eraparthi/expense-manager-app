const defaultExpenseCategories = [
  { name: "Grocery", icon: "🛒" },
  { name: "Electricity Bill", icon: "⚡" },
  { name: "Water Bill", icon: "🚰" },
  { name: "Gas Cylinder", icon: "🔥" },
  { name: "Credit Card Bill", icon: "💳" },
  { name: "Loan EMI", icon: "🏦" },
  { name: "Rent", icon: "🏠" },
  { name: "Fuel", icon: "⛽" },
  { name: "Medical", icon: "🏥" },
  { name: "Education", icon: "🎓" },
  { name: "Internet / Mobile", icon: "📱" },
  { name: "Insurance", icon: "🛡️" },
  { name: "Maintenance", icon: "🛠️" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Miscellaneous", icon: "📦" }
];

let expenseCategories =
  JSON.parse(localStorage.getItem("expenseCategories")) ||
  defaultExpenseCategories;

let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");
const categoryListEl = document.getElementById("categoryList");
const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("transactionList");

/* ---------- CATEGORY ---------- */

function saveCategories() {
  localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
}

function loadCategories() {
  categoryEl.innerHTML = "";

  if (typeEl.value === "expense") {
    expenseCategories.forEach((cat, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${cat.icon} ${cat.name}`;
      categoryEl.appendChild(opt);
    });
    renderCategoryManager();
  } else {
    ["Salary", "Business", "Investment", "Other"].forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categoryEl.appendChild(opt);
    });
    categoryListEl.innerHTML = "";
  }
}

function addCategory() {
  const name = document.getElementById("newCategory").value.trim();
  const icon = document.getElementById("newIcon").value.trim() || "📌";

  if (!name) return alert("Enter category name");

  expenseCategories.push({ name, icon });
  saveCategories();
  loadCategories();

  document.getElementById("newCategory").value = "";
  document.getElementById("newIcon").value = "";
}

function editCategory(index) {
  const newName = prompt("Edit category name", expenseCategories[index].name);
  if (!newName) return;

  expenseCategories[index].name = newName;
  saveCategories();
  loadCategories();
}

function deleteCategory(index) {
  if (!confirm("Delete this category?")) return;
  expenseCategories.splice(index, 1);
  saveCategories();
  loadCategories();
}

function renderCategoryManager() {
  categoryListEl.innerHTML = "";
  expenseCategories.forEach((cat, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${cat.icon} ${cat.name}</span>
      <div>
        <button onclick="editCategory(${i})">✏️</button>
        <button onclick="deleteCategory(${i})">❌</button>
      </div>
    `;
    categoryListEl.appendChild(li);
  });
}

typeEl.addEventListener("change", loadCategories);

/* ---------- TRANSACTIONS ---------- */

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function calculateBalance() {
  let balance = 0;
  transactions.forEach(t => {
    balance += t.type === "income" ? t.amount : -t.amount;
  });
  balanceEl.innerText = balance;
}

function renderTransactions() {
  listEl.innerHTML = "";
  transactions.forEach(t => {
    const li = document.createElement("li");
    li.className = t.type;
    li.innerHTML = `
      <strong>${t.title}</strong><br>
      <small>${t.category}</small><br>
      <small>${t.date}</small>
      <span style="float:right">
        ${t.type === "income" ? "+" : "-"}₹${t.amount}
      </span>
    `;
    listEl.appendChild(li);
  });
}

function addTransaction() {
  const title = document.getElementById("title").value;
  const amount = Number(document.getElementById("amount").value);

  if (!title || amount <= 0) return alert("Invalid input");

  let categoryText = categoryEl.options[categoryEl.selectedIndex].text;

  transactions.push({
    id: Date.now(),
    type: typeEl.value,
    category: categoryText,
    title,
    amount,
    date: new Date().toLocaleString()
  });

  saveTransactions();
  renderTransactions();
  calculateBalance();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}

/* ---------- INIT ---------- */

loadCategories();
renderTransactions();
calculateBalance();