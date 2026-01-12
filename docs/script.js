const incomeCategories = [
  { name: "Salary", icon: "💼" },
  { name: "Business", icon: "🏢" },
  { name: "Freelance", icon: "🧑‍💻" },
  { name: "Investment", icon: "📈" },
  { name: "Rental", icon: "🏠" },
  { name: "Bonus", icon: "🎁" },
  { name: "Other", icon: "💰" }
];

const defaultExpenseCategories = [
  { name: "Grocery", icon: "🛒" },
  { name: "Rent", icon: "🏠" },
  { name: "Loan EMI", icon: "🏦" },
  { name: "Credit Card", icon: "💳" },
  { name: "Electricity", icon: "⚡" },
  { name: "Water", icon: "🚰" },
  { name: "Internet", icon: "📶" },
  { name: "Mobile", icon: "📱" },
  { name: "Fuel", icon: "⛽" },
  { name: "Medical", icon: "🏥" },
  { name: "Education", icon: "🎓" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Travel", icon: "✈️" },
  { name: "Insurance", icon: "🛡️" },
  { name: "Misc", icon: "📦" }
];

let expenseCategories =
  JSON.parse(localStorage.getItem("expenseCategories")) ||
  defaultExpenseCategories;

let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");

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

  renderCategoryManager();
}

typeEl.addEventListener("change", loadCategories);

function addCategory() {
  const name = newCategory.value.trim();
  const icon = newIcon.value.trim() || "📌";
  if (!name) return;

  expenseCategories.push({ name, icon });
  localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
  loadCategories();
  newCategory.value = "";
  newIcon.value = "";
}

function renderCategoryManager() {
  categoryList.innerHTML = "";
  expenseCategories.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${c.icon} ${c.name}
      <span class="actions">
        <button onclick="editCategory(${i})">✏️</button>
        <button onclick="deleteCategory(${i})">❌</button>
      </span>`;
    categoryList.appendChild(li);
  });
}

function editCategory(i) {
  const n = prompt("Edit name", expenseCategories[i].name);
  if (!n) return;
  expenseCategories[i].name = n;
  localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
  loadCategories();
}

function deleteCategory(i) {
  if (!confirm("Delete category?")) return;
  expenseCategories.splice(i, 1);
  localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
  loadCategories();
}

function addTransaction() {
  const title = titleEl.value;
  const amount = Number(amountEl.value);
  if (!title || amount <= 0) return;

  const cat =
    typeEl.value === "income"
      ? incomeCategories[categoryEl.value]
      : expenseCategories[categoryEl.value];

  transactions.push({
    id: Date.now(),
    type: typeEl.value,
    title,
    category: `${cat.icon} ${cat.name}`,
    amount,
    date: new Date()
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  titleEl.value = "";
  amountEl.value = "";
  render();
}

function render() {
  transactionList.innerHTML = "";
  let balance = 0, mi = 0, me = 0;
  const now = new Date();

  transactions.forEach(t => {
    balance += t.type === "income" ? t.amount : -t.amount;

    const d = new Date(t.date);
    if (d.getMonth() === now.getMonth()) {
      t.type === "income" ? mi += t.amount : me += t.amount;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      ${t.category} — ${t.title}
      <span class="actions">
        <button onclick="removeTx(${t.id})">❌</button>
      </span><br>₹${t.amount}`;
    transactionList.appendChild(li);
  });

  balanceEl.innerText = balance;
  monthIncome.innerText = mi;
  monthExpense.innerText = me;
}

function removeTx(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  render();
}

loadCategories();
render();