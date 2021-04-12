# Secure Electronic Medical Record storage on IPFS

<hr>

<p>Secure EMR(Electronic Medical Record) storage on an IPFS (Interplanetary File System) while maintaining a database for secure handling of data using Ethereum Blockchain nodes, Infuria IPFS nodes, Ganache as ethereum account providers & metamask as ether transaction agent and Truffle framework for client side development using the web3 package. </p>

## To get started:

```sh
$ cd secure-emr-storage
$ ./Taskfile.sh install  #install dependencies in both client and api directories
$ cp .env.example .env   # Copy env
```

### Taskfile commands

```sh
./Taskfile.sh install       # installation package-json project dependencies
./Taskfile.sh dev           # Starts docker-compose in dev mode and serves requests on localhost:8080
./Taskfile.sh prod          # Starts docker-compose in production mode and serves requests on localhost:80
./Taskfile.sh mongo         # Starts mongo cli inside mongo container
./Taskfile.sh redis         # Starts redis cli inside redis container
./Taskfile.sh     # (default) starts the project in dev mode
```

---

### API Specifications:

-   API is going to be an agent for secure isolated storage of cryptographic hashes.
-   The API is going to be running in an isolated environemnt, i.e, within a docker container, alongside the Redis and MongoDB containers.
-   These containers interact with one another using [networks](https://docs.docker.com/compose/networking/), that has been defined in the docker-compose configuration files.
-   Architecture of API: REST, implemented using Node.js and Express.js (Framework for Node.js). Communicates with the client using HTTP/HTTPS headers and cookies.
-   Redis sessions help store user sessions for secure communication and data updation.

### Sequence Diagrams For User IPFS Communication (TODO)

-   **User upload Scenario:**

-   **User Download Scenario:**
