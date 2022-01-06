//Text inputs
const Input = document.getElementById("Input");
const NameInput = document.getElementById("nameinput");
const FileInput = document.getElementById("ghost");

document.getElementById("print").addEventListener("click", download);
document.getElementById("Clear").addEventListener("click", Clear);
document.getElementById("Load").addEventListener("click", Load);
document.getElementById("save").addEventListener("click", Save);
// document.getElementById("check").addEventListener("click", Check);
document.getElementById("Import").addEventListener("click", Import);

//With the help from Filesaver.js this function downloads a specified text file
function download() {
    if (document.cookie) {
        let temp = document.cookie.split("; ");
        let Name = decodeURIComponent(temp[0].slice(5))+".txt";
        let file = new Blob([decodeURIComponent(temp[1].slice(5))],{ type:"text/plain;charset=utf-8"});
        saveAs(file, Name);
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
    document.cookie = "name="+tempName+"; SameSite=None; Secure; path=/";
    document.cookie = "data="+tempBody+"; SameSite=None; Secure; path=/";
    window.alert("Data Saved");
}

//Used to load data, if there is any, from the cookie
function Load() {
    if (document.cookie) {
        LoadData();
        // window.alert("Data Loaded");
    }
    else {
        window.alert("ERROR:Can't load data");
    }
}

//Used to load the data the cookies
function LoadData() {
    if (document.cookie) {
        let temp = document.cookie.split("; ");
        NameInput.value =  decodeURIComponent(temp[0].slice(5));
        Input.value = decodeURIComponent(temp[1].slice(5));
    }
} 

//Used to clear the data by deleting the cookie
function Clear() {
    if (confirm("Clear Data?") === true) {
        document.cookie = "name=; expires=Thu, 20 April 0690 00:00:00 UTC; SameSite=None; Secure;path=/";
        document.cookie = "data=; expires=Thu, 20 April 0690 00:00:00 UTC; SameSite=None; Secure;path=/";
        window.alert("Cleared Data");
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

//Debugging code
// function Check() {
//     console.log(document.cookie);
// }

// Check();
