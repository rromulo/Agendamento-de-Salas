import app from './app';
import 'dotenv'
import sequelize from "@infra/database/models"

const PORT = process.env.PORT || 3001;

(async () => {
  try {

    await sequelize.sync({alter: true})
    console.log('MODELS SINCRONIZADOS COM BANCO')

    app.listen(PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    })
  } catch (error) {
    
  }
})