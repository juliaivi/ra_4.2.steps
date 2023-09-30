import React, {useState} from "react";
import Form from "./Form";
import List from "./List";
import { customAlphabet } from 'nanoid';
import conversionDate from "./conversionDate";

export default function Step() {
    const nanoid = customAlphabet('1234567890abcdef', 10);

    const [form, setForms] = useState({ id: '', date: '', distance: '', edit: 'false'});
    const [distanceArr, setDistance] = useState([]);

    function handlerOK(e) {
        e.preventDefault();
        let copy = [];
        let index;
      
        if (form.date === "" || form.distance === "") {
            alert('Все поля должны быть заполены!');
        } else {
            let num = form.date.split('-');
            form.date = `${num[2]}.${num[1]}.${num[0]}`;
    
            index = distanceArr.findIndex((item) => item.date === form.date); 
    
            if (index !== -1) { // нашли
                copy = [...distanceArr];
                if (copy[index].date !== undefined &&   form.edit === false) {
                    copy[index].distance = Number(copy[index].distance) + Number(form.distance);  
                } else {     
                    copy[index].distance = form.distance;
                }           
            } else { // Нет такого (новый добавляем)
                copy = [...distanceArr, { id: nanoid(), date: form.date, distance: form.distance, edit: 'false' }] // добавляем
                // сортируем
                copy.sort((a, b) => {
                    let pastDate = conversionDate(a.date);
                    let currentDate = conversionDate(b.date);
                    return pastDate > currentDate ? -1 : 1;
                })
            } 
                setDistance(copy); // изменяем (отрисовываем новые показатели)
                setForms({date: '', distance: '', edit: false}); // очищаем форму
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
            let pastDate = conversionDate(distanceArr[edit].date);
            setForms({date: pastDate, distance: distanceArr[edit].distance, edit: 'true' });
        }
    }

    function handlerInput({ target }) {
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

