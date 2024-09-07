import { calcularCuotas, mostrarError } from './utilidades.js';


const guardarPrestamo = (prestamo) => {
    try {
        let contadorPrestamos = parseInt(localStorage.getItem('contadorPrestamos')) || 0;
        contadorPrestamos++;
        const prestamoString = JSON.stringify(prestamo);
        localStorage.setItem(`prestamo_${contadorPrestamos}`, prestamoString);
        localStorage.setItem('contadorPrestamos', contadorPrestamos);
    } catch (error) {
        console.error('Error guardando el préstamo:', error);
    }
};


const obtenerPrestamos = () => {
    let prestamos = [];
    let contadorPrestamos = parseInt(localStorage.getItem('contadorPrestamos')) || 0;
    for (let i = 1; i <= contadorPrestamos; i++) {
        const prestamoString = localStorage.getItem(`prestamo_${i}`);
        if (prestamoString) {
            const prestamo = JSON.parse(prestamoString);
            prestamos.push(prestamo);
        }
    }
    return prestamos;
};


const eliminarPrestamo = (index) => {
    try {
        const contadorPrestamos = parseInt(localStorage.getItem('contadorPrestamos')) || 0;
        localStorage.removeItem(`prestamo_${index}`);
        localStorage.setItem('contadorPrestamos', contadorPrestamos - 1);
        registrarPrestamos(); 
    } catch (error) {
        console.error('Error eliminando el préstamo:', error);
    }
};

const registrarPrestamos = () => {
    const prestamos = obtenerPrestamos();
    const tablaPrestamos = document.getElementById('lista-prestamos');
    tablaPrestamos.innerHTML = ''; 
    prestamos.forEach((prestamo, index) => {
        const fila = `
            <tr>
                <td>${prestamo.nombre}</td>
                <td>${prestamo.monto.toFixed(2)}</td>
                <td>${prestamo.cuotas}</td>
                <td>${prestamo.montoConInt.toFixed(2)}</td>
                <td>${prestamo.montoCuota.toFixed(2)}</td>
                <td>${prestamo.interesGenerado.toFixed(2)}</td>
                <td>${prestamo.moneda}</td>
                <td>${prestamo.tipoPrestamo}</td>
                <td><button class="btn-eliminar" data-index="${index + 1}">Eliminar</button></td>
            </tr>
        `;
        tablaPrestamos.innerHTML += fila;
    });

    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            eliminarPrestamo(index);
        });
    });
};

document.getElementById('formulario-prestamos').addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const cuotas = parseInt(document.getElementById('cuotas').value);
    const moneda = document.getElementById('moneda').value;
    const tipoPrestamo = document.getElementById('tipo-prestamo').value;

    if (nombre && monto > 0 && cuotas > 0 && cuotas <= 24 && tipoPrestamo) {
        const { montoConInt, montoCuota, interesGenerado } = calcularCuotas(monto, cuotas, tipoPrestamo, moneda);
        const prestamo = { nombre, monto, cuotas, montoConInt, montoCuota, interesGenerado, moneda, tipoPrestamo };
        guardarPrestamo(prestamo);
        registrarPrestamos();
        mostrarError(''); 
    } else {
        mostrarError('Por favor ingrese valores válidos.');
    }
});

document.getElementById('borrar-historial').addEventListener('click', () => {
    try {
        const contadorPrestamos = parseInt(localStorage.getItem('contadorPrestamos')) || 0;
        for (let i = 1; i <= contadorPrestamos; i++) {
            localStorage.removeItem(`prestamo_${i}`);
        }
        localStorage.removeItem('contadorPrestamos');
        registrarPrestamos();
    } catch (error) {
        console.error('Error borrando el historial:', error);
    }
});

registrarPrestamos();
