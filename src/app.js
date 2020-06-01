var firstCatIsSet = false;
var secondCatIsSet = false;

var firstChild = null;
var secondChild = null;
var firstCatInfo = null;
var secondCatInfo = null;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function resetBorders() {
    document.getElementsByClassName("featured-cat-fighter-image")[0].style = "border: none";
    document.getElementsByClassName("featured-cat-fighter-image")[1].style = "border: none"
}

function checkForCats() {
    if (firstCatIsSet && secondCatIsSet) {
        document.getElementById("generateFight").removeAttribute("disabled");
    }
}

function showFirstFighter(firstCat, firstCatInfo) {
    document.getElementsByClassName("featured-cat-fighter-image")[0].setAttribute("src", firstCat.children[0].getAttribute("src"));
    document.getElementsByClassName("list-group-item name")[0].innerHTML = firstCatInfo.name;
    document.getElementsByClassName("list-group-item age")[0].innerHTML = firstCatInfo.age;
    document.getElementsByClassName("list-group-item skills")[0].innerHTML = firstCatInfo.catInfo;
    document.getElementsByClassName("list-group-item record")[0].innerHTML = ("Wins:" + firstCatInfo.record.wins + " Loss:" + firstCatInfo.record.loss);
}

function showSecondFighter(secondCat, secondCatInfo) {
    document.getElementsByClassName("featured-cat-fighter-image")[1].setAttribute("src", secondCat.children[0].getAttribute("src"));
    document.getElementsByClassName("list-group-item name")[1].innerHTML = secondCatInfo.name;
    document.getElementsByClassName("list-group-item age")[1].innerHTML = secondCatInfo.age;
    document.getElementsByClassName("list-group-item skills")[1].innerHTML = secondCatInfo.catInfo;
    document.getElementsByClassName("list-group-item record")[1].innerHTML = ("Wins:" + secondCatInfo.record.wins + " Loss:" + secondCatInfo.record.loss);
}

function setClickableCats(child, cat, first) {
    child.children[0].children[0].style.border = `10px solid ${first ? "red" : "yellow"}`;
    Array.from(document.getElementById(first ? "firstSide" : "secondSide").getElementsByClassName("fighter-list")[0].children).map(child =>
        JSON.parse(child.lastElementChild.getAttribute("data-info")).id !== cat.id && (child.children[0].children[0].style.border = "none")
    );
    Array.from(document.getElementById(first ? "secondSide" : "firstSide").getElementsByClassName("fighter-list")[0].children).map(child =>
        JSON.parse(child.lastElementChild.getAttribute("data-info")).id === cat.id
            ? child.style.cssText = "pointer-events: none; filter: brightness(0.25);"
            : child.style.cssText = "pointer-events: auto;"
    );
}

function startFight() {
    var seconds = 3;
    resetBorders();
    const div = document.createElement("div");
    div.id = "counter";
    div.style = "font-size: 64px";
    document.getElementById("addNewFighter").setAttribute("disabled", true);
    document.getElementById("fighter-name") && document.getElementById("fighter-name").remove();

    const winner = document.createElement("div");
    winner.id = "fighter-name";

    document.getElementById("generateFight").setAttribute("disabled", true);
    document.getElementById("randomFight").setAttribute("disabled", true);

    Array.from(document.getElementById("firstSide").getElementsByClassName("fighter-list")[0].children).map(child =>
        child.style.cssText = "pointer-events: none; filter: brightness(0.25);"
    );
    Array.from(document.getElementById("secondSide").getElementsByClassName("fighter-list")[0].children).map(child =>
        child.style.cssText = "pointer-events: none; filter: brightness(0.25);"
    );

    document.getElementsByClassName("col-2 d-flex flex-column align-items-center")
        .item(0)
        .insertBefore(div, document.getElementsByClassName("col-2 d-flex flex-column align-items-center").item(0).firstChild);
    div.innerHTML = seconds + "s ";

    var x = setInterval(function () {
        seconds -= 1;
        div.innerHTML = seconds + "s ";
        if (seconds === 0) {
            clearInterval(x);
            document.getElementById("counter").remove();
            document.getElementById("generateFight").removeAttribute("disabled");
            document.getElementById("randomFight").removeAttribute("disabled");
            document.getElementById("addNewFighter").removeAttribute("disabled");
            setClickableCats(firstChild, firstCatInfo, 1);
            setClickableCats(secondChild, secondCatInfo);
            Array.from(document.getElementById("firstSide").getElementsByClassName("fighter-list")[0].children).map(child =>
                child.style.cssText = "pointer-events: auto;"
            );
            Array.from(document.getElementById("secondSide").getElementsByClassName("fighter-list")[0].children).map(child =>
                child.style.cssText = "pointer-events: auto;"
            );
            const firstCatRecordPercentage = [100 * ((firstCatInfo.record.wins) / (firstCatInfo.record.wins + firstCatInfo.record.loss)), firstCatInfo.id];
            const secondCatRecordPercentage = [100 * ((secondCatInfo.record.wins) / (secondCatInfo.record.wins + secondCatInfo.record.loss)), secondCatInfo.id];
            var dominantFighter = 0;
            var lesserDominantFighter = 0;
            var dominantFigterPercentage = 0.5;
            var winnerCat = null;
            var loser = null;
            if (firstCatRecordPercentage[0] === secondCatRecordPercentage[0]) {
                Math.random().toFixed(2) < 0.5
                    ? (dominantFighter = firstCatRecordPercentage, lesserDominantFighter = secondCatRecordPercentage)
                    : (dominantFighter = secondCatRecordPercentage, lesserDominantFighter = firstCatRecordPercentage);
            }
            else {
                dominantFighter = (firstCatRecordPercentage[0] > secondCatRecordPercentage[0] ? firstCatRecordPercentage : secondCatRecordPercentage);
                lesserDominantFighter = (firstCatRecordPercentage[0] === dominantFighter ? secondCatRecordPercentage : firstCatRecordPercentage);
            }

            dominantFighter[0] > lesserDominantFighter[0] && dominantFighter[0] < lesserDominantFighter[0] + 10
                ? dominantFigterPercentage += 0.10
                : dominantFigterPercentage += 0.20;
            const result = Math.random().toFixed(2);
            result < dominantFigterPercentage && result > 0
                ? (dominantFighter[1] === firstCatInfo.id
                    ? (document.getElementsByClassName("featured-cat-fighter-image")[0].style = "border: 10px solid green",
                        document.getElementsByClassName("featured-cat-fighter-image")[1].style = "border: 10px solid red",
                        firstCatInfo.record.wins += 1, secondCatInfo.record.loss += 1, winner.innerHTML = "WINNER: " + firstCatInfo.name,
                        winnerCat = firstCatInfo, loser = secondCatInfo)
                    : (document.getElementsByClassName("featured-cat-fighter-image")[1].style = "border: 10px solid green",
                        document.getElementsByClassName("featured-cat-fighter-image")[0].style = "border: 10px solid red",
                        secondCatInfo.record.wins += 1, firstCatInfo.record.loss += 1, winner.innerHTML = "WINNER: " + secondCatInfo.name,
                        winnerCat = secondCatInfo, loser = firstCatInfo)
                )
                : (lesserDominantFighter[1] === firstCatInfo.id
                    ? (document.getElementsByClassName("featured-cat-fighter-image")[0].style = "border: 10px solid green",
                        document.getElementsByClassName("featured-cat-fighter-image")[1].style = "border: 10px solid red",
                        firstCatInfo.record.wins += 1, secondCatInfo.record.loss += 1, winner.innerHTML = "WINNER: " + firstCatInfo.name,
                        winnerCat = firstCatInfo, loser = secondCatInfo)
                    : (document.getElementsByClassName("featured-cat-fighter-image")[1].style = "border: 10px solid green",
                        document.getElementsByClassName("featured-cat-fighter-image")[0].style = "border: 10px solid red",
                        secondCatInfo.record.wins += 1, firstCatInfo.record.loss += 1, winner.innerHTML = "WINNER: " + secondCatInfo.name,
                        winnerCat = secondCatInfo, loser = firstCatInfo)
                )

            document.getElementsByClassName("col-2 d-flex flex-column align-items-center")
                .item(0)
                .insertBefore(winner, document.getElementsByClassName("col-2 d-flex flex-column align-items-center").item(0).firstChild);
            if (winnerCat.id === firstCatInfo.id) {
                Array.from(document.getElementById("firstSide").getElementsByClassName("fighter-list")[0].children).find(child =>
                    JSON.parse(child.children[0].getAttribute("data-info")).id === winnerCat.id
                    && child.children[0].setAttribute("data-info", JSON.stringify(firstCatInfo))
                );
                Array.from(document.getElementById("secondSide").getElementsByClassName("fighter-list")[0].children).find(child =>
                    JSON.parse(child.children[0].getAttribute("data-info")).id === loser.id
                    && child.children[0].setAttribute("data-info", JSON.stringify(secondCatInfo))
                );
            } else {
                Array.from(document.getElementById("firstSide").getElementsByClassName("fighter-list")[0].children).find(child =>
                    JSON.parse(child.children[0].getAttribute("data-info")).id === loser.id
                    && child.children[0].setAttribute("data-info", JSON.stringify(firstCatInfo))
                );
                Array.from(document.getElementById("secondSide").getElementsByClassName("fighter-list")[0].children).find(child =>
                    JSON.parse(child.children[0].getAttribute("data-info")).id === winnerCat.id
                    && child.children[0].setAttribute("data-info", JSON.stringify(secondCatInfo))
                );
            }
            updateCats();
            showFirstFighter(firstChild.children[0], firstCatInfo);
            showSecondFighter(secondChild.children[0], secondCatInfo);
        }
    }, 1000);
}

function updateCats() {
    // function below will run clear.php?h=michael
    jQuery.ajax({
        type: "POST",
        url: "update_cats.php",
        data: {
            "firstCatInfo": JSON.stringify(firstCatInfo),
            "secondCatInfo": JSON.stringify(secondCatInfo),
        },
        success : function() {

        }
    });
}

function geterateRandomFighters() {
    resetBorders();
    firstChild = Array.from(document.getElementById("firstSide").getElementsByClassName("fighter-list")[0].children)[getRandomInt(
        Array.from(document.getElementById("firstSide").getElementsByClassName("fighter-list")[0].children).length
    )];
    const firstCat = firstChild.children[0];
    firstCatInfo = JSON.parse(firstCat.getAttribute("data-info"));
    showFirstFighter(firstCat, firstCatInfo);

    secondChild = Array.from(document.getElementById("secondSide").getElementsByClassName("fighter-list")[0].children)[getRandomInt(
        Array.from(document.getElementById("secondSide").getElementsByClassName("fighter-list")[0].children).length
    )];
    const secondCat = secondChild.children[0];
    secondCatInfo = JSON.parse(secondCat.getAttribute("data-info"));
    showSecondFighter(secondCat, secondCatInfo)

    if (firstCat.children[0].getAttribute("src") === secondCat.children[0].getAttribute("src")) {
        geterateRandomFighters();
    } else {
        firstCatIsSet = true;
        secondCatIsSet = true;
        setClickableCats(firstChild, firstCatInfo, 1);
        setClickableCats(secondChild, secondCatInfo);
    }
    checkForCats();
}

function setCat(child, first) {
    const cat = JSON.parse(child.children[0].getAttribute("data-info"));
    if (first) {
        firstCatIsSet = true;
        firstCatInfo = cat;
        firstChild = child
    }
    else {
        secondCatIsSet = true;
        secondCatInfo = cat;
        secondChild = child;
    }
    checkForCats();
    setClickableCats(child, cat, first);
    document.getElementsByClassName("featured-cat-fighter-image")[first ? 0 : 1].setAttribute("src", child.children[0].children[0].getAttribute("src"));
    document.getElementsByClassName("list-group-item name")[first ? 0 : 1].innerHTML = cat.name;
    document.getElementsByClassName("list-group-item age")[first ? 0 : 1].innerHTML = cat.age;
    document.getElementsByClassName("list-group-item skills")[first ? 0 : 1].innerHTML = cat.catInfo;
    document.getElementsByClassName("list-group-item record")[first ? 0 : 1].innerHTML = ("Wins:" + cat.record.wins + " Loss:" + cat.record.loss);
}

function addEventListeners() {
    Array.from(document.getElementById("firstSide").getElementsByClassName("fighter-list")[0].children).map(child =>
        child.addEventListener("click", () => setCat(child, 1))
    );
    Array.from(document.getElementById("secondSide").getElementsByClassName("fighter-list")[0].children).map(child =>
        child.addEventListener("click", () => setCat(child))
    );
}
document.getElementById("generateFight").setAttribute("disabled", true);
document.getElementById("randomFight").addEventListener("click", geterateRandomFighters);
document.getElementById("generateFight").addEventListener("click", startFight);
addEventListeners();