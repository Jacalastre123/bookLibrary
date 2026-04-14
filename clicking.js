
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
                
               
                const tempHolds = document.getElementById("tempHolds");
                const tempClone = tempHolds.content.cloneNode(true);

                tempClone.querySelector("#titleHold").innerText =  (await check(title.value.replace("-", ""), ""))[0]

         
                    const result = (await check(title.value.replace("-", ""), author.value))[1]
                    theAuthor = result
             
                
                tempClone.querySelector("#personHold").innerText = "Author: " + theAuthor
                barcode = false
                const canvas = tempClone.querySelector("#picture");
                const date = tempClone.querySelector("#date");
                const ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                container.appendChild(tempClone);
                
                let dates = new Date();
                date.innerText = dates.getHours() + ":" + String(dates.getMinutes()).padStart(2, "0") + ", " + dates.getDate() + "/" + dates.getMonth() + "/" + dates.getFullYear();
               titleList.push((await check(title.value.replace("-", ""), ""))[0]);
               authorList.push(theAuthor);
               imageList.push(canvas.toDataURL());
               dateList.push(dates.getHours() + ":" + String(dates.getMinutes()).padStart(2, "0") + ", " + dates.getFullYear() + "/" + dates.getMonth()+ "/" + dates.getDate());
                 localStorage.setItem("title", JSON.stringify(titleList));
                  localStorage.setItem("author", JSON.stringify(authorList));
                  localStorage.setItem("image", JSON.stringify(imageList));
                  localStorage.setItem("date", JSON.stringify(dateList));
                title.value = "";
                author.value = "";

                   
                document.getElementById("Progress").style.width = titleList.length / goal * 100 > 100 ?  "100%" : titleList.length / goal * 100 + "%";
                document.getElementById("percentage").innerText = "Goal: " + titleList.length + "/" + goal + " (" + (titleList.length / goal * 100).toFixed(2) + "%)";;

                if (titleList.length == goal) {
                    won.showModal();
                    won.querySelector("#read").innerText = "You had read: " + titleList.length + "/" + goal + "!";
                    let aud = new Audio("Winning.mp3");
                    aud.play();
                };
                 stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
               stream = false
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
               progress.style.width = titleList.length / goal * 100 + "%";
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
                if (colourInput !== bg) {
                    bg = colourInput.value;
                    localStorage.setItem("bg", bg)
                    document.documentElement.style.setProperty("--bgCo", bg)
                }
                progress.style.width = titleList.length / goal * 100 + "%";
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

            if (event.target.id === "resetCol") {
                colourInput.value = "rgb(44, 160, 255)"
            }
            if (event.target.className === "Custom") {
                if (event.target.textContent === "Customise") {
                    event.target.innerText = "Stop";
                    isCustom = true;
                    document.body.cursor = "crosshair"
                }
                else {
                    isCustom = false;
                    event.target.innerText = "Customise"
                    document.querySelector("#colForm").remove()
                    document.body.cursor = "auto"
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
                    document.documentElement.style.setProperty("--bgCo", event.target.parentElement.querySelector("#colormise").value)
                }
                else {
                    currentClick.style.backgroundColor = event.target.parentElement.querySelector("#colormise").value
                }
                
                event.target.parentElement.remove()
                customList.push({element: currentClick.id !== "" ? currentClick.id: currentClick.className, colour: event.target.parentElement.querySelector("#colormise").value})
                localStorage.setItem("colList", JSON.stringify(customList))
                currentClick = null
            }
            if (event.target.id === "close2") {
               event.target.parentElement.remove()
                currentClick = null

            }
            if (event.target.id === "resAll") {
                document.getElementById("container").style.backgroundColor = "rgb(214, 214, 214)"
                document.getElementById("Progress").style.backgroundColor = "rgb(5, 193, 5)"
                document.querySelector(".bar").style.backgroundColor = "lightgrey"
                document.documentElement.style.setProperty("--bgCo", "rgb(44, 160, 255)")
                customList.length = 0
                customList.push({element: "container", colour: "rgb(214, 214, 214)"}, {element: "Progress", colour: "rgb(5, 193, 5)"}, {element: "bar", colour: "lightgrey"})
localStorage.setItem("bg", bg)
localStorage.setItem("colList", JSON.stringify(customList))
            }

            if (event.target.id === "Mobile") {
                const menuBurg = document.querySelector(".menuBurg")
                                menuBurg.style.display = "block"
                menuBurg.style.animation = "slide 1s"
                menuBurg.style.left = "0px"

            }

            if (event.target.className !== "menuBurg" && window.getComputedStyle(document.querySelector(".menuBurg")).left == "0px") {
                const menuBurg = document.querySelector(".menuBurg")
                menuBurg.style.animation = "rev-slide 1s"
                menuBurg.style.left = "-30vw"
                setTimeout(function() {
 menuBurg.style.display = "none"
                }, 1000)
                
            }

            if (event.target.id === "startClose") {
                startClose.parentElement.close()
            }
            

        });

