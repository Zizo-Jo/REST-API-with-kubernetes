import { loadImage } from './visuals.js';
import { check_bon } from './gameLogic.js';

const bonusscore = document.getElementById("lowscore")
const bonustext = document.getElementById("lowscore2")
const monret2 = document.getElementById("monret2")

const cellWidth = (0.7 * window.innerWidth) / 5;
const cellHeight = (0.7 * window.innerHeight) / 5;
const cellWidthBon = cellWidth*1.125
const sonidoExtra = document.getElementById("sonidoExtra");
export async function paint_bon(context,matrix, specialType, speed) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
        setTimeout(function () {
            if (1 <= matrix[i][j] && matrix[i][j] <= 3300) {
                matrix[i][j] = 1;
                context.fillStyle = "brown";
                context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
                if (!specialType){
                    loadImage(slimeImages.earthi, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.3, (i - 1) * cellHeight + cellHeight * 1.3, cellWidthBon * 0.4, cellHeight * 0.4);
                    });
                }else{
                    loadImage(slimeImages.earthiii, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.1, (i - 1) * cellHeight + cellHeight * 1.1, cellWidthBon * 0.8, cellHeight * 0.8);
                    });
                }
                
            } 
            else if (3301 <= matrix[i][j] && matrix[i][j] <= 5200) {
                matrix[i][j] = 2;
                context.fillStyle = "red";
                context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
                if (!specialType){
                    loadImage(slimeImages.firei, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.2, (i - 1) * cellHeight + cellHeight * 1.2, cellWidthBon * 0.6, cellHeight * 0.6);
                });
                }else{
                    loadImage(slimeImages.fireiii, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidthBon * 0.9, cellHeight * 0.9);
                });
                }
                
            } else if (5201 <= matrix[i][j] && matrix[i][j] <= 7200) {
                matrix[i][j] = 3;
                context.fillStyle = "blue";
                context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
                if (!specialType){
                    loadImage(slimeImages.icei, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.21, (i - 1) * cellHeight + cellHeight * 1.21, cellWidthBon * 0.58, cellHeight * 0.58);
                });
                }else{
                    loadImage(slimeImages.iceiii, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidthBon * 0.9, cellHeight * 0.9);
                });
                }
                
            } else if(7201 <= matrix[i][j] && matrix[i][j] <= 8280){
                matrix[i][j] = 4;
                context.fillStyle = "yellow";
                context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
                if (!specialType){
                loadImage(slimeImages.thunderi, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.22, (i - 1) * cellHeight + cellHeight * 1.22, cellWidthBon * 0.56, cellHeight * 0.56);
                });
                }else{
                loadImage(slimeImages.thunderiii, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidthBon * 0.9, cellHeight * 0.9);
                });
                }
            }else if (8281 <= matrix[i][j] && matrix[i][j] <= 9250) {
                matrix[i][j] = 5;
                context.fillStyle = "#354f35";
                context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
                if (!specialType){
                    loadImage(slimeImages.windi, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.21, (i - 1) * cellHeight + cellHeight * 1.21, cellWidthBon * 0.58, cellHeight * 0.58);
                });
                }else{
                    loadImage(windiii, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.05, (i - 1) * cellHeight + cellHeight * 1.05, cellWidthBon * 0.9, cellHeight * 0.9);
                });
                }
                
            } else if (9251 <= matrix[i][j] && matrix[i][j] <= 9850) {
                matrix[i][j] = 6;
                context.fillStyle = "#c2b79b";
                context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
                loadImage(slimeImages.holyii, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon+ cellWidthBon * 1.2, (i - 1) * cellHeight + cellHeight * 1.2, cellWidthBon * 0.6, cellHeight * 0.6);
                });
            }else if (9851<= matrix[i][j] && matrix[i][j] <= 10001){
                if (matrix[i][j]<=9875){matrix[i][j]=8}
                else if (matrix[i][j]<=9910){matrix[i][j]=9;}
                else if(matrix[i][j]<=9926){matrix[i][j]=10;}
                else{matrix[i][j]=11;}             
                context.fillStyle = "#321e34";
                context.fillRect(j * cellWidthBon, i * cellHeight, cellWidthBon, cellHeight);
                loadImage(slimeImages.darkness, function (image) {
                    context.drawImage(image, (j - 1) * cellWidthBon + cellWidthBon * 1.15, (i - 1) * cellHeight + cellHeight * 1.15, cellWidthBon * 0.7, cellHeight * 0.7);
                });

            }
        }, 30-(speed/10));
        await new Promise(resolve => setTimeout(resolve, (30-(speed/10))*(matrix[i].length-1)));
        context.fillStyle = "black";
        if (specialType){
            context.fillStyle = "#111";
        }
        context.fillRect((j + 1) * cellWidthBon - 5 / 2, i * cellHeight, 3, cellHeight);
        if (i < matrix.length - 1) {
            context.fillRect(j * cellWidthBon, (i + 1) * cellHeight - 2 / 2, cellWidthBon, 2);
        }
        
        }
    }
}
export async function paint_bonus(context, countbono, specialType, monAposta, speed, soScroll, monTotal , monrettxt, canvas, monret, montot, varianca, in_bonus){
    console.log("LALAL")
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle= "#383737"
    context.fillRect(0, 0, canvas.width -cellWidth/2, canvas.height);
    context.fillStyle= "#000"
    context.fillRect((canvas.width -2-cellWidth/2), 0,(canvas.width-cellWidth/2),canvas.height);
    context.fillStyle= "#87CEEB"
    context.fillRect(canvas.width -cellWidth/2, 0,canvas.width,canvas.height);
    context.fillStyle = "white";
    console.log("LALAL")
    for (let index=0;index<countbono;index++){
        console.log(index)
        console.log(countbono)
      let numrand=Math.random()*100 +1;
      console.log(numrand)
      if (numrand<=45){
        loadImage(slimeImages.buffer, function (image) {
          context.drawImage(image, canvas.width-cellWidth/2+cellWidth*0.05, canvas.height*(index+2)/(countbono+4)+cellHeight*0.05 , cellWidth * 0.4, cellHeight * 0.4);
        });
      }else if(numrand<=65){
        loadImage(slimeImages.defender, function (image) {
            context.drawImage(image, canvas.width-cellWidth/2+cellWidth*0.05, canvas.height*(index+2)/(countbono+4)+cellHeight*0.05 , cellWidth * 0.4, cellHeight * 0.4);
        });
      }else if (numrand<=80){ 
        loadImage(slimeImages.healer, function (image) {
            context.drawImage(image, canvas.width-cellWidth/2+cellWidth*0.05, canvas.height*(index+2)/(countbono+4)+cellHeight*0.05 , cellWidth * 0.4, cellHeight * 0.4);
        });
      }else if (numrand<=95){
        loadImage(slimeImages.defender, function (image) {
            context.drawImage(image, canvas.width-cellWidth/2+cellWidth*0.05, canvas.height*(index+2)/(countbono+4)+cellHeight*0.05 , cellWidth * 0.4, cellHeight * 0.4);
        });
      }else{
        loadImage(slimeImages.attacker, function (image) {
            context.drawImage(image, canvas.width-cellWidth/2+cellWidth*0.05, canvas.height*(index+2)/(countbono+4)+cellHeight*0.05 , cellWidth * 0.4, cellHeight * 0.4);
        });
      }
    }
    let current=0;
    bonustext.innerHTML= "Bonus Return: "
    bonusscore.innerHTML = "0.00$";
    for (let k=0;k<(8+(countbono-3)*4);k++){
        console.log(8+(countbono-3)*4)
        soScroll.play()
        context.clearRect(0,0,canvas.width-cellWidth/2 -cellWidthBon*0.01,canvas.height)
        let matriu = Array.from({ length: 5 }, () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 10000) + 1));
        await paint_bon(context,matriu, specialType, speed)
        let a=await check_bon(context, matriu,monAposta, varianca, speed, monret, in_bonus, specialType)
        if (a==0){
            monret2.innerHTML = "";
        }else{
            monret2.innerHTML = "+"+ a.toFixed(2) + "$";
        }
        current+=a;
        bonusscore.innerHTML = current.toFixed(2) + "$";
        await new Promise(resolve => setTimeout(resolve, 700-speed*6));
    }
    countbono=0;
    monret2.innerHTML = "";
    bonustext.innerHTML= "Final Bonus Return: "
    return current;
}