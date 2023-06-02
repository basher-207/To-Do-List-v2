const checkbox = $("input[type=checkbox]");
const hiddenInput = $("input[type=hidden]");
$(".delete").hide();

let elementsToDelete = [];

checkbox.change(function() {

    const elementId = $(this).attr("id");

    if($(this).is(":checked")) {

        checkingForDeleteButton();

        elementsToDelete.push(elementId);
        
        hiddenInput.attr("value", elementsToDelete);

        $("li[id=" + elementId + "]").addClass("cross");
    } else {
        const index = elementsToDelete.indexOf(elementId);
        elementsToDelete.splice(index, 1);

        hiddenInput.attr("value", elementsToDelete);

        $("li[id=" + elementId + "]").removeClass("cross");

        checkingForDeleteButton();
    }
})

function checkingForDeleteButton() {
    if(elementsToDelete.length == 0){
        $(".delete").slideToggle();
    }
};


// Hiding and showing box with tasks
const NumberOfTasks = $("li").length;

if(NumberOfTasks === 0){
    $(".items-box").hide();
}else{
    $(".items-box").show();
}