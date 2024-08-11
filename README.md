# Team Pathfillers - Online Coding Platform


#### Deployement Link: https://pathfillers.vercel.app/
#### References Link : https://desert-engineer-f93.notion.site/CodeBrewers-Hackathon-f99f787cac0848368fea3e100e3c9072

<img width="1377" alt="image" src="https://github.com/user-attachments/assets/611bce92-04ae-4423-82ed-b006d16f4371">



### Coding Playground
• A place where users can play with code.\
• Users can code in a code editor and execute it with custom inputs.\
• Users can see errors, output and metrics like execution time.
<img width="1374" alt="image" src="https://github.com/user-attachments/assets/e08a9521-f6a0-4b58-a93b-65e1f3ac7770">
### Coding Arena
• A place where users can practice their coding skills by solving various problems available on the platform.


## Features

• Language support for C++\
• Language support for python\
• Pagination\
• Searching the question\
• Code mirror - For code editor space\
• Vscode theme from codemirror

## Tech Stack:
• Frontend: ReactJS\
• Frontend Language: TypeScript\
• Styling: TailwindCSS\
• Component Library: Shadcn, Magic ui, Code mirror\
• Routing: Axios\
• Backend: ExpressJS\
• Database: MongoDB\
• Message Queue: Bull\
• Child_process: For executing OS Commands with NodeJS\
• ORM: Mongoose\
• Deployment: Vercel (Frontend)


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
DATABASE_URL= <mongodb_connection_string>
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
