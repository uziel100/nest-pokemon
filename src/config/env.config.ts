export const EnvConfiguration = () => ({
  mongoDbName: process.env.MONGO_DB_NAME,
  enviroment: process.env.NODE_ENV || 'development',
  mongodb: process.env.MONGODB,
  port: parseInt(process.env.PORT, 10) || 3000,
});
