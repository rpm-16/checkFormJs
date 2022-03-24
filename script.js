'use strict';

// Код валидации формы
function validateForm(formObj) {
//получили форму и ее поля
    let form = document.getElementById(formObj.formId);
    let inputs = Array.from(form.querySelectorAll('input'));

    form.addEventListener('submit', (event) =>{
        let formValid = true;
        event.preventDefault();
    //inputs
        inputs.forEach(element => {
            if (checkValid(element)) {
                if(element.classList.contains(formObj.inputErrorClass)) {
                    element.classList.remove(formObj.inputErrorClass);
                }
            } else {
                if(!element.classList.contains(formObj.inputErrorClass)) {
                    element.classList.add(formObj.inputErrorClass);
                }
                formValid = false;
            }
    //form
            if (formValid){
                if(!form.classList.contains(formObj.formValidClass)) {
                    form.classList.add(formObj.formValidClass);
                }
                if(form.classList.contains(formObj.formInvalidClass)) {
                    form.classList.remove(formObj.formInvalidClass);
                }
            } else {
                if(form.classList.contains(formObj.formValidClass)) {
                    form.classList.remove(formObj.formValidClass);
                }
                if(!form.classList.contains(formObj.formInvalidClass)) {
                    form.classList.add(formObj.formInvalidClass);
                }
            }

        })
    });
    
    form.addEventListener('blur', (event) =>{
        if(checkValid(event.target)){
            if(event.target.classList.contains(formObj.inputErrorClass)) { 
                event.target.classList.remove(formObj.inputErrorClass)
            } 
        } else {
            if(!event.target.classList.contains(formObj.inputErrorClass)) { 
                event.target.classList.add(formObj.inputErrorClass)
            } 
        }
    }, true);

    form.addEventListener('focus', (event) =>{
        if(event.target.classList.contains(formObj.inputErrorClass)) { 
            event.target.classList.remove(formObj.inputErrorClass)
        } 
    }, true);

    function checkValid(element){
        if(element.dataset.hasOwnProperty('required') && !element.value){
            return false;
        } else {
            if(element.dataset.hasOwnProperty('validator') && element.value){
                switch(element.dataset.validator){
                    case ('letters'):
                        if(element.value.match(/^[a-zа-яA-ZА-Я]+$/)){
                            return true;
                        }
                        else{
                            return false;
                        }
                    break;
                    case ('regexp'):
                        if(element.value.match(element.dataset.validatorPattern)){
                            return true;
                        }
                        else{
                            return false;
                        }
                    break;
                    case ('number'):
                        if(isNaN(element.value)){
                            return false;
                        }
                        else{
                            if(element.dataset.hasOwnProperty('validatorMin') && parseInt(element.value)<parseInt(element.dataset.validatorMin)
                                || element.dataset.hasOwnProperty('validatorMax') && parseInt(element.value)>parseInt(element.dataset.validatorMax)){
                                    return false;
                            }
                            else{
                                return true;
                            }
                        }
                        break;
                }
            } else {
                return true;
            }
        }
    }
};// end function validateForm