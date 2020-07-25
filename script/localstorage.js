let data = [{
    "title": 'xxx',
    "note": 'xxx',
    "importance": 'low',
    "dueDate": 'taskDuedate',
    "dueDateDay": 'day',
    "dueDateMonth": 'months',
    "dueDateYear": 'year',
    "created": 'today',
    "done": false,
    "id": '1111'
}]

let retrieved = localStorage.getItem('data');
if (retrieved === null) {

    let jsonData = JSON.stringify(data)
    localStorage.setItem('data', jsonData)

}