const categories = {
  income: ["Salary", "Business", "Investment", "Other"],
  expense: ["Food", "Travel", "Shopping", "Bills", "Other"]
};

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("transactionList");
const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");

function loadCategories() {
  categoryEl.innerHTML = "";
  categories[typeEl.value].forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryEl.appendChild(option);
  });
}

typeEl.addEventListener("change", loadCategories);

function saveData() {
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
      <strong>${t.title}</strong> (${t.category})<br>
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
  saveData();
  renderTransactions();
  calculateBalance();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}

/* INIT */
loadCategories();
renderTransactions();
calculateBalance();