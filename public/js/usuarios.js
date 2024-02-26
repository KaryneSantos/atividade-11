
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


const senhaAdmin = parseInt(prompt('Digite a senha de administração:'));

    fetch(`/usuarios`, {method: 'GET',
    body: JSON.stringify({ senhaAdmin}),
    headers: {
        'Content-Type': 'application/json'
    }}) 
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Senha de administração incorreta.');
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error.message);
    });