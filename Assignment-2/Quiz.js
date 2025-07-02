const button = document.querySelector("#my-button")

button.addEventListener("click", () => 
    {
    const input = document.getElementById("text-input") //input feild created 
    //   the question statement that user added 
    const new_task = input.value
    //the question
    const new_element = document.createElement("p") //create eleemnt by giving tag name
    new_element.innerText = new_task
    //the 4 options appear  
    const new_element1 = document.createElement("input")
    new_element1.placeholder = "Add Option 1"
    // new_element1.createElement("button")
    const new_element2 = document.createElement("input") //create eleemnt by giving tag name
    new_element2.placeholder = "Add Option 2"
    const new_element3 = document.createElement("input") //create eleemnt by giving tag name
    new_element3.placeholder = "Add Option 3"
    const new_element4 = document.createElement("input") //create eleemnt by giving tag name
    new_element4.placeholder = "Add Option 4"
    //now add this  question statement to make a box

    //select which element should the children list be added to 
    new_element.classList.add("task-item")
    //options   
    new_element1.classList.add("task-item")
    new_element2.classList.add("task-item")
    new_element3.classList.add("task-item")
    new_element4.classList.add("task-item")
    //for delete button    
    // Once an option is finalized, its input field is replaced by the finalized text 
    const lists = document.querySelector("#listofoptions")
    lists.appendChild(new_element)
    lists.appendChild(new_element1)
    lists.appendChild(new_element2)
    lists.appendChild(new_element3)
    lists.appendChild(new_element4)

    //Div(option wrapper) ->optionsContainer->
    const del_button = document.getElementById("button")
    del_button.innerText = "+"
    del_button.setAttribute("type", "button")
    for (let i = 0; i < 4; i++)
    {
        //to make it un editable make the input feeds into <p>
        del_button.addEventListener("click", () => 
        {
         const new_text = document.createElement("p")
         new_text.innerText=new_element1.value
         new_text.classList.add("task-item")
    
        })
    }
    input.value = ""

})
