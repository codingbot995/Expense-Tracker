document.addEventListener("DOMContentLoaded", () => {
    const balanceEl = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expenseEl = document.getElementById("expense");
    const listEl = document.getElementById("list");
    const textInput = document.getElementById("text");
    const amountInput = document.getElementById("amount");
    const submitBtn = document.getElementById("submit");

    let transactions = [];

    function updateUI() {
        const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
        const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
        const balance = income + expense;

        balanceEl.textContent = `$${balance.toFixed(2)}`;
        incomeEl.textContent = `$${income.toFixed(2)}`;
        expenseEl.textContent = `-$${Math.abs(expense).toFixed(2)}`;
        
        listEl.innerHTML = transactions.map((t, index) => `
            <li>${t.text} <span>$${t.amount.toFixed(2)}</span>
                <button onclick="removeTransaction(${index})">x</button>
            </li>
        `).join("");
    }

    function addTransaction(e) {
        e.preventDefault();
        const text = textInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());

        if (text === "" || isNaN(amount)) {
            alert("Please enter valid text and amount.");
            return;
        }

        transactions.push({ text, amount });
        textInput.value = "";
        amountInput.value = "";
        updateUI();
    }

    window.removeTransaction = (index) => {
        transactions.splice(index, 1);
        updateUI();
    };

    submitBtn.addEventListener("click", addTransaction);
    updateUI();
});
