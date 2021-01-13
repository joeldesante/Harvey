# Harvey
A Discord server managment utility.

More information:
https://harvey.yooogle.co


## Contribution Instructions and Guidelines

So, you are intrested in contributing to the Harvey Discord bot?

If you are new to programming or are unfamiliar with the tooling/languages we use in this project, here are a couple things you may need to learn before you get started:
- Javascript/Typescript and NodeJS
- Discord.JS Library
- Docker (Just the basics)

### Getting Started (Development)
_Note: Click here if you are looking for the production installation guide_


#### Installing Docker
First, make sure you have Docker installed on your system. If you are on a Linux system you can install the regular version of Docker, otherwise you may need to install Docker Desktop.

https://www.docker.com/products/docker-desktop

Once you have installed Docker Desktop you can move to the next steps.

---

**Note:** If Docker displays an error (on Windows) that says:

> Hardware assisted virtualization and data execution protection must be enabled in the BIOS. See https://docs.docker.com/docker-for-windows/troubleshoot/#virtualization

This means that your computer is not currently configured to run virtual machienes. You will need to reboot your computer and enable virtulization settings in your BIOS. Follow the above link for a guide on how to do that.

### Setup Development Enviorment
Harvey uses Docker as it's universal development enviorment. This way everyone who works on the project is using the same system.

To finish setting up the development enviorment, just run the following commands:

```bash
$ docker-compose up
```

This will generate a new Harvey image on your system with MongoDB.


---

## Reqs

Role based channel selection.
- ADMIN COMMANDS
    - ;harv role create
        - Creates a join-able role which will act as a notification subset and will reveal hidden channels
    - ;harv role [role] link [channel]
        - Links a given channel to the given role making the channle visable to the members of a given role
    - ;harv role [role] open [true|false]
        - Sets whether a role is open to join/leave (roles are closed by default to prevent premature joins)
    - ;harv role setjoinchannel [channel]
        - Sets the channel which will be used to display all the available roles
- COMMANDS
    - ;role join [name]
        - Adds the sender to a harvey role if open or if the sender is an admin.
    - ;role leave [name]
        - Removes the sender from a role if open or admin.
- FEATURES
    - Click emoji to join/leave role.
