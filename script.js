const modal = document.querySelector('.modalContainer')
const tbody = document.querySelector('tbody')
const idHTML = document.querySelector('#m-id')
const nomeHTML = document.querySelector('#m-nome')
const emailHTML = document.querySelector('#m-email')
const submit = document.querySelector('#submit')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loadEmployee(){
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertEmployee(item, index)
    });
}

loadEmployee()

function insertEmployee(item, index){
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.id}</td>
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td class="acao">
      <button onclick="editEmployee(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteEmployee(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

submit.onclick = e => {
    if (nomeHTML.value == '' || idHTML.value == '' || emailHTML.value == '') {
        return
    }

    e.preventDefault()

    if(id !== undefined){
      itens[id].id = idHTML.value
      itens[id].nome = nomeHTML.value
      itens[id].email = emailHTML.value
    }
    else{
      itens.push({'id': idHTML.value, 'nome': nomeHTML.value, 'email': emailHTML.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadEmployee()
    id = undefined
}

function openModal(edit = false, index = 0){
    modal.classList.add('active')

    modal.onclick = e => {
      if(e.target.className.indexOf('modalContainer') !== -1){
        modal.classList.remove('active')
      }
    }

    if(edit){
      idHTML.value = itens[index].id
      nomeHTML.value = itens[index].nome
      emailHTML.value = itens[index].email

      id = index
    }
    else{
      idHTML.value = ''
      nomeHTML.value = ''
      emailHTML.value = ''
    }
}

function editEmployee(index){
  openModal(true, index)
}

function deleteEmployee(index){
  itens.splice(index, 1)
  setItensBD()
  loadEmployee()
}