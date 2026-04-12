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

            
