@echo on

:: Install dependancies on the local system
echo ">> Installing developer dependancies to the local system..."
call npm install --only=dev

:: Copy the .env.sample to the config folder
echo "Checking for existing config."
if exist "%CD%"\config\.env (
    echo "Config already exists... Skipping."
) else (
    echo "No config found."
    echo "Copying configuration from sample..."
    call copy "%CD%"\config\.env.sample "%CD%"\config\.env
)

:: Check to make sure docker is installed
echo "Checking for Docker"
docker >nul 2>&1 && (
    echo ">> Docker found. Running setup..."
    call docker-compose up
) || (
    echo "ERR | Docker is either not installed or can not be executed."
    echo "Try running this script again with administrator rights."

    :: Clean up
    echo "Cleaning Up..."
    call del ./config/.env
    call rd -r ./node_modules

    exit
)