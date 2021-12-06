window.addEventListener('load', main);

// State
let taxRate = 0.25;

function main() {
    renderTaxRateButtons();
    addEventListeners();
    
}

function addEventListeners() {
    const taxRateContainer = document.getElementById('tax-rates');
    for (const button of taxRateContainer.children) {
        button.addEventListener('click', setTaxRate);
    }

    const inclTaxElement = document.getElementById('incl-moms');
    inclTaxElement.addEventListener('input', calculateFromInclTaxElement);

    const exclTaxElement = document.getElementById('excl-moms');
    exclTaxElement.addEventListener('input', calculateFromExclTaxElement); 
}
/**
 * Calculate incl tax sum presents it to the user
 * @param {InputEvent} event 
 */
function calculateFromExclTaxPrice(event) {
    // 1. Beräkna värdena vi behöver
    const priceExcl = Number(event.target.value);
    const priceIncl = Number((priceExcl * (1 + taxRate)).toFixed(4));
    const taxSum = Number((priceExcl * taxRate).toFixed(4));

    // 2. Presentera värdena
    const inclTaxElement = document.getElementById('incl-moms');
     inclTaxElement.value = priceIncl;
     const taxSumElement = document.getElementById('tax-sum');
     taxSumElement.value = taxSum;
}

/**
 * Calculate excl tax sum presents it to the user
 * @param {InputEvent} event 
 */
 function calculateFrominclTaxElement(event) {
     // 1. Beräkna värdena vi behöver
     const priceIncl = Number(event.target.value);
     const priceExcl = Math.round(priceIncl / (1 + taxRate) * 100) / 100;
     const taxSum = priceIncl - priceExcl;
    
     // 2. Presentera värdena
     const exclTaxElement = document.getElementById('excl-moms');
     exclTaxElement.value = priceExcl;
     const taxSumElement = document.getElementById('tax-sum');
     taxSumElement.value = taxSum;
}

/**
 * Sets the selected tax rate and rerender ui
 * @param {MouseEvent} event
 */
function setTaxRate(event) {
    taxRate = Number(event.target.id);
    renderTaxRateButtons();
}
function renderTaxRateButtons() {
    const taxRateContainer = document.getElementById('tax-rates');
    for (const button of taxRateContainer.children) {
        if (button.id == taxRate) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
}