let funds = 0
let chips = 0
let chipPrice = 1
let printers = 0
let colorToggle = 0
let tenSecondInterval = 0
let selling = 0
let sellSpeed = 0.05
let chipCountNow = 0
let employeesCost = 0
let employeesAmount = 0
let currentResources = 0
let maxResources = 100
let employeeMiningAmount = 1
let printerCost = 10


const chipsElement = document.getElementById("chips")
const fundsElement = document.getElementById("funds")
const priceElement = document.getElementById("price")
const printersElement = document.getElementById("printers")
const printerCostElement = document.getElementById("printerCost")

const employeeCostElement = document.getElementById("employeeCost")
const employeeAmountElement = document.getElementById("employeeAmount")

const currentResourcesElement = document.getElementById("currentResources")
const maxResourcesElement = document.getElementById("maxResources")

const resourceBar = document.getElementById("resourceBar")
const resourceBarAmount = document.getElementById("resourceBarAmount")

// Updates
function updateDisplay() {  
    chipsElement.textContent = chips;
    fundsElement.textContent = funds.toFixed(2);
    priceElement.textContent = chipPrice.toFixed(2);
    printersElement.textContent = printers;
    employeeCostElement.textContent = employeesCost.toFixed(2);
    employeeAmountElement.textContent = employeesAmount;
    currentResourcesElement.textContent = currentResources;
    maxResourcesElement.textContent = maxResources;
    printerCostElement.textContent = printerCost.toFixed(2);
    if (currentResources > maxResources){currentResources = maxResources};
}

// Intervals
setInterval(function() {// Resources
    if (currentResources < maxResources) {
        currentResources += employeesAmount * employeeMiningAmount;
    } else {
        currentResources += 0;
    }
},1000);

setInterval(() => {// Checks
    checkUnlocks();
    updateDisplay();
    printerCheck();
},10);

setInterval(function() {// Chip Price
    chipPrice = 1 + Math.random() * 0.1;
}, 10000);

// Resources
function hireEmployee() {
    if (funds >= employeesCost) {
        spend(employeesCost);
        if (employeesAmount <= 0) {
            employeesCost += 10;
        } else {
            employeesCost *= 1.31;
        }
        employeesAmount += 1;
    }
}

function increaseResourceBar() {
    var width = 0;
    var id = setInterval(fillBar, 1);
    function fillBar() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width = currentResources;
            resourceBarAmount.style.width = width + "%";
        }
    }
}

// Processes
function manufactureChip() {
    if (currentResources >= 1) {
        chips++;
        currentResources -= 1;
    }
}

function sellingStart() {
    chipCountNow = chips;
    chips -= chipCountNow;
    sellChipButton.disabled = true;
}

function sellChips() {
    funds += chipPrice * chipCountNow;
    sellChipButton.disabled = false;
}

function sellChipBar() {
    sellingStart();
    if (selling == 0) {
        selling = 1;
        var width = 0;
        var id = setInterval(fillBar, 1);
        function fillBar() {
            if (width >= 100) {
                sellProgress.style.width = 0;
                selling = 0;
                sellChips();
                clearInterval(id);
            } else {
                width += sellSpeed;
                sellProgress.style.width = width + "%";
            }
        } 
    }
}

// Automation
function buyPrinter() {
    if (funds >= printerCost) {
    funds -= 10;
    printers++;
    printerCost *= 1.42;
    }
}

function printerCheck() {
    if (currentResources >= printers) {
        chips += printers;
        currentResources -= printers;
    }
}

// Misc
function spend(amountToSpend) {funds -= amountToSpend;}

function checkUnlocks() {
    if (chips >= 50) {
    document.getElementById("printerButton").style.display = "inline-block";
    }
}