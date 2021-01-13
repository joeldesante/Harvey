@echo on

:: Install dependancies on the local system
echo ">> Installing developer dependancies to the local system...\n\n"
call npm install --only=dev

:: Copy the .env.sample to the config folder
echo "Checking for existing config."
if exist ./config/.env (
    echo "No config found."
    echo "Copying configuration from sample...\n\n"
    call copy ./config/.env.sample ./config/.env
) else (
    echo "Config already exists... Skipping.\n\n"
)

:: Check to make sure docker is installed
echo "Checking for Docker\n"
docker >nul 2>&1 && (
    echo ">> Docker found. Running setup...\n\n"
    call docker-compose up
) || (
    echo "ERR | Docker is either not installed or can not be executed.\n"
    echo "Try running this script again with administrator rights.\n\n"

    :: Clean up
    echo "Cleaning Up..."
    call del ./config/.env
    call rd -r ./node_modules

    exit
)