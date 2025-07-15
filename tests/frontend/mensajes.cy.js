// mensajes.cy.js

// 'describe' es como el título de nuestra lista de pruebas para el fuerte
describe('Pruebas del Fuerte Secreto de Mensajes', () => {

    // 'beforeEach' es lo que hacemos ANTES de cada prueba
    beforeEach(() => {
        // MUY IMPORTANTE: Asegúrate de que la ruta a tu index.html sea correcta en tu laptop.
        // Si tu carpeta MiFuerteSecreto está en el Escritorio de Windows:
        // cy.visit('file:///C:/Users/TU_USUARIO/Desktop/MiFuerteSecreto/index.html');
        // RECUERDA CAMBIAR "TU_USUARIO" por el nombre de tu usuario en la laptop.

        // Si tu carpeta MiFuerteSecreto está en el Escritorio de Mac (ejemplo):
        // cy.visit('file:///Users/TU_USUARIO/Desktop/MiFuerteSecreto/index.html');
        // RECUERDA CAMBIAR "TU_USUARIO" por el nombre de tu usuario en la laptop.

        // Si tienes problemas para encontrar la ruta, abre tu index.html en Chrome,
        // copia la dirección que aparece en la barra de direcciones y pégala aquí.
        cy.visit('/'); // <--- ¡CAMBIA ESTA RUTA POR LA TUYA!
    });

    // --- ¡Nuestras Listas de Verificación para la Pantalla! ---

    // Prueba 1: ¿Podemos escribir un mensaje y enviarlo?
    it('Debe permitir escribir y enviar un nuevo mensaje', () => {
        const mensajeDePrueba = 'Este es un mensaje de prueba de Cypress.';

        // Le decimos a Cypress: "Ve al cuadro de texto (#mensajeInput) y escribe mi mensaje."
        cy.get('#mensajeInput').type(mensajeDePrueba);

        // Le decimos a Cypress: "Ahora, haz clic en el botón de 'Enviar Mensaje Secreto'."
        cy.get('button').click();

        // Esperamos un poquito (medio segundo) para que el robot guarde y la página actualice
        cy.wait(500);

        // Le decimos a Cypress: "Mira la lista de mensajes (#mensajesLista) y verifica que contenga nuestro mensaje."
        cy.get('#mensajesLista').should('contain', mensajeDePrueba);

        // Opcional: ¿El cuadro de texto se limpió después de enviar?
        cy.get('#mensajeInput').should('have.value', '');
    });

    // Prueba 2: ¿La página carga los mensajes existentes al inicio?
    it('Debe cargar los mensajes existentes al iniciar la página', () => {
        // En esta prueba, esperamos que el mensaje de la prueba anterior ya esté guardado
        // por nuestro robot en el archivo 'mensajes.json' y que se cargue.

        // Le decimos a Cypress: "Verifica que la lista de mensajes NO diga que no hay mensajes."
        cy.get('#mensajesLista').should('not.contain', 'No hay mensajes secretos todavía.');

        // Le decimos a Cypress: "Verifica que la lista de mensajes contenga el mensaje de la prueba anterior."
        cy.get('#mensajesLista').should('contain', 'Este es un mensaje de prueba de Cypress.');

        // Podemos verificar que aparezca la fecha, aunque no sea exactamente la que pusimos en el test
        cy.get('#mensajesLista').should('contain', new Date().toLocaleDateString()); // La fecha actual
    });

    // Prueba 3: ¿Qué pasa si intentamos enviar un mensaje vacío?
    it('No debe enviar un mensaje vacío y debe mostrar una alerta', () => {
        // No escribimos nada en el cuadro de texto.

        // Le decimos a Cypress: "Ahora, haz clic en el botón de 'Enviar Mensaje Secreto'."
        // Y esperamos que aparezca una ventana de alerta.
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alertStub'); // Esto es para 'atrapar' la alerta
        });
        cy.get('button').click();

        // Le decimos a Cypress: "Verifica que la alerta haya aparecido con el mensaje correcto."
        cy.get('@alertStub').should('be.calledWith', '¡No puedes enviar un mensaje vacío!');

        // Le decimos a Cypress: "Verifica que la lista de mensajes no haya cambiado (no se añadió nada nuevo)."
        // (Asume que solo el mensaje de la Prueba 1 está ahí o que está limpia)
        cy.get('#mensajesLista').should('not.contain', '¡No puedes enviar un mensaje vacío!');
    });
});