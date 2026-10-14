console.log("hello js");


//all get request 
let xhr = new XMLHttpRequest();
xhr.open("GET","http://localhost:3000/api/todos");
xhr.send();
xhr.onload = (res) => {
    console.log(res);
}

//all get request
fetch("http://localhost:3000/api/todos")
.then(res => res.json())
.then(data => console.log(data.data))

//single get
// fetch("http://localhost:3000/api/todos/1")
// .then(res => res.json())
// .then(data => console.log(data))