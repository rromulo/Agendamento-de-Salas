import app from './app';
import 'dotenv/config';
import sequelize from "./infra/database/models";

const PORT = process.env.PORT || 3001;


(async () => {
  try {
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
})(); // ← OS PARÊNTESES AQUI SÃO CRÍTICOS