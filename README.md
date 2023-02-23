# Subscription System
## System composed of 3 microservices to perform the subscription, search and unsubscription in newsletters.

### Requirements:
* Docker
* Docker Compose
* Node (v16.13.2)
* NPM (v8.1.2)

<hr>

### Start all services
```
cd subscription-system

docker-compose up
```

### API Documentation
* Access: http://localhost:3000/docs

<hr>

### Tests
Make sure that the db, kafka and email-service are up (you can start them with **docker-compose up <service>** individually), then:
```
cd subscription-service

npm run test
```

<hr>

### ***Postgres Database***
* Start: 
    ```
    docker-compose up db
    ```

### ***Kafka and UI***
* Start: 
    ```
    docker-compose up kafka_ui
    ```
* Access: http://localhost:8080

### ***Email Service***
* Service that listens for subscription creation events and, for now, it only logs the received message, without actually sending the e-mail. 
* Start: 
    ```
    cd email-service

    npm i

    npm run start
    ``` 
    or 
    ```
    cd subscription-system

    docker-compose up email-service
    ```
* PORT: 3002

### ***Subscription Service***
* Service that performs the query and persistence of data in the database.
* When a subscription is created, the service emit a message notifying the email service and this request is authenticated using a JWT token generated from a key shared between the services.
* Start: 
    ```
    cd subscription-service
    
    npm i 
    
    npm run start
    ```

    or 
    ```
    cd subscription-system

    docker-compose up subscription-service
    ```
* PORT: 3001

### ***Public Service***
* Service that allows to create, query and cancel subscriptions.
* For all operations, this service makes the request to the subscription service to persist or query the data and the authentication is made by an API KEY between services.
* Start: 
    ```
    cd public-service

    npm run start
    ``` 
    or 
    ```
    cd subscription-system

    docker-compose up public-service
    ``` 
* Access: http://localhost:3000/docs

<hr>

### Technologies
* NestJS
    * Framework for building efficient, scalable Node.js server-side applications.
    * Nest provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular.
    * Along with NestJS, this project used the **TypeScript** programming language.

* PostgreSQL
    * One of the most used and highly stable relational databases nowadays.

* TypeORM
    * One of the best ORMs for NestJS that makes easy to link TypeScript application up to a relational database. 
    * TypeORM uses TypeScript decorators extremely effectively, resulting in entity classes that are expressive and very easy to read.

* Kafka
    * Used to build real-time streaming data pipelines and applications that adapt to the data streams.
    * In this project, kafka was used so that the subscription microservice could notify the email microservice that a newsletter subscription was performed.
