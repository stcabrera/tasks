let data = [{
    "title": 'xxx',
    "note": 'xxx',
    "importance": 'low',
    "dueDate": 'taskDuedate',
    "dueDateDay": 'day',
    "dueDateMonth": 'months',
    "dueDateYear": 'year',
    "created": 'today',
    "done": false
}]
let retrieved = localStorage.getItem('data');
if (retrieved === null) {
    let jsonData = JSON.stringify(data)
    localStorage.setItem('data', jsonData)
}


let timestamp = new Date().getTime();
console.log(timestamp)