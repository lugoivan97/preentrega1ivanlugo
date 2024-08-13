const interesTasas = [1.5, 1.75, 2];

const obtenerTasaInteres = (cuotas) => {
    if (cuotas >= 1 && cuotas <= 6) return interesTasas[0];
    if (cuotas >= 7 && cuotas <= 12) return interesTasas[1];
    return interesTasas[2];
};
const calcularInteres = (monto, montoConInt) => {
    return montoConInt - monto;
};

const calcularCuotas = (monto, cuotas) => {
    const tasaInteres = obtenerTasaInteres(cuotas);
    const montoConInt = monto * tasaInteres;
    const montoCuota = montoConInt / cuotas;
    const interesGenerado = calcularInteres(monto, montoConInt);
    return { montoConInt, montoCuota, interesGenerado };
};



const guardarPrestamo = (prestamo) => {
    let contadorPrestamos = parseInt(localStorage.getItem('contadorPrestamos')) || 0;
    contadorPrestamos++;
    const prestamoString = `${prestamo.nombre}|${prestamo.monto}|${prestamo.cuotas}|${prestamo.montoConInt}|${prestamo.montoCuota}|${prestamo.interesGenerado}`;
    localStorage.setItem(`prestamo_${contadorPrestamos}`, prestamoString);
    localStorage.setItem('contadorPrestamos', contadorPrestamos);
};

const obtenerPrestamos = () => {
    let prestamos = [];
    let contadorPrestamos = parseInt(localStorage.getItem('contadorPrestamos')) || 0;
    for (let i = 1; i <= contadorPrestamos; i++) {
        const prestamoString = localStorage.getItem(`prestamo_${i}`);
        if (prestamoString) {
            const [nombre, monto, cuotas, montoConInt, montoCuota, interesGenerado] = prestamoString.split('|');
            const prestamo = {
                nombre,
                monto: parseFloat(monto),
                cuotas: parseInt(cuotas),
                montoConInt: parseFloat(montoConInt),
                montoCuota: parseFloat(montoCuota),
                interesGenerado: parseFloat(interesGenerado)
            };
            prestamos.push(prestamo);
        }
    }
    return prestamos;
};

const registrarPrestamos = () => {
    const prestamos = obtenerPrestamos();
    const registroPrestamos = document.getElementById('lista-prestamos');
    registroPrestamos.innerHTML = '';
    prestamos.forEach(prestamo => {
        const tablaResgistroPrestamo = document.createElement('tr');
        tablaResgistroPrestamo.innerHTML = `
            <td>${prestamo.nombre}</td>
            <td>${prestamo.monto}</td>
            <td>${prestamo.cuotas}</td>
            <td>${prestamo.montoConInt}</td>
            <td>${prestamo.montoCuota}</td>
            <td>${prestamo.interesGenerado}</td>
        `;
        registroPrestamos.appendChild(tablaResgistroPrestamo);
    });
};

document.getElementById('formulario-prestamos').addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);
    if (nombre && monto > 0 && cuotas > 0 && cuotas <= 24) {
        const { montoConInt, montoCuota, interesGenerado } = calcularCuotas(monto, cuotas);
        const prestamo = { nombre, monto, cuotas, montoConInt, montoCuota, interesGenerado };
        guardarPrestamo(prestamo);
        registrarPrestamos();
    } else {
        alert("Por favor ingrese valores válidos.");
    }
});

registrarPrestamos();
