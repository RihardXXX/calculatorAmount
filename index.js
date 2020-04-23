



const totalBalance = document.querySelector('.total__balance');
const totalMoneyIncome = document.querySelector('.total__money-income');
const totalMoneyExpenses = document.querySelector('.total__money-expenses');
const historyList = document.querySelector('.history__list');
const form = document.getElementById('form');
const operationName = document.querySelector('.operation__name');
const operationAmount = document.querySelector('.operation__amount');

const generId = () => {
    return `Rig${Math.round(Math.random * 1e8).toString(16)}`;
}


// if (localStorage.getItem('calc')) {
//     dbOperation = localStorage.getItem('calc');
// }



let dbOperation = [];

const renderOperation = (operation) => {
    const className = operation.amount < 0 ? 'history__item-minus' : 'history__item-plus';

    const listItem = document.createElement('li');
    listItem.classList.add('history__item');
    listItem.classList.add(className);
    listItem.innerHTML = `${operation.description}
        <span class="history__money">${operation.amount}₽</span>
        <button class="history_delete" data-id="">x</button>
    `;
    historyList.append(listItem);
}

const updateBalanse = () => {
    const resultIncome = dbOperation.filter((item) => {
        return item.amount > 0;
    }).reduce((result, item) => result += item.amount, 0);

    const resultExpanses = dbOperation.filter((item) => {
        return item.amount < 0;
    }).reduce((result, item) => result += item.amount, 0);

    totalMoneyIncome.textContent = resultIncome + ' P';
    totalMoneyExpenses.textContent = resultExpanses + ' P';
    totalBalance.textContent = (resultIncome + resultExpanses) + ' P';
}


const deleteOperation = (event) => {
    console.log(event.target);
    if (event.target.classList.contains('history_delete')) {

    }
}

const init = () => {
    historyList.textContent = '';

    dbOperation.forEach((elem) => {
        renderOperation(elem);
    })
    updateBalanse();
    localStorage.setItem('calc', JSON.stringify(dbOperation));
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const operationNameValue = operationName.value,
        operationAmountValue = operationAmount.value;

    // operationName.style.borderColor = 'red';
    // operationAmout.style.borderColor = 'red';

    if (operationNameValue !== '' && operationAmountValue !== '') {

        const operation = {
            id: generId(),
            description: operationNameValue,
            amount: +operationAmountValue,
        }

        dbOperation.push(operation);
        init();

        operationName.value = '';
        operationAmount.value = '';
    } else {
        if (!operationNameValue) operationName.style.borderColor = 'red';
        if (!operationAmountValue) operationAmount.style.borderColor = 'red';
    }
});


historyList.addEventListener('click', deleteOperation);

init();