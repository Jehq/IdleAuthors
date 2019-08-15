"use strict";

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function randWord() {
    return wordBank[randInt(wordBank.length)] + " ";
}

function roundNum(num, n) {
    let x = Math.pow(10, n);
    return parseFloat(Math.round(num * x) / x).toFixed(n);
}

function commaNum(num) {
    num = roundNum(num, 0);
    let digs = ("" + num).split("");
    let output = "";
    for (let i = 0; i < digs.length; i++) {
        output += digs[i];
        if (i < digs.length - 1 && (i - digs.length + 1) % 3 == 0) {
            output += ",";
        }
    }
    return output;
}

function sciNum(num, n) {
    let mag = Math.floor(Math.log10(num));
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
    let tempDisplay = "";

    for (let i = 0; i < displayWords.length; i++) {
        tempDisplay += displayWords[i];
    }

    displayField.innerHTML = tempDisplay;
}

function setCurrencyDisplay() {
    let wordText = "Words: " + numDisplay(wordCount) + "<br>";
    let wordIncomeText = "Words Per Second: " + numDisplay(wordIncome);

    let moneyText = "Money: $" + numDisplay(moneyCount) + "<br>";
    let moneyIncomeText = "Money Per Second: $" + numDisplay(moneyIncome);

    currencyFieldW.innerHTML = wordText + wordIncomeText;
    currencyFieldM.innerHTML = moneyText + moneyIncomeText;
}

function checkInputWord() {
    if (inputField.value == displayWords[0]) {
        displayWords.splice(0, 1);
        displayWords.push(randWord());
        inputField.value = "";
        wordCount++;
        wordTotal++;
        wordsTyped++;
        WPM ++;
        setWordsDisplay();
    }
}

function calculateIncome() {
    moneyIncome = 0;
    wordIncome = 0;

    for (let i = 0; i < buttonCountW.length; i++) {
        moneyIncome += buttonCountW[i] * incomeW[i];
    }

    for (let i = 0; i < buttonCountM.length; i++) {
        wordIncome += buttonCountM[i] * incomeM[i];
    }
}

function incomePercent(n, type) {
    if (type == "W") {

        if (buttonCountW[n] == 0) {
            return "0.00%"
        }

        let x = incomeW[n] * buttonCountW[n];
        return roundNum(100 * x / moneyIncome, 2) + "%";
    }

    if (type == "M") {

        if (buttonCountM[n] == 0) {
            return "0.00%"
        }

        let x = incomeM[n] * buttonCountM[n];
        return roundNum(100 * x / wordIncome, 2) + "%";
    }
}

function calculateWPM() {
    let width = 0;

    setInterval(function () {
        if (width >= 100) {
            width = 0;

            if (WPM > recordWPM) {
                recordWPM = WPM;
            }

            wpmField.innerHTML = "Typing speed: " + WPM + " words/min";
            WPM = 0;
        }

        width++;
        progress.style.width = width + "%";
    }, 600);
}

function setButtonText(buttonType) {
    if (buttonType == "W") {
        for (let i = 0; i < buttonsW.length; i++) {
            let button = buttonsW[i][0];
            let info = buttonsW[i][1];

            let exp = Math.floor(buttonCountW[i] / 5);
            let cost = costsW[i] * Math.pow(2, exp);
            button.textContent = buttonNamesW[i] + "\r\n";
            button.textContent += numDisplay(cost, 1) + " words";

            let x = numDisplay(incomeW[i]);
            let y = incomePercent(i, "W");
            info.innerHTML = "Owned: " + buttonCountW[i] + "<br>";
            info.innerHTML += "Each earning: $" + x + "/s <br>";
            info.innerHTML += "Earning percentage: " + y;
        }
    }

    if (buttonType == "M") {
        for (let i = 0; i < buttonsM.length; i++) {
            let button = buttonsM[i][0];
            let info = buttonsM[i][1];

            let exp = Math.floor(buttonCountM[i] / 5);
            let cost = costsM[i] * Math.pow(2, exp);
            button.textContent = buttonNamesM[i] + "\r\n ";
            button.textContent += "$" + numDisplay(cost, 2);

            let x = numDisplay(incomeM[i]);
            let y = incomePercent(i, "M");
            info.innerHTML = "Owned: " + buttonCountM[i] + "<br>";
            info.innerHTML += "Each producing: " + x + " W/s <br>";
            info.innerHTML += "Production percentage: " + y;
        }
    }
}

function generateButton(buttonType) {
    let br = document.createElement("br");

    let div = document.createElement("div");
    div.classList.add("split");

    let info = document.createElement("div");
    info.classList.add("buttonInfo");

    let button = document.createElement("button");
    button.classList.add("button");

    if (buttonType == "W") {

        if (buttonNumberW > buttonNamesW.length) {
            return 0;
        }

        let n = buttonNumberW;
        buttonCountW.push(0);

        buttonsW.push([button, info]);
        button.addEventListener("click", function () {
            let exp = Math.floor(buttonCountW[n] / 5);
            let cost = costsW[n] * Math.pow(2, exp);

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

        let n = buttonNumberM;
        buttonCountM.push(0);

        buttonsM.push([button, info]);
        button.addEventListener("click", function () {
            let exp = Math.floor(buttonCountM[n] / 5);
            let cost = costsM[n] * Math.pow(2, exp);

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

function changeFlex(changeTo) {
    flexHTML = changeTo;
}

function setFlexText() {
    upgradesHTML = "Upgrades <br> COMING SOON";

    achievementsHTML = "Achievements <br> COMING SOON";
    
    statsHTML = "";
    statsHTML += "Words typed: " + numDisplay(wordsTyped) + "<br>";
    statsHTML += "Total word count: " + numDisplay(wordTotal) + "<br>"; 
    statsHTML += "Record typing speed: " + recordWPM + " words/min <br>";
    statsHTML += "<br>";
    statsHTML += "Total money earned: $" + numDisplay(moneyTotal) + "<br>";
    statsHTML += "<br>";
    statsHTML += "Time played: " + numDisplay(timeHours) + " hours";

    if (flexHTML == "U") {
        flexField.innerHTML = upgradesHTML;
    }

    if (flexHTML == "A") {
        flexField.innerHTML = achievementsHTML;
    }

    if (flexHTML == "S") {
        flexField.innerHTML = statsHTML;
    }

}

function update() {
    setInterval(function () {
        checkInputWord();
        setCurrencyDisplay();
        setFlexText();
        wordCount += wordIncome / tickRate;
        moneyCount += moneyIncome / tickRate;
        wordTotal += wordIncome / tickRate;
        moneyTotal += moneyIncome / tickRate;
        timeHours += 1 / tickRate / 3600;

        if (wordTotal >= costsW[buttonNumberW] / 10) {
            generateButton("W");
        }

        if (moneyTotal >= costsM[buttonNumberM] / 10) {
            generateButton("M");
        }

    }, tickLength);
    calculateWPM();
}

function initialize() {
    let tempDisplay = "";

    for (let i = 0; i < 100; i++) {
        const word = randWord();
        tempDisplay += word;
        displayWords.push(word);
    }

    displayField.innerHTML = tempDisplay;
    update();
}
