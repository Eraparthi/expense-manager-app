/* ---------- DATA ---------- */

const incomeCategories = [
  { name: "Salary", icon: "💼" },
  { name: "Business", icon: "🏢" },
  { name: "Freelance", icon: "🧑‍💻" },
  { name: "Investment", icon: "📈" },
  { name: "Other", icon: "💰" }
];

const defaultExpenseCategories = [
  { name: "Grocery", icon: "🛒" },
  { name: "Rent", icon: "🏠" },
  { name: "Loan EMI", icon: "🏦" },
  { name: "Credit Card", icon: "💳" },
  { name: "Electricity", icon: "⚡" },
  { name: "Fuel", icon: "⛽" },
  { name: "Medical", icon: "🏥" }
];

let expenseCategories =
  JSON.parse(localStorage.getItem("expenseCategories")) ||
  defaultExpenseCategories;

let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

/* ---------- ELEMENTS ---------- */

const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");

/* ---------- SETTINGS ---------- */

function toggleSettings() {
  document.getElementById("settingsModal").classList.toggle("hidden");
  renderCategoryManager();
}

/* ---------- CATEGORIES ---------- */

function loadCategories() {
  categoryEl.innerHTML = "";
  const cats = typeEl.value === "income"
    ? incomeCategories
    : expenseCategories;

  cats.forEach((c, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${c.icon} ${c.name}`;
    categoryEl.appendChild(opt);
  });
}

typeEl.addEventListener("change", loadCategories);

function addCategory() {
  if (!newCategory.value) return;

  expenseCategories.push({
    name: newCategory.value,
    icon: newIcon.value || "📌"
  });

  localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
  newCategory.value = "";
  newIcon.value = "";
  renderCategoryManager();
  loadCategories();
}

function renderCategoryManager() {
  categoryList.innerHTML = "";
  expenseCategories.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${c.icon} ${c.name}
      <button onclick="deleteCategory(${i})">❌</button>`;
    categoryList.appendChild(li);
  });
}

function deleteCategory(i) {
  expenseCategories.splice(i, 1);
  localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
  renderCategoryManager();
  loadCategories();
}

/* ---------- TRANSACTIONS ---------- */

function addTransaction() {
  if (!title.value || amount.value <= 0) return;

  const cats = typeEl.value === "income" ? incomeCategories : expenseCategories;
  const cat = cats[categoryEl.value];

  transactions.push({
    id: Date.now(),
    type: typeEl.value,
    title: title.value,
    category: `${cat.icon} ${cat.name}`,
    amount: Number(amount.value),
    date: new Date()
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  title.value = "";
  amount.value = "";
  render();
}

function render() {
  transactionList.innerHTML = "";
  let balance = 0, income = 0, expense = 0;

  transactions.forEach(t => {
    balance += t.type === "income" ? t.amount : -t.amount;
    t.type === "income" ? income += t.amount : expense += t.amount;

    const li = document.createElement("li");
    li.textContent = `${t.category} - ${t.title} ₹${t.amount}`;
    transactionList.appendChild(li);
  });

  document.getElementById("balance").innerText = balance;
  monthIncome.innerText = income;
  monthExpense.innerText = expense;
}

/* ---------- INIT ---------- */

loadCategories();
render();