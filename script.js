// --- Application State ---
const budgetLimit = 1000.00;
let expenses = []; // Array storing expense records

// --- DOM Element References ---
const expenseForm = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const categoryInput = document.getElementById('expense-category');

const expenseListEl = document.getElementById('expense-list');
const totalSpentEl = document.getElementById('total-spent');
const remainingBudgetEl = document.getElementById('remaining-budget');
const statusMessageEl = document.getElementById('status-message');

// --- Event Listeners ---
expenseForm.addEventListener('submit', handleAddExpense);

// --- Core Event Functions ---
function handleAddExpense(event) {
  event.preventDefault(); // Prevent page refresh

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  // Validation using Conditionals
  if (!name || isNaN(amount) || amount <= 0 || !category) {
    alert('Please fill out all fields with valid information.');
    return;
  }

  // Record creation & Storage in Array
  const newExpense = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category
  };

  expenses.push(newExpense);

  // Clear form fields
  expenseForm.reset();

  // Trigger UI Update Pipeline
  updateApplication();
}

function handleDeleteExpense(id) {
  // Filter array to remove item matching ID
  expenses = expenses.filter(expense => expense.id !== id);
  updateApplication();
}

// --- Application Logic & Processing ---

// Calculates sum using a Loop over array
function calculateTotalSpent() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  return total;
}

// Decision Making with Conditionals for status alerts
function evaluateBudgetStatus(totalSpent, remainingBalance) {
  statusMessageEl.className = 'alert'; // Reset base alert classes

  if (totalSpent === 0) {
    statusMessageEl.textContent = 'Enter expenses below to start tracking your budget.';
    statusMessageEl.classList.add('info');
  } else if (remainingBalance < 0) {
    statusMessageEl.textContent = `Warning: You have exceeded your budget by $${Math.abs(remainingBalance).toFixed(2)}!`;
    statusMessageEl.classList.add('danger');
  } else if (remainingBalance <= budgetLimit * 0.2) {
    statusMessageEl.textContent = `Caution: You have used over 80% of your budget. Remaining: $${remainingBalance.toFixed(2)}`;
    statusMessageEl.classList.add('warning');
  } else {
    statusMessageEl.textContent = 'Great job! You are well within your monthly budget.';
    statusMessageEl.classList.add('success');
  }
}

// --- Dynamic DOM Updates ---

function renderExpensesTable() {
  expenseListEl.innerHTML = ''; // Clear table before rendering

  if (expenses.length === 0) {
    expenseListEl.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888;">No expenses added yet.</td></tr>`;
    return;
  }

  // Loop through expenses array to generate DOM elements
  for (let i = 0; i < expenses.length; i++) {
    const item = expenses[i];
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>$${item.amount.toFixed(2)}</td>
      <td>
        <button class="delete-btn" onclick="handleDeleteExpense(${item.id})">Delete</button>
      </td>
    `;

    expenseListEl.appendChild(row);
  }
}

function updateDashboardSummary(totalSpent, remainingBalance) {
  totalSpentEl.textContent = `$${totalSpent.toFixed(2)}`;
  remainingBudgetEl.textContent = `$${remainingBalance.toFixed(2)}`;
  
  // Highlight remaining balance red if negative
  if (remainingBalance < 0) {
    remainingBudgetEl.style.color = '#c0392b';
  } else {
    remainingBudgetEl.style.color = '#2c3e50';
  }
}

// Main pipeline orchestrator
function updateApplication() {
  const totalSpent = calculateTotalSpent();
  const remainingBalance = budgetLimit - totalSpent;

  renderExpensesTable();
  updateDashboardSummary(totalSpent, remainingBalance);
  evaluateBudgetStatus(totalSpent, remainingBalance);
}

// Initialize layout on launch
updateApplication();