// find post edit form
// var postEditForm = document.getElementById('postEditForm');
// var contents = document.getElementById('contents');

// add submit listener to post edit form
document.getElementById('#postEditForm').addEventListener('submit', function(evt) {
    evt.preventDefault();
    // postEditForm.addEventListener('submit', function(event) {
    // find length of uploaded images
    let imageUploads = document.getElementById('imageUpload').files.length;
    // find total number of existing images
    let existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length;
    // find total number of potential deletions
    let imgDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked').length;
    // calculate total after removal of deletions and addition of new uploads
    let newTotal = existingImgs - imgDeletions + imageUploads;
    // if newTotal is greater than four
    if (newTotal > 4) {
        // prevent form from submitting
        event.preventDefault();
        // calculate removal amount
        let removalAmt = newTotal - 4;
        // alert user of their error
        alert(`You need to remove at least ${removalAmt} (more) image${removalAmt === 1 ? '' : 's'}!`);
    }
});