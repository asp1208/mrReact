import { MeterReading } from "../src/meterReading";
import { Date_Value } from "../src/meterReading";
import { LineChart } from "./сhart";
import firebase from "./firebase/firebase.js";
//import data from './aapl.json';

let mrRef = firebase.database().ref("dates");
document.addEventListener('DOMContentLoaded', setup)

function setup() {
    document.getElementById("send_button").onclick = getReading;
    const chart = drawChart();
    document.getElementById("chart").appendChild(chart);
}


function getReading(event) {

    event.preventDefault()
    const kcw_param = document.getElementById("kcw_param").value;
    const kch_param = document.getElementById("khw_param").value;
    const bcw_param = document.getElementById("bcw_param").value;
    const bhw_param = document.getElementById("bhw_param").value;
    const e_param = document.getElementById("e_param").value;
    const date = document.getElementById("year-month").value;

    const mr = new MeterReading(date, kcw_param, kch_param, bcw_param, bhw_param, e_param);

    mrRef.set({
        date: {
            meterReading: mr
        }
    });

}


    let mapKCW = new Array();
    let mapKHW = new Array();
    let mapBCW = new Array();
    let mapBHW = new Array();
    let mapEl = new Array();
    let kcw_tek, khw_tek, bcw_tek, bhw_tek, el_tek = 0;

function drawChart() { 
    mrRef.once('value').then((element) => {
        Object.keys(element.val()).forEach((key) => {

            let value = element.val()[key].kcw - kcw_tek;
            let dv = new Date_Value(element.val()[key].date, value);          
            mapKCW.add(dv);
            kcw_tek = element.val()[key].kcw;

            value = element.val()[key].khw - khw_tek;
            dv = new Date_Value(element.val()[key].date, value);   
            mapKHW.add(dv);
            khw_tek = element.val()[key].khw;

            value = element.val()[key].bcw - bcw_tek;
            dv = new Date_Value(element.val()[key].date, value);   
            mapBCW.add(dv);
            bcw_tek = element.val()[key].bcw;

            value = element.val()[key].bhw - bhw_tek;
            dv = new Date_Value(element.val()[key].date, value);   
            mapBHW.add(dv);
            bhw_tek = element.val()[key].bhw;

            value = element.val()[key].el - el_tek;
            dv = new Date_Value(element.val()[key].date, value);   
            mapEl.add(dv);
            el_tek = element.val()[key].el;

        });
    });

    chart = LineChart(mapKCW, mapKHW, mapBCW, mapBHW, mapEl, {
        x: d => d.date,
        y: d => d.value,
        width: 1000,
        height: 500,
        color: "steelblue"
    })


    return chart;
}
