document.addEventListener("click", event => {
            
            if (event.target.id === "newBook") {
                dial.showModal();
              navigator.mediaDevices.getUserMedia({video: true})
                .then(vid => {
                    video.srcObject = vid;
                    
                    
                });
              
            };
            if (event.target.id === "submit" && title.value.trim() !== "" && author.value.trim() !== "") {
                isMonth = 0
                event.preventDefault();
                
                const tempHolds = document.getElementById("tempHolds");
                const tempClone = tempHolds.content.cloneNode(true);
                tempClone.querySelector("#titleHold").innerText = title.value;
                tempClone.querySelector("#personHold").innerText = "Author: " + author.value;
                const canvas = tempClone.querySelector("#picture");
                const date = tempClone.querySelector("#date");
                const ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                container.appendChild(tempClone);
                
                let dates = new Date();
                date.innerText = dates.getHours() + ":" + String(dates.getMinutes()).padStart(2, "0") + ", " + dates.getDate() + "/" + dates.getMonth() + "/" + dates.getFullYear();
               titleList.push(title.value);
               authorList.push(author.value);
               imageList.push(canvas.toDataURL());
               dateList.push(dates.getHours() + ":" + String(dates.getMinutes()).padStart(2, "0") + ", " + dates.getFullYear() + "/" + dates.getMonth()+ "/" + dates.getDate());
                 localStorage.setItem("title", JSON.stringify(titleList));
                  localStorage.setItem("author", JSON.stringify(authorList));
                  localStorage.setItem("image", JSON.stringify(imageList));
                  localStorage.setItem("date", JSON.stringify(dateList));
                title.value = "";
                author.value = "";

                   dial.close()
                document.getElementById("Progress").style.width = titleList.length / goal * 100 > 100 ?  "100%" : titleList.length / goal * 100 + "%";
                document.getElementById("percentage").innerText = "Goal: " + titleList.length + "/" + goal + " (" + (titleList.length / goal * 100).toFixed(2) + "%)";;

                if (titleList.length == goal) {
                    won.showModal();
                    won.querySelector("#read").innerText = "You had read: " + titleList.length + "/" + goal + "!";
                    let aud = new Audio("Winning.mp3");
                    aud.play();
                };
               
            };
            if (event.target.classList.contains("delete")) {
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

            if (event.target.id === "settings") {
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

        });
