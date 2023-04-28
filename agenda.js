const form = document.querySelector('form');
const table = document.querySelector('table tbody');
const nameInput = document.getElementById('inNome');
const phoneInput = document.getElementById('inFone');
const emailInput = document.getElementById('inEmail');
const storage = window.localStorage;
let contatos = [];

// Carregar os contatos do localStorage quando a página for carregada
if (storage.getItem('contato')) {
  contatos = JSON.parse(storage.getItem('contato'));
  popularTabela(contatos);
}

function popularTabela(contatos) {
  // Limpar a tabela
  table.innerHTML = '';

  // Adicionar cada contato na tabela
  contatos.forEach((contato, index) => {
        const row = table.insertRow();
        row.innerHTML = `
        <td>${contato.nome}</td>
        <td>${contato.fone}</td>
        <td>${contato.email}</td>
        <td><button class="excluir" onclick="excluirContato(${index})">Excluir</button></td>
        `;
    });
}

function excluirContato(index) {
    // Remover o contato da lista
    contatos.splice(index, 1);
  
    // Atualizar o localStorage com os contatos atualizados
    storage.setItem('contato', JSON.stringify(contatos));
  
    // Popular a tabela com os contatos atualizados
    popularTabela(contatos);
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const nome = nameInput.value.trim();
  const fone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  // Verificar se o telefone já existe nos contatos
  const telefoneExistente = contatos.find(contato => contato.fone === fone);

  if (telefoneExistente) {
    alert('Telefone já cadastrado');
    return;
  }

  const novoContato = { nome, fone, email };
  contatos.push(novoContato);

  // Atualizar o localStorage com os novos contatos
  storage.setItem('contato', JSON.stringify(contatos));

  // Limpar a tabela e popular com os contatos atualizados
  table.innerHTML = '';
  popularTabela(contatos);

  // Limpar os campos do formulário
  nameInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';

  // Desabilitar o botão de envio do formulário por 1 segundo para evitar cliques repetidos
  const submitButton = form.querySelector('input[type=submit]');
  submitButton.disabled = true;
  setTimeout(() => {
    submitButton.disabled = false;
  }, 1000);
});
