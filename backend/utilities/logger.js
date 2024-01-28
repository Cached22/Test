const winston = require('winston');
const path = require('path');

// Logger configuration
const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'error',
            filename: path.join(__dirname, '../logs/error.log'),
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss'
                }),
                winston.format.align(),
                winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
            )
        })
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

module.exports = logger;