# APIDaimler 

Este es un Demo de una pagina web, donde se trabaja con el back end (.net core api) y el fronend (angular).

## Descripcion de la pagina Web
Es una applicacion que contiene el proceso de usuarios de la misma pagina web, donde puedes hacer lo siguiente:

- Authenticacion mediante un login que crea un token que tiene tiempo de expiracion de 15 minutos
- Crear Usuarios
- Modificar Usuarios ( Password & Role )
- Eliminar Usuarios
- Crear Roles
- hacer logout de la app

# Pasos a seguir para el funcionamiento de la aplicacion

### Git hub
- Clonar el repositorio a una carpeta local 

### SQL
- Correr los queries que se ubican dentro del SQLUpgrade.sql en SQL server

Al correr los queries se introducen automaticamente 1 usuario con sus respectiva contraseña con la cual podras hacer login a la applicacion 
'userName -> admin || password -> admin'

Al igual que tambien se crean 2 Roles 
'role1 -> admin || role2 -> operator'
 
### BackEnd
- Abrir el projecto de APIDaimler.sln (yo use Visual Studio 2022)
- Correr el projecto desde Visual Studio

###FronEnd
- Abrir la carpeta con tu IDE (yo Use Visual Code)
- instalar las dependencias corriendo 'npm install'
- Correr el proyecto con ng serve

# Notas
- La applicacion backend corre en el puerto 5289 si ese puerto esta ocupado puedes cambiarlo en 'Properties/LaunchSettings.Json' al puerto que desees,
de igual forma tendrias que cambiarlo en el fronend en el archivo 'app/constants/constants.ts' 
