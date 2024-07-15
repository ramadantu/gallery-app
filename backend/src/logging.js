import winston from 'winston';
const { combine, timestamp, json } = winston.format;

const logging = winston.createLogger({
  level: 'debug',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
});

const create = (name) => {
  return logging.child({ module: name });
};

export { create };
