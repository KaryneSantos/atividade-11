const express = require("express");
const app = express();

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const port = 8000;

const adminSenha = 'admin123';

let usuarios = [];
let alertaCadastro = '';
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const crypto = require('crypto');

app.set('view engine', 'ejs');

app.post('/cadastro', (req, res) => {
        const { nome, email, senha, conf_senha } = req.body;

try {

    if(senha !== conf_senha) {
        console.log(`Senha: ${senha}, Confirmação de senha: ${conf_senha}`)
        res.render('cadastro', {alertaCadastro: 'As senhas não coincidem.'});
        throw new Error('As senhas não coincidem.');
    }

    const usuarioExiste = usuarios.find(usuario => usuario.email === email);

    if(usuarioExiste) {
        console.log('Email já cadastrado.');
        res.render('cadastro', {alertaCadastro: 'Email já cadastrado'});
        return;
    }

    if(nome ===  '' || email === '' || senha === ''){
        console.log('Campos obrigatório! Tente novamente.');
        res.render('cadastro', {alertaCadastro: 'Campos obrigatório! Tente novamente'});
        return;
    } else {
    const senhaCripto =  crypto.createHash('md5').update(senha).digest('hex');;
    const novoUsuario = {nome, email, senha: senhaCripto};
    usuarios.push(novoUsuario);
    console.log('Cadastro feito com sucesso.');
    res.render('login');
    }
    
} catch (error) {
    console.error('Error no cadastro:', error);
    res.render('cadastro', {alertaCadastro: 'Error no cadastro, tente novamente.'});
}

    console.log(usuarios);
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const senhaCripto = crypto.createHash('md5').update(senha).digest('hex');
    console.log(senhaCripto);
    try {
        if(email === '' || senha === ''){
            res.render('login', {alertaLogin: 'Campos obrigátorios! Tente novamente.'});
        }

        const usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senhaCripto);

        if (!usuario) {
            res.render('login', {alertaLogin: 'Email ou senha incorreta'});
        } else {
            res.render('pagina_inicial', {alertaLogin: 'Login realizado com sucesso.'})
            return;
        }


        res.render('pagina_inicial');
    } catch(error){
        console.error('Error no login:', error);
        res.render('login', {alertaLogin: 'Error no login, tente novamente.'});
    }
});

app.delete('/deletar', (req, res) => {
    const { email } = req.body;
    console.log(email);

    const index = usuarios.findIndex(usuario => usuario.email === email);
    
    if (index === -1) {
        console.log('Usuário não existe.');
        res.status(404).send('Usuário não encontrado');
    } else {
        usuarios.splice(index, 1);
        console.log('Usuário deletado com sucesso.');
        res.status(200).send('Usuário excluído com sucesso');
    }
});

app.get('/usuarios', (req, res) => {
    const {senha} = req.body;

    if(senha === adminSenha){
        res.render('usuarios', {usuarios});
    } else {
        res.status(401).send("Senha de administração incorreta");
    }
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro', { alertaCadastro });
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/usuarios', (req, res) => {
    res.render('usuarios', {usuarios});
});

app.get('/pagina_inicial', (req, res) => {
    res.render('pagina_inicial');
});

app.listen(port);

// console.log('Sistema iniciado!');

module.exports = app;