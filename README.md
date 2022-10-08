# Random Quotes - Rest Full API

## Introducción

Bienvenido/a a la primera versión de la API Random Quotes. A continuación, encontrará una descripción de la api. Si requiere ayuda o soporte, diríjase al correo contacto@jesuslares.com.

Se debe tener en cuenta que la API de momento no contiene UI por lo que todos los procesos se deben hacer mediante peticiones por postman o la herramienta de su preferencia.

## Uso

### Producción

Para el uso de la mayoria de las rutas de la API Random Quotes, se requiere de un token o un apiKey, estas 2 variables son fundamentales:

- **Token:** Se obtiene como respuesta al crear el usuario o hacer login del usuario, esta variable es muy importante al momento de hacer las peticiones la cual se manda por los headers con la propiedad **authorization**
- **ApiKey:** Se obtiene como respuesta de la ruta user/generateApiKey, esta variable es requerida al momento de solicitar la cita random del dia y se manda por un parametro en la ruta quote/:apiKey/random

Teniendo esto podras agregar las citas de tu preferencia y solicitarlas a tu gusto.

### Desarrollo

Este template para APIs se creo en node js con una estructura basica que permite poder seguir escalando el proyecto.

Para correr este proyecto, asegurate de instalar las dependencias con el comando.

```
npm install
```

Y posterior a esto, inspecciona el archivo **package.json**, el cual contiene una serie de scripts que te permiten correr el proyecto de distintas maneras

## Autor ✒️

**Jesús Lares Contreras** - _Documentación y trabajo inicial_

- [Linkedin](https://www.linkedin.com/in/jesuslares/)
- [Sitio Web](https://jesuslares.com)
- [Github](https://github.com/Jesus-Lares)

## Licencia 📄

MIT License
De momento esta api no puede usarse comercialmente.
