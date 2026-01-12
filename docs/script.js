let balance = 0;

function addTransaction() {
  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value;
  const amount = Number(document.getElementById("amount").value);

  if (title === "" || amount <= 0) {
    alert("Please enter valid details");
    return;
  }

  const list = document.getElementById("transactionList");

  const li = document.createElement("li");
  li.classList.add(type);

  const date = new Date().toLocaleString();

  li.innerHTML = `
    <span>${title}<br><small>${date}</small></span>
    <span>${type === "income" ? "+" : "-"}₹${amount}</span>
  `;

  list.appendChild(li);

  if (type === "income") {
    balance += amount;
  } else {
    balance -= amount;
  }

  document.getElementById("balance").innerText = balance;

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}
