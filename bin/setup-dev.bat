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