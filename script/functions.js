let taskData;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let taskTitle = document.querySelector('#title');
let taskNote = document.querySelector('#note');
let taskDuedate = document.querySelector('#date');
let taskImportance = document.querySelector('#importance');

function getData() {
    let retrieved = localStorage.getItem('data');
    if (retrieved != null) {
        let xxx = JSON.parse(retrieved);
        taskData = xxx
        console.log(taskData)
        getTemplate();
    }
}
getData();

function clearForm() {
    taskTitle.value = '';
    taskNote.value = '';
    taskDuedate.value = '';
    document.querySelector('#update').style.display = 'none';
    document.querySelector('#save').style.display = 'block';
};

function getTemplate() {
    let storedTemplate = window.localStorage.getItem('Template');
    if (storedTemplate === 'finished') {
        justFinished();
    } else if (storedTemplate === 'pending') {
        justUndone();
    } else if (storedTemplate === 'byFinishDate') {
        FinishDate();
    } else if (storedTemplate === 'byCreatedDate') {
        createdDate();
    } else {
        byImportance();
    }
};

function pushData() {
    // alte tasks auslesen
    let timestamp = new Date().getTime();

    let data;
    let storedTasks = localStorage.getItem('data');
    let xxx = JSON.parse(storedTasks);
    data = xxx;

    // neuer Task pushen
    const importanceValue = document.querySelector('#importance').value;
    let dDate = new Date(taskDuedate.value);
    let day = dDate.getDate();
    let year = dDate.getFullYear();
    let today = new Date().toLocaleDateString('de-DE');
    let xdata = {
        "title": taskTitle.value,
        "note": taskNote.value,
        "importance": (() => {
            if (importanceValue === 'high') { return 3 + ' high' };
            if (importanceValue === 'medium') { return 2 + ' medium' };
            if (importanceValue === 'low') { return 1 + ' low' };
        })(),
        "dueDate": taskDuedate.value,
        "dueDateDay": day,
        "dueDateMonth": months[dDate.getMonth()],
        "dueDateYear": year,
        "created": today,
        "done": false,
        "id": timestamp
    };
    if (storedTasks != null) {
        data.push(xdata)
        let newData = JSON.stringify(data)
        localStorage.setItem('data', newData)
    } else {
        console.log('stored tasks null')
        let newData = JSON.stringify(data)
        localStorage.setItem('data', newData)
    }

    getData()
};

function getDatafromStorage() {

}
/*
function pushData() {
    getDatafromStorage();
 
     const importanceValue = document.querySelector('#importance').value;
     let dDate = new Date(taskDuedate.value);
     let day = dDate.getDate();
     let year = dDate.getFullYear();
     let today = new Date().toLocaleDateString('de-DE');
 
 
     let xdata = {
         "title": taskTitle.value,
         "note": taskNote.value,
         "importance": (() => {
             if (importanceValue === 'high') { return 3 + ' high' };
             if (importanceValue === 'medium') { return 2 + ' medium' };
             if (importanceValue === 'low') { return 1 + ' low' };
         })(),
         "dueDate": taskDuedate.value,
         "dueDateDay": day,
         "dueDateMonth": months[dDate.getMonth()],
         "dueDateYear": year,
         "created": today,
         "done": false
     };
     //let storeData = { data }
     taskData = xdata;
     //console.log(data)
     console.log(taskData)
     localStorage.setItem('data', JSON.stringify(taskData))
 
 
 
     setTimeout(getData, 10)
 };
*/
function deleteTask() {
    if (event.target.classList.contains('delete')) {
        let confirmDelete = confirm('Wollen Sie diesen Task wirklich löschen');
        if (confirmDelete == true) {
            const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
            console.log(itemKey)

            let data;
            let storedTasks = localStorage.getItem('data');
            let xxx = JSON.parse(storedTasks);
            data = xxx;
            console.log(data)

            var filtered = data.filter(task => task.id != itemKey);
            console.log(filtered)
            let newData = JSON.stringify(filtered)
            localStorage.setItem('data', newData)













            setTimeout(getData, 10)
        }
    }
};

function checkTask(event) {
    if (event.target.classList.contains('check')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.dataset.id;
        console.log(itemKey)

        if (event.target.classList.contains('false')) {
            setTimeout(getData, 50)

        } else {
            setTimeout(getData, 50)
        }
    }
};

function editTask(event) {
    if (event.target.classList.contains('edit')) {
        const itemKey = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id
        const fillTitle = event.target.parentElement.parentElement.parentElement.children[0].innerText
        const fillNote = event.target.parentElement.parentElement.parentElement.children[1].innerText
        const fillImportance = event.target.parentElement.parentElement.parentElement.parentElement.classList[2]
        const fillDuedate = event.target.parentElement.parentElement.parentElement.parentElement.dataset.date

        document.querySelector('#modalForm').style.left = '0';
        document.querySelector('#save').style.display = 'none';
        document.querySelector('#update').style.display = 'block';
        document.querySelector('#key').value = itemKey;

        taskImportance.value = fillImportance;
        taskTitle.value = fillTitle;
        taskNote.value = fillNote;
        taskDuedate.value = fillDuedate;
    }
};