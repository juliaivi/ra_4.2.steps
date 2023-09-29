import React, {useState} from "react";
import Form from "./Form";
import List from "./List";
import { customAlphabet } from 'nanoid';

function checkForm(form) {
 if (form.date === "" || form.distance === "") {
    return false;
 }

 if (!form.date.match(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[.]([0]?[1-9]|[1][0-2])[.]([0-9]{4}|[0-9]{2})$/)) {
    return false;
 }
 return true;
}

export default function Step() {
    const nanoid = customAlphabet('1234567890abcdef', 10);

    const [form, setForms] = useState({ id: '', date: '', distance: '' })
    const [distanceArr, setDistance] = useState([]);


    function handlerOK(e) {
        e.preventDefault();

        if (checkForm(form)) { //проверка на правильное заполнение формы
            const existsDate = distanceArr.findIndex((item) => item.date === form.date); // проверяем есть ли такая дата
            
            if (existsDate !== -1) {
                const copy = [...distanceArr];
                copy[existsDate].distance = Number(copy[existsDate].distance) + Number(form.distance); // сумируем значение если 
                setDistance(copy); // изменяем (отрисовываем новые показатели)
            } else {
                const copy = [...distanceArr, {id: nanoid(), date: form.date, distance: form.distance}];
                copy.sort((a, b) => {
                let num = a.date.split('.');
                let pastDate = (`${num[2]}-${num[1]}-${num[0]}`);
                let num2 = b.date.split('.');
                let currentDate = (`${num2[2]}-${num2[1]}-${num2[0]}`); 
            
                    return pastDate > currentDate ? 1 : -1;
                }) // сортировка по датам

                setDistance(copy); // изменяем (отрисовываем новые показатели)
            } 
            
            setForms({date: '', distance: ''}); // очищаем форму
        } else {
            alert("Ошибка! Вы не правильно указали дату!! Дата должна выглядеть так - 15.05.23");
        }
    }

    function onEvent({target}) {
        if (target.classList.contains('btn__delete')) {
            setDistance((item) => 
                item.filter((el) => el.id !== target.closest('.list__item').dataset.id));
            return;
        }

        if (target.classList.contains('btn__edit')) {
            const edit = distanceArr.findIndex((el) => el.id === target.closest('.list__item').dataset.id);
            setForms({date: distanceArr[edit].date, distance: distanceArr[edit].distance});
        }
    }

    function handlerInput({ target }) {
        console.log(target.dataset.name);
        setForms((items) => {
            if(target.dataset.name === 'date') {
                return {...items, date: target.value};
            }
            if (target.dataset.name === 'distance') {
                return {...items, distance: target.value};
            }
        })
    }

    return (
        <>
            <Form  data={form} handlerInput={handlerInput} handlerOK={handlerOK} />
            <div className="list">
                <p className="list__data">Дата (ДД.ММ.ГГ)</p>
                <p className="list__distance">Пройдено км</p>
                <p className="list__actions">Действия</p>
            </div> 
            <ul className="lists__box">
                <List steps={distanceArr} onEvent={onEvent} />
            </ul>  
            
               
                 
        </>
    )


}

