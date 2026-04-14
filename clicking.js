
document.addEventListener("mousemove", e => {
    mouseY = e.clientY
    mouseX = e.clientX
})
document.addEventListener("click", async event => {
            
            if (event.target.className === "newBook") {
                dial.showModal();
              stream = await navigator.mediaDevices.getUserMedia({video: true})
                    
 video.srcObject = stream;
                    
                   
                    
                    
               
              
            };
            if (event.target.id === "submit" && title.value.trim() !== "" && stream) {
                
                event.preventDefault();
                continues = false
               await submission()
            

               
            };
            if (event.target.className === "delete") {
                 titleList = titleList.filter(list => list !== event.target.parentElement.querySelector("#titleHold").innerText);
                authorList = authorList.filter(list => list !== event.target.parentElement.querySelector("#personHold").innerText.slice(8));
                imageList = imageList.filter(list => list !== event.target.parentElement.querySelector("#picture").toDataURL());
                 localStorage.setItem("title", JSON.stringify(titleList));
                  localStorage.setItem("author", JSON.stringify(authorList));
                  localStorage.setItem("image", JSON.stringify(imageList));
                  localStorage.setItem("date", JSON.stringify(dateList));
                event.target.parentElement.remove();
               progress.style.width = titleList.length / goal * 100 ? titleList.length / goal * 100 > 100 + "%" : "100%";
                 percentage.innerText = "Goal: " + titleList.length + "/" + goal + " (" + (titleList.length / goal * 100).toFixed(2) + "%)";
            };

            if (event.target.className === "settings") {
                dial2.showModal();

            };
           
            
            if (event.target.id === "dial2Close") {
                dial2.close();
                 if (nameID.value.trim() !== "") {

                name = nameID.value; 
                }
                if (goals.value.trim() !== "" && goals.value.trim() !== goal) {
                    goal = goals.value
                }
                if (name) {
                greeting.innerText = name.at(-1) === "s" ? name + "' Book Library" : name + "'s Book Library";
                 
                };
                
                progress.style.width = titleList.length / goal * 100 > 100 ? titleList.length / goal * 100 > 100 + "%" : "100%";
                 percentage.innerText = "Goal: " + titleList.length + "/" + goal + " (" + (titleList.length / goal * 100).toFixed(2) + "%)";
                 localStorage.setItem("goal", goal)
                 localStorage.setItem("name", name)
            };

            if (event.target.id === "closeWon") {
                won.close()
                
                
            }

            if (event.target.id === "closeDial1") {
                dial.close()
            }

            if (event.target.id === "ResetCol") {
                bg = "rgb(44, 160, 255)"
                document.documentElement.style.setProperty("--bgCo", bg)
                localStorage.setItem("bg", bg)
            }
            if (event.target.className === "Custom") {
                if (event.target.textContent === "Customise") {
                    event.target.innerText = "Stop";
                    isCustom = true;
                    document.body.style.cursor = "crosshair"
                  
                }
                else {
                    isCustom = false;
                    event.target.innerText = "Customise"
                    document.querySelector("#colForm").remove()
                    document.body.style.cursor = "default"
                };
            }
            if (event.target.tagName === "DIV" && event.target.id !== "colForm" && isCustom) {
                const newTemp = document.getElementById("popup")
                const cloneTemp = newTemp.content.cloneNode(true)
                const colForm = cloneTemp.querySelector("#colForm")
                document.body.appendChild(cloneTemp)
                currentClick = event.target
                   
                colForm.style.top = mouseY + "px"
                 colForm.style.left = mouseX + "px"
                 if (document.querySelectorAll("#colForm")[1]) {
                    document.querySelectorAll("#colForm")[0].remove()
                 }
               
                 
                  
                
            }
            if (event.target.id === "submit2") {
                
                if (currentClick.classList.contains("holder")) {
                    document.documentElement.style.setProperty("--bgCo", event.target.parentElement.querySelector("#colormise").value);
                    bg = event.target.parentElement.querySelector('#colormise').value
                }
                else {
                    currentClick.style.backgroundColor = event.target.parentElement.querySelector("#colormise").value
                }
                
                event.target.parentElement.remove()
                customList.push({element: currentClick.id !== "" ? currentClick.id: currentClick.className, colour: event.target.parentElement.querySelector("#colormise").value})
                localStorage.setItem("colList", JSON.stringify(customList))
                currentClick = null
                localStorage.setItem("bg", bg)
            }
            if (event.target.id === "close2") {
               event.target.parentElement.remove()
                currentClick = null

            }
            if (event.target.id === "resAll") {
                document.getElementById("container").style.backgroundColor = "rgb(214, 214, 214)"
                document.getElementById("Progress").style.backgroundColor = "rgb(5, 193, 5)"
                document.querySelector(".bar").style.backgroundColor = "lightgrey"
                document.querySelector(".naming").style.backgroundColor = "lightgrey"
                bg = "rgb(44, 160, 255)"
                document.documentElement.style.setProperty("--bgCo", bg)
                document.querySelectorAll(".holder").forEach(item => {
                    item.style.backgroundColor = "var(--bgCo)"
                })
                customList.length = 0
                customList.push({element: "container", colour: "rgb(214, 214, 214)"}, {element: "Progress", colour: "rgb(5, 193, 5)"}, {element: "bar", colour: "lightgrey"}, {element: "naming", colour: "lightgrey"})
localStorage.setItem("bg", bg)
localStorage.setItem("colList", JSON.stringify(customList))
            }

            if (event.target.id === "Mobile") {
                const menuBurg = document.querySelector(".menuBurg")
                                menuBurg.style.display = "block"
                menuBurg.style.animation = "slide 0.5s"
                menuBurg.style.left = "0px"

            }

            if (event.target.className !== "menuBurg" && window.getComputedStyle(document.querySelector(".menuBurg")).left == "0px") {
                const menuBurg = document.querySelector(".menuBurg")
                menuBurg.style.animation = "rev-slide 0.5s"
                menuBurg.style.left = "-30vw"
                setTimeout(function() {
 menuBurg.style.display = "none"
                }, 1000)
                
            }

            if (event.target.id === "startClose") {
                startClose.parentElement.close()
            }
            
          
        });

