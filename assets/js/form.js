var count = 0;
var titleArr = [];
var imageArr = [];
var descArr = [];
var interestArr = [];
var activeArr = [];
var divCount = 0;
var divId = 0;
var imgData =[];
var editId = [];


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = time+' / '+date;

function main() {
    var title = $("#title").val().trim().toLowerCase();
    var desc = $("#desc").val().trim().toLowerCase();
    var file = $("#file").val();
    var active = document.getElementById("active");
    var cb = document.getElementsByName("location");
    console.log(empStr(title, desc));
    $("#submit").css("display","block");
    $("#edit-div").css("display","none");
    //validation
    if(title == ""){
        $("#alert").slideDown();
        $("#warn-text").text("Kindly fill the title fields.");
        return false;
    }
    if(desc == ""){
        $("#alert").slideDown();
        $("#warn-text").text("Kindly fill the description fields.");
        return false;
    }
    else if(checkbox(cb) == false){
        $("#alert").slideDown();
        $("#warn-text").text("kindly fill atleast one checkbox in intreset field.");

    }
    else if(titleRepeat(titleArr, title) == false){
        $("#alert").slideDown();
        $("#warn-text").text("The title is already present try new title.");

    }
    else if(lengthCheck() == false){
        $("#alert").slideDown();
        $("#warn-text").text("The length of title should be 30 or The length of description should be 150.");
    }
    else{
        titleArr.push(title);
            imageArr.push(file);
            descArr.push(desc);
            interestArr.push(checkbox(cb));
            activeArr.push(activateCheck(active));

            //Functions starts
            divId++;
            addContainer(title, desc,checkbox(cb) ,activateCheck(active), dateTime);
/*             $(document).on("click", "#submit", function(){
                console.log($(this).parent("div").parent("div").parent("div").find("#file"));
                console.log(window.URL.createObjectURL($(this).parent("div").parent("div").parent("div").find("#file").files[0]))
            }) */
            divCount = $("#content .content-div").length;
            dropDisable(divCount);
            
            
            //console.log(imgData[divCount-1])
            
            console.log(imgData[0])
            $("#form").css("display", "none");
            res();
    }
    
}







function dropDisable(divCount){
    if(divCount > 0){
        $("#statusdrop, #interestdrop, #navsearch").prop("disabled", false);
    }else{
        $("#statusdrop, #interestdrop, #navsearch").prop("disabled", true);
    }
    return;
}

//empty and string or number validations
function empStr(title, desc) {
    let result = false;
    let str = /^[A-Za-z]+$/;
    if (title != "" && desc != "" && title.match(str) && desc.match(str)) {
        result = true;
        
    } else {
        result = false;
    }
    return result;
}

//check box validation for multiple checks
function checkbox(cb) {
    let result = false;
    let arr = [];
    for (let i = 0; i < cb.length; i++) {
        if (cb[i].checked) {
            arr.push(cb[i].value);
        }
        if (arr.length <= 0) {
            result = false;
        } else {
            result = true;
            result = arr;
        }
    }
    return result;
}

function lengthCheck(){
    let result;
    if(($("#title").val().length > 30 )|| $("#desc").val().length > 150){
        result = false;
    }else{
        result = true;
    }
    return result;
}



//active check box validation
function activateCheck(active) {
    let result;
    if (active.checked) {
        result = active.value;
    } else {
        result = "inactive";
    }
    return result;
}

//reset validation of form
function res() {
    title.value = "";
    desc.value = "";
    $("input[type=checkbox]").prop("checked", false);
    document.getElementById("file").value = "";
}

function addContainer(title, desc,interest,active, created) {
    const profileCont = `<div id="${divId}" class="content-elements">
    <div style="width:100%;height:70px;display:flex; align-items:center; justify-content:start">
        <img src="" id="content-image" class="img${divId}" style="border-radius: 50%" width="60px" height="60px" />
        <p id="content-title" class="title${divId}" style="padding-left:1rem;margin:0;font-size:1.5rem;font-weight:700;color:#009961"> ${title}</p>
    </div></br>
                            <p>description : <span id="content-desc" class="desc${divId}">${desc}</span></p>
                            <p>interest : <span id="content-interest" class="interest${divId}">${interest}</span></p>
                            <p>status : <span id="content-status" class="status${divId}">${active}</span></p>
                            <p>created : <span id="content-created">${created}</span></p>
                            <button id="delete" class="btn btn-danger">delete</button></br>
                            <button id="edit" class="btn btn-warning">edit</button>
    </div>`;
    const newDiv = document.createElement("div");
    newDiv.classList.add("content-div", "col-lg-4");
    newDiv.innerHTML = profileCont;
    document.getElementById("content").append(newDiv);
    console.log("add");
    console.log(document.getElementsByClassName(`img${divId}`));
    $(`.img${divId}`).attr("src", imgData[divId - 1])
    return;
}

    
function titleRepeat(titleArr,title){
    let result = true;
    let n = titleArr.length;
    let i = 0;
    for(i = 0;i<n;i++){
        if(title == titleArr[i]){
            result = false;
        }
    }
    return result;
}


var inp = document.querySelector('input[type = "file"]');
inp.addEventListener('change', function(e){
    console.log(inp.files);
    const reader = new FileReader();
    reader.onload = function(){
        imgData.push(reader.result);
        console.log(imgData)
    }

    reader.readAsDataURL(inp.files[0])
},false)



function realSearch() {
    let inp = document.getElementById("navsearch").value.toLowerCase();
    console.log(inp.length)
    if(inp.length == 0){
            $(".content-div").show();
       }else{
            for(let i = 1; i <= divCount; i++){
                if($(`.title${i}`).text().indexOf(inp) > -1){
                    $(`.title${i}`).parent("div").parent("div").parent("div").show();
                }
                else{
                    $(`.title${i}`).parent("div").parent("div").parent("div").hide();
                }
            }
       }
}


/* function filterStatus() {
    console.log("working");
    if($("option").attr("value", "active")){
        for(let i = 1; i <= divCount; i++){
                if($(`.status${i}`).text() == "active"){
                    console.log($(`.status${i}`).text())
                    $(`.status${i}`).parent("div").parent("div").parent("div").show();
                }
                else{
                    $(`.status${i}`).parent("div").parent("div").parent("div").parent("div").hide();
                }
            }
    }
    /* if(value == "status"){
        $(".content-div").show();
    }else if(value == "active"){
        for(let i = 1; i <= divCount; i++){
                if($(`.status${i}`).text() == "active"){
                    console.log($(`.status${i}`).text())
                    console.log(true)
                    $(`.status${i}`).parent("div").parent("div").parent("div").show();
                }
                else{
                    $(`.status${i}`).parent("div").parent("div").parent("div").hide();
                    console.log(false)
                }
            }
    }
} */