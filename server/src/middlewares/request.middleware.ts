import morgan from "morgan";
import logger from "../config/logger";

// Custom Morgan format
const requestLogger = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {
        stream: {
            write: (message: string) => logger.info(message.trim())
        }
    }
);

export default requestLogger;
