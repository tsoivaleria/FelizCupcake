// Botón "Pedir" - Maneja la selección de cupcakes y desplaza a la sección del formulario
const pedirButtons = document.querySelectorAll('.cupcake-carousel .button');
const orderFormSection = document.querySelector('.order-form-container');

pedirButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const cupcakeName = this.parentElement.querySelector('p').textContent.trim();
        let valueForBase = "";

        switch (cupcakeName) {
            case 'Vainilla':
                valueForBase = 'vainilla';
                break;
            case 'Chocolate':
                valueForBase = 'chocolate';
                break;
            case 'Lemon':
                valueForBase = 'limon';
                break;
            case 'Con trozos de chocolate':
                valueForBase = 'trozos_chocolate';
                break;
        }

        document.getElementById('base').value = valueForBase;
        orderFormSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Clase para el pedido
class Order {
    constructor(base, decoracion, cantidad, fecha, hora, direccion, telefono, email, comentario, importe) {
        this.base = base;
        this.decoracion = decoracion;
        this.cantidad = cantidad;
        this.fecha = fecha;
        this.hora = hora;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.comentario = comentario;
        this.importe = importe;
    }
}

// Validación de campos
function validateFields() {
    let allFieldsFilled = true;
    document.querySelectorAll('select, input, textarea').forEach((field) => {
        if (field.required && !field.value.trim()) {
            field.style.borderColor = 'red';
            allFieldsFilled = false;
        } else {
            field.style.borderColor = '';
        }
    });
    return allFieldsFilled;
}

// Manejo del envío del formulario
const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!validateFields()) {
        alert('No se han completado todos los campos');
        return;
    }

    const order = new Order(
        document.getElementById('base').value,
        document.getElementById('decoracion').value,
        document.getElementById('cantidad').value,
        document.getElementById('fecha').value,
        document.getElementById('hora').value,
        document.getElementById('direccion').value,
        document.getElementById('telefono').value,
        document.getElementById('email').value,
        document.getElementById('comentario').value,
        document.querySelector('label[for="importe"] span').textContent
    );

    fetch("https://formspree.io/f/xyzyglyv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    })
    .then(response => {
        if (response.ok) {
            alert("¡Su pedido ha sido enviado con éxito!");
            form.reset();
            document.querySelectorAll('select, input, textarea').forEach(field => field.style.borderColor = '');
            document.querySelector('label[for="importe"] span').textContent = "0";
        } else {
            alert("Ocurrió un error al enviar el pedido");
        }
    })
    .catch(() => alert("Ocurrió un error al enviar el pedido"));
});

// Manejo de la opción de entrega
const recogidaCheckbox = document.querySelector('input[name="recogida"]');
const direccionField = document.getElementById('direccion');
recogidaCheckbox.addEventListener('change', () => {
    direccionField.disabled = recogidaCheckbox.checked;
    direccionField.required = !recogidaCheckbox.checked;
    direccionField.style.borderColor = '';
});

// Actualización del importe según la cantidad
const cantidadSelect = document.getElementById('cantidad');
const importeLabel = document.querySelector('label[for="importe"] span');

cantidadSelect.addEventListener('change', () => {
    const precios = { 6: 29, 12: 56, 18: 85, 24: 114 };
    const cantidad = parseInt(cantidadSelect.value);
    importeLabel.textContent = precios[cantidad] || "0";
});

// Manejo de la galería
const galleryItems = document.querySelectorAll('.gallery-item img');
const modal = document.createElement('div');
modal.classList.add('modal');
const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');
const modalImage = document.createElement('img');
const closeButton = document.createElement('span');

closeButton.classList.add('close-btn');
closeButton.innerHTML = '&times;';
modalContent.appendChild(modalImage);
modal.appendChild(closeButton);
modal.appendChild(modalContent);
document.body.appendChild(modal);

galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
        modalImage.src = e.target.src;
        modal.style.display = 'flex';
    });
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Desplazamiento hacia arriba
const scrollUpButton = document.getElementById('scrollUp');
window.addEventListener('scroll', () => {
    scrollUpButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
});
scrollUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Manejo del menú
function openModal() {
    document.getElementById("modalmenu").style.top = "0px";
}

function closeModal() {
    document.getElementById("modalmenu").style.top = "-400px";
}
