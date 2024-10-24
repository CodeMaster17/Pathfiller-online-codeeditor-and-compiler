<h1 align="center"><img height="150" src="https://i.pinimg.com/280x280_RS/7f/1f/21/7f1f213c60ab316d0a3a249910e9da51.jpg" /><br>Pathfiller</h1>

<p align="center">
 An interactive platform where users can code, execute with custom inputs, and sharpen their coding skills by solving a wide range of problems.
</p>
<p align="center">
(*Hosted the application, but Azure credits just ended. Reviving it soon!)
</p>



## Features

• Language support for C++\
• Language support for python\
• Pagination support\
• Search functionality for questions\
• Code mirror - For code editor space\
• Vscode theme from codemirror

## Tech Stack:

• Frontend: ReactJS\
• Frontend Language: TypeScript\
• Styling: TailwindCSS\
• Component Library: Shadcn, Magic ui, Code mirror\
• Routing: FetchAPI\
• Backend: ExpressJS\
• Database: MongoDB\
• Message Queue: Bull\
• Child_process: For executing OS Commands with NodeJS\
• ORM: Mongoose\
• Deployment: Vercel (Frontend)

#### Frontend Deployement Link: https://pathfillers.vercel.app/

<img width="1377" alt="image" src="https://github.com/user-attachments/assets/611bce92-04ae-4423-82ed-b006d16f4371">

### Coding Playground

• A place where users can play with code.\
• Users can code in a code editor and execute it with custom inputs.\
• Users can see errors, output and metrics like execution time.
<img width="1374" alt="image" src="https://github.com/user-attachments/assets/e08a9521-f6a0-4b58-a93b-65e1f3ac7770">

### Coding Arena

• A place where users can practice their coding skills by solving various problems available on the platform.

Problem list page
![image](https://github.com/user-attachments/assets/c380f0e0-e291-488e-8ece-2568a28e5ffa)

CodeArena page
![image](https://github.com/user-attachments/assets/75083bb4-d377-4161-96e2-c5272ce6673c)

CodeArena when test case fails
![image](https://github.com/user-attachments/assets/5893d549-9415-4589-bef4-b3f81d3952c1)

### Flow Diagram for data flow

#### CodeArena

![image](https://github.com/user-attachments/assets/09d68f1e-925b-4828-ba80-0ecdf0c1570b)

#### CodePlayground

![image](https://github.com/user-attachments/assets/07e38dc0-0de4-40c4-ba9a-4f1fe68f48ec)

#### Scalable and secure approach

![image](https://github.com/user-attachments/assets/88e1019a-9638-4d60-8e0b-89cf169d53bb)


### Pre-requisites

1. Setup `docker` in your system and pull and run image for `redis-cli`

### Clone the repository

1. Clone the repository: `git clone https://github.com/CodeMaster17/Tally-Codebrewers.git`

### Configure the client

1. Navigate to client folder: `cd frontend`
2. Install required packages: `npm i`

### Configure the server

1. Navigate to server folder: `cd express_backend`
2. Install required packages: `npm i`
3. Set up the database and configure the environment variables by following the instructions in the next steps.

### Set up the database

1. Create a `.env` file in the server folder and add the following environment variables:

```
PORT= <port_to_run_node_server>
MONGODB_URL= <mongodb_connection_string>
JWT= <JWT_secret>
```

### Run the application

#### Run the client

1. Navigate to server folder: `cd frontend`
2. Start Client : `npx vite`
3. Open the application in your browser at `http://localhost:5173`

#### Run the server

1. Navigate to server folder: `cd server`
2. Start Client : `npm start`
3. Server will be running at `http://localhost:5002`
