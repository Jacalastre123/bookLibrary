titleList.forEach((item, index) => {
    const tempHolds = document.getElementById("tempHolds")
                const tempClone = tempHolds.content.cloneNode(true);
                tempClone.querySelector("#titleHold").innerText = item;
                tempClone.querySelector("#personHold").innerText = "Author: " + authorList[index];
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
 
                colourInput.value = bg;

                customList.forEach(item => {
                    let allEl = document.querySelectorAll("*")
                    allEl.forEach(el => {
                        if (el.id === item.element || el.className === item.element[0]) {
                           if (el.id === "holder") {
                                document.documentElement.style.setProperty("--bgCo", item.colour)
                           } else { el.style.backgroundColor = item.colour }
                        }
                    })
                })

                async function check(ISBN, auth) {
                    dial.querySelector("#submit").disabled = true
                       let authTrue = auth.trim() !== "" ? auth : "None"
                        if (!/^[0-9\-]{10,13}$/.test(ISBN)) {
                            dial.close()
                            dial.querySelector("#submit").disabled = false
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
                       
                       
                        return [book.title !== null ? book.title : ISBN, book.authors[0].name ? book.authors[0].name : authTrue]
                        
                        }
                        
          

                if (!isVisited) {
                    isVisited = "did"
                    localStorage.setItem("visit", isVisited)
                    document.getElementById("starter").showModal()
                }

            
