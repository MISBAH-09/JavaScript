let todoList = JSON.parse(localStorage.getItem('todoList')) || [
    {
      name: 'make dinner',
      date: '2022-12-12'
    },
    {
      name: 'wash dishes',
      date: '2022-12-11'
    }
  ];
  
  rendertodolist();
  
  function rendertodolist() {
    let todoListHtml = '';
    for (let i = 0; i < todoList.length; i++) {
      const todoobject = todoList[i];
      const name = todoobject.name;
      const date = todoobject.date;
      const html = `
        <div>${name}</div>
        <div>${date}</div>
        <button class="todo-delete-button" onclick="
          todoList.splice(${i}, 1);
          saveAndRender();
        ">Delete</button>`;
      todoListHtml += html;
    }
  
    document.querySelector('.js-todo-list').innerHTML = todoListHtml;
  }
  
  function addtodo() {
    const inputelement = document.querySelector('.js-add-input');
    const name = inputelement.value;
    const date = document.querySelector('.js-todo-date').value;
  
    todoList.push({
      name: name,
      date: date
    });
  
    inputelement.value = '';
    saveAndRender();
  }
  
  function saveAndRender() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    rendertodolist();
  }
  