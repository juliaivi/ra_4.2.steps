import React from "react";
import PropTipse from 'prop-types';

export default function Form({data, handlerInput, handlerOK}) {
    return (
        <form className="form">
            <div className="form__date">
                <label className="form__lable" htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                <input className="form__date__input" onChange={handlerInput} value={data.date}  id="date" type="text"  data-name='date' required />
            </div>
            <div className="form__distance">
                <label className="form__lable" htmlFor="distance">Пройдено км</label>
                <input className="form__distance__input" onChange={handlerInput} value={data.distance} type="number" data-name='distance' required />
            </div>
            <button className="btn__ok" onClick={handlerOK}>OK</button>
        </form>
    )
}

Form.propTipse = {
    data: PropTipse.object,
    handlerInput: PropTipse.func,
    handlerOK: PropTipse.func,
}