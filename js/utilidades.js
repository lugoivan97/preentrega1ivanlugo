const interesTasas = {
    Personal: [1.5, 1.75, 2],
    Auto: [1.6, 1.8, 2.1],
    Hipotecario: [1.7, 1.85, 2.2],
};

const obtenerTasaInteres = (cuotas, tipoPrestamo) => {
    const tasas = interesTasas[tipoPrestamo] || interesTasas.Personal;
    if (cuotas >= 1 && cuotas <= 6) return tasas[0];
    if (cuotas >= 7 && cuotas <= 12) return tasas[1];
    return tasas[2];
};

const calcularInteres = (monto, montoConInt) => montoConInt - monto;

const calcularCuotas = (monto, cuotas, tipoPrestamo, moneda) => {
    const tasaInteres = obtenerTasaInteres(cuotas, tipoPrestamo);
    const montoConInt = monto * (1 + tasaInteres / 100);
    const montoCuota = montoConInt / cuotas;
    const interesGenerado = calcularInteres(monto, montoConInt);
    return { montoConInt, montoCuota, interesGenerado };
};

const capitalizarPrimeraLetra = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

const mostrarError = (mensaje) => {
    const errorElement = document.getElementById('error');
    errorElement.textContent = mensaje;
};

export { calcularCuotas, mostrarError };
