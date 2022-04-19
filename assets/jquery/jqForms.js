$("#alert").hide();

$(document).ready(function () {
    $("#add").click(function () {
        $("#form").fadeIn().css("display", "block");
    });

    $("#exit").click(function () {
        $("#form").fadeOut();
        $("#submit").css("display","block");
        $("#edit-div").css("display","none");
        editId.pop();
        res();
    });

    $("#exit-alert").click(function(){
        $("#alert").slideUp();
    })
});

var counter = function () {
    let desc = $("#desc").val();
    if (desc.length == 0) {
        $("#count").html(0);
        return;
    }
    let charCount = desc.length;
    $("#count").html(charCount);
};

$(document).ready(function () {
    $("#desc").change(counter);
    $("#desc").keydown(counter);
    $("#desc").keypress(counter);
    $("#desc").keyup(counter);
    $("#desc").blur(counter);
    $("#desc").focus(counter);
});



//deleting all elements of div
$(document).ready(function(){
    $(document).on("click", "#delete", function() {
        let text = "Press a button!\nEither OK or Cancel.";
        if (confirm(text) == true) {
            $(this).closest(".content-div").remove();
            divCount--;
            dropDisable(divCount);
            console.log($(this).parent("div").attr("id"));
            let contId = $(this).parent("div").attr("id");
            try{
                titleArr.splice(contId-1, 1);
                descArr.splice(contId-1, 1);
                imageArr.splice(contId-1, 1);
                interestArr.splice(contId-1, 1);
                activeArr.splice(contId-1, 1);
            }catch(ex){
                console.log(ex);
            }
            if(divCount == 0){
                divId = 0;
                console.log(divId)
            }
        } else {
             $("#alert").slideDown();
            $("#warn-text").text("the request for deletion is cancelled.");
        }
    });
});


//Get the form elements to edit
$(document).ready(function(){
    $(document).on("click", "#edit", function() {
        let parent = $(this).parent("div");
        let titleText = parent.find("#content-title").text();
        let descText = parent.find("p #content-desc").text();
        let interestText = parent.find("p #content-interest").text();
        let statusText = parent.find("p #content-status").text();
        console.log(titleText);
        console.log(descText);
        console.log(interestText);
        
        editId.push($(this).parent("div").attr("id"))
        console.log(editId)
        
        $("#title").val(titleText);
        $("#desc").val(descText);
        if(statusText == "active"){
            $("#active").prop("checked", true);
        }else{
            $("#active").prop("checked", false);
        }
        // let loc = document.getElementsByName("location");
        // let locs = $("input[type = 'checkbox']").attr("name", "location")
        let intr = interestText.split(",");
        for(let i = 0; i < intr.length; i++){
            $(`#${intr[i]}`).prop("checked", true);
        }

        $("#form").fadeIn().css("display", "block");
        $("#edit-div").css("display","block");
        $("#submit").css("display","none");
    });
});






$(document).ready(function(){
    $(document).on("click", "#edit-div", function(){
        console.log("Im edit");
        let title = $("#title").val().trim().toLowerCase();
    let desc = $("#desc").val().trim().toLowerCase();
    let file = $("#file").val();
    let active = document.getElementById("active");
    let cb = document.getElementsByName("location");
    //validation
    if(title == ""){
        $("#alert").slideDown();
        $("#warn-text").text("Kindly fill the title fields.");
        return false;
    }
    else if(desc == ""){
        $("#alert").slideDown();
        $("#warn-text").text("Kindly fill the description fields.");
        return false;
    }
    else if(strCheck(title, desc) == false){
        $("#alert").slideDown();
        $("#warn-text").text("Empty spaces or Characters or Numbers are not allowed");
    }
    else if(checkbox(cb) == false){
        $("#alert").slideDown();
        $("#warn-text").text("kindly fill atleast one checkbox in intreset field.");
        $("#form").fadeOut();

    }
    else if(lengthCheck() == false){
        $("#alert").slideDown();
        $("#warn-text").text("The length of title should be 30 or The length of description should be 150.");
        $("#form").fadeOut();
    }
    else{
            titleArr.splice(title);
            imageArr.push(file);
            descArr.push(desc);
            interestArr.push(checkbox(cb));
            activeArr.push(activateCheck(active));
            $(`.title${editId[0]}`).text(title);
            $(`.desc${editId[0]}`).text(desc);
            let actives = document.getElementById("active");
            if (actives.checked) {
                $(`.status${editId[0]}`).text(actives.value);
            } else {
                $(`.status${editId[0]}`).text("inactive");
            }

            let cbs = document.getElementsByName("location");
            let intArr = [];
            for (let i = 0; i < cbs.length; i++) {
                if (cbs[i].checked) {
                    intArr.push(cbs[i].value);
                }
            }
            $(`.interest${editId[0]}`).text(intArr.join());
            
            editId.pop();
            console.log(imgData[0])
            $("#form").css("display", "none");
            $("#submit").css("display","block");
            $("#edit-div").css("display","none");
            res();
        }   
    })
})





$( "#statusdrop" ).change(function() {
    var selectedEventType = this.options[this.selectedIndex].value;
    if (selectedEventType == "status") {
        $(".content-div").show();
    }else if(selectedEventType == "active"){
        for(let i = 1; i <= divCount; i++){
            if($(`.status${i}`).text() == "active"){
                $(`.status${i}`).parent().parent("div").parent("div").show()
            }
            else{
                $(`.status${i}`).parent().parent("div").parent("div").hide()
                }
            }
    }else if(selectedEventType == "inactive"){
        for(let i = 1; i <= divCount; i++){
            if($(`.status${i}`).text() == "inactive"){
                $(`.status${i}`).parent().parent("div").parent("div").show()
            }
            else{
                $(`.status${i}`).parent().parent("div").parent("div").hide()
                }
            }
    }
});

$( "#interestdrop").change(function() {
    var selectedEventType = this.options[this.selectedIndex].value;
    if (selectedEventType == "interest") {
        $(".content-div").show();
    }else if(selectedEventType == "chennai"){
        for(let i = 1; i <= divCount; i++){
            if($(`.interest${i}`).text().indexOf("chennai") > -1){
                $(`.interest${i}`).parent().parent("div").parent("div").show()
            }
            else{
                $(`.interest${i}`).parent().parent("div").parent("div").hide()
                }
            }
    }else if(selectedEventType == "madurai"){
        for(let i = 1; i <= divCount; i++){
            if($(`.interest${i}`).text().indexOf("madurai") > -1){
                $(`.interest${i}`).parent().parent("div").parent("div").show()
            }
            else{
                $(`.interest${i}`).parent().parent("div").parent("div").hide()
                }
            }
    }else if(selectedEventType == "coimbatore"){
        for(let i = 1; i <= divCount; i++){
            if($(`.interest${i}`).text().indexOf("coimbatore") > -1){
                $(`.interest${i}`).parent().parent("div").parent("div").show()
            }
            else{
                $(`.interest${i}`).parent().parent("div").parent("div").hide()
                }
            }
    }
    else if(selectedEventType == "kanchipuram"){
        for(let i = 1; i <= divCount; i++){
            if($(`.interest${i}`).text().indexOf("kanchipuram") > -1){
                $(`.interest${i}`).parent().parent("div").parent("div").show()
            }
            else{
                $(`.interest${i}`).parent().parent("div").parent("div").hide()
                }
            }
    }
});