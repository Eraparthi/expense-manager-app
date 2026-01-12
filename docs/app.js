let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
render();

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = Number(document.getElementById("amount").value);

  if (!title || !amount) return;

  expenses.push({ title, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";

  render();
}

function render() {
  const list = document.getElementById("list");
  const totalEl = document.getElementById("total");
  list.innerHTML = "";

  let total = 0;

  expenses.forEach(e => {
    total += e.amount;
    const li = document.createElement("li");
    li.textContent = `${e.title} - ₹${e.amount}`;
    list.appendChild(li);
  });

  totalEl.textContent = total;
}