// Document.getElementById bruges til at hente HTML-elementerne ind i JS-dokumentet.
var txtField = document.getElementById('txt');
var tstBtn = document.getElementById('testBtn');
var list = document.getElementById('list');

// Eventlisteneren bruges til at tilføje et click-event til tilføj-knappen.
tstBtn.addEventListener("click", testFunc);

// Funktionen bruges til at tilføje elementer til listen. De to øverste variabler og appendchild-metoden bliver sammen brugt til at tilføje elementerne fra tekstfeltet til listen derunder. txtField bliver brugt til at lave en text node samt resette tekstfeltet.
function testFunc() {
	var x = document.getElementById('list');
	var y = document.createElement('li');
	var node = document.createTextNode(txtField.value);
	y.style.listStyleType = "none";
	list.appendChild(y);
	y.appendChild(node);
	x.appendChild(y);
	txtField.reset;
	localStorage["list"] = list.innerHTML // Opdaterer localstorage
}

// Funktion, der sletter hele listen. Når "slet hele listen"-knappen trykkes, kommer nendenstående besked frem først. Her bruges et if/else-statement, hvor if = true sletter hele listen. Hvis ikke if = true, så beholdes listens elementer.
function deleteAll() {
	var result = confirm("Er du sikker på, at du vil slette hele listen?");
	if (result==true) {
	list.innerHTML = "";
	} else {
	}
	localStorage["list"] = list.innerHTML // Opdaterer localstorage
}

// jQuery-funktion, der bruger et click-event til at strege specifikke listeelementer ud. Den tilføjer classen doneTask til elementet, når det bliver klikket på. doneTask kan ses nederst i css-dokumentet.
$(document).ready(function(){
$("#list").on('click', 'li', function() {
	$(this).toggleClass('doneTask');
	localStorage["list"] = list.innerHTML // Opdaterer localstorage
});

// jQuery-funktionen giver de listeelement, musen bevæger sig over, en grå, gennemsigtig baggrundsfarve
$("li").mouseover(function(){
	$(this).css("background-color", "rgba(211,211,211,0.60)");
	localStorage["list"] = list.innerHTML // Opdaterer localstorage
});

//jQuery-funktionen fjerner den grå baggrundsfarve ved at gøre baggrunden transparent, når musen fjernes fra listeelementet.
$("li").mouseleave(function(){
	$(this).css("background-color", "transparent");
	localStorage["list"] = list.innerHTML // Opdaterer localstorage
});

//Denne funktion, som er placeret inde i jQuery-koden, fordi den hører sammen med den nedenstående jQuery-funktion, sorterer listeelementerne alfabetisk.
function sorter(a, b) {
	return ($(b).text().toUpperCase()) <  ($(a).text().toUpperCase()) ? 1 : -1;
}

//Denne jQuery-funktion gør sådan, at den alfabetiske sortering fra ovenstående funktion bliver udført på listeelementerne, når #sorter-knappen bliver trykket på.
$('#sorter').on('click', function() {
	$("ul li").sort(sorter).appendTo('ul');
	localStorage["list"] = list.innerHTML // Opdaterer localstorage
});
});

// if-statementet checker om der er noget gemt i localstorage, som, hvis der er, ikke forsvinder efter browseren lukkes/genindlæses.
if (localStorage["list"]) {
	list.innerHTML = localStorage["list"];
}