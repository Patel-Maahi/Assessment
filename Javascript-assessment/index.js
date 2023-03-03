 let saveData = document.getElementById("saveBtn");
 saveData.addEventListener("click", (e)=>{
    e.preventDefault()
    validateData()
    getData()
 }  
  )
 function validateData(){
 let name = document.getElementById("name").value;
 let nameRegex = /^[a-zA-Z0-9]{3,25}$/;
 if (name == "") {
    document.getElementById("nameErr").innerHTML ="Please enter the name";
    let inputColor = document.getElementById("name");
    inputColor.style.border = "1px solid red"
 }
 else if (name.trim().match(nameRegex)){
    document.getElementById("nameErr").innerHTML = "";
    let inputColor = document.getElementById("name");
    inputColor.style = "none"
 }
 else{
    document.getElementById("nameErr").innerHTML = "Length should be min 3 and max 25 characters";
    let inputColor = document.getElementById("name");
    inputColor.style.border = "1px solid red"
 }
let description = document.getElementById("description").value;
let descripRegex = /^([a-zA-Z0-9$&+,:;=?@#|'<>.-^*()%!\s]){3,150}$/;
if(description == ""){
    document.getElementById("descripErr").innerHTML ="Please enter the description";
    let inputColor = document.getElementById("description");
    inputColor.style.border = "1px solid red"
}
else if(description.trim().match(descripRegex)){
    document.getElementById("descripErr").innerHTML = "";
    let inputColor = document.getElementById("description");
    inputColor.style = "none"
}
else{
    document.getElementById("descripErr").innerHTML = "Length should be min 3 and max 150 characters";
    let inputColor = document.getElementById("description");
    inputColor.style.border = "1px solid red"
}
let status = document.getElementById("status").value;
if(status=="status"){
    document.getElementById("statusErr").innerHTML ="This Field is Required.";
    let inputColor = document.getElementById("status");
    inputColor.style.border = "1px solid red"
}
else{
    document.getElementById("statusErr").innerHTML = "";
    let inputColor = document.getElementById("status");
    inputColor.style = "none"
}
let rate = document.getElementById("rate").value;

if(rate==""){
    document.getElementById("rateErr").innerHTML ="This Field is Required.";
    let inputColor = document.getElementById("rate");
    inputColor.style.border = "1px solid red"
}
else{
    document.getElementById("rateErr").innerHTML = "";
    let inputColor = document.getElementById("rate");
    inputColor.style = "none"
}

let balance = document.getElementById("balance").value;
let balanceRegex = /^[0-9$\-]$/
if(balance==""){
    document.getElementById("balanceErr").innerHTML ="This Field is Required.";
    let inputColor = document.getElementById("balance");
    inputColor.style.border = "1px solid red"
}
else if(balance.trim().match()){
    document.getElementById("balanceErr").innerHTML = "";
    let inputColor = document.getElementById("balance");
    inputColor.style = "none"
}
else{
    document.getElementById("balanceErr").innerHTML ="Enter valid balance.";
    let inputColor = document.getElementById("balance");
    inputColor.style.border = "1px solid red"
}
let deposit = document.getElementById("deposit").value;

if(deposit==""){
    document.getElementById("depositErr").innerHTML ="This Field is Required.";
    let inputColor = document.getElementById("deposit");
    inputColor.style.border = "1px solid red"
}
else{
    document.getElementById("depositErr").innerHTML = "";
    let inputColor = document.getElementById("deposit");
    inputColor.style = "none"
}

//posting data in json file
if(nameErr.innerHTML==""&& descripErr.innerHTML=="" && statusErr.innerHTML==""&& rateErr.innerHTML=="" && balanceErr.innerHTML==""&& depositErr.innerHTML==""){
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let status = document.getElementById("status").value;
    let rate = document.getElementById("rate").value;
    let balance = document.getElementById("balance").value;
    let deposit = document.getElementById("deposit").value;

    fetch(" http://localhost:3000/form",{
        method:"POST",
        headers : {"Content-Type": "application/json"},
        body:JSON.stringify({name,description,status,rate,balance,deposit})
    }).then(response=>response.json()).then(data=>console.log(data))

}
 }
 //get data function
 function getData(e) {
    e.preventDefault()
    fetch("http://localhost:3000/form").then(response=>response.json()).then(data=>console.log(data))
 }
 //Form reset function
 let cancel = document.getElementById("cancelBtn");
 cancel.addEventListener("click", (e)=>{
   e.preventDefault()
   document.getElementById("form").reset();
 }
 );
//creating table
let table = document.createElement("table");
table.classList.add("table-main");


let headers  = {"id":"#","name":"NAME","description":"DESCRIPTION","status":"STATUS","rate":"RATE","balance":"BALANCE","deposit":"DEPOSIT"}
function thead(tble,data) {
    let thead = tble.createTHead("thead");
    let tr = thead.insertRow("tr");
    for (const key in data) {
        let th = document.createElement("th");
        let text = document.createTextNode(data[key])
        th.appendChild(text)
        tr.appendChild(th)
    }
    let th = document.createElement("th");
    let text = document.createTextNode("ACTION");
    th.appendChild(text);
    tr.appendChild(th)
}
thead(table,headers)
console.log(table);

let tableData = fetch("http://localhost:3000/form").then(response=>response.json()).then(data=>{

let tbody = table.createTBody("tbody");
for (const element of data) {
    let tr = document.createElement("tr");
    tbody.appendChild(tr)
    tr.classList.add("table-row")
    for (const key in headers) {
        let td = document.createElement("td");
        let text = document.createTextNode(element[key])
        td.appendChild(text)
        tr.appendChild(td) 
        td.classList.add("tbody-data");
        

    }
    let td1 = document.createElement("td");
    td1.classList.add("tbody-data");
    let delBtn = document.createElement("button");
    let text = document.createTextNode("Delete");
    delBtn.appendChild(text);
    td1.appendChild(delBtn);
    delBtn.classList.add("delete-btn");
    
    delBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        fetch(`http://localhost:3000/form/${element.id}`, {
            method: "DELETE",
          }) 
            .then((response) => response.json())
            .then((data) => console.log(data));
    })
    let editBtn = document.createElement("button");
    let text1 = document.createTextNode("Edit");
    editBtn.appendChild(text1);
    td1.appendChild(editBtn);
    tr.appendChild(td1);
    editBtn.classList.add("edit-btn");
    
    editBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        
    document.getElementById("name").value=element.name;
    document.getElementById("description").value=element.description;
    document.getElementById("status").value=element.status;
    document.getElementById("rate").value=element.rate;
    document.getElementById("balance").value = element.balance;
    document.getElementById("deposit").value= element.deposit;

     let updateData = document.querySelector("#updateBtn");
         updateData.addEventListener("click",(e)=>{
            e.preventDefault();
            fetch(`http://localhost:3000/form/${element.id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                             name:document.getElementById("name").value,
                 description:document.getElementById("description").value,
                  status:document.getElementById("status").value,
                  rate:document.getElementById("rate").value,
                  balance:document.getElementById("balance").value,
                  deposit:document.getElementById("deposit").value
                          }),
                        })
                          .then((response) => response.json())
                          .then((data) => console.log(data));
         })
    }
    )
}

})
let body = document.querySelector("body")
body.appendChild(table)





