# Logger

A simple logger for all your applications.

Either you are developing a web application or a simple script, you can use this logger to log your messages.

## Installation

```bash
npm install @rharkor/logger
```

## Usage

```typescript
import logger from "@rharkor/logger"

logger.info("This is an info message")
logger.warn("This is a warning message")
logger.error("This is an error message")
```

## Common issues

If you are getting the warning `Logger is not initialized yet. Please call and await logger.init()` it is because you are trying to log a message before the logger is initialized, it usually take less than 1s.

**Please note that the logger initializes itself when you import it.**

### How to fix it

```typescript
import logger from "@rharkor/logger"

async function main() {
  await logger.init()
  logger.info("This is an info message")
  logger.warn("This is a warning message")
  logger.error("This is an error message")
}

main()
```

### Why is this happening?

In order the make the logger work with CommonJS we need to load chalk asynchronously, and that is why the logger is not instantly initialized when you import it.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
