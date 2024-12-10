// Pedir"

const pedirButtons = document.querySelectorAll('.cupcake-carousel .button');

const orderFormSection = document.querySelector('.order-form-container');

pedirButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const cupcakeName = this.parentElement.querySelector('p').textContent.trim();
        let valueForBase;
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
            default:
                valueForBase = '';
        }

        const baseSelect = document.getElementById('base');
        baseSelect.value = valueForBase;

        orderFormSection.scrollIntoView({ behavior: 'smooth' });
    });
});

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

function validateFields() {
    let allFieldsFilled = true;
    document.querySelectorAll('select, input, textarea').forEach((field) => {
        if (field.required && !field.value) {
            field.style.borderColor = 'red';
            allFieldsFilled = false;
        } else {
            field.style.borderColor = '';
        }
    });

    return allFieldsFilled;
}

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let base = document.getElementById('base').value;
    let decoracion = document.getElementById('decoracion').value;
    let cantidad = document.getElementById('cantidad').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    let comentario = document.getElementById('comentario').value;
    let importe = document.querySelector('label[for="importe"] span').textContent;

    if (!validateFields()) {
        alert('No se han completado todos los campos');
        return;
    }

    const order = new Order(base, decoracion, cantidad, fecha, hora, direccion, telefono, email, comentario, importe);

    fetch("https://formspree.io/f/xyzyglyv", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(response => {
        if (response.ok) {
            alert("�Su pedido ha sido enviado con �xito!");
            document.querySelector('form').reset();
            document.querySelectorAll('select, input, textarea').forEach(field => {
                field.style.borderColor = ''; 
            });
            document.querySelector('label[for="importe"] span').textContent = "0";
        } else {
            alert("Ocurri� un error al enviar el pedido");
        }
    })
    .catch(() => alert("Ocurri� un error al enviar el pedido"));
});

const recogidaCheckbox = document.querySelector('input[name="recogida"]');
const direccionField = document.getElementById('direccion');

recogidaCheckbox.addEventListener('change', function () {
    if (recogidaCheckbox.checked) {
        direccionField.disabled = true;
        direccionField.required = false;
        direccionField.style.borderColor = '';
    } else {
        direccionField.disabled = false;
        direccionField.required = true;
    }
});

const cantidadSelect = document.getElementById('cantidad');
const importeLabel = document.querySelector('label[for="importe"] span');

cantidadSelect.addEventListener('change', function () {
    let cantidad = parseInt(cantidadSelect.value);
    let importe = 0;

    switch (cantidad) {
        case 6:
            importe = 29;
            break;
        case 12:
            importe = 56;
            break;
        case 18:
            importe = 85;
            break;
        case 24:
            importe = 114;
            break;
        default:
            importe = 0;
    }

    importeLabel.textContent = importe + "�";
});

// Gallery
const galleryItems = document.querySelectorAll('.gallery-item img');


const modal = document.createElement('div');
modal.classList.add('modal');

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

const modalImage = document.createElement('img');
modalContent.appendChild(modalImage);


const closeButton = document.createElement('span');
closeButton.classList.add('close-btn');
closeButton.innerHTML = '&times;';
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

// .button
const contactButton = document.querySelector('.button');


contactButton.addEventListener('click', () => {
  
    const footer = document.getElementById('footer');
    
   
    footer.scrollIntoView({ behavior: 'smooth' });
});

// ScrollUp
const scrollUpButton = document.getElementById('scrollUp');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollUpButton.style.display = 'block';
    } else {
        scrollUpButton.style.display = 'none';
});

scrollUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

       // Menu

       function openModal() {
        document.getElementById("modalmenu").style.top = "0px";
    }

    function closeModal() {
        document.getElementById("modalmenu").style.top = "-400px";
    }