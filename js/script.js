// МАССИВ С ИКОНКАМИ
function getRandIcon () {
    let arr = ["😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"];
    return arr[Math.floor(Math.random() * arr.length)]
}

// КНОПКА ENTER ОТПРАВЛЯЕТ ФОРМУ
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("go").click();
    }
});

// СНИМАЕМ АКТИВНОСТЬ ЗАДАЧИ ПРИ НАЧАЛЕ НОВОЙ
function deleteActiveTask() {
    tasks.forEach(task => {
        if(task.active) {
            task.active = false;
            return;
        }
    })
}

// ВЫДЕЛЯЕМ АКТИВНЫЕ ЗАДАЧИ
function stylingActiveTask () {
    let activeElem = null;
    const punct = document.querySelectorAll('.task');
    punct.forEach((task, index) => {
        task.addEventListener('click', (event) => {
            if(activeElem != null) {
                activeElem.classList.remove('active');
            }
            task.classList.add('active');
            deleteActiveTask();
            tasks[index].active = true;
            updateLocal();
            activeElem = task;
        })
    })
}

// ПЕРЕМЕННЫЕ

const addTaskBtn = document.getElementById('go');
const descTaskInp = document.getElementById('input');
const todos = document.querySelector('.todos');
const delTask = document.querySelector('#delite');
const updateLocal = () => {localStorage.setItem('tasks', JSON.stringify(tasks));}
const fillHtmlList = () => {
    todos.innerHTML = '';
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            todos.innerHTML += createTemplate(item, index);
        })
    }  
}

// ШАБЛОН ДЛЯ СОЗДАНИЯ ЗАДАЧ
function createTemplate(task, index) {
    let activeClass = '';
    if (task.active == true) {
        activeClass = 'active';
    }
    return `
        <div class="task ${activeClass}">
            <div class="emo"><span class=icon> ${task.icon} </span></div>
            <p>${task.description}</p>
        </div> 
    `;
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

// ОТПРАВЛЯЕМ ФОРМУ ПО КНОПКЕ
addTaskBtn.addEventListener('click', () => {
    if (descTaskInp.value == '' || descTaskInp.value == ' ' || descTaskInp.value == '  ') {return};
    tasks.push(new Task(descTaskInp.value));
    updateLocal();
    fillHtmlList();
    stylingActiveTask ();
    descTaskInp.value = '';
})  

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