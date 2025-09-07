const elliots = ["Default", "Supplier", "Milkman", "Pizza Man", "Cake", "Barista", "Paperpal", "Casual", "Bandit", "Manager", "Neo", "Cashier", "Ellioto Spaghetti", "Summer", "Retro", "Alien", "Messenger", "Dog", "Gummy", "Treehugger", "Artist", "Rudolph"];
const nonElliots = ["Lulu", "Baker", "Sally", "Supermarket", "Bobo", "Caretaker", "Jordan", "Dued1", "Medic", "Parlor Gubby", "Tom", "Friend", "Monster", "Mercurial"];

const chances = ["Default", "Homeless", "Double Crossed", "Agent", "Blue Day", "Pink Day", "Workclock", "LMaD", "Fast Food", "Lods of Emone", "Take a Chance", "Federation", "Dog", "Mr. WorldWide", "Pride", "Alien", "Nayn", "Multi-Colored Bettor", "Outlaw", "Cool Bones", "Avian Sight", "Plushy", "Flipnote", "Retro", "Golden", "ULTRAKILL", "Mirror", "Artist", "BrawlR Clockwork"];
const nonChances = ["Mysterious Sheriff", "Jeff", "Pico", "Chanceton"];

const milestones = ["Milestone I", "Milestone II", "Milestone III", "Milestone IV"];

fetch("data.json").then(response => {
    return response.json();
}).then(data => {
    console.log(data);
});


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

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function reroll(character) {
    console.log(`rerolling ${character}`);
    var lists = JSON.parse(getCookie("lists")), results = JSON.parse(getCookie("results"));
    console.log(lists);
    console.log(results);
    if (character == 0) {
        results[0] = randomList(lists[0]);
    } else {
        results[1] = randomList(lists[1]);
    }
    displayResult(lists, results);
}

function displayResult(lists, results) {
    document.getElementById("generated").innerHTML = (
        `<p><b>Your new Paycheck is...</b></p>
        Elliot's <b>${lists[0][results[0]]}</b> skin ❤️ Chance's <b>${lists[1][results[1]]}</b> skin!
        <img src="${skins.images.elliots[lists[0][results[0]]]}">
        <img src="${skins.images.chances[lists[1][results[1]]]}">`
    );

    var stringLists = JSON.stringify(lists), stringResults = JSON.stringify(results);
    document.cookie = `lists=${stringLists}`;
    document.cookie = `results=${stringResults}`;

    document.getElementById("reroll").innerHTML = (
        `<button onclick="reroll(0)">Reroll Elliot</button>
        <button onclick="reroll(1)">Reroll Chance</button>`
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
            case "elliotMilestones":
                if (value == "on") {
                    milestones.forEach(skin => {
                        elliotList.push(skin);
                    });
                } else elliotList.push("Milestone");
                break;
            case "nonChances":
                if (value == "on") {
                    nonChances.forEach(skin => {
                        chanceList.push(skin);
                    });
                }
                break;
            case "chanceMilestones":
                if (value == "on") {
                    milestones.forEach(skin => {
                        chanceList.push(skin);
                    });
                } else chanceList.push("Milestone");
            }
        }

        lists = [elliotList, chanceList];

        rollBoth(lists);
    });
});
    