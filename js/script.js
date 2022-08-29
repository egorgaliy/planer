// МАССИВ С ИКОНКАМИ
function getRandIcon () {
    let arr = ["😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"];
    return arr[Math.floor(Math.random() * arr.length)]
}

// КНОПКА ENTER ОТПРАВЛЯЕТ ФОРМУ
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("go").click();
    }
});

// ШАБЛОН ДЛЯ СОЗДАНИЯ ЗАДАЧ
function createTemplate(task, index, isNew) {
  let activeClass = '';
  if (task.active == true) {
      activeClass = 'active';
  }
  return `
      <div class="task ${activeClass} ${isNew ? 'invisible' : ''}" draggable='true'>
          <div class="emo"><span class=icon> ${task.icon} </span></div>
          <p>${task.description}</p>
      </div> 
  `;
}

// ВЫДЕЛЯЕМ АКТИВНЫЕ ЗАДАЧИ
function stylingActiveTask () {
    const punct = document.querySelectorAll('.task');
    punct.forEach((task, index) => {
        task.addEventListener('click', (event) => {
          let activeElem = null;
          punct.forEach((elem) => {
            if (elem.classList.contains('active')){
              elem.classList.remove('active');
            }
          })
            task.classList.add('active');
            deleteActiveTask();
            tasks[index].active = true;
            activeElem = task;
            updateLocal();
        })
    })
}

// СНИМАЕМ АКТИВНОСТЬ ЗАДАЧИ ПРИ НАЧАЛЕ НОВОЙ
function deleteActiveTask() {
  tasks.forEach(task => {
      if(task.active) {
          task.active = false;
          return;
      }
  })
}

// ПЕРЕМЕННЫЕ

const addTaskBtn = document.getElementById('go');
const descTaskInp = document.getElementById('input');
const todos = document.querySelector('.todos');
const todosDel = document.querySelector('.todos.delite');
const delTask = document.querySelector('#delite');
const updateLocal = () => {localStorage.setItem('tasks', JSON.stringify(tasks));}
const fillHtmlList = () => {
    todos.innerHTML = '';
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            
            if (index == tasks.length - 1){
              todos.innerHTML += createTemplate(item, index, true);
            }
            else{
              if(item.complited){
                todosDel.innerHTML += createTemplate(item, index, false);
              }
              else{
                todos.innerHTML += createTemplate(item, index, false);
              }
            }
        })
    }  
}



// ПРОВЕРЯЕМ ХРАНИЛИЩЕ
let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

// ДОБАВЛЯЕМ ЗАДАЧУ
function Task(description) {
    this.description = description;
    this.complited = false;
    this.active = false;
    this.icon = getRandIcon ();
}

fillHtmlList();

// АНИМАЦИЯ ПОЯВЛЕНИЯ
function openInvisible(place){
  setTimeout(() => {
    place.querySelector('.task.invisible').classList.remove('invisible');
  }, 10)
}

// ОТПРАВЛЯЕМ ФОРМУ ПО КНОПКЕ
addTaskBtn.addEventListener('click', () => {
    if (descTaskInp.value == '' || descTaskInp.value == ' ' || descTaskInp.value == '  ') {return};
    tasks.push(new Task(descTaskInp.value));
    updateLocal();
    fillHtmlList();
    stylingActiveTask ();
    descTaskInp.value = '';
    openInvisible(todos);
})  

openInvisible(todos);
openInvisible(todosDel);

// ЧИСТИМ СПИСОК ПО КНОКПКЕ
delTask.addEventListener('click', () => {
    tasks = [];
    updateLocal();
    fillHtmlList();
    })  

stylingActiveTask ();








//объявляем переменные
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1,
    m = 1,
    tm = 1,
    s = 0,
    ts = 0,
    ms = 0,
    init = 0;

//функция для очистки поля
function ClearСlock() {
    clearTimeout(clocktimer);
    h = 1;
    m = 1;
    tm = 1;
    s = 0;
    ts = 0;
    ms = 0;
    init = 0;
    readout = '00:00:00';
    document.querySelector('#stopwatch').value = readout;
}

//функция для старта секундомера
function StartTIME() {
    var cdateObj = new Date();
         var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
    if (t > 999) {
    s++;
    }
          if (s >= (m * base)) {
    ts = 0;
    m++;
    } else {
    ts = parseInt((ms / 100) + s);
    if (ts >= base) {
      ts = ts - ((m - 1) * base);
    }
    }
  if (m > (h * base)) {
    tm = 1;
    h++;
    } else {
    tm = parseInt((ms / 100) + m);
    if (tm >= base) {
      tm = tm - ((h - 1) * base);
    }
    }
    ms = Math.round(t / 10);
    if (ms > 99) {
    ms = 0;
    }
    if (ms == 0) {
    ms = '00';
    }
    if (ms > 0 && ms <= 9) {
    ms = '0' + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = '0' + ts;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = '0' + dm;
    }
  } else {
    dm = '00';
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = '0' + dh;
    }
  } else {
    dh = '00';
  }
  readout = dh + ':' + dm + ':' + ds;
  document.querySelector('#stopwatch').value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}

//Функция запуска и остановки
function StartStop() {
    if (init == 0) {
        ClearСlock();
        dateObj = new Date();
        StartTIME();
        init = 1;
    } else {
        clearTimeout(clocktimer);
        init = 0;
    }
}

//DRAG N DROP 
const list_items = document.querySelectorAll('.task');
const lists = document.querySelectorAll('.todos');

let draggedItem=null;

for (let i = 0; i<list_items.length; i++) {
  const item = list_items[i];

  item.addEventListener('dragstart', function () {
    draggedItem = item;
    setTimeout(function(){
      item.style.display = 'none';
    },0);
  });
  
  item.addEventListener('dragend', function () {
    setTimeout(function(){
      draggedItem.style.display='block';
      draggedItem=null;
    },0);
  });
  
  for (let j=0; j<lists.length; j++) {
    const list = lists[j];

    list.addEventListener('dragover', function (e){
      e.preventDefault();
    });
    list.addEventListener('dragenter',function(e){
      e.preventDefault();
    //this.style.backgroundColor = 'rgba(0,0,0,0.2)';
    });
    list.addEventListener('dragleave',function(e){
    //this.style.backgroundColor = 'rgba(0,0,0,0.1)';
    });
    list.addEventListener('drop',function(e){
      draggedItem.classList.add('invisible');
      console.log(draggedItem);
      this.append(draggedItem); 
      let name = e.target.querySelector('p').innerText;
      

      tasks.forEach(task => {
        if(task.description == name){
          if(list.classList.contains('delite')){
            task.complited = true;
          }
          else{
            task.complited = false;
          }

        }
      })
      updateLocal();
      openInvisible(list);
    //this.style.backgroundColor = 'rgba(0,0,0,0.1)';
    });
  }
}

