import React from "react";
import PropTypes from "prop-types";

export default function List({steps, onEvent}) {
    if (steps.length === 0) {
        return null;
    }

    return (
        <>
            {steps.map((item) => 
                <li className="list__item" data-id={item.id} onClick={onEvent}>
                    <p className="item__date">{item.date}</p>
                    <p className="item__distance">{item.distance}</p>
                    <div className="item__controll">
                        <button className="btn btn__edit">✎</button>
                        <button className="btn btn__delete">✘</button>
                    </div>
                </li>
            )}
        </>      
    )
}

List.propTypes = {
    steps: PropTypes.array,
    onEvent: PropTypes.func, 
}