# echo

Simple echo server

## Required

- Docker
- Node.js v10+

## Start application

1. Start application:

   ```
   docker-compose up -d
   ```

   Three ports will be exposed:

   - :6379 for redis instance;
   - :3000 first application instance;
   - :3001 second application instance.

2. Attach console to application:

   ```
   docker exec -it echo-app /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
   ```

   After `pm2 status` you can see this report:
   
   ![pm2_status](https://bl00dhound.s3.amazonaws.com/images/pm2_status.png)

3. Watch logs:

   ```
   pm2 log <id>
   ```

### Or

You can start application in developer mode:

1. Install:

   ```
   npm install
   cp .env.example .env
   ```

2. Start redis:

   ```
   docker run -p 6379:6379 --name redis -d redis
   ```

3. Start server:

   ```
   npm run server
   ```

4. Start time-checker:

   ```
   npm run time-checker
   ```

5. Start tests:

   ```
   npm test
   ```
