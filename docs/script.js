const defaultExpenseCategories = [
  "Grocery",
  "Electricity Bill",
  "Water Bill",
  "Gas Cylinder",
  "Internet / Mobile",
  "Credit Card Bill",
  "Home Loan EMI",
  "Personal Loan EMI",
  "Fuel",
  "Medical",
  "Education",
  "Shopping",
  "Maintenance",
  "Miscellaneous"
];

let expenseCategories =
  JSON.parse(localStorage.getItem("expenseCategories")) ||
  defaultExpenseCategories;

let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");
const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("transactionList");
const categoryListEl = document.getElementById("categoryList");

/* -------- CATEGORY MANAGEMENT -------- */

function saveCategories() {
  localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
}

function loadCategories() {
  categoryEl.innerHTML = "";

  if (typeEl.value === "expense") {
    expenseCategories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
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
  const input = document.getElementById("newCategory");
  const value = input.value.trim();

  if (!value || expenseCategories.includes(value)) {
    alert("Invalid or duplicate category");
    return;
  }

  expenseCategories.push(value);
  saveCategories();
  input.value = "";
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
  expenseCategories.forEach((cat, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${cat}</span>
      <button onclick="deleteCategory(${index})">❌</button>
    `;
    categoryListEl.appendChild(li);
  });
}

typeEl.addEventListener("change", loadCategories);

/* -------- TRANSACTIONS -------- */

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

  if (!title || amount <= 0) {
    alert("Enter valid details");
    return;
  }

  const transaction = {
    id: Date.now(),
    type: typeEl.value,
    category: categoryEl.value,
    title,
    amount,
    date: new Date().toLocaleString()
  };

  transactions.push(transaction);
  saveTransactions();
  renderTransactions();
  calculateBalance();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}

/* -------- INIT -------- */

loadCategories();
renderTransactions();
calculateBalance();