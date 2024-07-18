const interesTasas=[1.5, 1.75, 2];

function obtenerMonto(){
    let monto;
    while(true){
        monto=prompt("Ingrese el monto que desea solicitar: ");
        if(monto>0){
            console.log("Monto ingresado: " + monto);
            return monto;
        }
        alert("Por favor ingrese un monto válido");

    }
}

function obtenerCuotas(){
    let cuotas;
    while(true){
        cuotas=prompt("Ingrese la cantidad de cuotas que desea solicitar: ");
        if (cuotas>0  && cuotas<=24){
            console.log("Cuotas ingresadas: "+ cuotas);
            return cuotas;
        }
        alert("Por favor ingrese un numero de cuotas valido");   
    }
}

function calcularCuotas(monto, cuotas){
    let montoConInt, montoCuota;
    if(cuotas>=1 && cuotas<=6){
        montoConInt=monto*interesTasas[0];
        console.log("Interés: " + monto*(interesTasas[0]-1))
    }
    else if(cuotas>=7 && cuotas<=12){ 
        montoConInt=monto*interesTasas[1];
        console.log("Interés: " + monto*(interesTasas[1]-1))

    }
    else if(cuotas>=13 && cuotas <=24){
        montoConInt=monto*interesTasas[2];
        console.log("Interés: " + monto*(interesTasas[2]-1))

    }
    montoCuota=montoConInt/cuotas;
    return{montoConInt, montoCuota};
}

function mostrarEnPantalla(monto, cuotas, montoConInt, montoCuota){
    alert("Monto Solicitado: $" + monto +
        "\nMonto Final con Intereses: $" + montoConInt +
        "\nCantidad de cuotas seleccionadas: " + cuotas +
        "\nMonto de cuotas mensuales: $" + montoCuota );
}
function principal(){
    const monto= obtenerMonto();
    const cuotas= obtenerCuotas();
    const{montoConInt, montoCuota} = calcularCuotas(monto, cuotas);
    mostrarEnPantalla(monto, cuotas, montoConInt, montoCuota);
}

principal();

