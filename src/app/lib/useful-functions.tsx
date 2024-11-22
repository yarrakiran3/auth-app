import { FetchingUserDetailsObject } from "./definitions";

export function getAccountCompletionPercentage(userdetails:FetchingUserDetailsObject){
let percentage=20;
for (let key in userdetails){
    if(userdetails[key]!==null&&userdetails[key]!==undefined&&userdetails[key]!==""&&userdetails[key]!==0){
        percentage+=10;
    }
}
console.log(percentage)
return percentage;
    
}