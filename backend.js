$(document).ready(function(){
    //This JQuery apply Calcular funtion when something change
    //in elements with class medcls
    $(".medcls").on("change keyup paste", function(){
	Calcular();
    })

    //The same but when class=form-control changes
    $(".form-control").on("change keyup paste", function(){
	Calcular();
    });
});



Calcular();

function imprimir() {
    //window.alert('Bitch');
    document.getElementById("ParfResul").innerHTML = "Resultados";
};





function Promedio(target){

    //Convirtiendo cada elemento en float
    var data = [];    
    for (var i = 0; i < target.length; i++ ) {
        data[i] = parseFloat(target[i].value);
	if (data[i] == ""){
	data[i] = 0;
	}
    }

    //Sumando los elementos del arreglo
    var total=0;
    for(var j in data) { 
	total = total + data[j]; 
    }
 
    //Promediando los elementos del arreglo
    prom = parseFloat(parseFloat(total / data.length).toFixed(3));
	
        
    /* the old school 
    a = parseFloat(target[0].value);
    b = parseFloat(target[1].value);
    c = parseFloat(target[2].value); 

    prom = parseFloat((a + b + c)/3).toFixed(3); */
    
    return prom;


    
};

function Calcular() {

    var nameVal = document.getElementsByName("name")[0].value;
    var ageVal = parseFloat(document.getElementsByName("age")[0].value);
    var weightVal = parseFloat(document.getElementsByName("weight")[0].value);
    var estaturaVal = parseFloat(document.getElementsByName("estatura")[0].value);

    bicepElm = document.getElementsByName("bicep");
    var bicepVal = Promedio (bicepElm);
    document.getElementById("bicep_par").innerHTML = bicepVal;

    tricepElm = document.getElementsByName("tricep");
    var tricepVal = Promedio (tricepElm);
    document.getElementById("tricep_par").innerHTML = tricepVal;

    subesElm = document.getElementsByName("subescapular");
    var subesVal = Promedio (subesElm);
    document.getElementById("subescapular_par").innerHTML = subesVal;

    supraElm = document.getElementsByName("supraliaco");
    var supraVal = Promedio (supraElm);
    document.getElementById("supraliaco_par").innerHTML = supraVal;

    musloElm = document.getElementsByName("muslo");
    var musloVal = Promedio (musloElm);
    document.getElementById("muslo_par").innerHTML = musloVal;

    pectoElm = document.getElementsByName("pectoral");
    var pectoVal = Promedio (pectoElm);
    document.getElementById("pectoral_par").innerHTML = pectoVal;

    abdomElm = document.getElementsByName("abdominal");
    var abdomVal = Promedio (abdomElm);
    document.getElementById("abdominal_par").innerHTML = abdomVal;


    var SelSexoIdx = document.getElementById("SelSexo");
    console.log(SelSexoIdx);
    var selectedSexo = SelSexoIdx.options[SelSexoIdx.selectedIndex].value;
    
    if (selectedSexo == "Mujer"){
	console.log("Eligio mujer");
	var sumapli = musloVal + tricepVal + supraVal;
	var JackPollVal = parseFloat(parseFloat(1.0994921 - 0.0009929 * sumapli + 0.0000023 * Math.pow(sumapli,2) - 0.0001392 * ageVal).toFixed(3));
	console.log(JackPollVal);

	if (ageVal <= 19){
	    var c = 1.1549;
	    var m = 0.0678;	    
	} else if (19 < ageVal<=29) {
	    var c = 1.1599;
	    var m = 0.0717;
	} else if (29 < ageVal<=39){
	    var c = 1.1423;
	    var m = 0.0632;
	} else if (39 < ageVal<=49){
	    var c = 1.1333;
	    var m = 0.0612;
	} else if (49 < ageVal<=150){
	    var c = 1.1339;
	    var m = 0.0645;
	}
	
	var DensCorp = parseFloat(parseFloat(c - (m * Math.log10(bicepVal + tricepVal + subesVal + supraVal))).toFixed(3));
	console.log(DensCorp);

	// Formulas para Hombres
    }else {
	console.log("Eligio hombre");
	var sumapli = musloVal + pectoVal + abdomVal;
	var JackPollVal = parseFloat(parseFloat(1.10938 -0.0008267 * sumapli + 0.0000016 * Math.pow(sumapli,2) - 0.0002574 * ageVal).toFixed(3));
	console.log(JackPollVal);

	if (ageVal <= 19){
	    var c = 1.1620;
	    var m = 0.0630;	    
	} else if (19 < ageVal<=29) {
	    var c = 1.1631;
	    var m = 0.0632;
	} else if (29 < ageVal<=39){
	    var c = 1.1422;
	    var m = 0.0544;
	} else if (39 < ageVal<=49){
	    var c = 1.1620;
	    var m = 0.0700;
	} else if (49 < ageVal<=150){
	    var c = 1.1715;
	    var m = 0.0779;
	}

	var DensCorp = parseFloat(parseFloat(c - (m * Math.log10(bicepVal + tricepVal + subesVal + supraVal))).toFixed(3));
	console.log(DensCorp);
	
    }


    document.getElementById("LblJacksonPollock").innerHTML = "Densidad Corporal por Jackson & Pollock: " + JackPollVal;
    document.getElementById("LblDurnin").innerHTML = "Densidad Corporal por Durnin : " + DensCorp;

    return [JackPollVal, DensCorp, weightVal, estaturaVal];

};


function Modelar() {


    var DC = Calcular();
    var JackPollVal = DC[0];
    var DensCorp = DC[1];
    var weightVal = DC[2];
    var estaturaVal = DC[3];

    var PorcGrasaDesVal = parseFloat(document.getElementsByName("PorcGrasaDes")[0].value);
    var MasaMagraDesVal = parseFloat(document.getElementsByName("MasaMagraDes")[0].value);
    
    var ModelIdx = document.getElementById("DCModel");
    console.log(ModelIdx);
    var selectedModel = ModelIdx.options[ModelIdx.selectedIndex].value;
    console.log(selectedModel);

    if (selectedModel == "JacksonMod"){
	DCindex = JackPollVal;
    } else {
	DCindex = DensCorp;	
    }

    var PorcGrasa = (4.95 / DCindex -4.5) * 100;
    var MasaMagra = weightVal - ((PorcGrasa/100) * weightVal);
    var PesoIdeal_MasaMagraAct = MasaMagra / (100 - PorcGrasaDesVal);
    var PesoIdeal_PorcGrasaAct = MasaMagraDesVal / (100 - PorcGrasa);
    var IMC = weightVal / Math.pow(estaturaVal,2);

    document.getElementById("LblPorcGrasa").innerHTML = "% de Grasa: " + PorcGrasa ;
    document.getElementById("LblMasaMagra").innerHTML = "Masa Magra: " + MasaMagra ;
    document.getElementById("LblPesoIdealFromMasaMagra").innerHTML = "Peso Ideal a partir de masa magra actual: " + PesoIdeal_MasaMagraAct ;
    document.getElementById("LblPesoIdeal_PorcGrasaAct").innerHTML = "Peso Ideal a partir del Porcentaje de grasa Actual: " +PesoIdeal_PorcGrasaAct ;
    document.getElementById("LblIMC").innerHTML = "Indice de masa corporal: " + IMC ;

    
};
