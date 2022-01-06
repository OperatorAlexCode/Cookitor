//Text inputs
const Input = document.getElementById("Input");
const NameInput = document.getElementById("nameinput");
const FileInput = document.getElementById("ghost");

document.getElementById("save").addEventListener("click", Save);
document.getElementById("Load").addEventListener("click", Load);
document.getElementById("Clear").addEventListener("click", Clear);
document.getElementById("delete").addEventListener("click", Delete);
document.getElementById("print").addEventListener("click", download);
document.getElementById("Import").addEventListener("click", Import);

//With the help from Filesaver.js this function downloads a specified text file
function download() {
    if (document.cookie) {
        let temp = document.cookie.split("; ");
        if (temp[0].includes("name=")) {
            let Name = decodeURIComponent(temp[0].slice(5))+".txt";
            let file = new Blob([decodeURIComponent(temp[1].slice(5))],{ type:"text/plain;charset=utf-8"});
            saveAs(file, Name);
        }
        else {
            let Name = decodeURIComponent(temp[0].slice(5))+".txt";
            let file = new Blob([decodeURIComponent(temp[1].slice(5))],{ type:"text/plain;charset=utf-8"});
            saveAs(file, Name);
        }
    }
    else {
        alert("ERROR:Can't Export");
    }
}

//Used to encode the text and save it as a cookie
function Save() {
    if (!NameInput.value) {
        let Prompt = prompt("Give it a name?","unnamed");
        while (Prompt === "" || Prompt == undefined) {
            if (Prompt === null) {
                return;
            }
            Prompt = prompt("Give it a name?","unnamed");
        }
        NameInput.value = Prompt;
    }
    let tempName = encodeURIComponent(NameInput.value);
    let tempBody = encodeURIComponent(Input.value);
    document.cookie = "name="+tempName+"; SameSite=None; path=/";
    document.cookie = "data="+tempBody+"; SameSite=None; path=/";
    alert("Data Saved");
}

//Used to load data, if there is any, from the cookie
function Load() {
    if (document.cookie && confirm("Confirm load") === true) {
        LoadData();
        // window.alert("Data Loaded");
    }
    else {
        alert("ERROR:Can't load data");
    }
}

//Used to load data from the cookies
function LoadData() {
    if (document.cookie) {
        let temp = document.cookie.split("; ");
        if (temp[0].includes("name=")) {
            NameInput.value =  decodeURIComponent(temp[0].slice(5));
            Input.value = decodeURIComponent(temp[1].slice(5));
        }
        else {
            NameInput.value =  decodeURIComponent(temp[1].slice(5));
            Input.value = decodeURIComponent(temp[0].slice(5));
        }
    }
} 

//Used to clear the data by deleting the cookie
function Clear() {
    if (confirm("Confirm Clear") === true) {
        NameInput.value =  "";
        Input.value = "";
        alert("Succesfully Cleared");
    }
}

function Delete() {
    if (confirm("Confirm Delete") === true) {
        document.cookie = "name=; expires=Thu, 20 April 0690 00:00:00 UTC; SameSite=None;path=/";
        document.cookie = "data=; expires=Thu, 20 April 0690 00:00:00 UTC; SameSite=None;path=/";
        alert("Succesfully Deleted Memory");
    }
}

//Used to read a file and display it's contents and name in the editor
function Import() {
    FileInput.click();
    FileInput.onchange = function() {
        const FileData = document.getElementById("ghost").files[0];
        NameInput.value = FileData.name.replace(".txt","");
        let temp = new FileReader;
        temp.readAsText(FileData);
        temp.onload = function() {
            Input.value = temp.result;
        }
    }
}

LoadData();