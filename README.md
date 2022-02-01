## Server

### Running the app

Before running the app, run the command below to ensure you have correct node version

```
nvm use
```

1. To install the packages run

```
yarn
```

2. Copy the environment variables and replace XXX with the correct variables

```
cp .env.example .env
```

3. To start the app in development run

```
yarn run dev
```

4. To start the app in production run

```
yarn run start
```

The app will start on `http://localhost:5000` unless you add another PORT in the env file
