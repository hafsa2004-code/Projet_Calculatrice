const Afficher = document.getElementById("Afficher");

function Click(input) {
    Afficher.value += input; 

}
function Calculer() {
    try{ 
        Afficher.value = eval(Afficher.value); 
    }
    catch(Error){
        Afficher.value = "Error"; 
    }

}
function Effacer() {
    Afficher.value = ""; 
}


