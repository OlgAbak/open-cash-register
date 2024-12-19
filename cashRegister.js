let price = 19.5;
price = 3.26;
price = 19.5;
price = 19;
price = 20;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
cid = [
  ['PENNY', 0.01],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];
cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 3],
  ['QUARTER', 5],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 0]
];

const unit = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.1,
  'QUARTER': 0.25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  'ONE HUNDRED': 100
};

let cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');
let changeInDrawer = document.querySelector('.change-in-drawer');
let totalPrice = document.getElementById('price');

totalPrice.innerHTML = `<p>Total: $${price}</p>`;
changeInDrawer.innerHTML = 
      `<p><strong>Change in drawer:</strong></p>
        <p>Pennies: $${cid[0][1]}</p>
        <p>Nickels: $${cid[1][1]}</p>
        <p>Dimes: $${cid[2][1]}</p>
        <p>Quarters: $${cid[3][1]}</p>
        <p>Ones: $${cid[4][1]}</p>
        <p>Fives: $${cid[5][1]}</p>
        <p>Tens: $${cid[6][1]}</p>
        <p>Twenties: $${cid[7][1]}</p>
        <p>One Hundreds: $${cid[8][1]}</p>`;

const checkCash = (number) => {
  let cashNum = Number(cash.value);

  if (cashNum < price) {
    alert('Customer does not have enough money to purchase the item');
  } else 
  if (cashNum === price) 
  {
    changeDue.textContent = 'No change due - customer paid with exact cash';
  } else 
  if (cashNum > price)
   {
    cidChecked(cashNum);
  };
};

const cidChecked = (number) => {
  let cashNum = Number(cash.value);
  
  let cashPriceDiff = cashNum - price;
  let cidDimensions = cid.flat();
  let cidNum = cidDimensions.filter(el => Number(el));
  let cidSum = Math.round(cidNum.reduce((acc, el) => acc + el, 0) * 100) / 100;

  if (cidSum === cashPriceDiff) {
    zeroChecked(cashPriceDiff);
  } else

  if (cidSum < 2 || cidSum < cashPriceDiff) {
    changeDue.textContent = 'Status: INSUFFICIENT_FUNDS';

  } else 
  if (cidSum > cashPriceDiff)
  { 
    amountChecked(cashPriceDiff);
  };
};

const zeroChecked = (number) => {
  let cashNum = Number(cash.value);
  let cashPriceDiff = cashNum - price;
  let cidDimensions = cid.flat();
  let cidNum = cidDimensions.filter(el => Number(el));
  let cidReverse = cid.reverse();
  let cidSum = Math.round(cidNum.reduce((acc, el) => acc + el, 0) * 100) / 100;
  let changeArray = [];
  let cidArray = [];

  if (cashPriceDiff === cidSum) {
    for (let[currency, amount] of cidReverse) {
      let currencyUnit = unit[currency];
      let currencyAmount = 0;

      while (cashPriceDiff >= currencyUnit && amount > 0) {
        cashPriceDiff -= currencyUnit;
        amount -= currencyUnit;
        currencyAmount += currencyUnit;
        cashPriceDiff = Math.round(cashPriceDiff * 100) / 100;
      };

      if (currencyAmount > 0) {
        changeArray.push([currency, currencyAmount.toFixed(2)]);
      };

  cidArray.push([currency, amount.toFixed(2)]);
  

changeDue.innerHTML = 'Status: CLOSED'+'\n'+changeArray.map(([currency, currencyAmount]) => {
  return `\n${currency}: $${currencyAmount}
`;
    }).join('');

changeInDrawer.innerHTML = 'Change in drawer:'+'\n'+cidArray.map(([currency, amount]) => {
  return `\n${currency}:\n$${amount}`;
}).join('');
    }

if (cashPriceDiff > 0) {
          changeDue.textContent = 'Status: INSUFFICIENT_FUNDS';
      }
}
}
const amountChecked = (number) => {
  let cashNum = Number(cash.value);
  let cashPriceDiff = cashNum - price;
  let cidDimensions = cid.flat();
  let cidNum = cidDimensions.filter(el => Number(el));
  let cidReverse = cid.reverse();
  let cidSum = Math.round(cidNum.reduce((acc, el) => acc + el, 0) * 100) / 100;
  let changeArray = [];
  let cidArray = [];

    if (cashPriceDiff < cidSum) {
    
    for (let[currency, amount] of cidReverse) {
      let currencyUnit = unit[currency];
      let currencyAmount = 0;

      while (cashPriceDiff >= currencyUnit && amount > 0) {
        cashPriceDiff -= currencyUnit;
        amount -= currencyUnit;
        currencyAmount += currencyUnit;
        cashPriceDiff = Math.round(cashPriceDiff * 100) / 100;
      };

      if (currencyAmount > 0) {
        changeArray.push([currency, currencyAmount.toFixed(2)]);
      };

        cidArray.push([currency, amount.toFixed(2)]);

changeDue.innerHTML = 'Status: OPEN'+'\n'+changeArray.map(([currency, currencyAmount]) => {
  return `\n${currency}: $${currencyAmount}
`;
    }).join('');

changeInDrawer.innerHTML = 'Change in drawer:'+'\n'+cidArray.map(([currency, amount]) => {
  return `\n${currency}: $${amount}`;
}).reverse().join('');
    }

if (cashPriceDiff > 0) {
    changeDue.textContent = 'Status: INSUFFICIENT_FUNDS';
      }
  }
}
purchaseBtn.addEventListener('click', checkCash);
