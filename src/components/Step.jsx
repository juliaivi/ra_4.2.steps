import React, {useState, useRef} from "react";
import Form from "./Form";
import List from "./List";
import { customAlphabet } from 'nanoid';

export default function Step() {
    const nanoid = customAlphabet('1234567890abcdef', 10);

    const [form, setForms] = useState({ id: '', date: '', distance: '',  edit: false})
    const [distanceArr, setDistance] = useState([]);
    let editElem = false;
    // let elDate = null;
    // let elRef = useRef();

    function handlerOK(e) {
        e.preventDefault();
        let copy = [];
        let index;
      
        if (form.date === "" || form.distance === "") {
            return false;
        }
        let num = form.date.split('-');
        form.date = `${num[2]}.${num[1]}.${num[0]}`;

        index = distanceArr.findIndex((item) => item.date === form.date); 
    

        if (index !== -1) { // нашли
            copy = [...distanceArr];
            console.log(2)
            if (!editElem && copy[index].date !== undefined) {
                copy[index].distance = Number(copy[index].distance) + Number(form.distance);  
            } else {
                editElem = false;
                copy[index].distance = form.distance;
                // copy[index].date = elDate;
            }
            
        } else { // Нет такого (новый добавляем)
            console.log(3)
            copy = [...distanceArr, { id: nanoid(), date: form.date, distance: form.distance }] // добавляем
            // сортируем
            copy.sort((a, b) => {
                let num = a.date.split('.');
                let pastDate = (`${num[2]}-${num[1]}-${num[0]}`);
                let num2 = b.date.split('.');
                let currentDate = (`${num2[2]}-${num2[1]}-${num2[0]}`); 
            
                return pastDate > currentDate ? -1 : 1;
            })

         
        } 
            setDistance(copy); // изменяем (отрисовываем новые показатели)
            setForms({date: '', distance: ''}); // очищаем форму
    }

    function onEvent({target}) {
        if (target.classList.contains('btn__delete')) {
            setDistance((item) => 
                item.filter((el) => el.id !== target.closest('.list__item').dataset.id));
            return;
        }

        if (target.classList.contains('btn__edit')) {
            const edit = distanceArr.findIndex((el) => el.id === target.closest('.list__item').dataset.id);
            editElem = true;
            // elDate = distanceArr[edit].date;
            setForms({date: distanceArr[edit].date, distance: distanceArr[edit].distance})
            // setForms({date: elRef.distanceArr[edit].date, distance: distanceArr[edit].distance});
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

