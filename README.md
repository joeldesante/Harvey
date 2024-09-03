<p align="center">
  <img align="center" width="100px" height="100px" src="https://github.com/joeldesante/Harvey/blob/0528b94cdffcab9f1aec0053c5905e2ef22f9688/assets/logo.png" alt="Harvey Development Logo">
</p>
<h1 align="center">Harvey</h1>


Harvey is a community managment Discord bot for the Old Dominion University Computer Science community. 

## ⚠️ Notice to new users ⚠️
The default branch which this repository operates (`dev`) **is not stable**. If you are looking for the current stable build of Harvey please switch to the `master` branch or use the provided Harvey docker image hosted in our repository.

## Join the Harvey Development Server
This server is where all the testing of Harvey's new features is done.

https://discord.gg/PHKxRhkzwX

## Quick Start
To get started with Harvey you first must decide how you intend on hosting him.

### System Requirments
- NodeJS 18+
- NPM

### Docker (Recommended)
**Note:** You will need to install Docker or (if you are on Windows/Mac) [Docker Desktop](https://www.docker.com/products/docker-desktop/) to use this method.

Open your command line and run these commands to get started:
```
docker pull ...
docker run ...
```

### Regular Method
1. **Clone the repository to your computer.**
```
git clone https://github.com/joeldesante/Harvey.git
```

2. **Access the directory and install the dependancies.**
```
cd ./Harvey && npm install
```

3. **Create the configuration file and update it so it is valid.**
```
cat ./.env.example > .env
```
After running the above command, you must open the .env file in a text editor and put your Discord bots token in the `DISCORD_TOKEN` field.

4. **(Optional) Setup the database.**

More details about that to come...

5. **Install npm modules**

```
npm install
```

6. **Start the bot.**
```
npm start
```

----

## Core Project Maintainers (Credits)

Joel DeSante
https://desante.dev

William Faircloth
https://willuhmjs.com/

## Contributors
Scott Abbey
https://github.com/malakhite • https://scottabbey.com/

Tristan F.
https://github.com/LeoDog896
