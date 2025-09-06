const elliots = ["Default", "Milestone", "Supplier", "Milkman", "Pizza Man", "Cake", "Barista", "Paperpal", "Casual", "Bandit", "Manager", "Neo", "Cashier", "Ellioto Spaghetti", "Summer", "Retro", "Alien", "Messenger", "Dog", "Gummy", "Treehugger", "Artist", "Rudolph"];
const nonElliots = ["Lulu", "Baker", "Sally", "Supermarket", "Bobo", "Caretaker", "Jordan", "Dued1", "Medic", "Parlor Gubby", "Tom", "Friend", "Monster", "Mercurial"];

const chances = ["Default", "Milestone", "Homeless", "Double Crossed", "Agent", "Blue Day", "Pink Day", "Workclock", "LMaD", "Fast Food", "Lods of Emone", "Take a Chance", "Federation", "Dog", "Mr. WorldWide", "Pride", "Alien", "Nayn", "Multi-Colored Bettor", "Outlaw", "Cool Bones", "Avian Sight", "Plushy", "Flipnote", "Retro", "Golden", "ULTRAKILL", "Mirror", "Artist", "BrawlR Clockwork"];
const nonChances = ["Mysterious Sheriff", "Jeff", "Pico", "Chanceton"];

const milestones = ["I", "II", "III", "IV"];

var lists, results;


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

function tooltipMouseover(id) {
  document.getElementById(id).style.visibility = visible;
}

function tooltipMouseleave(id) {
  document.getElementById(id).style.visibility = hidden;
}

tooltipNonElliot.addEventListener("mouseover", function() {
  document.getElementById("listNonElliots").style.visibility = visible;
});

tooltipNonElliot.addEventListener("mouseleave", function() {
  document.getElementById("listNonElliots").style.visibility = hidden;
})

var formSubmit = document.getElementById("paycheckForm");
var formOutput = "";

formSubmit.addEventListener("submit", function(e) {
  e.preventDefault();
  var formData = new FormData(formSubmit);
  for (var [key, value] of formData) {
    formOutput += (key + ": " + value);
  }

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
          })
        }
        break;
    }
  }

  lists = [elliotList, chanceList];

  rollBoth();
});

function randomList(length) {
  return Math.floor(Math.random() * length);
}

function rollBoth() {
  var elliotResult = randomList(lists[0].length), chanceResult = randomList(lists[1].length);
  
  results = [elliotResult, chanceResult];

  displayResult();
}

function reroll(character) {
  if (character == 0) results[0] = randomList(list[0].length);
  else results[1] = randomList(list[1].length);
  displayResult();
}

function displayResult() {
  console.log(lists);
  console.log(results);
  document.getElementById("generated").innerHTML = (
    "<p><b>Your new Paycheck is...</b></p> Elliot's <b>" + lists[0][results[0]] + "</b> skin ❤️ Chance's <b>" + lists[1][results[1]] + "</b> skin! <p><button onclick='reroll(0)'>Reroll Elliot</button> <button onclick='reroll(1)'>Reroll Chance</button></p>"
  );
}