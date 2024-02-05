function getImage(originalImage) {
    // console.log(originalImage[0])


    // var canvas = document.querySelector('canvas');
    // var ctx = canvas.getContext('2d');

    //if(e.target.name === 'photo'){

        // let file = e.target.files;
        // console.log(file)

        let r = new FileReader()

        r.onload = res => {

            var img = new Image();

            // Set the source of the image
            img.style.height = '200px'
            img.style.width = '200px'
            img.src = r.result;

            // When the image has loaded, draw it onto the canvas
            // img.onload = function() {
            //     // Draw the image at coordinates (x, y)
            //     ctx.drawImage(img, 100, 50, 250, 220); // Adjust the coordinates as needed
            // };

            // ctx.clearRect(0, 0, canvas.width, canvas.height);
            // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        }

        r.readAsDataURL(originalImage[0]);

    //}


    
}

module.exports = {getImage}