const Afficher = document.getElementById("Afficher");
const historiqueList = document.getElementById("historiqueList");
const historiquePopup = document.getElementById("historiquePopup");

let historique = [];

if (localStorage.getItem('calculatriceHistorique')) {
    try {
        historique = JSON.parse(localStorage.getItem('calculatriceHistorique'));
    } catch (e) {
        console.error("Erreur lors du chargement de l'historique:", e);
        localStorage.removeItem('calculatriceHistorique');
    }
}

function Click(input) {
    Afficher.value += input; 
}

function Calculer() {
    try { 
        const operation = Afficher.value;
        const resultat = eval(operation);
        
        if (operation !== resultat.toString() && operation.trim() !== "") {
            ajouterAHistorique(operation, resultat);
        }
        
        Afficher.value = resultat; 
    }
    catch(Error){
        Afficher.value = "Error"; 
    }
}

function Effacer() {
    Afficher.value = ""; 
}

function ajouterAHistorique(operation, resultat) {
    if (historique.length >= 10) {
        historique.pop();
    }
    
    historique.unshift({
        operation: operation,
        resultat: resultat
    });
    
    localStorage.setItem('calculatriceHistorique', JSON.stringify(historique));
}

function afficherHistorique() {
    historiqueList.innerHTML = '';
    
    if (historique.length === 0) {
        historiqueList.innerHTML = '<div class="historiqueItem">Aucun calcul récent</div>';
        return;
    }
    
    historique.forEach(item => {
        const historiqueItem = document.createElement('div');
        historiqueItem.className = 'historiqueItem';
        
        const operationSpan = document.createElement('span');
        operationSpan.className = 'historiqueOperation';
        operationSpan.textContent = item.operation;
        
        const resultatSpan = document.createElement('span');
        resultatSpan.className = 'historiqueResultat';
        resultatSpan.textContent = '= ' + item.resultat;
        
        historiqueItem.appendChild(operationSpan);
        historiqueItem.appendChild(resultatSpan);
        
        historiqueItem.addEventListener('click', function() {
            Afficher.value = item.resultat;
            toggleHistorique();
        });
        
        historiqueList.appendChild(historiqueItem);
    });
}

function toggleHistorique() {
    if (historiquePopup.style.display === "flex") {
        historiquePopup.style.display = "none";
    } else {
        afficherHistorique();
        historiquePopup.style.display = "flex";
    }
}

function effacerHistorique() {
    historique = [];
    localStorage.removeItem('calculatriceHistorique');
    afficherHistorique();
}

window.onclick = function(event) {
    if (event.target === historiquePopup) {
        historiquePopup.style.display = "none";
    }
}
