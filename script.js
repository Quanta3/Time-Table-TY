
import {subjects, table, slots} from './temp.js';

//Initializations
const btn1  = document.getElementById("btn1");
const btn2  = document.getElementById("btn2");
const reference = document.querySelector("#reference");
const parent = document.querySelector(".table");
const empty = document.querySelector("#em");
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = weekday[(new Date()).getDay()];
//let day = "Tuesday"
let p = document.querySelectorAll(".period");

let cur_slot_global = find_slots();
console.log(cur_slot_global);
updateAll(cur_slot_global);
p = document.querySelectorAll(".period");



/* ==================================================================================================================================*/
//Left Button Function
btn1.addEventListener("click", ()=>{
    prev_prevBuf(p[1]);
    cur_prev(p[2]);
    next_cur(p[3]);
    nextBuf_next(p[4]);
    append_element();
    cur_slot_global++;
    //console.log(cur_slot_global);
    if(cur_slot_global >= 11){
        console.log("Disabling")
        btn1.disabled = true;
    }
    if(btn2.disabled == true && cur_slot_global >1){
        btn2.disabled = false;
    }
  
})

function prev_prevBuf(element){
    element.style.transform = "rotateY(-60deg) scale(0.6) translateY(10px)";
    element.style.left = "0px";
}

function cur_prev(element){
    element.style.transform = "rotateY(-30deg) scale(0.8) translateY(10px)";
    element.style.left = "460px"
}

function next_cur(element){
    element.style.transform = "rotateY(0deg)";
    element.style.left = "calc(50% - 200px)"
   
     
}

function nextBuf_next(element){
    element.style.transform = "rotateY(30deg) scale(0.8) translateY(10px)";
    element.style.left = "calc(100% - 460px)";
    
}




function append_element(){
    parent.removeChild(p[0]);

    p[4].classList.remove("next1");
    p[4].classList.add("next");

    p[3].classList.remove("next");
    p[3].classList.add("cur");
    
    p[2].classList.remove("cur");
    p[2].classList.add("prev");
    
    p[1].classList.remove("prev");
    p[1].classList.add("prev1");
    
    for(let i = 1; i<5; i++){
        p[i].style.removeProperty("left");
        p[i].style.removeProperty("right");
    }
    
    let referenceClone;
    
    //console.log(cur_slot_global)
    
    referenceClone = update_buff("next");
    parent.appendChild(referenceClone);
    referenceClone.classList.remove("reference");
    referenceClone.classList.remove("prev1");
    referenceClone.classList.add("period");
    referenceClone.classList.add("next1");
    referenceClone.id = "";
    
    
    p = document.querySelectorAll(".period");
    
   
        
    }

/* ==================================================================================================================================*/
//Right Button Function
btn2.addEventListener("click", ()=>{
    

    prevBuf_prev(p[0]),
    prev_cur(p[1]),
    cur_next(p[2]),
    next_nextBuff(p[3])
    prepend_element();
    cur_slot_global--;

    if(cur_slot_global <= 1){
        console.log("Disabling")
        btn2.disabled = true;
    }
    if(btn1.disabled == true && cur_slot_global <11){
        btn1.disabled = false;
    }
  
})

function prevBuf_prev(element){
    element.style.transform = "rotateY(-30deg) scale(0.8) translateY(10px)";
    element.style.left = "460px";
}

function prev_cur(element){
    element.style.transform = "rotateY(0deg)";
    element.style.left = "calc(50% - 200px)";
}

function cur_next(element){
    element.style.transform = "rotateY(30deg) scale(0.8) translateY(10px)";
    element.style.left = "calc(100% - 860px)"; 
}

function next_nextBuff(element){
    element.style.transform = "rotateY(60deg)";
    element.style.left = "calc(100% - 460px)";
    
}


function prepend_element(){
    parent.removeChild(p[4]);
    
    
    
    p[3].classList.remove("next");
    p[3].classList.add("next1");
    
    p[2].classList.remove("cur");
    p[2].classList.add("next");
    
    p[1].classList.remove("prev");
    p[1].classList.add("cur");
    
    p[0].classList.remove("prev1");
    p[0].classList.add("prev");
    
    for(let i = 0; i<4; i++){
        p[i].style.removeProperty("left");
        p[i].style.removeProperty("right");;
    }
    console.log("Here")
    let referenceClone = update_buff("prev");
    console.log("Here Again")
    parent.insertBefore(referenceClone, p[0]);
    referenceClone.classList.remove("reference");
    referenceClone.classList.add("period");
    referenceClone.classList.add("prev1");
    referenceClone.id = "";
    
    
    p = document.querySelectorAll(".period");
        
    }



/* ==================================================================================================================================*/
//Period Slots Finding function

function find_slots(){
    const date = new Date();
    let time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    let [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    if(period == "PM"){
    hours = (parseInt(hours) + 12).toString();
    }
    time=hours+minutes;
    let timeInt=parseInt(time);

    if(timeInt>=1730){
        return Math.floor((timeInt - 1730) / 100) + 12
    }
    else if(timeInt<800){
        return 0 - Math.floor((800 - timeInt)/100)
        
    }
    else{
        if(timeInt < 1000){
            return Math.floor( (timeInt - 800) / 100) + 1;
        }
        else if( (timeInt>=1000 && timeInt < 1015)){
            return 3
        }
        else if((timeInt>=1215 && timeInt <1315)){
            return 6
        }
        else if( (timeInt >= 1515 && timeInt < 1530)){
            return 9
        }
        else if(timeInt >=1015 && timeInt<1215){
            return Math.floor( (timeInt - 1015) / 100) + 4;
        }
        else if(timeInt >=1315 && timeInt<1515){
            return Math.floor( (timeInt - 1315) / 100) + 7;
        }
        else if(timeInt >=1530 && timeInt< 1730){
            return Math.floor( (timeInt - 1530) / 100) + 10;
        }
    }    
}

/* ==================================================================================================================================*/



function update_buff(dis){
    let distance= 0;
    if(dis == "next"){
        distance = 3;
    }
    else{
        distance = -3;
    }
    console.log(cur_slot_global);
    let next_buff_slot = cur_slot_global + distance;
    if(next_buff_slot>11 || next_buff_slot <=0){
        let cloneEmpty = empty.cloneNode(true);
        cloneEmpty.style.display = "block";
        return cloneEmpty;
    }
    else{
        let temp_date = new Date();
        
        let lect_lab_period = table[day][slots[next_buff_slot]];
        console.log(slots[next_buff_slot]);
        if(lect_lab_period[0] === "Break" || lect_lab_period[0] === "Empty"){
            //console.log("Bread")
            let cloneEmpty = empty.cloneNode(true);
            cloneEmpty.style.display = "block";
            return cloneEmpty;
        }

        
        let period = lect_lab_period[0];
        console.log(period);
        console.log(subjects[period]);
        let faculty = subjects[period]["faculty"];
        
        let topic = subjects[period]["topic"];
        let credit = subjects[period]["credit"];
        let syllabus = subjects[period]["syllabus"];

        

        let referenceClone2 = reference.cloneNode(true);
        referenceClone2.childNodes[1].textContent = period;
        referenceClone2.childNodes[3].textContent = faculty;
        referenceClone2.childNodes[6].textContent = slots[next_buff_slot];
        referenceClone2.childNodes[8].textContent = "NONE";
        referenceClone2.childNodes[10].textContent = "Venue : N2 Classroom";
        referenceClone2.childNodes[12].textContent = syllabus;
        //console.log("Bread3")
        return referenceClone2;
    }
    
}

//=========================================================================================================================================
function updateAll(curSlot){
    
    
    let cl = ["prev1","prev", "cur", "next", "next1"]
    for(let i = 0; i<5; i++){
        
        let tempSlotTime = slots[getSlot(curSlot - 2 + i)];
        console.log(day);
        console.log(tempSlotTime);
        console.log(curSlot);
        let period = table[day][tempSlotTime][0];
        console.log(period)

        if(period == "Break" || period == "Empty"){
            let emptyClone = empty.cloneNode(true);
            emptyClone.style.display = "block";
            emptyClone.classList.add("period");
            emptyClone.classList.add(cl[i]);
            parent.replaceChild(emptyClone, p[i]);
            continue;
        }
        let faculty = subjects[period]["faculty"];
        let topic = subjects[period]["topic"];
        let credit = subjects[period]["credit"];
        let syllabus = subjects[period]["syllabus"];
        
        p[i].childNodes[1].textContent=period;
        p[i].childNodes[3].textContent=faculty;
        p[i].childNodes[6].textContent=tempSlotTime;
        p[i].childNodes[8].textContent="NONE";
        p[i].childNodes[10].textContent="Venue : N2 Classroom";
        p[i].childNodes[12].textContent=syllabus;
    }
}


//===================================================================================================================================================

function update_one(element){
   

    let tempSlotTime = slots[curSlot - 2 + i];
        
        let period = table[day][tempSlotTime][0];

        if(period == "Break"){
            let emptyClone = empty.cloneNode(true);
            emptyClone.style.display = "block";
            emptyClone.classList.add("period");
            parent.replaceChild(emptyClone, element);
            return;
        }
        let faculty = subjects[period]["faculty"];
        let topic = subjects[period]["topic"];
        let credit = subjects[period]["credit"];
        let syllabus = subjects[period]["syllabus"];

        element.childNodes[1].textContent=period;
        element.childNodes[3].textContent=faculty;
        element.childNodes[6].textContent=tempSlotTime;
        element.childNodes[8].textContent="NONE";
        element.childNodes[10].textContent="Venue : N2 Classroom";
        element.childNodes[12].textContent=syllabus;
}

//========================================================================================================================================

function getSlot(key) {
    if(parseInt(key)>0 && parseInt(key)<=11){
        return key;
    }
    else{
        return "0"
    }
}