
module.exports.getDate  = function ()
{
    const today  =  new Date()
    const options ={
        weekday : "long",
        day : "numeric",
        month : "long"

}
return today.toLocaleDateString("en-US",options)
}

module.exports.getDay = function()
{
    const today  =  new Date()
    const options ={
    weekday : "long",
}
return today.toLocaleDateString("en-US",options)
}





// if(currentday === 6  || currentday === 0)
// {
//     day = "weekend"
//     //res.send("its weekend")
//     res.render("list",{kindofday : day})
// }
// else
// {
//     day = "weekday"
//    // res.sendFile(__dirname + "/index.html")
//    res.render("list",{kindofday : day})
// }


// switch (currentday){
//     case 0:
//         day = "sunday"
//         break
//     case 1:
//         day = "monday"
//         break
//     case 2:
//         day = "tuesday"
//         break
//     case 3:
//         day = "wednesday"
//         break
//     case 4:
//         day = "thursday"
//         break
//     case 5:
//         day = "friday"
//         break
//     case 6:
//         day = "saturday"
//         break
//     default:
//         console.log("error ")
// }
