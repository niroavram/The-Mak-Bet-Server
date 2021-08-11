const mongoose = require("mongoose");
const League = mongoose.model("League");
const Game = mongoose.model("Game");
var unirest = require("unirest");
const api_url = "https://api-football-v1.p.rapidapi.com/v3/fixtures";
const {leagues_id} = require('./leagues')


exports.Testing = function (S,C) {
    let D=["22-10-10","22-10-10","22-10-10"]
    let A=[-20,-80,-60]

    const monthYearCount = [];
    let sum=0
    for(var i=0;i<A.length;i++){
        var date= D[i]
        var arrTemp= date.split("-")
        sum+=A[i]
        if(i===0){
            arrTemp[2]=1
            arrTemp.push(A[i])
             monthYearCount.push(arrTemp)
        }
        else{

            for(var l=0;l<monthYearCount.length;l++){
                if(monthYearCount[l][0]==arrTemp[0]&&monthYearCount[l][1]==arrTemp[1]){
                    monthYearCount[l][2]++
                    monthYearCount[l][3]+=A[i]
                }else{
                    arrTemp[2]=1
                    arrTemp.push(A[i])
                     monthYearCount.push(arrTemp)
                }
            }
        }
      
    }
    let month = 12
    for(var i =0 ; i<monthYearCount.length;i++){
        if(monthYearCount[i][2]>2&&monthYearCount[i][3]<-99){
            month--
        }
    }
    console.log(monthYearCount)
    console.log(month)
    console.log(sum - (month*5))
    
}


function solution(S, C) {
    // write your code in JavaScript (Node.js 8.9.4)
    let arr = S.split("\n").map(a=> a.split(","))
    let iCol = 0 
    while(!arr[0][iCol].includes(C)){
        iCol++;
    }
    var max = arr[1][iCol]
    for(var i=1;i<arr.length;i++){
        if(arr[i][iCol]>max){
            max = arr[i][iCol];
        }
    }
return max;
}

function A(){
    let number=1;
    let counter = 0;
    let arr=S.split(" ")
    
    while(number<=N) { if (arr.find(number=> number.includes(number + "B") || number.includes(number + "C")|| number.includes(number + "D")|| number.includes(number + "E")).FirstOrDefault()==null)
        {
            arr.addRange(number.toString() + "B", number + "C",number + "D" , number + "E");
            counter++;
        }
    
        if (arr.find(number=> number.includes(number + "F") || number.includes(number + "G")|| number.includes(number + "H")|| number.includes(number + "J")).FirstOrDefault()==null)
        {
            arr.addRange(number + "F", number + "G",number + "H" , number + "J");
            counter++;
        }
    
        if (arr.find(number=> number.includes(number + "D") || number.includes(number + "E")|| number.includes(number + "F")|| number.includes(number + "G")).FirstOrDefault()==null)
        {
            arr.addRange(number + "D", number + "E",number + "F" , number + "G");
            counter++;
        }
    
        number++;
    }
    
    return counter;
}
