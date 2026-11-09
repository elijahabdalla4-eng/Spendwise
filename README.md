# SpendWise - Interactive Budget Tracker

SpendWise is a dynamic, browser-based personal finance tracker designed to help users record daily spending, monitor remaining funds against a set budget, and receive real-time financial feedback.

---

## 🌟 Improvements Made This Week
This week, SpendWise transitioned from a static HTML template into a functional, interactive Web Application:
* **Dynamic Record Logging:** Users can add and delete expense records dynamically.
* **Live Calculations:** The application automatically computes total spending and updates remaining budget metrics.
* **Adaptive Alerts:** Displays real-time status banners based on spending thresholds.

---

## 💡 Technical Implementation Details

### 1. Decision Making (Conditionals)
Conditionals (`if`, `else if`, `else`) are applied across two main areas:
* **Validation Check:** Ensures input inputs are non-empty and numbers are strictly positive before adding records to memory.
* **Budget Status Evaluation:** Computes total expenses against the threshold ($1,000) and displays:
  * `info`: No expenses logged yet.
  * `success`: Expenses are within safe operational limits.
  * `warning`: Expenses exceed 80% of total budget limit.
  * `danger`: Budget has been exceeded.

### 2. Storing Data (Arrays)
* All expenses are held in a global JavaScript array named `expenses`.
* Every entry added via the form is formatted as an object `{ id, name, amount, category }` and appended using `expenses.push()`.
* Removal of items uses the `Array.prototype.filter()` method to remove records matching a given ID.

### 3. Processing Data (Loops)
* **Summation Loop:** A standard `for` loop iterates through the `expenses` array to calculate aggregate totals.
* **Rendering Loop:** A `for` loop cycles through stored entries to build table elements dynamic on the page.

### 4. DOM Manipulation
* **Content Updates:** Nodes such as total balance, remaining limit, and alert text are updated using `.textContent` and `.innerHTML`.
* **Element Creation:** Generates table row elements (`<tr>`) dynamically and inserts them into the document tree using `.appendChild()`.

### 5. Event Handling
* **Form Submission (`submit`):** Listens on `#expense-form` to intercept submissions, invoking `e.preventDefault()` to stop page reloads.
* **Record Removal (`click`):** Action buttons attached directly to generated rows execute deletion logic via dynamic inline `onclick` handlers.

---

## 🛠️ Challenges Encountered & Resolutions

1. **Issue:** Submitting the form triggered a browser page refresh, losing stored data instantly.
   * **Resolution:** Included `event.preventDefault()` at the beginning of the form submit handler.
2. **Issue:** Numeric inputs from form elements were treated as string primitives (`"50"` + `"20"` resulted in `"5020"`).
   * **Resolution:** Wrapped values inside `parseFloat()` prior to performing calculations.

---

## 🚀 How to Run locally

1. Download or clone this repository.
2. Open `index.html` inside any web browser.
3. Fill out the expense details in the form and click **Add Expense**.