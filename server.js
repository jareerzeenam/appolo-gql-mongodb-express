const express = require('express');
const dotenv = require('dotenv');

const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

//DB Connection config
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

async function startServer() {
  // Initialize app
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  // /graphql
  apolloServer.applyMiddleware({ app: app });

  //express middleware
  app.use((req, res) => {
    res.send('Hello From Express Apollo Server');
  });

  // Connect to MongoDB
  connectDB();

  app.listen(process.env.PORT, () =>
    console.log(`Server Started at ${process.env.PORT}`)
  );
}
startServer();
