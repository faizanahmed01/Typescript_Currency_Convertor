import inquirer from "inquirer";
import chalk from "chalk";
import fetch from "cross-fetch";
//currency convert api
let apiLink = "https://v6.exchangerate-api.com/v6/7c54b9e3553e2356f4f2db96/latest/PKR";
//Fetching Data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
let countries = Object.keys(data);
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "countryOne",
    message: "Converting From",
    choices: countries,
});
console.log(`Converting from ${chalk.greenBright.bold(firstCountry.countryOne)}`);
//Converting Amount
let userMoney = await inquirer.prompt({
    type: "number",
    name: "amount",
    message: `Please enter the amount in  ${chalk.greenBright.bold(firstCountry.countryOne)}`
});
console.log(userMoney.amount);
let SecondCountry = await inquirer.prompt({
    type: "list",
    name: "countrytwo",
    message: "Converting to",
    choices: countries,
});
console.log(`Converted Amount ${chalk.greenBright.bold(SecondCountry.countrytwo)}`);
//fetching data for conversion rates
let converrionApi = `https://v6.exchangerate-api.com/v6/7c54b9e3553e2356f4f2db96/pair/${firstCountry.countryOne}/${SecondCountry.countrytwo}`;
//Fetching Data for convertion rates    
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(converrionApi);
let convertedRate = userMoney.amount * conversionRate;
console.log(`Your ${chalk.bold.greenBright(firstCountry.countryOne)} 
${chalk.bold.greenBright(userMoney.amount)} in 
${chalk.bold.greenBright(SecondCountry.countrytwo)} is 
${chalk.bold.greenBright(convertedRate)}`);
