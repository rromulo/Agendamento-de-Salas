import sequelize from './database';

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados estabelecida.')
    
    await sequelize.sync({force: process.env.NODE_ENV === 'development'});
    console.log('Tabelas sincronizadas.')
  } catch (error) {
    console.log('Error ao conectar/sincronizar com banco de dados. ', error)
    process.exit(1);
  }
}

export default syncDatabase;