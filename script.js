var createContainer = false;

var boxCount = 0;

var drag_box_id;
let isDragging = false;
let offsetX, offsetY;

var box_1 = false;
var box_2 = false;


const enableCreateBox = () =>{
    createContainer = !createContainer;
}

const connectBox = (boxvalue) =>{
    if(box_1 == false){
        box_1 = boxvalue;
    }else if(box_2 == false && box_1 != false) {
        box_2 = boxvalue;
        connectElements(box_1,box_2);
        box_1 = false;
        box_2 = false;
    }
    console.log(boxvalue);
}

dragButtonSetup = (value) =>{
    drag_box_id = value;
    console.log(value);
}

document.getElementById('container').addEventListener('click', function(event) {
    if(createContainer){
        box = document.createElement('div');
        const textArea = document.createElement('textarea')
        textArea.placeholder = "type something"

        box.className = `box`;
        box.id = `box-${boxCount}`

        const button = document.createElement('button')
        button.textContent = "click me"
        button.id = `box-${boxCount}`
        button.addEventListener('click', function() {
            connectBox(button.id);
        });

        const dragbutton = document.createElement('button')
        dragbutton.textContent = "drag";
        dragbutton.id = `${boxCount}`
        dragbutton.style.cursor = 'grabbing'

        dragbutton.addEventListener('mousedown', function(e) {
            const Box =document.getElementById(`box-${dragbutton.id}`)
            isDragging = true;
            dragButtonSetup(`box-${dragbutton.id}`)
            offsetX = e.clientX - Box.offsetLeft;
            offsetY = e.clientY - Box.offsetTop;
            console.log('mouseDown', Box.id);

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
        
        console.log(`box-${boxCount}`);
        
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
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "2");

    svg.appendChild(line);
}


    
    
        
 

