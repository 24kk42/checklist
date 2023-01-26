$(document).ready(function() {
    const inputDiv = document.createElement("div");

    inputDiv.classList.add("input-container");
    const initialConfig = () => {
        const checklistElements = localStorage.getItem("checklistElements");
        if (!checklistElements) {
            localStorage.setItem("checklistElements", JSON.stringify([]));
            if (document.getElementsByTagName("checklist")[0].getAttribute("data-items") != null && document.getElementsByTagName("checklist")[0].getAttribute("data-items") != "") {
                let arrayProp = JSON.parse(
                    document.getElementsByTagName("checklist")[0].getAttribute("data-items")
                );
                arrayProp.forEach((element) => {
                    createChecklistElement(element, "", false, false);
                });
            }

        } else {
            const clElements = JSON.parse(localStorage.getItem("checklistElements"));
            if (clElements.length != 0) {
                clElements.forEach((element) => {
                    createChecklistElement(
                        element.text,
                        element.id,
                        element.isChecked,
                        true
                    );
                });
            }
        }
    };

    initialConfig();


    console.log()

    function svgInserter(className, svg) {
        const elem = document.querySelectorAll(className);
        for (let i = 0; i < elem.length; i++) {
            elem[i].innerHTML = svg;
        }
    }

    let mouseOverFlag = true

    function createChecklistElement(
        labelText,
        idLabel,
        labelIsChecked,
        isInitialization
    ) {
        const myChecklistElementDiv = document.createElement("div");
        myChecklistElementDiv.classList.add("checklist-element");
        /*myIlDivWrapper.addEventListener("mouseover", (e) => {
                myDeleteButton.style.display = "flex";
                myDeleteButton.style.border = "unset";
                myDeleteButton.style.backgroundColor = "#F4F6FF";
                myDragIconWrapper.style.display = 'block'
            });
            myIlDivWrapper.addEventListener("mouseout", (e) => {
                myDeleteButton.style.display = "none";
                myDragIconWrapper.style.display = 'none'
            }); */

        function ilDivMouseOver(e) {
            if (mouseOverFlag) {
                myDeleteButton.style.display = "flex";
                myDeleteButton.style.border = "unset";
                myDeleteButton.style.backgroundColor = "#F4F6FF";
                myDragIconWrapper.style.display = "block";
            }

        }

        function ilDivMouseOut(e) {
            myDeleteButton.style.display = "none";
            myDragIconWrapper.style.display = "none";
        }


        myChecklistElementDiv.addEventListener("dragstart", () => {

            myChecklistElementDiv.classList.add("dragging");
            mouseOverFlag = false
            document.querySelectorAll(".checklist-element").forEach((element) => {
                element.querySelector(".delete-button").style.display = "none";
                element.querySelector(".drag-icon").style.display = "none";
            });

            document.querySelectorAll(".ilDiv-wrapper").forEach((element) => {
                element.classList.remove("ilDiv-hover")
            })



        });

        myChecklistElementDiv.addEventListener("dragend", () => {
            myChecklistElementDiv.classList.remove("dragging");
            mouseOverFlag = true
            let checklistElements = [];

            document.querySelectorAll(".checklist-element").forEach((element) => {
                element.querySelector(".ilDiv-wrapper").classList.add("ilDiv-hover");
            });
            document.querySelectorAll(".checklist-element").forEach((element) => {
                let elemLabelText = element.querySelector(".label-class").innerHTML;
                let elemLabelId = element
                    .querySelector(".label-class")
                    .getAttribute("id");
                let elemIsChecked = element.querySelector(".option-class").checked;

                checklistElements.push({
                    text: elemLabelText,
                    id: elemLabelId,
                    isChecked: elemIsChecked,
                });
            });

            localStorage.setItem(
                "checklistElements",
                JSON.stringify(checklistElements)
            );
        });

        let labelId = Math.random().toString();

        const currentId = idLabel ? idLabel : labelId;

        const myIlDivWrapper = document.createElement("div");
        myIlDivWrapper.classList.add("ilDiv-wrapper");
        myIlDivWrapper.classList.add("ilDiv-hover");

        const myIlDiv = document.createElement("div");
        myIlDiv.classList.add("ilDiv-class");

        const myIlWrapper = document.createElement("div");
        myIlWrapper.classList.add("il-wrapper");

        const myInput = document.createElement("input");
        myInput.setAttribute("type", "checkbox");
        myInput.classList.add("option-class");

        myInput.addEventListener("click", (e) => {
            myCheckboxMarkerDiv.style.display = "block";

            myLabel.style.color = "#c6c6c6";
            myLabel.style.textDecoration = "line-through";
            myLabel.style.textDecorationThickness = 1.5 + "px";
            myInput.checked = true;

            const clElements = JSON.parse(localStorage.getItem("checklistElements"));
            clElements.forEach((element) => {
                if (element.id == currentId) {
                    element.isChecked = true;
                }
            });
            localStorage.setItem("checklistElements", JSON.stringify(clElements));
        });

        const myCheckboxMarkerDiv = document.createElement("div");
        myCheckboxMarkerDiv.classList.add("checkbox-marker");
        myCheckboxMarkerDiv.addEventListener("click", (e) => {
            myCheckboxMarkerDiv.style.display = "none";
            myLabel.style.color = "#000000";
            myLabel.style.textDecoration = "none";
            myInput.checked = false;

            const clElements = JSON.parse(localStorage.getItem("checklistElements"));
            clElements.forEach((element) => {
                if (element.id == currentId) {
                    element.isChecked = false;
                }
            });
            localStorage.setItem("checklistElements", JSON.stringify(clElements));
        });

        const myLabel = document.createElement("label");
        myLabel.setAttribute("id", currentId);
        myLabel.setAttribute("contenteditable", "true");
        myLabel.setAttribute("spellcheck", "false");
        myLabel.classList.add("label-class");

        labelText.length != 0 ? (myLabel.innerHTML = labelText) : null;

        const myDeleteButton = document.createElement("button");
        myDeleteButton.classList.add("delete-button");

        myLabel.addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                myLabel.contentEditable = "false";
            }
            myLabel.contentEditable = "true";
        });

        myDeleteButton.addEventListener("click", (e) => {
            myDeleteButton.parentElement.parentElement.parentElement.style.display =
                "none";
            const clElements = JSON.parse(localStorage.getItem("checklistElements"));
            clElements.forEach((element) => {
                if (element.id == currentId) {
                    const elemIndex = clElements.indexOf(element);
                    if (elemIndex > -1) {
                        clElements.splice(elemIndex, 1);
                    }
                }
            });
            localStorage.setItem("checklistElements", JSON.stringify(clElements));
        });

        myIlDivWrapper.addEventListener("mouseover", ilDivMouseOver);
        myIlDivWrapper.addEventListener("mouseout", ilDivMouseOut);

        if (labelIsChecked) {
            myCheckboxMarkerDiv.style.display = "block";
            myLabel.style.color = "#c6c6c6";
            myLabel.style.textDecoration = "line-through";
            myLabel.style.textDecorationThickness = 1.5 + "px";
            myInput.checked = true;
        }

        const myDragIconWrapper = document.createElement("div");
        myDragIconWrapper.classList.add("drag-icon");
        const myDragIcon = document.createElement("span");
        myDragIcon.classList.add("drag-icon-span");

        myDragIcon.addEventListener("mouseover", () => {
            myChecklistElementDiv.setAttribute("draggable", "true");
        });

        myDragIcon.addEventListener("mouseout", () => {
            myChecklistElementDiv.setAttribute("draggable", "false");
        });

        myDragIconWrapper.appendChild(myDragIcon);

        myIlWrapper.appendChild(myInput);
        myIlWrapper.appendChild(myCheckboxMarkerDiv);
        myIlWrapper.appendChild(myLabel);

        const myHLine = document.createElement("hr");
        myHLine.classList.add("line-class");

        myLabel.addEventListener("blur", (e) => {
            const clElems = JSON.parse(localStorage.getItem("checklistElements"));
            clElems.forEach((element) => {
                if (element.id == currentId) {
                    element.text = myLabel.innerText;
                }
            });
            localStorage.setItem("checklistElements", JSON.stringify(clElems));
        });

        if (!isInitialization) {
            const elem = {
                text: myLabel.innerHTML ? myLabel.innerHTML : "",
                id: idLabel ? idLabel : labelId,
                isChecked: labelIsChecked,
            };

            const checklistElements = JSON.parse(
                localStorage.getItem("checklistElements")
            );

            checklistElements.push(elem);
            localStorage.setItem(
                "checklistElements",
                JSON.stringify(checklistElements)
            );
        }

        myIlDiv.appendChild(myIlWrapper);
        myIlDiv.appendChild(myDeleteButton);
        myIlDivWrapper.appendChild(myDragIconWrapper);
        myIlDivWrapper.appendChild(myIlDiv);
        myChecklistElementDiv.appendChild(myIlDivWrapper);
        myChecklistElementDiv.appendChild(myHLine);
        inputDiv.appendChild(myChecklistElementDiv);
    }

    const svgDeleteIcon2329 = `<svg width="23" height="29" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.625 0L7.1875 1.45H1.4375C0.575 1.45 0 2.03 0 2.9C0 3.77 0.575 4.35 1.4375 4.35H4.3125H18.6875H21.5625C22.425 4.35 23 3.77 23 2.9C23 2.03 22.425 1.45 21.5625 1.45H15.8125L14.375 0H8.625ZM1.4375 7.25V26.1C1.4375 27.695 2.73125 29 4.3125 29H18.6875C20.2687 29 21.5625 27.695 21.5625 26.1V7.25H1.4375ZM7.1875 10.15C8.05 10.15 8.625 10.73 8.625 11.6V24.65C8.625 25.52 8.05 26.1 7.1875 26.1C6.325 26.1 5.75 25.52 5.75 24.65V11.6C5.75 10.73 6.325 10.15 7.1875 10.15ZM15.8125 10.15C16.675 10.15 17.25 10.73 17.25 11.6V24.65C17.25 25.52 16.675 26.1 15.8125 26.1C14.95 26.1 14.375 25.52 14.375 24.65V11.6C14.375 10.73 14.95 10.15 15.8125 10.15Z" fill="#C6C6C6"/>
    </svg>
    `;
    const svgDeleteIcon1924 = `<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.125 0L5.9375 1.2H1.1875C0.475 1.2 0 1.68 0 2.4C0 3.12 0.475 3.6 1.1875 3.6H3.5625H15.4375H17.8125C18.525 3.6 19 3.12 19 2.4C19 1.68 18.525 1.2 17.8125 1.2H13.0625L11.875 0H7.125ZM1.1875 6V21.6C1.1875 22.92 2.25625 24 3.5625 24H15.4375C16.7437 24 17.8125 22.92 17.8125 21.6V6H1.1875ZM5.9375 8.4C6.65 8.4 7.125 8.88 7.125 9.6V20.4C7.125 21.12 6.65 21.6 5.9375 21.6C5.225 21.6 4.75 21.12 4.75 20.4V9.6C4.75 8.88 5.225 8.4 5.9375 8.4ZM13.0625 8.4C13.775 8.4 14.25 8.88 14.25 9.6V20.4C14.25 21.12 13.775 21.6 13.0625 21.6C12.35 21.6 11.875 21.12 11.875 20.4V9.6C11.875 8.88 12.35 8.4 13.0625 8.4Z" fill="#C6C6C6"/>
    </svg>`;

    const svgDeleteIcon1721 = `<svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.375 0L5.3125 1.05H1.0625C0.425 1.05 0 1.47 0 2.1C0 2.73 0.425 3.15 1.0625 3.15H3.1875H13.8125H15.9375C16.575 3.15 17 2.73 17 2.1C17 1.47 16.575 1.05 15.9375 1.05H11.6875L10.625 0H6.375ZM1.0625 5.25V18.9C1.0625 20.055 2.01875 21 3.1875 21H13.8125C14.9813 21 15.9375 20.055 15.9375 18.9V5.25H1.0625ZM5.3125 7.35C5.95 7.35 6.375 7.77 6.375 8.4V17.85C6.375 18.48 5.95 18.9 5.3125 18.9C4.675 18.9 4.25 18.48 4.25 17.85V8.4C4.25 7.77 4.675 7.35 5.3125 7.35ZM11.6875 7.35C12.325 7.35 12.75 7.77 12.75 8.4V17.85C12.75 18.48 12.325 18.9 11.6875 18.9C11.05 18.9 10.625 18.48 10.625 17.85V8.4C10.625 7.77 11.05 7.35 11.6875 7.35Z" fill="#C6C6C6"/>
    </svg>`;

    const svgDeleteIcon1518 = `<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.625 0L4.6875 0.9H0.9375C0.375 0.9 0 1.26 0 1.8C0 2.34 0.375 2.7 0.9375 2.7H2.8125H12.1875H14.0625C14.625 2.7 15 2.34 15 1.8C15 1.26 14.625 0.9 14.0625 0.9H10.3125L9.375 0H5.625ZM0.9375 4.5V16.2C0.9375 17.19 1.78125 18 2.8125 18H12.1875C13.2188 18 14.0625 17.19 14.0625 16.2V4.5H0.9375ZM4.6875 6.3C5.25 6.3 5.625 6.66 5.625 7.2V15.3C5.625 15.84 5.25 16.2 4.6875 16.2C4.125 16.2 3.75 15.84 3.75 15.3V7.2C3.75 6.66 4.125 6.3 4.6875 6.3ZM10.3125 6.3C10.875 6.3 11.25 6.66 11.25 7.2V15.3C11.25 15.84 10.875 16.2 10.3125 16.2C9.75 16.2 9.375 15.84 9.375 15.3V7.2C9.375 6.66 9.75 6.3 10.3125 6.3Z" fill="#C6C6C6"/>
    </svg>
    `;
    const svgDeleteIcon911 = `<svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.375 0L2.8125 0.55H0.5625C0.225 0.55 0 0.77 0 1.1C0 1.43 0.225 1.65 0.5625 1.65H1.6875H7.3125H8.4375C8.775 1.65 9 1.43 9 1.1C9 0.77 8.775 0.55 8.4375 0.55H6.1875L5.625 0H3.375ZM0.5625 2.75V9.9C0.5625 10.505 1.06875 11 1.6875 11H7.3125C7.93125 11 8.4375 10.505 8.4375 9.9V2.75H0.5625ZM2.8125 3.85C3.15 3.85 3.375 4.07 3.375 4.4V9.35C3.375 9.68 3.15 9.9 2.8125 9.9C2.475 9.9 2.25 9.68 2.25 9.35V4.4C2.25 4.07 2.475 3.85 2.8125 3.85ZM6.1875 3.85C6.525 3.85 6.75 4.07 6.75 4.4V9.35C6.75 9.68 6.525 9.9 6.1875 9.9C5.85 9.9 5.625 9.68 5.625 9.35V4.4C5.625 4.07 5.85 3.85 6.1875 3.85Z" fill="#C6C6C6"/>
    </svg>
    `;

    const svgAddIcon4444 = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="40" height="40" rx="4" stroke="#C6C6C6" stroke-width="3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 11C23.1046 11 24 11.8208 24 12.8333L24 31.1667C24 32.1792 23.1046 33 22 33C20.8954 33 20 32.1792 20 31.1667L20 12.8333C20 11.8208 20.8954 11 22 11Z" fill="#C6C6C6"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M33 22C33 23.1046 32.1792 24 31.1667 24L12.8333 24C11.8208 24 11 23.1046 11 22C11 20.8954 11.8208 20 12.8333 20L31.1667 20C32.1792 20 33 20.8954 33 22Z" fill="#C6C6C6"/>
    </svg>`;

    const svgAddIcon3030 = `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="30" height="30" rx="4" stroke="#4F61FF" stroke-width="3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8C18.1046 8 19 8.67157 19 9.5L19 24.5C19 25.3284 18.1046 26 17 26C15.8954 26 15 25.3284 15 24.5L15 9.5C15 8.67157 15.8954 8 17 8Z" fill="#4F61FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M26 17C26 18.1046 25.3284 19 24.5 19L9.5 19C8.67157 19 8 18.1046 8 17C8 15.8954 8.67157 15 9.5 15L24.5 15C25.3284 15 26 15.8954 26 17Z" fill="#4F61FF"/>
    </svg>
    `;
    const svgAddIcon2020 = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="20" height="20" rx="4" stroke="#4F61FF" stroke-width="2"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C11.5523 4 12 4.52233 12 5.16667L12 16.8333C12 17.4777 11.5523 18 11 18C10.4477 18 10 17.4777 10 16.8333L10 5.16667C10 4.52233 10.4477 4 11 4Z" fill="#4F61FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11C18 11.5523 17.4777 12 16.8333 12L5.16667 12C4.52233 12 4 11.5523 4 11C4 10.4477 4.52233 10 5.16667 10L16.8333 10C17.4777 10 18 10.4477 18 11Z" fill="#4F61FF"/>
    </svg>
    
    `;

    const svgCheckIcon2525 = `<svg width="25px" height="25px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2222 0H2.77778C1.24306 0 0 1.24306 0 2.77778V22.2222C0 23.7569 1.24306 25 2.77778 25H22.2222C23.7569 25 25 23.7569 25 22.2222V2.77778C25 1.24306 23.7569 0 22.2222 0ZM10.7042 19.0375C10.1611 19.5806 9.28194 19.5806 8.74028 19.0375L4.16667 14.4639C3.625 13.9222 3.625 13.0417 4.16667 12.5C4.70833 11.9583 5.58889 11.9583 6.13056 12.5L9.72222 16.0917L18.8694 6.94444C19.4111 6.40278 20.2917 6.40278 20.8333 6.94444C21.375 7.48611 21.375 8.36667 20.8333 8.90833L10.7042 19.0375Z" fill="#C6C6C6"/>
    </svg>`;

    const svgCheckIcon2020 = `<svg width="20px" height="20px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2222 0H2.77778C1.24306 0 0 1.24306 0 2.77778V22.2222C0 23.7569 1.24306 25 2.77778 25H22.2222C23.7569 25 25 23.7569 25 22.2222V2.77778C25 1.24306 23.7569 0 22.2222 0ZM10.7042 19.0375C10.1611 19.5806 9.28194 19.5806 8.74028 19.0375L4.16667 14.4639C3.625 13.9222 3.625 13.0417 4.16667 12.5C4.70833 11.9583 5.58889 11.9583 6.13056 12.5L9.72222 16.0917L18.8694 6.94444C19.4111 6.40278 20.2917 6.40278 20.8333 6.94444C21.375 7.48611 21.375 8.36667 20.8333 8.90833L10.7042 19.0375Z" fill="#C6C6C6"/>
    </svg>`;

    const svgCheckIcon1515 = `<svg width="15px" height="15px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2222 0H2.77778C1.24306 0 0 1.24306 0 2.77778V22.2222C0 23.7569 1.24306 25 2.77778 25H22.2222C23.7569 25 25 23.7569 25 22.2222V2.77778C25 1.24306 23.7569 0 22.2222 0ZM10.7042 19.0375C10.1611 19.5806 9.28194 19.5806 8.74028 19.0375L4.16667 14.4639C3.625 13.9222 3.625 13.0417 4.16667 12.5C4.70833 11.9583 5.58889 11.9583 6.13056 12.5L9.72222 16.0917L18.8694 6.94444C19.4111 6.40278 20.2917 6.40278 20.8333 6.94444C21.375 7.48611 21.375 8.36667 20.8333 8.90833L10.7042 19.0375Z" fill="#C6C6C6"/>
    </svg>`;

    const svgCheckIcon1212 = `<svg width="12px" height="12px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2222 0H2.77778C1.24306 0 0 1.24306 0 2.77778V22.2222C0 23.7569 1.24306 25 2.77778 25H22.2222C23.7569 25 25 23.7569 25 22.2222V2.77778C25 1.24306 23.7569 0 22.2222 0ZM10.7042 19.0375C10.1611 19.5806 9.28194 19.5806 8.74028 19.0375L4.16667 14.4639C3.625 13.9222 3.625 13.0417 4.16667 12.5C4.70833 11.9583 5.58889 11.9583 6.13056 12.5L9.72222 16.0917L18.8694 6.94444C19.4111 6.40278 20.2917 6.40278 20.8333 6.94444C21.375 7.48611 21.375 8.36667 20.8333 8.90833L10.7042 19.0375Z" fill="#C6C6C6"/>
    </svg>`;

    const svgDragIcon1322 = `<svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10.8333" cy="2.16667" r="2.16667" fill="#C6C6C6"/>
    <circle cx="10.8333" cy="10.8333" r="2.16667" fill="#C6C6C6"/>
    <circle cx="10.8333" cy="19.5" r="2.16667" fill="#C6C6C6"/>
    <circle cx="2.16667" cy="10.8333" r="2.16667" fill="#C6C6C6"/>
    <circle cx="2.16667" cy="2.16667" r="2.16667" fill="#C6C6C6"/>
    <circle cx="2.16667" cy="19.5" r="2.16667" fill="#C6C6C6"/>
    </svg>`;

    const svgDragIcon1220 = `<svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="2" r="2" fill="#C6C6C6"/>
    <circle cx="10" cy="10" r="2" fill="#C6C6C6"/>
    <circle cx="10" cy="18" r="2" fill="#C6C6C6"/>
    <circle cx="2" cy="10" r="2" fill="#C6C6C6"/>
    <circle cx="2" cy="2" r="2" fill="#C6C6C6"/>
    <circle cx="2" cy="18" r="2" fill="#C6C6C6"/>
    </svg>`;

    const svgDragIcon1017 = `<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.33334" cy="1.66667" r="1.66667" fill="#C6C6C6"/>
    <circle cx="8.33334" cy="8.33329" r="1.66667" fill="#C6C6C6"/>
    <circle cx="8.33334" cy="15" r="1.66667" fill="#C6C6C6"/>
    <circle cx="1.66667" cy="8.33329" r="1.66667" fill="#C6C6C6"/>
    <circle cx="1.66667" cy="1.66667" r="1.66667" fill="#C6C6C6"/>
    <circle cx="1.66667" cy="15" r="1.66667" fill="#C6C6C6"/>
    </svg>
    `;

    const svgDragIcon813 = `<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.33332" cy="1.26667" r="1.26667" fill="#C6C6C6"/>
    <circle cx="6.33332" cy="6.33332" r="1.26667" fill="#C6C6C6"/>
    <circle cx="6.33332" cy="11.4001" r="1.26667" fill="#C6C6C6"/>
    <circle cx="1.26667" cy="6.33332" r="1.26667" fill="#C6C6C6"/>
    <circle cx="1.26667" cy="1.26667" r="1.26667" fill="#C6C6C6"/>
    <circle cx="1.26667" cy="11.4001" r="1.26667" fill="#C6C6C6"/>
    </svg>
    `;

    const mainStyle = document.createElement("style");
    mainStyle.setAttribute("id", "checklist-mainStyle");
    mainStyle.innerHTML = `@font-face{font-family: 'SailecBold'; src: url(fonts/SailecBold.otf) format(\"opentype\")}
    @font-face{font-family: 'SailecRegular'; src: url(fonts/SailecRegular.otf) format(\"opentype\")}
    .checklist-element.dragging{opacity: 0.1}
    .cl-container{display:flex; justify-content: center}
    .cl-content{background-color: white; border-radius: 0px 0px 10px 10px; box-shadow: 3px 5px 25px 14px rgba(21, 0, 150, 0.05); text-align: center; font-family:'SailecBold'}
    .titleWrapperDiv-class{}
    .ilDiv-wrapper{display:flex; justify-content:center; width:100%; align-items:center;}
    .ilDiv-hover:hover {background-color: #f4f6ff; }
    .il-wrapper{display:flex; align-items:center}
    .label-class:focus{text-decoration: underline; text-decoration-thickness: 1px;}
    .label-class:hover{cursor:pointer}
    .option-class:checked + .label-class{color: #c6c6c6; text-decoration: line-through; text-decoration-thickness:1.5px}
    .hLine-wrapper{}
    [ contenteditable ]{ outline : 0px solid transparent;}`;

    const mediaStyle = document.createElement("style");
    mediaStyle.setAttribute("id", "checklist-mediaStyle");

    function mediaQueryCSS() {
        if (window.matchMedia("(max-width:568px)").matches) {
            //Mobile
            contentDiv.style.width = 240 + "px";

            mediaStyle.innerHTML = `
            .checklistTitle{color: #4F61FF; line-height:23px ; font-size : 16px;  font-style: normal; padding-top: 20px; margin-bottom: 0px }
            .input-container{display: flex; flex-direction: column ;font-family: 'SailecRegular';}
            .checklist-element{width:100%; display:flex; flex-direction: column; margin-top: 10px; align-items:center}
            .ilDiv-class{display:flex; height: 24px; align-items: center; width:195px; justify-content: space-between}
            .ilDiv-hover:hover .option-class{border: 1px solid #4f61ff}
            .ilDiv-hover:hover .option-class:checked{border: 1px solid #c6c6c6}
            .label-class{margin-left: 6px; font-style: normal; font-weight: 400; font-size: 10px; line-height:14px; color:#000000; margin-bottom:0px; display:flex; width:166px} 
            .option-class{width:12px ; height:12px; border: 1px solid #c6c6c6; border-radius: 4px; -webkit-appearance:none; display:flex; justify-content:center; align-items:center; cursor:pointer}
            .checkbox-marker{height:12px; width:12px; position:absolute; display: none; padding-bottom:8px}
            .delete-button{height:11px; width:9px; display:none; cursor:pointer}
            .line-class{ width: 195px ; height:0px; border: 0.5px solid #C6C6C6; border-radius:3px ;background-color: #c6c6c6; margin-top: 2.4px; -webkit-box-sizing: border-box}
            .button-div-wrapper{display:flex; justify-content:center; align-items: center; height:57px}
            .add-button{width:22px; height:22px; border: none; background-color:#fff; display:flex; justify-content:center; align-items: center ; cursor:pointer;} 
            .drag-icon{width:7.6px; height:12.67px; display:none; padding: 0 7.4px 0 7px; margin-left: -22px; margin-bottom: 6px;}
            .drag-icon-span{cursor: pointer} }`;

            svgInserter(".delete-button", svgDeleteIcon911);
            svgInserter(".add-button", svgAddIcon2020);
            svgInserter(".checkbox-marker", svgCheckIcon1212);
            svgInserter(".drag-icon-span", svgDragIcon813);
        } else if (window.matchMedia("(max-width:768px)").matches) {
            //Landscape Phone
            contentDiv.style.width = 440 + "px";

            mediaStyle.innerHTML = `
            .checklistTitle{color: #4F61FF; line-height:32px ; font-size : 22px;  font-style: normal; padding-top: 30px; margin-bottom: 0px }
            .input-container{display: flex; flex-direction: column ;font-family: 'SailecRegular'; margin-top:4px}
            .checklist-element{width:100%; display:flex; flex-direction: column; margin-top: 9px; align-items:center}
            .ilDiv-class{display:flex; height: 40px; align-items: center; width:384px; justify-content: space-between}
            .ilDiv-hover:hover .option-class{border: 2px solid #4f61ff}
            .ilDiv-hover:hover .option-class:checked{border: 2px solid #c6c6c6}
            .label-class{margin-left: 11px; font-style: normal; font-weight: 400; font-size: 14px; line-height:20px; color:#000000; margin-bottom:0px; display:flex; width:345px}
            .option-class{width:15px ; height:15px; border: 2px solid #c6c6c6; border-radius: 4px; -webkit-appearance:none; display:flex; justify-content:center; align-items:center; cursor:pointer}
            .checkbox-marker{height:15px; width:15px; position:absolute; display: none; padding-bottom:3px}
            .delete-button{height:18px; width:15px; display:none; cursor:pointer}
            .line-class{ width: 384px ; height:0px; border: 1px solid #C6C6C6; border-radius:3px ;background-color: #c6c6c6; margin-top: 5px; -webkit-box-sizing: border-box}          
            .button-div-wrapper{display:flex; justify-content:center; align-items: center; height:85px}
            .add-button{width:30px; height:30px; border: none; ;background-color:#fff; display:flex; justify-content:center; align-items: center ; cursor:pointer}
            .drag-icon{width:10px; height:16.67px; display:none; padding: 0 9px 0 12px; margin-left: -31px;}
            .drag-icon-span{cursor: pointer}}`;

            svgInserter(".delete-button", svgDeleteIcon1518);
            svgInserter(".add-button", svgAddIcon3030);
            svgInserter(".checkbox-marker", svgCheckIcon1515);
            svgInserter(".drag-icon-span", svgDragIcon1017);
        } else if (window.matchMedia("(max-width:1164px)").matches) {
            //Tablet
            contentDiv.style.width = 540 + "px";

            mediaStyle.innerHTML = `
           .checklistTitle{color: #4F61FF; line-height:44px ; font-size : 30px;  font-style: normal; padding-top: 61px; margin-bottom: 0px }
           .input-container{display: flex; flex-direction: column ;font-family: 'SailecRegular'; margin-top:7px}
           .checklist-element{width:100%; display:flex; flex-direction: column; margin-top: 15px; align-items:center}
           .ilDiv-class{display:flex; height: 43px; align-items: center; width:475px; justify-content: space-between}
           .ilDiv-hover:hover .option-class{border: 3px solid #4f61ff}
           .ilDiv-hover:hover .option-class:checked{border: 3px solid #c6c6c6}
           .label-class{margin-left: 15px; font-style: normal; font-weight: 400; font-size: 18px; line-height:25px; color:#000000; margin-bottom:0px; display:flex; width: 420px}
           .option-class{width:20px ; height:20px; border: 3px solid #c6c6c6; border-radius: 4px; -webkit-appearance:none; display:flex; justify-content:center; align-items:center; cursor:pointer}
           .checkbox-marker{height:20px; width:20px; position:absolute; display: none}
           .delete-button{height:21px; width:17px; display:none; cursor:pointer}
           .line-class{ width: 475px ; height:0px; border: 1px solid #C6C6C6; border-radius:3px ;background-color: #c6c6c6; margin-top: 10px; -webkit-box-sizing: border-box}
           .button-div-wrapper{display:flex; justify-content:center; align-items: center; height:128px}
           .add-button{width:30px; height:30px; border: none; ;background-color:#fff; display:flex; justify-content:center; align-items: center ; cursor:pointer}
           .drag-icon{width:10px; height:16.67px; display:none; padding: 0 13px 0 12px; margin-left: -35px;}
           .drag-icon-span{cursor: pointer} }`;

            svgInserter(".delete-button", svgDeleteIcon1721);
            svgInserter(".add-button", svgAddIcon3030);
            svgInserter(".checkbox-marker", svgCheckIcon2020);
            svgInserter(".drag-icon-span", svgDragIcon1017);
        } else if (window.matchMedia("(max-width:1280px)").matches) {
            //Small dekstop
            contentDiv.style.width = 900 + "px";

            mediaStyle.innerHTML = `
           .checklistTitle{color: #4F61FF; line-height:44px ; font-size : 30px;  font-style: normal; padding-top: 61px; margin-bottom: 0px }
           .input-container{display: flex; flex-direction: column ;font-family: 'SailecRegular'; margin-top:37px}
           .checklist-element{width:100%; display:flex; flex-direction: column; margin-top: 15px; align-items:center}
           .ilDiv-class{display:flex; height: 43px; align-items: center; width:750px; justify-content: space-between}
           .ilDiv-hover:hover .option-class{border: 3px solid #4f61ff}
           .ilDiv-hover:hover .option-class:checked{border: 3px solid #c6c6c6}
           .label-class{margin-left: 15px; font-style: normal; font-weight: 400; font-size: 20px; line-height:27px; color:#000000; margin-bottom:0px; display:flex; width:694px}
           .option-class{width:20px ; height:20px; border: 3px solid #c6c6c6; border-radius: 4px; -webkit-appearance:none; display:flex; justify-content:center; align-items:center; cursor:pointer}
           .checkbox-marker{height:20px; width:20px; position:absolute; display: none}
           .delete-button{height:24px; width:19px; display:none; cursor:pointer}
           .line-class{ width: 750px ; height:0px; border: 1px solid #C6C6C6; border-radius:3px ;background-color: #c6c6c6; margin-top: 10px; -webkit-box-sizing: border-box}
           .button-div-wrapper{display:flex; justify-content:center; align-items: center; height:131px}
           .add-button{width:30px; height:30px; border: none; ;background-color:#fff; display:flex; justify-content:center; align-items: center ; cursor:pointer}
            .drag-icon{width:12px; height:20px; display:none; padding: 0 12px 0 51px; margin-left: -75px; }
            .drag-icon-span{cursor: pointer} }`;

            svgInserter(".delete-button", svgDeleteIcon1924);
            svgInserter(".add-button", svgAddIcon3030);
            svgInserter(".checkbox-marker", svgCheckIcon2020);
            svgInserter(".drag-icon-span", svgDragIcon1220);
        } else {
            //Regular, Large, Extra Large
            contentDiv.style.width = 900 + "px";

            mediaStyle.innerHTML = `
            .checklistTitle{color: #4F61FF; line-height:58px ; font-size : 40px;  font-style: normal; padding-top: 78px; margin-bottom: 0px }
            .input-container{display: flex; flex-direction: column ;font-family: 'SailecRegular';}
            .checklist-element{width:100%; display:flex; flex-direction: column; margin-top: 32px; align-items:center}
            .ilDiv-class{display:flex; height: 50px; align-items: center; width:750px; justify-content: space-between}
            .ilDiv-hover:hover .option-class{border: 3px solid #4f61ff}
            .ilDiv-hover:hover .option-class:checked{border: 3px solid #c6c6c6}
            .label-class{margin-left: 20px; font-style: normal; font-weight: 400; font-size: 24px; line-height:24px; color:#000000; margin-bottom:0px; width:680px; display:flex}
            .option-class{width:25px ; height:25px; border: 3px solid #c6c6c6; border-radius: 4px; -webkit-appearance:none; display:flex; justify-content:center; align-items:center; cursor:pointer}
            .checkbox-marker{height:25px; width:25px; position:absolute; display: none}
            .delete-button{height:29px; width:23px; display:none; cursor:pointer}
            .line-class{ width: 750px ; height:0px; border: 1px solid #C6C6C6; border-radius:3px ;background-color: #c6c6c6; margin-top: 6px; -webkit-box-sizing: border-box}
            .button-div-wrapper{display:flex; justify-content:center; align-items: center; height:139px}
            .add-button{width:40px; height:40px; border: none  ;background-color:#fff; display:flex; justify-content:center; align-items: center ; cursor:pointer;}
            .drag-icon{width:13px; height:21.67px; display:none; padding: 0 16px 0 46px; margin-left: -75px;  }
            .drag-icon-span{cursor: pointer} }`;

            svgInserter(".delete-button", svgDeleteIcon2329);
            svgInserter(".add-button", svgAddIcon4444);
            svgInserter(".checkbox-marker", svgCheckIcon2525);
            svgInserter(".drag-icon-span", svgDragIcon1322);
        }
    }
    document.getElementsByTagName("head")[0].appendChild(mediaStyle);
    document.getElementsByTagName("head")[0].appendChild(mainStyle);

    let cListTitle = "Checklist";

    if (document.getElementsByTagName("checklist")[0].getAttribute("data-title") != null && document.getElementsByTagName("checklist")[0].getAttribute("data-title") != "") {
        cListTitle = document.getElementsByTagName("checklist")[0].getAttribute("data-title")
    }


    const contentDiv = document.createElement("div");
    contentDiv.classList.add("cl-content");
    contentDiv.setAttribute("id", "div-checklist");

    contentDiv.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(inputDiv, e.clientY);
        const draggableElement = document.querySelector(".dragging");
        if (afterElement == null) {
            inputDiv.appendChild(draggableElement);
        } else {
            inputDiv.insertBefore(draggableElement, afterElement);
        }
    });

    const getDragAfterElement = (container, y) => {
        const draggableElements = [
            ...container.querySelectorAll(".checklist-element:not(.dragging)"),
        ];
        return draggableElements.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }
        ).element;
    };

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("cl-container");

    const buttonDivWrapper = document.createElement("div");
    buttonDivWrapper.classList.add("button-div-wrapper");

    const addButton = document.createElement("button");
    addButton.classList.add("add-button");
    addButton.innerHTML = svgAddIcon4444;

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        createChecklistElement("", "", false);
    });

    new ResizeObserver(mediaQueryCSS).observe(document.body);

    const titleWrapperDiv = document.createElement("div");
    titleWrapperDiv.classList.add("titleWrapperDiv-class");

    const checklistTitle = document.createElement("h2");
    checklistTitle.setAttribute("class", "checklistTitle");
    checklistTitle.textContent = cListTitle;

    titleWrapperDiv.appendChild(checklistTitle);
    buttonDivWrapper.appendChild(addButton);
    contentDiv.appendChild(titleWrapperDiv);
    contentDiv.appendChild(inputDiv);
    contentDiv.appendChild(buttonDivWrapper);

    containerDiv.appendChild(contentDiv);

    const checkList = document.getElementsByTagName("checklist")[0];
    checkList.appendChild(containerDiv);
});