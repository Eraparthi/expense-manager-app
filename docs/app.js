const categories = {
  income: {
    Salary: ["Monthly", "Bonus"],
    Business: ["Profit", "Commission"]
  },
  expense: {
    Food: ["Breakfast", "Lunch", "Dinner"],
    Travel: ["Fuel", "Cab", "Train"],
    Home: ["Rent", "Electricity"]
  }
};

let data = JSON.parse(localStorage.getItem("data")) || [];

init();
render();

function init() {
  updateCategories();
  document.getElementById("type").addEventListener("change", updateCategories);
}

function updateCategories() {
  const type = document.getElementById("type").value;
  const category = document.getElementById("category");
  const subCategory = document.getElementById("subCategory");

  category.innerHTML = "";
  subCategory.innerHTML = "";

  Object.keys(categories[type]).forEach(cat => {
    category.innerHTML += `<option value="${cat}">${cat}</option>`;
  });

  updateSubCategories();
  category.addEventListener("change", updateSubCategories);
}

function updateSubCategories() {
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const subCategory = document.getElementById("subCategory");

  subCategory.innerHTML = "";

  categories[type][category].forEach(sub => {
    subCategory.innerHTML += `<option value="${sub}">${sub}</option>`;
  });
}

function addEntry() {
  const title = document.getElementById("title").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!title || !amount) return;

  const now = new Date();

  const entry = {
    type,
    title,
    amount,
    category: document.getElementById("category").value,
    subCategory: document.getElementById("subCategory").value,
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0, 5)
  };

  data.push(entry);
  localStorage.setItem("data", JSON.stringify(data));

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";

  render();
}

function render() {
  const list = document.getElementById("list");
  const totalEl = document.getElementById("total");

  list.innerHTML = "";
  let balance = 0;

  data.forEach(entry => {
    balance += entry.type === "income" ? entry.amount : -entry.amount;

    const li = document.createElement("li");
    li.className = entry.type;
    li.innerHTML = `
      <strong>${entry.title}</strong><br>
      ${entry.category} / ${entry.subCategory}<br>
      ₹${entry.amount} | ${entry.date} ${entry.time}
    `;
    list.appendChild(li);
  });

  totalEl.textContent = balance;
}