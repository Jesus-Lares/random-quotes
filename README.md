# Template de APIs node js

Este template para APIs se creo en node js con una estructura basica que permite poder seguir escalando el proyecto.

En esta rama se realizo un ejemplo haciendo uso de una base de datos de **Mysql**, esto ayudara a iniciar el proyecto sin necesidad de hacer las configuraciones.

Para correr este proyecto, asegurate de instalar las dependencias con el comando.

```
npm install
```

Y posterior a esto, inspecciona el archivo **package.json**, el cual contiene una serie de scripts que te permiten correr el proyecto de distintas maneras

## Arquitectura Multicapa

Cada capa de la arquitectura debe incluirse en una carpeta específica .

```
__tests__
src
├─ config
├─ context
├─ interface
├─ middlewares
├─ utils
├─ router
  ├─ v1
├─ app.js
├─ index.js
```

## Capa de config

En esta capa se busca tener todo lo relacionado a la configuración del proyecto, dentro de esta carpeta se logra encontrar cosas como las variables de entorno, la configuración de la base de datos, plugins que se lleguen a utilizar, etc. De esta manera se puede dividir en donde se configuran la mayoría de los procesos que necesite.

## Capa de context

Se puede decir a grandes rasgos que esta es la capa más importante del repositorio, ya que por dentro tendrá la gran parte de lógica del mismo, esta capa se estructura teniendo 3 sub capas las cuales son **application**, **domain** e **infra** la cual tiene otras 3 carpetas llamadas controller, useCases y routes.

- Application: Como el nombre lo dice, aquí se guardan las aplicaciones en general que se tienen, un ejemplo es guardar los métodos que te permite una base de datos como lo son: find, save, etc.
- Domain: En esta se guarda lo tipado, esto incluye las interfaces que se usen en este contexto, el schema del usuario, el modelo, etc.
- Infra: En la infraestructura se encuentran las carpetas:
  - Controller: en la cual se guardan los controladores del contexto,
  - UseCases: es donde se queda el código que se pueda separar, explicando esto de mejor manera se crean casos de uso para creación, búsqueda, actualización de usuario, etc. Esto con el fin de hacer que los controllers carguen con el menor código posible para su mejor entendimiento (aquí se manda a llamar a los archivos creados en application)
  - Routes: Se guardan todas las rutas que estén relacionadas con el contexto

## Capa de interface

Aquí es donde deben poner todo lo que pertenezca al código tipado que sea global o se utilice en distintas partes del código, esto con el fin de no repetir interfaces. A esta carpeta también se le puede llamar Domain o hacer que esté en una carpeta llamada Shared para que se comprenda mejor, pero considero que si se crea la carpeta shared, en esta deberían entrar más sub carpetas como lo pueden ser utils, config, etc.

## Capa de middlewares

Una práctica común es definir los middlewares en una carpeta por separado, ya que si bien estos pueden entrar en su propio contexto, los middlewares se suelen compartir entre rutas, por ejemplo el middleware básico de validación de token, etc.

Conforme el proyecto vaya creciendo se pueden dividir en sub carpetas nombrándolas con el nombre del contexto.

## Capa de utils

Este es el lugar para almacenar todas las funciones de utilidad definidas de forma personalizada de las que depende todo su código base. Si bien es posible que tenga sus funciones almacenadas en un solo archivo, a medida que aumenta el tamaño de su proyecto, podría verse obligado a dividirlo en varios archivos

## Capa de router

En esta capa se define un archivo que contenga todas sus rutas para reunirlas en un solo lugar y separarlas de cuando realmente se utilizan, se puede agregar a esto el nombre de sub carpeta de la versión en la cual se está desarrollando la ruta.

Para proyectos pequeños, este enfoque puede no ser necesario. El problema radica en el hecho de que no se puede predecir la magnitud del proyecto. Es por eso que debe definir una capa diseñada para contener todos sus archivos de enrutamiento y lógica, así como el manejo de versiones. Un truco para dividir fácilmente su archivo en muchos archivos es crear uno para cada una de las rutas dependiendo sus versiones y sus contextos.

## Archivos restantes en su estructura de varias capas

Tenga en cuenta que una arquitectura de este tipo puede no ser suficiente para cubrir todos los archivos que componen su base de código. Es por eso que siempre habrá archivos adicionales que quizás no sepa dónde colocar.

Seguir una estructura tan organizada le permite reducirlos a unos pocos lugares. Una buena regla general es que si tiene menos de tres archivos, debe dejarlos en la carpeta de nivel superior de su proyecto, o donde crea que pertenecen. De lo contrario, siempre puede diseñar nuevas capas que satisfagan sus necesidades.
