const elliots = ["Default", "Milestone", "Supplier", "Milkman", "Pizza Man", "Cake", "Barista", "Paperpal", "Casual", "Bandit", "Manager", "Neo", "Cashier", "Ellioto Spaghetti", "Summer", "Retro", "Alien", "Messenger", "Dog", "Gummy", "Treehugger", "Artist", "Rudolph"];
const nonElliots = ["Lulu", "Baker", "Sally", "Supermarket", "Bobo", "Caretaker", "Jordan", "Dued1", "Medic", "Parlor Gubby", "Tom", "Friend", "Monster", "Mercurial"];

const chances = ["Default", "Milestone", "Homeless", "Double Crossed", "Agent", "Blue Day", "Pink Day", "Workclock", "LMaD", "Fast Food", "Lods of Emone", "Take a Chance", "Federation", "Dog", "Mr. WorldWide", "Pride", "Alien", "Nayn", "Multi-Colored Bettor", "Outlaw", "Cool Bones", "Avian Sight", "Plushy", "Flipnote", "Retro", "Golden", "ULTRAKILL", "Mirror", "Artist", "BrawlR Clockwork"];
const nonChances = ["Mysterious Sheriff", "Jeff", "Pico", "Chanceton"];

const milestones = ["I", "II", "III", "IV"];


function tooltipMouseover(id) {
    document.getElementById(id).style.visibility = "visible";
}

function tooltipMouseleave(id) {
    document.getElementById(id).style.visibility = "hidden";
}

function randomList(list) {
    return Math.floor(Math.random() * list.length);
}

function rollBoth(lists) {
    var elliotResult = randomList(lists[0]), chanceResult = randomList(lists[1]);

    var results = [elliotResult, chanceResult];

    displayResult(lists, results);
}

function displayResult(lists, results) {
    document.getElementById("generated").innerHTML = (
        `<p><b>Your new Paycheck is...</b></p>
        Elliot's <b>${lists[0][results[0]]}</b> skin ❤️ Chance's <b>${lists[1][results[1]]}</b> skin!`
    );

    document.getElementById("rerollForm").innerHTML = (
        `<form id="rerollForm">
            <input type="hidden" name="elliotList" value=${lists[0]}>
            <input type="hidden" name="chanceList" value=${lists[1]}>
            <input type="hidden" name="elliotResult" value=${results[0]}>
            <input type="hidden" name="chanceResult" value=${results[1]}>

            <input type="submit" value="Reroll Elliot" name="rerollElliot">
            <input type="submit" value="Reroll Chance" name="rerollChance">
        </form>`
    );
}


document.addEventListener('DOMContentLoaded', function() {
    var listNonElliots = "";
    for (let i = 0; i < nonElliots.length; i++) {
        listNonElliots += (nonElliots[i]);
        if (i === nonElliots.length - 1) break;
        else listNonElliots += ", ";
    }
    document.getElementById("listNonElliots").innerHTML = listNonElliots;

    var listNonChances = "";
    for (let i = 0; i < nonChances.length; i++) {
        listNonChances += (nonChances[i]);
        if (i === nonChances.length - 1) break;
        else listNonChances += ", ";
    }
    document.getElementById("listNonChances").innerHTML = listNonChances;

    var formSubmit = document.getElementById("paycheckForm");

    formSubmit.addEventListener("submit", function(e) {
        e.preventDefault();
        var formData = new FormData(formSubmit);

        var elliotList = elliots;
        var chanceList = chances;

        for (let [key, value] of formData) {
            switch (key) {
            case "nonElliots":
                if (value == "on") {
                    nonElliots.forEach(skin => {
                        elliotList.push(skin);
                    });
                }
                break;
            case "nonChances":
                if (value == "on") {
                    nonChances.forEach(skin => {
                        chanceList.push(skin);
                    });
                }
                break;
            }
        }

        lists = [elliotList, chanceList];

        rollBoth(lists);


        var rerollForm = rerollFormDiv.getElementById("rerollForm");
        rerollForm.addEventListener("submit", function(e) {
            e.preventDefault();
            var formData = new FormData(rerollForm), results = [], lists = [];

            lists[0] = formData["elliotList"];
            lists[1] = formData["chanceList"];
            results[0] = formData["elliotResults"];
            results[1] = formData["chanceResults"];

            console.log(e.submitter.name);

            switch (e.submitter.name) {
                case "rerollElliot":
                    results[0] = randomList(lists[0]);
                    break;
                case "rerollChance":
                    results[1] = randomList(lists[1]);
                    break;
            }
            displayResult(lists, results);
        });
    });
});