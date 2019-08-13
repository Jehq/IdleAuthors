'use strict';

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function randWord() {
    return wordBank[randInt(wordBank.length)] + " ";
}

function roundNum(num, n) {
    const m = Math.pow(10, n);
    return parseFloat(Math.round(num * m) / m).toFixed(n);
}

function commaNum(num) {
    num = roundNum(num, 0);
    var digs = ("" + num).split("");
    var output = "";
    for (var i = 0; i < digs.length; i++) {
        output += digs[i];
        if (i < digs.length - 1 && (i - digs.length + 1) % 3 == 0) {
            output += ",";
        }
    }
    return output;
}

function sciNum(num, n) {
    var mag = Math.floor(Math.log10(num));
    num = roundNum(num / Math.pow(10, mag), n);
    return num + "E+" + mag;
}

function numDisplay(num) {
    if (num < 999) {
        return roundNum(num, 2);
    }

    if (num < 999999999) {
        return commaNum(num);
    }

    else {
        return sciNum(num, 3);
    }
}

function setWordsDisplay() {
    var tempDisplay = "";
    // It's bad practice to iterate over one thing (displayLength)
    // and just assume that another thing (displayWords) is >= to it in size
    for (var i = 0; i < displayWords.length; i++) {
        tempDisplay += displayWords[i];
    }
    displayField.innerHTML = displayWords.reduce((accumulator, currentValue) => accumulator + currentValue);
    // displayField.innerHTML = tempDisplay;
}

function setCurrencyDisplay() {
    var wordText = "Words: " + numDisplay(wordCount) + "<br>";
    var wordIncomeText = "Words Per Second: " + numDisplay(wordIncome);

    var moneyText = "Money: $" + numDisplay(moneyCount) + "<br>";
    var moneyIncomeText = "Money Per Second: $" + numDisplay(moneyIncome);

    currencyFieldW.innerHTML = wordText + wordIncomeText;
    currencyFieldM.innerHTML = moneyText + moneyIncomeText;
}

function checkInputWord() {
    if (inputField.value == displayWords[0]) {
        displayWords.splice(0, 1);
        displayWords.push(randWord());
        inputField.value = "";
        wordCount++;
        wordCountTotal++;
        currentWPM++;
        setWordsDisplay();
    }
}

function calculateIncome() {
    moneyIncome = 0;
    wordIncome = 0;

    for (var i = 0; i < buttonCountW.length; i++) {
        moneyIncome += buttonCountW[i] * incomeW[i];
    }

    for (var i = 0; i < buttonCountM.length; i++) {
        wordIncome += buttonCountM[i] * incomeM[i];
    }
}

function incomePercent(n, type) {
    if (type == "W") {

        if (buttonCountW[n] == 0) {
            return "0.00%"
        }

        var x = incomeW[n] * buttonCountW[n];
        return roundNum(100 * x / moneyIncome, 2) + "%";
    }

    if (type == "M") {

        if (buttonCountM[n] == 0) {
            return "0.00%"
        }

        var x = incomeM[n] * buttonCountM[n];
        return roundNum(100 * x / wordIncome, 2) + "%";
    }
}

function calculateWPM() {
    console.log("Calculating wpm");
    var width = 0;

    setInterval(function () {
        if (width >= 100) {
            width = 1;
            if (currentWPM > recordWPM) {
                recordWPM = currentWPM;
            }

            wpmField.innerHTML = "Recent WPM: " + currentWPM + "<br>" + "Record WPM: " + recordWPM;
            currentWPM = 0;
        }
        width++;
        progress.style.width = width + "%";
        progress.style.color = "#CCCCCC";
    }, 60); // One hundred times per minute
}

function setButtonText(buttonType) {
    if (buttonType == "W") {
        for (var i = 0; i < buttonsW.length; i++) {
            var button = buttonsW[i][0];
            var info = buttonsW[i][1];

            var exp = Math.floor(buttonCountW[i] / 5);
            var cost = costsW[i] * Math.pow(2, exp);
            button.textContent = buttonNamesW[i] + "\r\n";
            button.textContent += numDisplay(cost, 1) + " words";

            var x = numDisplay(incomeW[i]);
            var y = incomePercent(i, "W");
            info.innerHTML = "Owned: " + buttonCountW[i] + "<br>";
            info.innerHTML += "Each earning: $" + x + "/s <br>";
            info.innerHTML += "Earning percentage: " + y;
        }
    }

    if (buttonType == "M") {
        for (var i = 0; i < buttonsM.length; i++) {
            var button = buttonsM[i][0];
            var info = buttonsM[i][1];

            var exp = Math.floor(buttonCountM[i] / 5);
            var cost = costsM[i] * Math.pow(2, exp);
            button.textContent = buttonNamesM[i] + "\r\n ";
            button.textContent += "$" + numDisplay(cost, 2);

            var x = numDisplay(incomeM[i]);
            var y = incomePercent(i, "M");
            info.innerHTML = "Owned: " + buttonCountM[i] + "<br>";
            info.innerHTML += "Each producing: " + x + " W/s <br>";
            info.innerHTML += "Production percentage: " + y;
        }
    }
}

function generateButton(buttonType) {
    var br = document.createElement("br");

    var div = document.createElement("div");
    div.classList.add("split");

    var info = document.createElement("div");
    info.classList.add("buttonInfo");

    var button = document.createElement("button");
    button.classList.add("button");

    if (buttonType == "W") {

        if (buttonNumberW > buttonNamesW.length) {
            return 0;
        }

        var n = buttonNumberW;
        buttonCountW.push(0);

        buttonsW.push([button, info]);
        button.addEventListener("click", function () {
            var exp = Math.floor(buttonCountW[n] / 5);
            var cost = costsW[n] * Math.pow(2, exp);

            if (wordCount >= cost) {
                wordCount -= cost;
                buttonCountW[n]++;
                calculateIncome();
                setButtonText("W");
            }
        });

        div.appendChild(button);
        div.appendChild(info);
        buttonFieldW.append(div);
        buttonFieldW.append(br);
        calculateIncome();
        setButtonText("W");
        buttonNumberW++;
    }

    if (buttonType == "M") {

        if (buttonNumberM > buttonNamesM.length) {
            return 0;
        }

        var n = buttonNumberM;
        buttonCountM.push(0);

        buttonsM.push([button, info]);
        button.addEventListener("click", function () {
            var exp = Math.floor(buttonCountM[n] / 5);
            var cost = costsM[n] * Math.pow(2, exp);

            if (moneyCount >= cost) {
                moneyCount -= cost;
                buttonCountM[n]++;
                calculateIncome();
                setButtonText("M");
            }
        });

        div.appendChild(button);
        div.appendChild(info);
        buttonFieldM.appendChild(div);
        buttonFieldM.appendChild(br);
        setButtonText("M");
        buttonNumberM++;
    }
}

function update() {
    setInterval(function () {
        checkInputWord();
        setCurrencyDisplay();
        wordCount += wordIncome / tickRate;
        moneyCount += moneyIncome / tickRate;
        wordCountTotal += wordIncome / tickRate;
        moneyCountTotal += moneyIncome / tickRate;

        if (wordCountTotal >= costsW[buttonNumberW] / 10) {
            generateButton("W");
        }

        if (moneyCountTotal >= costsM[buttonNumberM] / 10) {
            generateButton("M");
        }

    }, tickLength);
    calculateWPM();
}

function initialize() {
    var tempDisplay = "";

    for (var i = 0; i < 100; i++) {
        const word = randWord();
        tempDisplay += word;
        displayWords.push(word);
    }

    displayField.innerHTML = tempDisplay;
    update();
}