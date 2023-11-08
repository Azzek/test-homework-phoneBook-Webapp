let telBook = JSON.parse(localStorage.getItem('telBook'))
if(!telBook){
    telBook =
        [{
            name: 'Jan-Chajęcki',
            telNumber: '673620253'
        },{
            name: 'David-coscos',
            telNumber: '372062264'
        }]
}

let TimeoutId;

document.querySelector('.js-save-button').addEventListener('click', () => {

    const nameInputValue = document.querySelector('.js-nameInput').value

    const telInputvalue = document.querySelector('.js-telInput').value
    
    const telNumbRegrex = /^[1-9]{1}[0-9]{8}$/;

    if(telNumbRegrex.test(telInputvalue && nameInputValue && telInputvalue)){
        telBook.push( {
            name: nameInputValue,
            telNumber: telInputvalue
        })

        document.querySelector('.js-telInput').classList.remove("wrong")

        document.querySelector('.js-nameInput').classList.remove('wrong')

        saveToStorage()

        generateHTML()

    }else {

        document.querySelector('.js-telInput').classList.add("wrong")

        if (TimeoutId) {
            clearTimeout(TimeoutId)
           }
           
           document.querySelector('.wys-okienko-zly-numer').classList.add("wys-okienko-zly-numer-opacity-1")
                    
            TimeoutId = setTimeout(() => {
                
            document.querySelector('.wys-okienko-zly-numer').classList.remove("wys-okienko-zly-numer-opacity-1")
                
            }, '3000')
            
    }
    if (!telInputvalue && !nameInputValue) {

        document.querySelector('.js-nameInput').classList.add('wrong')

        document.querySelector('.js-telInput').classList.add('wrong')

        console.log('lol')
    }   
})




document.querySelector('#clear-list-button').addEventListener('click', () => {
    telBook = []
    saveToStorage()
    generateHTML()
})



function removeFromTheCart(telNumber) {
    let newTelBook = [];
   telBook.forEach((item) => {
    if (item.telNumber !== telNumber) {
        newTelBook.push(item);
    }
   })
   telBook = newTelBook;
   saveToStorage()
}

function generateHTML() {
    let displayHTML = ``;
    telBook.forEach((userData) => {

        displayHTML += `
        <div class="telNumbers js-telNumber-container-${userData.telNumber}">
            <div>${userData.name}</div> 
            <div>${userData.telNumber}</div>
            <button class="delete-button js-delete-button" data-element-number="${userData.telNumber}">Delete</button>
        </div> `
        
        
    })
    document.querySelector('.js-numbers-display-grid').innerHTML = displayHTML;
    lol ()
}

function saveToStorage() {
    localStorage.setItem('telBook', JSON.stringify(telBook));
}


generateHTML()

function lol () {
document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
       
        const telNumber = button.dataset.elementNumber
        console.log(telNumber)
        removeFromTheCart(telNumber)
        document.querySelector(`.js-telNumber-container-${telNumber}`).remove();
    })
}
)

}

