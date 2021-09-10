const mongoose = require("mongoose");
const League = mongoose.model("League");
const Game = mongoose.model("Game");

exports.Testing = function () {

  League.findOneAndUpdate(
    { upcoming: "61388a3d5e2ec35314e6" },
    {
      $pull: { upcoming: "61388a3d5e2ec35314e6" },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("hey");
      } else {
        console.log(doc);
      }
    }
  );
 League.find({upcoming: "61388a3d5e2ec35314e6"})
 .then((leagues)=>{
  console.log(leagues);
 })
 .catch((err) => {
    console.log("err");
  });
};

// function bef (before, value, m ,n){
//     for(var m=0;m<=i;i++){
//         for(var n=0;n<=l;l++){
//           value=value-before[n][m]
//         }
//       }
//      return value
//       }

// }
// function solution(S, C) {
//     // write your code in JavaScript (Node.js 8.9.4)
//     let arr = S.split("\n").map(a=> a.split(","))
//     let iCol = 0
//     while(!arr[0][iCol].includes(C)){
//         iCol++;
//     }
//     var max = arr[1][iCol]
//     for(var i=1;i<arr.length;i++){
//         if(arr[i][iCol]>max){
//             max = arr[i][iCol];
//         }
//     }
// return max;
// }

// function A(){
//     let number=1;
//     let counter = 0;
//     let arr=S.split(" ")

//     while(number<=N) { if (arr.find(number=> number.includes(number + "B") || number.includes(number + "C")|| number.includes(number + "D")|| number.includes(number + "E")).FirstOrDefault()==null)
//         {
//             arr.addRange(number.toString() + "B", number + "C",number + "D" , number + "E");
//             counter++;
//         }

//         if (arr.find(number=> number.includes(number + "F") || number.includes(number + "G")|| number.includes(number + "H")|| number.includes(number + "J")).FirstOrDefault()==null)
//         {
//             arr.addRange(number + "F", number + "G",number + "H" , number + "J");
//             counter++;
//         }

//         if (arr.find(number=> number.includes(number + "D") || number.includes(number + "E")|| number.includes(number + "F")|| number.includes(number + "G")).FirstOrDefault()==null)
//         {
//             arr.addRange(number + "D", number + "E",number + "F" , number + "G");
//             counter++;
//         }

//         number++;
//     }

//     return counter;
// }
