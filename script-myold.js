'use strict';

// Код валидации формы
function validateForm(formObj) {

    //получили форму и ее поля
    let form = document.getElementById(formObj.formId);
    let inputs = Array.from(form.querySelectorAll('input'));


    //навеси обработчики
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        inputs.forEach(element =>{
            element.classList.remove(formObj.inputErrorClass);
            validate(element);
        })

        if(form.querySelectorAll(formObj.inputErrorClass)) {
            if (!form.classList.contains(formObj.formInvalidClass)){
                form.classList.add(formObj.formInvalidClass);
            }
            if (form.classList.contains(formObj.formValidClass)){
                form.classList.remove(formObj.formValidClass);
            }
            alert(form.querySelectorAll(formObj.inputErrorClass));

        } else {
            if (!form.classList.contains(formObj.formValidClass)){
                form.classList.add(formObj.formValidClass);
            }
            if (form.classList.contains(formObj.formInvalidClass)){
                form.classList.remove(formObj.formInvalidClass);
            }
            alert('нет ошибки');
        
        }

    });


    form.addEventListener('focus', (event) => {
        event.preventDefault();
        event.target.classList.remove(formObj.inputErrorClass);        
    }, true);

    form.addEventListener('blur', (event) => {
        event.preventDefault();
        validate(event.target);        
    }, true);


    // вспомогательные функции  для валидации
    function validate(element) {
        if (element.dataset.hasOwnProperty('required') && !element.value) {

            if (!element.classList.contains(formObj.inputErrorClass)){
                element.classList.add(formObj.inputErrorClass)  
            } 

        } 
        else if (element.value) {
            switch(element.dataset.validator) {

                case ('letters'):
                    if(!element.value.match(/^[a-zа-яA-ZА-Я]+$/)) {

                        if (!element.classList.contains(formObj.inputErrorClass)){
                            element.classList.add(formObj.inputErrorClass)  
                        } 

                    }
                    break;
                case ('regexp'):
                    if (!element.value.match(element.dataset.validatorPattern)) {

                        if (!element.classList.contains(formObj.inputErrorClass)){
                            element.classList.add(formObj.inputErrorClass)  
                        } 
                    }
                    break;
                case ('number'):
                    if(isNaN(element.value)){

                        if (!element.classList.contains(formObj.inputErrorClass)){
                            element.classList.add(formObj.inputErrorClass)  
                        } 

                    } else {
                        if (
                            (element.dataset.hasOwnProperty('validatorMin') && (Number(element.value) < Number(element.dataset.validatorMin))) ||
                            (element.dataset.hasOwnProperty('validatorMax') && (Number(element.value) > Number(element.dataset.validatorMax)))
                            )
                        {
                            if (!element.classList.contains(formObj.inputErrorClass)){
                                element.classList.add(formObj.inputErrorClass)  
                            } 
                        }
                    }
                   break;
            } //end switch
        } // end if
    };//end function validate

};// end function validateForm