
function excluirUsuarios(email) {
    console.log(email);

    fetch(`/deletar`, {method: 'DELETE',
    body: JSON.stringify({ email }),
    headers: {
        'Content-Type': 'application/json'
    }})  
    .then(response => {
        if(response.ok){
            console.log("Usuário excluído com sucesso.");
            window.location.reload();
        } else {
            console.error('Erro ao excluir usuário:');
        }
    })
    .catch(error => {
        console.error('Erro ao excluir usuário:', error);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const senhaAcesso = 'admin123';
    let senha = parseInt(prompt('Digite a senha de acesso:'));

    if(senha !== senhaAcesso){
        console.log('Acesso negado.');
        window.location.href = '/pagina_inicial';
    } else {
        console.log('Acesso permitido.');
        return;
    }
});