# my-store

- Levantamos los contenedores postgres y pgadmin
  docker-compose up -d

- Verificamos los contenedores
  docker-compose ps

- Bajamos los contenedores
  docker-compose down

- Accedemos a la base de datos desde la consola
  --Nos conectamos al conentenedor
  docker-compose exec postgres bash
  --Nos conetamos a la base
  psql -h localhost -d my_store -U storeadmin
  --Vemos las tablas de la base, aunque aún no tenemos tablas
  \d+  
  --Salimos de la base de datos
  \q
  --Salimos del contenedor
  exit;

## pgadmin

http://localhost:5050
user: admin@email.com
pass: root

- Ejecutamos entorno de desarrollo
  npm run dev
