import winston from "winston";
export const Logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logs/out.log` })
    ],
    exceptionHandlers: [
        new winston.transports.Console({ 
            format: winston.format.combine(
                winston.format.simple()
            )
        }) ,
        new winston.transports.File({ filename: 'logs/exceptions.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' })
    ]
});