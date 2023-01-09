import React, { useCallback, useState } from "react";

function App() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
       // const { data } = this.state;
        console.log(inputs);
        //alert(inputs);
    }


    return (
        <form onSubmit={handleSubmit}>
            <h3>Введите дату сдачи показаний</h3>
            <input
                type="month"
                name="month_date"
                value={inputs.month_date}
                onChange={handleChange}
            />
            <h3>Кухня</h3>
            <label>Холодная вода:
                <input
                    type="text"
                    name="kcw_param"
                    pattern="[0-9]*"
                    value={inputs.kcw_param || ""}
                    maxLength="10"
                    onChange={handleChange}
                />
            </label>
            <label>Горячая вода:
                <input
                    type="text"
                    name="khw_param"
                    pattern="[0-9]*"
                    value={inputs.khw_param || ""}
                    maxLength="10"
                    onChange={handleChange}
                />
            </label>
            <h3>Санузел</h3>
            <label>Холодная вода:
                <input
                    type="text"
                    name="bcw_param"
                    pattern="[0-9]*"
                    value={inputs.bcw_param || ""}
                    maxLength="10"
                    onChange={handleChange}
                />
            </label>
            <label>Горячая вода:
                <input
                    type="text"
                    name="bhw_param"
                    pattern="[0-9]*"
                    value={inputs.bhw_param || ""}
                    maxLength="10"
                    onChange={handleChange}
                />
            </label>

            <h3>
            <input type="submit" />
            </h3>
            

        </form>
    )
}

export { App };