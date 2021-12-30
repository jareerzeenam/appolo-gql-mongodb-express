const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const mongoose = require('mongoose');

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
  await mongoose.connect(
    'mongodb+srv://jareer_28:xijRRSO8b1ptx8Re@cluster0.o5nyg.mongodb.net/data?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  console.log('Mongoose Connected');

  app.listen(4000, () => console.log('Server Started at 4000'));
}
startServer();
