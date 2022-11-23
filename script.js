///ADDING MORE FEATURES with new branch
//1) FOR WRONG PIN ACCOUNT LOCKS OUT
//WRONG USERNAME UI
//insuffiecient money
//Indian names and login
//deleting account popup
//logout feauture
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const euroToUsd = 1.03;

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Display movements function
const displayMov = function (movements, sort = false) {
  containerMovements.innerHTML = " ";
  //New sorted array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((amount, i) => {
    let type = amount > 0 ? "deposit" : "withdrawal";
    let movHTML = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__value">${amount}€</div>
</div>`;
    containerMovements.insertAdjacentHTML("afterbegin", movHTML);
  });
};

//EUROTOINR
// const euroToInr = 0.012;
// const movINR = movements.map((mov) => euroToInr * mov);
// console.log(movINR);

//Creating usernames
// const user = "Pranay Kumar Dwivedi";
const usernameGenerator = function (account) {
  account.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
//add Random digits and alphabet code
// let str = " ";
// username.forEach(function (name) {
//   // console.log(name.slice(0, 1));
//   str += name[0];
// });
//stringfromcharcode
// let rNum = Math.trunc(Math.random() * 100);
// let rAlpha = String.fromCharCode(Math.trunc(Math.random() * 25) + 65);
// username += rNum + rAlpha;
// return username;

//Calculating Balance function
const calcDisplayBalance = function (acc) {
  //creating array of net balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // console.log(balance);
  labelBalance.textContent = acc.balance;
  // return balance;
};

//calculating summary bank statment
const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumIn.textContent = incomes;
  const out = Math.abs(
    movements.filter((mov) => mov < 0).reduce((sum, mov) => sum + mov, 0)
  );
  labelSumOut.textContent = out;
  const interest = movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map((deposits) => (deposits * 1.2) / 100)
    .filter((mov) => mov >= 1)
    .reduce((sum, interest) => sum + interest, 0);
  labelSumInterest.textContent = interest;
};

usernameGenerator(accounts);
// console.log(accounts);

//Creating a array of withdraws and deposits
// const deposits = movements.filter((mov) => mov > 0);
// const withdrawls = movements.filter((mov) => mov < 0);
// console.log(deposits, withdrawls);

//Calcuating Total User deposits in USD using chaining methods
const totalDesposistUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * euroToUsd)
  .reduce((bal, mov) => bal + mov);
// console.log(totalDesposistUSD);

//Declaring current account varaible outside
let currentAccount;
//USER LOGIN FUNCTION
const userLogin = function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc?.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount.pin === Number(inputLoginPin?.value)) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome ${currentAccount.owner}`;
    //clearing input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
};
//Updating UI function
const updateUI = function (acc) {
  calcDisplaySummary(acc.movements);
  calcDisplayBalance(acc);
  displayMov(acc.movements);
};

//LOGIN BUTTON
btnLogin.addEventListener("click", userLogin);

//Transfer function
let recipentAccount;
const userTransfer = function (e) {
  e.preventDefault();
  recipentAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  let amount = inputTransferAmount.value;
  if (
    recipentAccount &&
    amount < currentAccount.balance &&
    amount > 0 &&
    recipentAccount !== currentAccount
  ) {
    //add negative movement to user
    currentAccount.movements.push(-Number(inputTransferAmount.value));
    //adding postive moment to recipent
    recipentAccount.movements.push(Number(inputTransferAmount.value));
    //updating UI
    updateUI(currentAccount);
    //clearing fields
    inputTransferAmount.value = inputTransferTo.value = "";
    inputTransferTo.blur();
  }
};
//Implementing transfer
btnTransfer.addEventListener("click", userTransfer);

//Loan Function
const loanRequest = function (e) {
  e.preventDefault();
  let loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmount * 0.1)
  ) {
    //loan granted
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
    inputLoanAmount.value = "";
  }
};
//Requesting loan feature
btnLoan.addEventListener("click", loanRequest);

//close account function
const closeAccount = function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    //removing/deleting account
    index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    //Login again UI
    labelWelcome.textContent = "Login to get started";
    inputCloseUsername.value = inputClosePin.value = "";
  }
};
//closing the bank account
btnClose.addEventListener("click", closeAccount);

//flag/state
let sorted = false;
//sorting
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMov(currentAccount.movements, !sorted);
  sorted = !sorted;
});
