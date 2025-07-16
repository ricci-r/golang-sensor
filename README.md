# Sensor application: NATS, backend (Go) and frontend (React + TailwindCSS)


## 📦 Project structure


```
├── sensor-backend # Backend en Go
│ ├── main.go # Entry point
│ ├── handlers/ # HTTP Handlers
│ ├── models/ # Data models
│ └── nats/ # NATS Client
└── sensor-frontend # Frontend React con TailwindCSS
└── src/components/ # UI Components
```


---


## 🚀 How to run the application


### 🔁 1. Start the NATS server


#### With Docker (recommended)
``coup
stevedore run -page 4222:4222 -page 8222:8222 nats:last
```


-At the door`4222`It is used by the NATS client.
-At the door`8222`Used for monitoring (optional).


#### Sin Docker
Download the [NATS Server](https://docs.nats.io/ejecución-de-un-servicio-nats/introducción/instalación)and run:


``coup
nats server
```


---


### 🧠 2. Start the backend (Go)


#### Prerequisites:
-Go to 1.18 or higher


#### Steps:
``coup
cd sensor-backend
and against descargar
```


Create a file`.env`or export the variables:


``coup
export NATS URL=nationals://host local:4222
export PUERTO=8080
```


Start the server:
``coup
and run principal.go
```


The backend will be in:`http://localhost:8080`


---


### 🎨 3. Frontend Start (React + TailwindCSS)


#### Prerequisites:
-Node.js 18+


#### Steps:
``coup
cd sensor interface
npm install
```


Create a file`.env`with the API URL:
```env
REACT APP RETURN URL=http://localhost:8080
```


Start the frontend:
``coup
npm begin
```


The frontend will be in:`http://localhost:3000`


---


## 🛠️ Technologies used


- **NATS**: Message Broker (Publish/Subscribe)
- **And**:Lightweight and efficient backend
- **React**: Fast and responsive frontend
- **TailwindCSS**:Fast and responsive style


---


## 🧪 Testicles


This project uses**Is**and**React Testing Library**to test components.


### ▶️ Run tests


``coup
npm proof
```


### ✅ Run tests with coverage report


``coup
npm proof -- --coverage
```


After execution, the folder will be generated.`coverage/`with a full report.


### 🌐 View HTML report in browser


And macOS o Linux:
``coup
open coverage/lcov-report/index.html
```


Without windows:
``coup
begin coverage/lcov-report/index.html
```


---


### 📦 Install the test dependencies (if you haven't already)


``coup
npm install --guard-dev @test-library/react @test-library/jest-dom
```


---


Include`importar '@testing-library/jest-dom'`At the top of the`setupTests.js`to use custom comparators.




## 📋 Observations


-Make sure NATS is enabled before starting the backend.
-The frontend communicates with the backend via REST and the backend with NATS.
-The file`natsClient.js`On the frontend it can be used for testing, but the real communication is through the backend.


---


## ✅ Features


-Listing and registering sensors
-Communication via NATS between frontend and backend
-Responsive interface with TailwindCSS


---


## Diagram


![Architecture diagram](./arquitectura-de-simulación-de-sensores.png)


---


## 📄 License


This project is licensed under the MIT License.
