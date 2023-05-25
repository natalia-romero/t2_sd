# Tarea 2 - Sistemas Distribuidos
Integrantes: Felipe Lillo y Natalia Romero
- Lenguaje: NodeJS (JavaScript) v16.15.1
### Instalación
Se debe estar en la carpeta principal
```
cd t1_sd
```
- **RabbitMQ**
  
  Para la instalación de RabbitMQ se deben seguir los siguientes comandos
  ```
  cd rabbit
  ```
  Se debe ejecutar el docker para incorporar el servidor a nuestro local
  ```
  docker compose up
  ```
  Con el servidor corriendo, en otra terminal se debe ejecutar el productor y en otra, el consumidor
  - Productor
    ```
    cd producer
    ```
    ```
    npm install 
    ```
    ```
    node index.js
    ```
  - Consumidor
    ```
    cd producer
    ```
    ```
    npm install 
    ```
    ```
    node index.js
    ```
    Y listo, ahora se enviarán los mensajes :) para ver el flujo estadistico conectarse a http://127.0.0.1:15672/ (Usuario: rabbit Contraseña: rabbit)
- **Kafka**
  
  Para la instalación de Kafka se deben seguir los siguientes comandos
  ```
  cd rabbit
  ```
  Se debe ejecutar el docker para incorporar el servidor a nuestro local
  ```
  docker compose up
  ```
  Luego se debe ejecutar el contenedor creado, para esto primero se verá la ID del contenedor Kafka creado con el comando
  ```
  docker ps
  ```
  Una vez identificada la ID del contenedor, se debe ejecutar
  ```
  docker exec -it <container_id> sh
  ```
  ---
    Dentro del contenedor ejecutar los siguientes comandos
    ```
    cd /opt/kafka_2.13-2.8.1/bin
    ```
    Se deben crear 5 topic para esta tarea, esto se realiza con el siguiente comando (ejecutar por cada topic a agregar)
    ```
    kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic <topic_name>
    ```
    Para ver el productor ejecutar
    ```
    kafka-console-producer.sh --topic <topic_name> --bootstrap-server localhost:9092 
    ```
    Para ver el consumidor ejecutar
    ```
    kafka-console-consumer.sh --topic <topic_name> --from-beginning --bootstrap-server localhost:9092 
    ```
    ---
    Para correr el programa y crear el flujo producer-consumer, debemos ubicarnos en una nueva terminal (dentro de la carpeta kafka de este repositorio) y ejecutar el comando
    ```
    node index.js
    ```
    Y listo, ahora se enviarán los mensajes :)