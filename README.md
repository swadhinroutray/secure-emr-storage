# Secure Storage of Electronic Medical Records(EMR) on Interplanetary File System(IPFS) Using Cloud Storage and Blockchain Ecosystem

<p>Electronic Medical Records(EMR) are an important aspect of any healthcare system. The effective and secure management of the same is an integral task. With new and upcoming technologies, there have been various new mechanisms to securely store patient information. It is a time critical task to retrieve and refer to a patient’s medical record for effective and rapid treatment. Due to the large number of Electronic Medical Records(EMR) owing to the large healthcare sector, there exists high risk of possible intrusions. It is also one of the most targeted sectors for personal data theft. This paper proposes a secure system for storage and access of these Electronic Medical Records(EMR) taking into consideration the confidentiality, integrity and availability of these records. The paper proposes a system for access of a centralised storage system for healthcare institutions around the globe, taking into account the secure features of a decentralised Interplanetary File System(IPFS). The storage system utilises the Blockchain Ecosystem for storing sensitive data. This system also implements a Role Based Access Control(RBAC) system for access to the storage. The paper shows implementation of the system through thorough breakdown of the system. </p>

You can check out the full paper [here](https://ieeexplore.ieee.org/abstract/document/9616690)

## Local setup for running the project

### To get started:

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

<hr>

### To cite the paper
```
@INPROCEEDINGS{9616690,  author={Routray, Swadhin and Ganiga, Raghavendra},  
booktitle={2021 Fourth International Conference on Electrical, Computer and Communication Technologies (ICECCT)},   
title={Secure Storage of Electronic Medical Records(EMR) on Interplanetary File System(IPFS) Using Cloud Storage and Blockchain Ecosystem},   
year={2021},  
volume={},  
number={},  
pages={1-9},  
doi={10.1109/ICECCT52121.2021.9616690}}
```
