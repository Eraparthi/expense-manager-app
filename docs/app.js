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
    category.innerHTML += `<option>${cat}</option>`;
  });

  updateSubCategories();
  category.onchange = updateSubCategories;
}

function updateSubCategories() {
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const subCategory = document.getElementById("subCategory");

  subCategory.innerHTML = "";

  categories[type][category].forEach(sub => {
    subCategory.innerHTML += `<option>${sub}</option>`;
  });
}

function addEntry() {
  const title = document.getElementById("title").value.trim();
  const amount = Number(document.getElementById("amount").value);

  if (!title || !amount) return;

  const now = new Date();

  const entry = {
    type: document.getElementById("type").value,
    title,
    amount,
    category: document.getElementById("category").value,
    subCategory: document.getElementById("subCategory").value,
    date: now.toISOString().split("T")[0],
    time: now.toTimeString().slice(0,5)
  };

  data.push(entry);
  localStorage.setItem("data", JSON.stringify(data));

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";

  render();
}

function render() {
  const list = document.getElementById("list");
  const total = document.getElementById("total");

  list.innerHTML = "";
  let balance = 0;

  data.forEach(e => {
    balance += e.type === "income" ? e.amount : -e.amount;

    const li = document.createElement("li");
    li.className = e.type;
    li.innerHTML = `
      <strong>${e.title}</strong><br>
      ${e.category} / ${e.subCategory}<br>
      ₹${e.amount} • ${e.date} ${e.time}
    `;
    list.appendChild(li);
  });

  total.textContent = balance;
}