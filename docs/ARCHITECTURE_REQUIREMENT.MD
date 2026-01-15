# Architecture Requirements Breakdown

## Table of Contents
- [Simplex Level](#simplex-level)
- [Medium Level - Backend](#medium-level-backend)
- [Medium Level - Frontend](#medium-level-frontend)
- [Ultimo Level - Backend](#ultimo-level-backend)
- [Ultimo Level - Frontend](#ultimo-level-frontend)

---

## Simplex Level

* **A.1.1:** Apply N-Tier (Layer-based) Architecture to divide your front-end AND back-end into different layers. Each layer has a designated concern and stores all classes addressing that concern across different business features.
* **A.1.2:** A typical Layer Hierarchy is Presentation, Business Logic, and Data Access. However, to reuse query operations in the back-end and separate query execution from Data Access Object (DAO), you are required to implement a Repository Layer, where queries statements are defined and executed.
* **A.1.3:** Any Feature that does not follow the Tier structure shall be organized separately. E.g., Cookie Configuration, Filter.

---

## Medium Level - Backend

* **A.2.1:** Apply Modular Monolith Architecture to your back-end. Each module has a bounded context to handle a specific (group of) business feature. A module stores all classes of the N-Tier Layers or another design pattern to provide the business feature.
* **A.2.2:** Within a Module, the access rules shall go from one layer to another. Specifically, the Presentation Layer shall communicate with the Business Logic Layer which calls Repository method to execute queries. The Presentation Layer must NOT be able to access the functions provided by the Repository Layer.
* **A.2.3:** Each Module contains two groups of Service APIs:
1. External APIs to expose public services for other modules in the system to invoke.
2. Internal APIs to be used by the Presentation Layer or other Services of the module. Internal API services are NOT accessible to other modules.


* **A.2.4:** Each module exposes its internal and external API via interfaces. The Presentation Layer or other modules shall NOT call the Service Layer of the module to invoke the APIs’ services.
* **A.2.5:** The backend must present only necessary data when responding to a request from the front-end. For example, when showing the APPLICANTS matching the search criteria, their credit card number shall not be exposed in the response.
* **A.2.6:** You must also organize your DTOs into internal and external DTOs. External DTOs are accessible by other modules, while internal DTOs are only accessible by classes within the module.

---

## Medium Level - Frontend

* **A.2.a:** In the frontend, you should define common display elements (e.g., Buttons, Labels) as configurable components in a separate folder, so they can be reused by different pages without redefining the style again.
* **A.2.b:** Componentize your Front-end, such that each component has a package containing the following elements:
1. Component’s presentation in HTML or JSX
2. Sub-components
3. Back-end service calls
4. Event handlers on the component
5. CSS styling, if applicable


* *Note:** All the five elements are NOT placed in the same Component JavaScript file. These five elements shall be placed in separate files under the same package.


* **A.2.c:** The front-end must contain a REST HTTP Helper Class to provide a base function for conducting REST Requests such as GET, POST, PUT, PATCH, and DELETE, along with parameters of request headers and request body.

---

## Ultimo Level - Backend

* **A.3.1:** Apply Microservice Architecture to your back-end. Each service has a bounded context to handle a specific (group of) business capability. To achieve this, a microservice typically stores all classes of the N-Tier Layers for a single or group of related business capabilities, stores a module of a business capability from the modular monolith architecture, or applies a different design pattern to provide business capabilities.
* **A.3.2:** Communication among microservices shall be conducted via a Message Broker, e.g., Kafka.
* **A.3.3:** Every microservice manages its own database(s). Each microservice contains a specific connection String to its database.
* **A.3.4:** Your team must apply database sharding techniques to partition and query different shards. This requirement aims to test your design in terms of scalability and efficiency.
* **A.3.5 (Bonus Feature):** Your database must execute transactions instead of queries, hence the database can rollback transactions when an unexpected error occurs.

---

## Ultimo Level - Frontend

* **A.3.a:** Apply Headless UI to your frontend architecture for every UI elements that share similar templates or actions, but can be customizable to suit with the context of the page.
* *Example:* The Table to show job posts and the Table to show applications to a job post can share the same data template: heading is the title of the job or the name of the applicant; A View Button to see the content of the job post or application, and a Delete Button to remove the job post or application from the current list. In this case, the Table can be a Headless component, where the Job Post List Page and Application Page use the Table to render the Job Post and Applications accordingly.