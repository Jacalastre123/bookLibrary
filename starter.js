titleList.forEach((item, index) => {
    const tempHolds = document.getElementById("tempHolds")
                const tempClone = tempHolds.content.cloneNode(true);
                tempClone.querySelector(".titleHold").innerText = item;
                tempClone.querySelector(".personHold").innerText = "Author: " + authorList[index];
                tempClone.querySelector("#date").innerText = dateList[index];
                const canvas = tempClone.querySelector("#picture");
                const ctx = canvas.getContext("2d");
                    let newImg = new Image();
                newImg.src = imageList[index];
                newImg.onload = () => {
                    ctx.drawImage(newImg, 0, 0);
                };
                
               
                container.appendChild(tempClone);

   });

                progress.style.width = titleList.length / goal * 100 > 100 ?  "100%" : titleList.length / goal * 100 + "%";
                percentage.innerText = "Goal: " + titleList.length + "/" + goal + " (" + (titleList.length / goal * 100).toFixed(2) + "%)";
                if (name) {
                    greeting.innerText = name.at(-1) === "s" ? name + "' Book Library" : name + "'s Book Library";
                }

                document.documentElement.style.setProperty("--bgCo", bg);
 
                

                customList.forEach(item => {
                    let allEl = document.querySelectorAll("*")
                    allEl.forEach(el => {
                        if (el.id === item.element || el.className === item.element) {
                           if (el.id === "holder") {
                                document.documentElement.style.setProperty("--bgCo", item.colour)
                                document.querySelectorAll(".holder", itemHold => {
                                    itemHold.style.backgroundColor = "var(--bgCo)"
                                })
                           } else { el.style.backgroundColor = item.colour }
                        }
                    })
                })

                async function check(ISBN, auth) {
                    dial.querySelector("#submit").disabled = true
                       let authTrue = auth.trim() !== "" ? auth : "None"
                        if (!/^[0-9\-]{10,13}$/.test(ISBN)) {
                         
                            dial.querySelector("#submit").disabled = false
                              dial.close()
                            return [ISBN, authTrue]
                        }
                    let fetching = await fetch("https://openlibrary.org/api/books?bibkeys=ISBN:" + ISBN + "&fetch&format=json&jscmd=data")
                   
                   
                          if (!fetching.ok) {
                           
                            barcode = false
                            return [ISBN, authTrue]
                        }
                        let response = await fetching.json()
                         dial.querySelector("#submit").disabled = false
                        if (Object.keys(response).length === 0) {
                            return [ISBN, authTrue]
                        }
                        const book = response["ISBN:" + ISBN]
                        
                        if (!book) {
                            return [ISBN, authTrue]
                        }
                        dial.close()
                        return [book.title !== null ? book.title : ISBN, book.authors[0].name ? book.authors[0].name : authTrue]
                        
                        }
                        
          

                if (!isVisited) {
                    isVisited = "did"
                    localStorage.setItem("visit", isVisited)
                    document.getElementById("starter").showModal()
                }

                async function submission() {
                        const tempHolds = document.getElementById("tempHolds");
                const tempClone = tempHolds.content.cloneNode(true);

                tempClone.querySelector(".titleHold").innerText =  (await check(title.value.replace("-", ""), ""))[0]

         
                    const result = (await check(title.value.replace("-", ""), author.value))[1]
                    theAuthor = result
             
                
                tempClone.querySelector(".personHold").innerText = "Author: " + theAuthor
                barcode = false
                const canvas = tempClone.querySelector("#picture");
                const date = tempClone.querySelector("#date");
                const ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                container.prepend(tempClone);
                
                let dates = new Date();
                date.innerText = dates.getHours() + ":" + String(dates.getMinutes()).padStart(2, "0") + ", " + dates.getDate() + "/" + dates.getMonth() + "/" + dates.getFullYear();
               titleList.push((await check(title.value.replace("-", ""), ""))[0]);
               authorList.push(theAuthor);
               imageList.push(canvas.toDataURL());
               dateList.push(dates.getHours() + ":" + String(dates.getMinutes()).padStart(2, "0") + ", "  + dates.getDate() + "/" + dates.getMonth() + "/" + dates.getFullYear());
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
                }

                searching.forEach(searchItem => {
                    searchItem.addEventListener("input", e => {
                    

                    document.querySelectorAll(".holder").forEach(item => {
                     
                        if ((item.querySelector(".titleHold").innerText.toLowerCase().includes(searchItem.value.toLowerCase()) && !authors) || (authors && item.querySelector(".personHold").innerText.slice(7).toLowerCase().includes(searchItem.value.toLowerCase()))) {
                            item.style.display = "block"

                        }
                        else {
                            item.style.display = "none"
                        }
                    })
                })
            })

                
                    
                        
         
            

            
