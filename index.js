let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('save-btn')
const specBtn = document.getElementById('deletespec-btn')
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href = ${leads[i]} target = _blank>
                ${leads[i]}
            </a>
        </li>
        <div class = 'separator--light'></div>
        `
    }
    ulEl.innerHTML = listItems
}

function deleteSpecific(arr, index) {
    index = index - 1
    arr.splice(index, 1)
    localStorage.setItem("myLeads", JSON.stringify(arr))
    render(arr)
}

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

specBtn.addEventListener('click', () => {
    let toBeDeleted = prompt('ENTER THE NUMBER OF THE LEAD TO BE DELETED')
    toBeDeleted = parseInt(toBeDeleted)
    if (isNaN(Number(toBeDeleted))) {
        alert("Nothing deleted as the user did not specify the number/ didn't enter an integer value!")
    }
    else {
        if (myLeads.length === 0) {
            alert("Please enter some leads first!")
        } else {
            if (toBeDeleted < 0) {
                alert("Sorry! Negative numbers not allowed!")
            } else if (toBeDeleted > myLeads.length) {
                alert("This lead does not EXIST!")
            } else if (toBeDeleted === 0 && myLeads.length !== 0) {
                toBeDeleted = 1
                deleteSpecific(myLeads, toBeDeleted)
            } else {
                deleteSpecific(myLeads, toBeDeleted)
            }
        }
    }
})

inputBtn.addEventListener('click', () => {
    if (inputEl.value !== '') {
        myLeads.push(inputEl.value)
        inputEl.value = ''

        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    } else {
        inputEl.style.cssText = 'border: 2px solid red'
        inputEl.placeholder = 'Required'
        inputEl.addEventListener('focus', () => {
            inputEl.style.cssText = 'border: 2px solid #3CA6A6'
            inputEl.placeholder = ''
        })
    }
})
