let numbers = [];

function insertNumber() {

    const input = document.getElementById("numberInput");
    const value = Number(input.value);

    if (input.value === "" || value <= 0 || !Number.isInteger(value)) {
        alert("Please enter a positive whole number.");
        return;
    }

    numbers.push(value);

    displayNumbers();

    input.value = "";

    input.focus();

    clearResults();
}


function displayNumbers() {

    const list = document.getElementById("numberList");

    list.innerHTML = "";

    numbers.forEach(function(number, index) {

        const row = document.createElement("div");
        row.className = "number-row";

        const numberValue = document.createElement("span");
        numberValue.className = "number-value";
        numberValue.textContent = number;

        const numberType = document.createElement("span");
        numberType.className = "number-type";

        if (number % 2 === 0) {
            numberType.textContent = "EVEN";
            numberType.classList.add("even");
        } else {
            numberType.textContent = "ODD";
            numberType.classList.add("odd");
        }

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "row-button";

        removeButton.onclick = function() {
            removeNumber(index);
        };

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "row-button";

        editButton.onclick = function() {
            editNumber(index);
        };

        row.appendChild(numberValue);
        row.appendChild(numberType);
        row.appendChild(removeButton);
        row.appendChild(editButton);

        list.appendChild(row);
    });
}

function removeNumber(index) {

    numbers.splice(index, 1);

    displayNumbers();

    clearResults();
}


function editNumber(index) {

    const newValue = prompt(
        "Enter new number:",
        numbers[index]
    );

    if (newValue === null) {
        return;
    }

    const value = Number(newValue);

    if (
        newValue.trim() === "" ||
        value <= 0 ||
        !Number.isInteger(value)
    ) {
        alert("Please enter a positive whole number.");
        return;
    }

    numbers[index] = value;

    displayNumbers();

    clearResults();
}

function clearEntry() {

    document.getElementById("numberInput").value = "";

    document.getElementById("numberInput").focus();
}


function clearItems() {

    numbers = [];

    displayNumbers();

    clearResults();

    document.getElementById("sortSelect").value = "";
}


function getTotal() {

    if (numbers.length === 0) {
        alert("There are no numbers inserted.");
        return;
    }

    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    const results = document.getElementById("results");

    results.innerHTML = `
        <div class="result-row">
            <span class="result-label">TOTAL</span>
            <span class="result-value">${total}</span>
        </div>
    `;
}


function identifyHighestLowest() {

    if (numbers.length === 0) {
        alert("There are no numbers inserted.");
        return;
    }

    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);

    const results = document.getElementById("results");

    results.innerHTML = `
        <div class="result-row">
            <span class="result-label">HIGHEST</span>
            <span class="result-value">${highest}</span>
        </div>

        <div class="result-row">
            <span class="result-label">LOWEST</span>
            <span class="result-value">${lowest}</span>
        </div>
    `;
}


function sortNumbers() {

    const sortOption = document.getElementById("sortSelect").value;

    if (sortOption === "") {
        return;
    }

    if (numbers.length === 0) {
        alert("There are no numbers to sort.");
        return;
    }

    if (sortOption === "ascending") {

        numbers.sort(function(a, b) {
            return a - b;
        });

    } else if (sortOption === "descending") {

        numbers.sort(function(a, b) {
            return b - a;
        });
    }

    displayNumbers();

    clearResults();
}

function clearResults() {

    document.getElementById("results").innerHTML = "";
}