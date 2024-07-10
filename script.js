const conteudoTabela = document.getElementById("conteudo");

document.getElementById("produtoForm").addEventListener("submit", (ev) => {
  ev.preventDefault();

  const id = document.getElementById("ident").value;
  const nomeProduto = document.getElementById("nome").value;
  const precoProduto = document.getElementById("preco").value;
  const quantidadeProduto = document.getElementById("quantidade").value;

  const produto = {
    id: parseInt(id),
    nome: nomeProduto,
    preco: parseInt(precoProduto),
    quantidade: parseInt(quantidadeProduto),
  };

  fetch(`http://localhost:9090/produtos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(produto),
  })
    .then((response) => response.json())
    .then((dados) => {
      alert("Produto Cadastrado com sucesso");
      location.reload()
    })
    .catch(error => {
        console.log("Erro ao realizar o metodo post", error)
    })
});

const deletarProduto = (id) =>{
    fetch(`http://localhost:9090/produtos/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then( dados => {
        alert('Produto deletado com sucesso');
        console.log(dados);
    })
    .catch(error =>{
        console.log( 'Erro ao deletar', error)
    })
}

const buscarDados = () => {
  fetch(`http://localhost:9090/produtos`)
    .then((resonse) => resonse.json())
    .then((dados) => {
      dados.map((item) => {
        conteudoTabela.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.nome}</td>
                    <td>${item.preco}</td>
                    <td>${item.quantidade}</td>
                    <td>
                        <button type="button" class="btn btn-warning">Editar</button>
                        <button type="button" class="btn btn-danger" onclick="deletarProduto(${item.id})">Excluir</button>
                    </td>
                </tr>
                `;
      });
    });
};

buscarDados();
