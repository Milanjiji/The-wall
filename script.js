var createContainer = false;

var boxCount = 0;

var drag_box_id;
let isDragging = false;
let offsetX, offsetY;

var box_1 = false;
var box_2 = false;

var phase = 1;
const createBoxButton = document.getElementById("CreateBoxButton");
const bodyAnimate = document.getElementById('body')
const tutor = document.getElementById('tutor');


const enableCreateBox = () =>{
    createContainer = !createContainer;
    if(phase == 1){
        createBoxButton.classList.remove('createBoxAnimate');
        bodyAnimate.classList.add('bodyBackgroundColorAnimate');
        tutor.innerText = "Click anywhere on the page... "
        tutor.style.display = 'flex'
    }else if(phase == 2){
        createBoxButton.classList.remove('createBoxAnimate');
        bodyAnimate.classList.add('bodyBackgroundColorAnimate');
        tutor.style.display = 'flex'
        tutor.innerText = "Click anywhere on the page again ... "
    }
}

const connectBox = (boxvalue) =>{
    if(box_1 == false){
        box_1 = boxvalue;
        const selected_box_1 = document.getElementById(boxvalue);
        const Non_selected_boxes = document.querySelectorAll('.box');
        Non_selected_boxes.forEach(box => {
            box.classList.add('boxAnimate')
        })
        selected_box_1.classList.remove('boxAnimate')
    }else if(box_2 == false && box_1 != false) {
        box_2 = boxvalue;
        connectElements(box_1,box_2);
        box_1 = false;
        box_2 = false;
    }
}

dragButtonSetup = (value) =>{
    drag_box_id = value;
}

document.getElementById('container').addEventListener('click', function(event) {

    if(createContainer){
        bodyAnimate.classList.remove('bodyBackgroundColorAnimate')
        if(phase == 1){
            phase = 2;
            createBoxButton.classList.add('createBoxAnimate');
            tutor.style.display = 'flex'
            tutor.innerText = "Click on the add icon again ..."
        }else if(phase == 2){
            tutor.innerText = "click on the plug icon of two boxes one after another..."
            createBoxButton.classList.remove('createBoxAnimate');
        }

        box = document.createElement('div');
        const textArea = document.createElement('textarea')
        textArea.placeholder = "type something"
        textArea.spellcheck =false

        box.className = `box`;
        
        box.id = `box-${boxCount}`

        const button = document.createElement('button')
        const icon = document.createElement('i')
        icon.className = "fa-solid fa-plug"
        button.appendChild(icon)
        button.id = `box-${boxCount}`
        button.className = "plug_button"
        button.addEventListener('click', function() {
            connectBox(button.id);
        });

        const dragbutton = document.createElement('button')
        dragbutton.className = "dragButton"
        const icon2 = document.createElement('i')
        icon2.className = "fa-solid fa-grip"

        dragbutton.appendChild(icon2)
        dragbutton.id = `${boxCount}`
        dragbutton.style.cursor = 'grabbing'

        dragbutton.addEventListener('mousedown', function(e) {
            const Box =document.getElementById(`box-${dragbutton.id}`)
            isDragging = true;
            dragButtonSetup(`box-${dragbutton.id}`)
            offsetX = e.clientX - Box.offsetLeft;
            offsetY = e.clientY - Box.offsetTop;

            removeLine(`box-${dragbutton.id}`)
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

        });

        const onMouseMove = (e) =>{
            if (isDragging) {
                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;
            
                if (x < 0) x = 0;
                if (y < 0) y = 0;
                const box = document.getElementById(drag_box_id);
                box.style.left = x + 'px';
                box.style.top = y + 'px';
            }
        }

        const onMouseUp = () => {
            isDragging = false;
            box.style.cursor = 'grab';
            offsetX = 0; 
            offsetY = 0;
            drag_box_id = "";
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        
        box.appendChild(button)
        box.appendChild(textArea)
        box.appendChild(dragbutton)
        
        // console.log(`box-${boxCount}`);
        
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        box.style.left = `${x - 25}px`; 
        box.style.top = `${y - 25}px`; 
    
        event.target.appendChild(box);
        createContainer = !createContainer
        boxCount++
    }
});
function removeLine(box_1) {

    const lines = document.querySelectorAll(`#line-${box_1}`);
    const lines2 = document.querySelectorAll(`.line-${box_1}`);

    console.log(lines);
    lines.forEach(line => {
        line.parentNode.removeChild(line);
    });
    lines2.forEach(line => {
        line.parentNode.removeChild(line);
    });
}

function connectElements(box_1, box_2) {
    const box1 = document.getElementById(box_1);
    const box2 = document.getElementById(box_2);
    const svg = document.getElementById("svg");

    const svgNS = "http://www.w3.org/2000/svg"; 

    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
        }
    const offset1 = getOffset(box1);
    const offset2 = getOffset(box2);    

    const x1 = offset1.left + box1.offsetWidth / 2;
    const y1 = offset1.top + box1.offsetHeight / 2;
    const x2 = offset2.left + box2.offsetWidth / 2;
    const y2 = offset2.top + box2.offsetHeight / 2;

    const line = document.createElementNS(svgNS, "line");

    line.setAttribute("id", `line-${box_1}`);
    line.setAttribute("class", `line-${box_2}`);

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "2");

    svg.appendChild(line);
    phase = 3;
    tutor.style.display = 'none'

    const all_boxes = document.querySelectorAll('.box');
    all_boxes.forEach(box => {
        box.classList.remove('boxAnimate')
    })
}

const InfoDisplay = () =>{
    const infoOverlay = document.querySelector('.infoOverlay');
    infoOverlay.style.display = 'flex'
}
const CloseInfoDisplay = () =>{
    const infoOverlay = document.querySelector('.infoOverlay');
    infoOverlay.style.display = 'none'
}

const CopyLink = () =>{
    const alertText = document.querySelector('.linkCopyAlert')
    navigator.clipboard.writeText("https://github.com/Milanjiji/The-wall.git").then(() => {
        alertText.style.opacity = 1
        setTimeout(()=>{
            alertText.style.opacity = 0
        },1000)
    }).catch(err => {
        alert("Failed to copy: ", err);
    });
}