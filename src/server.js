const app = require('./app.js');
const cors = require('cors'); 
app.use(cors()); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
