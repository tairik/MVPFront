/*
  --------------------------------------------------------------------------------------
  Função para chamar a API e retonar a lista de cães.
  --------------------------------------------------------------------------------------
*/
const getListofDogs = async () => {
  let url = 'http://127.0.0.1:5000/dogs';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.dogs.forEach(item => insertListOfDogs(item.id, item.nome, item.peso, item.nem))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para chamar a API e retonar a lista de gatos.
  --------------------------------------------------------------------------------------
*/
const getListofCats = async () => {
  let url = 'http://127.0.0.1:5000/cats';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.cats.forEach(item => insertListOfCats(item.id, item.nome, item.peso, item.nem))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados com a lista de cãoes.
  --------------------------------------------------------------------------------------
*/
getListofDogs();
/*
  --------------------------------------------------------------------------------------
  Função genérica para colocar um pet no servidor via requisição POST. Type pode ser: dog ou cat
  --------------------------------------------------------------------------------------
*/
const postPet = async (inputDog, peso, type) => {
  const formData = new FormData();
  formData.append('nome', inputDog);
  formData.append('peso', peso);

  let url = 'http://127.0.0.1:5000/' + type;
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) =>  {
      // Tratamento específico para duplicidade no banco. Normalmente, esses tratamentos de erros são mais genéricos. Mas para o MVP, está ok.
      if (response.status == 409) {
        alert("Já existe um Pet com esse nome no banco de dados.");
      } else {
        if (type == 'dog') {
          removeAllLinesOfTable('myDogs');
          getListofDogs();
        } else if (type == 'cat') {
          removeAllLinesOfTable('myCats');
          getListofCats();
        }
        alert("Pet adicionado!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função genérica para criar um botão de deleção para ser usado na tabela.
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um pet da lista.
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const itemId = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja deletar esse Pet?")) {
        div.remove()
        deleteItem(itemId)
        alert("O Pet foi removido com sucesso!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função genérica para deletar um Pet da lista do servidor via requisição DELETE.
  --------------------------------------------------------------------------------------
*/
const deleteItem = (itemId) => {
  let inputType = document.getElementById("newType").value.toLowerCase();
  console.log(itemId)
  let url = 'http://127.0.0.1:5000/'+ inputType +'?id=' + itemId;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo pet com nome e peso.
  --------------------------------------------------------------------------------------
*/
const newPet= () => {
  let inputPet = document.getElementById("newPet").value;
  let inputPeso = document.getElementById("newPeso").value;
  let inputType = document.getElementById("newType").value.toLowerCase();

  if (inputPet === '') {
    alert("Escreva o nome do Pet!");
  } else if (isNaN(inputPeso)) {
    alert("O campo Peso precisa ser números!");
  } else {
    postPet(inputPet, inputPeso, inputType, inputType);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo cão à tabela.
  --------------------------------------------------------------------------------------
*/
const insertListOfDogs = (id, namePet, peso, nem) => {
  var item = [id, namePet, 'Dog', peso, nem]
  var table = document.getElementById('myDogs');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newPet").value = "";
  document.getElementById("newType").value = "Dog";
  document.getElementById("newPeso").value = "";

  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo gato à tabela.
  --------------------------------------------------------------------------------------
*/
const insertListOfCats = (id, namePet, peso, nem) => {
  var item = [id, namePet, 'Cat', peso, nem]
  var table = document.getElementById('myCats');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newPet").value = "";
  document.getElementById("newType").value = "Cat";
  document.getElementById("newPeso").value = "";

  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para mudar a exibição da tabela de pets. Pode exibir Cão/Gato.
  --------------------------------------------------------------------------------------
*/
const changePetType = () => {
  var petType = document.getElementById('newType').value;
  if (petType == 'Cat') {
    document.getElementById("sectionDogs").style.display = "none";
    document.getElementById("sectionCats").style.display = "";
    removeAllLinesOfTable('myCats');
    getListofCats();
  } else if (petType == 'Dog') {
    document.getElementById("sectionDogs").style.display = "";
    document.getElementById("sectionCats").style.display = "none";
    removeAllLinesOfTable('myDogs');
    getListofDogs();
  }
}

/*
  --------------------------------------------------------------------------------------
  Função genérica para remover todas as linhas das tabelas exceto a primeira.
  --------------------------------------------------------------------------------------
*/
const removeAllLinesOfTable = (tableName) => {
  var tableHeaderRowCount = 1;
  var table = document.getElementById(tableName);
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
  }
}