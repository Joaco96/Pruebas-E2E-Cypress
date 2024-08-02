# Proyecto de Testing con Cypress

### Realizado por: Joaquin Cortés

## Descripción del Proyecto

Este proyecto utiliza Cypress para realizar pruebas automatizadas en la página de registro de un ecommerce. El objetivo es asegurarse de que el proceso de registro funcione correctamente y que se muestren los errores de validación adecuados cuando sea necesario.

## Instalación

Para instalar las dependencias necesarias, ejecuta el siguiente comando:

```bash
npm install
```

## Ejecución de Pruebas
Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npx cypress open
```
Esto abrirá la interfaz gráfica de Cypress donde podrás seleccionar y ejecutar las pruebas.

## Buenas Prácticas
Para ejecutar las pruebas, utiliza el siguiente comando:

1. Visitar la página antes de cada prueba: Utilizamos beforeEach para asegurarnos de que cada prueba comience con la página de registro en su estado inicial.

```bash
beforeEach(() => {
  cy.visit('http://localhost:3002/register');
});
```
2. Utilizar selectores de datos personalizados: Usamos selectores data-cy en lugar de clases o identificadores CSS para hacer que nuestras pruebas sean menos propensas a romperse con cambios en el diseño.

```bash
cy.get('[data-cy="submit"]').click();
```
3. Validar la existencia de errores: Verificamos que los errores de validación aparezcan cuando se envían datos incorrectos o faltantes.

```bash
cy.get('[data-cy="error-name"]').should('exist');
```
4. Validar los valores de los inputs: Aseguramos que los inputs contengan los valores correctos después de escribir en ellos.

```bash
cy.get('[data-cy="email-input"]').type('joacocortes96');
cy.get('[data-cy="email-input"]').should('have.value', 'joacocortes96');
```
5. Validar la navegación y elementos en la nueva página: Verificamos que la URL cambie y que aparezcan elementos específicos en el dashboard después de un registro exitoso.

```bash
cy.url().should('equal', 'http://localhost:3002/');
cy.get('[data-cy="avatar"]').should('exist');
```

## Reporte de test
Se podrá verificar el reporte de los testeos en la siguiente ruta:
#### Pruebas-E2E-Cypress/cypress/reports/html/index.html

## Pruebas Realizadas
### Validación de Campos Vacíos
Verifica que se muestren los errores de validación cuando se intenta enviar el formulario sin completar ningún campo.

```bash
it('Debe mostrar errores de validación cuando dejamos todos los campos sin completar', () => {
  cy.get('[data-cy="submit"]').click();
  cy.get('[data-cy="error-name"]').should('exist');
  cy.get('[data-cy="error-email"]').should('exist');
  cy.get('[data-cy="error-password"]').should('exist');
});
```

### Validación de Formato de Email
Verifica que se muestre un error de validación cuando se ingresa un email con formato incorrecto.

```bash
it('Debe mostrar errores de validación cuando ingresamos un email con formato incorrecto', () => {
  cy.get('[data-cy="email-input"]').type('joacocortes96');
  cy.get('[data-cy="email-input"]').should('have.value', 'joacocortes96');
  cy.get('[data-cy="submit"]').click();
  cy.get('[data-cy="error-email"]').should('exist');
});
```

## Registro Exitoso
### Verifica que el usuario se registre correctamente y sea dirigido al dashboard.

```bash
it('Debe registrar al usuario correctamente y dirigirse al dashboard', () => {
  cy.get('[data-cy="name-input"]').type('Joaquin');
  cy.get('[data-cy="name-input"]').should('have.value', 'Joaquin');
  cy.get('[data-cy="email-input"]').type('joacocortes96@gmail.com');
  cy.get('[data-cy="email-input"]').should('have.value', 'joacocortes96@gmail.com');
  cy.get('[data-cy="password-input"]').type('laclavedemiecommerce44');
  cy.get('[data-cy="password-input"]').should('have.value', 'laclavedemiecommerce44');
  cy.get('[data-cy="submit"]').click();
  cy.url().should('equal', 'http://localhost:3002/');
  cy.get('[data-cy="avatar"]').should('exist');
});
```

# Modificaciones del template ecommerce
Se realizaron algunas modificaciones en el template del proyecto para garantizar las buenas practicas del testeo End to End. Las mismas comprenden la implementación de selectores descriptos a continuación para evitar colisiones y poder ejercer un mejor control de los elementos del DOM al momento de testearlos.

### Archivo -> registration-form.tsx
data-cy="submit" en boton de submit

```bash
<Button data-cy="submit" className="w-full" loading={loading} disabled={loading}>
    {t('form:text-register')}
</Button>
```

### Archivo -> input.tsx
data-cy={`${name}-input`} en inputs
```bash
<input
    id={name}
    name={name}
    type={type}
    ref={ref}
    data-cy={`${name}-input`}
    className={`${rootClassName} ${
    disabled
        ? `cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4] ${numberDisable} select-none`
        : ''
    }`}
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    spellCheck="false"
    disabled={disabled}
    aria-invalid={error ? 'true' : 'false'}
    {...rest}          
/>
```
data-cy={`error-${name}`} en mensaje de error
```bash
{error && (
    <p data-cy={`error-${name}`} className="my-2 text-xs text-red-500 text-start">{error}</p>
)};
```

### Archivo -> password-input.tsx
data-cy={`${name}-input`} en inputs
```bash
<input
    id={name}
    name={name}
    type={show ? 'text' : 'password'}
    ref={ref}
    data-cy={`${name}-input`}
    className={rootClassName}
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    spellCheck="false"
    {...rest}            
/>
```

data-cy={`error-${name}`} en mensaje de error
```bash
{error && (
    <p data-cy={`error-${name}`} className="my-2 text-xs text-red-500 text-start">{error}</p>
)};
```

### Archivo -> avatar.tsx
data-cy='avatar' en la imagen del avatar
```bash
<Image
    alt={name}
    src={src}
    fill
    priority={true}
    sizes="(max-width: 768px) 100vw"
    onError={() => setError(() => true)}
    data-cy='avatar'
/>
```
