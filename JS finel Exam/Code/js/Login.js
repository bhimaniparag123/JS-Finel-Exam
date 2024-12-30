const budgetInput = document.getElementById("budgetInput");
const addBudgetButton = document.getElementById("addBudget");
const expenseTitleInput = document.getElementById("expenseTitle");
const expenseAmountInput = document.getElementById("expenseAmount");
const addExpenseButton = document.getElementById("addExpense");
const editExpenseButton = document.getElementById("editExpense");
const resetButton = document.getElementById("resetAll");

const totalBudgetEl = document.getElementById("totalBudget");
const totalExpensesEl = document.getElementById("totalExpenses");
const budgetLeftEl = document.getElementById("budgetLeft");
const expenseTable = document.getElementById("expenseTable");

let totalBudget = 0;
let totalExpenses = 0;
let currentExpenseRow = null;

function updateSummary() {
  // Update the summary section with current values
  budgetLeftEl.textContent = `$${(totalBudget - totalExpenses).toFixed(2)}`;
  totalBudgetEl.textContent = `$${totalBudget.toFixed(2)}`;
  totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
}

addBudgetButton.addEventListener("click", () => {
  // Add or update budget value
  const budgetValue = parseFloat(budgetInput.value);

  if (!isNaN(budgetValue) && budgetValue >= 0) {
    totalBudget += budgetValue;  // Add to the existing totalBudget
    updateSummary();  // Update summary with new budget value
    budgetInput.value = "";  // Clear input field after setting budget
  } else {
    alert("Please enter a valid budget amount!");
  }
});

addExpenseButton.addEventListener("click", () => {
  // Add expense functionality
  const title = expenseTitleInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (title === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense details!");
    return;
  }

  const expenseRow = document.createElement("tr");

  expenseRow.innerHTML = `
    <td>${title}</td>
    <td>$${amount.toFixed(2)}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="remove-btn">Remove</button>
    </td>
  `;

  // Remove expense functionality
  expenseRow.querySelector(".remove-btn").addEventListener("click", () => {
    totalExpenses -= amount;  // Subtract the amount of the removed expense
    expenseRow.remove();  // Remove the expense row from the table
    updateSummary();  // Update the summary after removing the expense
  });

  // Edit expense functionality
  expenseRow.querySelector(".edit-btn").addEventListener("click", () => {
    expenseTitleInput.value = title;
    expenseAmountInput.value = amount;
    currentExpenseRow = expenseRow;
    addExpenseButton.style.display = "none";
    editExpenseButton.style.display = "inline-block";
  });

  expenseTable.appendChild(expenseRow);

  totalExpenses += amount;  // Add the expense to the total expenses
  updateSummary();  // Update the summary with new total expenses

  // Clear input fields after adding expense
  expenseTitleInput.value = "";
  expenseAmountInput.value = "";
});

editExpenseButton.addEventListener("click", () => {
  // Edit the selected expense
  const title = expenseTitleInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (title === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense details!");
    return;
  }

  const oldAmount = parseFloat(
    currentExpenseRow.children[1].textContent.replace("$", "")
  );

  // Update the expense details
  currentExpenseRow.children[0].textContent = title;
  currentExpenseRow.children[1].textContent = `$${amount.toFixed(2)}`;

  // Update total expenses (subtract old amount, add new amount)
  totalExpenses = totalExpenses - oldAmount + amount;
  updateSummary();

  currentExpenseRow = null;
  expenseTitleInput.value = "";
  expenseAmountInput.value = "";
  addExpenseButton.style.display = "inline-block";
  editExpenseButton.style.display = "none";
});

resetButton.addEventListener("click", () => {
  // Reset all values
  totalBudget = 0;  // Reset the total budget to 0
  totalExpenses = 0;  // Reset the total expenses to 0
  expenseTable.innerHTML = "";  // Clear all expenses from the table
  updateSummary();  // Update the summary with 0 values
});