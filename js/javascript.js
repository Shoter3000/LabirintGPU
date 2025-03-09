//sweetalert

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = 'img/hdmi.png';

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.sweet').addEventListener('click', function() {
        Swal.fire({
            title: 'Razvijalec',
            text: 'Nejc Vidmar',
            icon: 'info',
            confirmButtonText: 'Zapri',
            customClass: {
                confirmButton: 'swal-button',
                icon: 'custom-icon'
            }
        });
    });
});


//narisi
document.addEventListener("DOMContentLoaded", function (event) {
    let x = 0;
    let y = 1;
    let animating = false;
    let crta = 0;



    function narisi() {
        const resitev = [234,2, 234,10, 202,10, 202,42, 186,42, 186,138, 170,138, 170,122, 154,122, 154,138, 138,138, 138,202, 154,202, 154,218, 138,218, 138,250, 122,250, 122,266, 26,266, 26,282, 74,282, 74,298, 90,298, 90,314, 74,314, 74,330, 90,330, 90,346, 58,346, 58,362, 106,362, 106,346, 122,346, 122,330, 138,330, 138,362, 186,362, 186,282, 202,282, 202,330, 218,330, 218,346, 202,346, 202,378, 186,378, 186,394, 218,394, 218,410, 234,410, 234,442, 202,442, 202,458, 266,458, 266,474, 250,474, 250,482];
        ctx.strokeStyle = "rgb(32, 32, 32)";
        ctx.lineWidth = 5;

        input = document.querySelector("#myRange").value;
        speed = input;

        if (x < resitev.length - 2) {
            //vzame koordinate 
            const startX = resitev[x];
            const startY = resitev[y];
            const endX = resitev[x + 2];
            const endY = resitev[y + 2];

            //izracun dolzine crte
            const dolzinaCrte = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

            //da crta se enako hitro premika
            crta += speed / dolzinaCrte;

            //pr prevelikih hitrostih lahko črta rata prevelika ta linija to prepreči
            if (crta > 1) crta = 1;

            //izračuna nek vmesen x in y, ki bo bil narisan
            const vmesx = startX + (endX - startX) * crta;
            const vmesy = startY + (endY - startY) * crta;

            //riše
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(vmesx, vmesy);
            ctx.stroke();
            ctx.closePath();

            //narise kvadratek v kotih da so napolnjeni
            ctx.fillStyle = "rgb(32, 32, 32)";
            ctx.fillRect(startX - ctx.lineWidth / 2, startY - ctx.lineWidth / 2, ctx.lineWidth, ctx.lineWidth);

            //ko pride do konca črte jo konča
            if (crta >= 1) {
                x += 2;
                y += 2;
                crta = 0;
            }
            requestAnimationFrame(narisi);
        } else {
            //konec animacije
            animating = false;
            document.getElementById('start').disabled = false;
            document.getElementById('oboje').disabled = false;
            document.getElementById('erase').disabled = false;
            document.getElementById('slika').disabled = false;
            document.getElementById('change').src = 'img/monitor.png';
        }
    }

    document.getElementById('start').addEventListener('click', function () {
        //zacetne vrednosti
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x = 0;
        y = 1;
        crta = 0;
        let input = document.querySelector("#myRange").value;
        speed = input;
        //ko zacne animirat disable gumbe
        if (!animating) {

            animating = true;
            this.disabled = true;
            document.getElementById("erase").disabled = true;
            document.getElementById("oboje").disabled = true;
            document.getElementById("slika").disabled = true;
            document.getElementById('change').src = 'img/monitor.gif';
            narisi();
        }
    });
});

//izbrisi
document.addEventListener("DOMContentLoaded", function (event) {
    let xdel = 0;
    let ydel = 1;
    let animatingdel = false;
    let crtadel = 0;

    function izbrisi() {
        const resitev = [234,2, 234,10, 202,10, 202,42, 186,42, 186,138, 170,138, 170,122, 154,122, 154,138, 138,138, 138,202, 154,202, 154,218, 138,218, 138,250, 122,250, 122,266, 26,266, 26,282, 74,282, 74,298, 90,298, 90,314, 74,314, 74,330, 90,330, 90,346, 58,346, 58,362, 106,362, 106,346, 122,346, 122,330, 138,330, 138,362, 186,362, 186,282, 202,282, 202,330, 218,330, 218,346, 202,346, 202,378, 186,378, 186,394, 218,394, 218,410, 234,410, 234,442, 202,442, 202,458, 266,458, 266,474, 250,474, 250,482];

        input = document.querySelector("#myRange").value;
        speed = input;

        if (xdel < resitev.length - 2) {
            const startX = resitev[xdel];
            const startY = resitev[ydel];
            const endX = resitev[xdel + 2];
            const endY = resitev[ydel + 2];

            const dolzinaCrte = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

            crtadel += speed / dolzinaCrte;

            if (crtadel > 1) crtadel = 1;

            const vmesx = startX + (endX - startX) * crtadel;
            const vmesy = startY + (endY - startY) * crtadel;

            //possible fix ce se ze spet break-a
            //to rabim al pa ko enkrat zbrises ne upas narisat vec ubistvu z tem save restore sm nrdu tako da naredi majhno crtico na kateri izbrise vse in nato se tista crtica izbrises, ker ce se ne je vse kar hoces tam narisat nevidno ker uporabljam ctx.globalCompositeOperation = 'destination-out'
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';


            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(vmesx, vmesy);
            ctx.lineWidth = 6;
            ctx.stroke();
            ctx.closePath();


            ctx.beginPath();
            ctx.arc(startX, startY, ctx.lineWidth, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            //povezano z ctx.save
            ctx.restore();

            if (crtadel >= 1) {
                xdel += 2;
                ydel += 2;
                crtadel = 0;
            }

            requestAnimationFrame(izbrisi);
        } else {
            animatingdel = false;
            document.getElementById('start').disabled = false;
            document.getElementById('oboje').disabled = false;
            document.getElementById('slika').disabled = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    document.getElementById('erase').addEventListener('click', function () {
        xdel = 0;
        ydel = 1;
        crtadel = 0;
        let input = document.querySelector("#myRange").value;
        speed = input;
        if (document.getElementById("slika").disabled) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('change').src = 'img/monitor.gif';
            document.getElementById("erase").disabled = true;
        }
        else if (!animatingdel) {
            animatingdel = true;
            this.disabled = true;
            document.getElementById("start").disabled = true;
            document.getElementById("oboje").disabled = true;
            document.getElementById("slika").disabled = true;
            document.getElementById('change').src = 'img/monitor.gif';
            izbrisi();
        }
    });
});

//oboje





//slika
document.addEventListener("DOMContentLoaded", function (event) {
    let x = 0;
    let y = 1;
    let animating = false;
    let crta = 0;

    function moveImage() {
        const resitev = [234,2, 234,10, 202,10, 202,42, 186,42, 186,138, 170,138, 170,122, 154,122, 154,138, 138,138, 138,202, 154,202, 154,218, 138,218, 138,250, 122,250, 122,266, 26,266, 26,282, 74,282, 74,298, 90,298, 90,314, 74,314, 74,330, 90,330, 90,346, 58,346, 58,362, 106,362, 106,346, 122,346, 122,330, 138,330, 138,362, 186,362, 186,282, 202,282, 202,330, 218,330, 218,346, 202,346, 202,378, 186,378, 186,394, 218,394, 218,410, 234,410, 234,442, 202,442, 202,458, 266,458, 266,474, 250,474, 250,482];

        input = document.querySelector("#myRange").value;
        speed = input;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (x < resitev.length - 2) {
            const startX = resitev[x];
            const startY = resitev[y];
            const endX = resitev[x + 2];
            const endY = resitev[y + 2];

            const dolzinaCrte = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            crta += speed / dolzinaCrte;

            if (crta > 1) crta = 1;

            const vmesx = startX + (endX - startX) * crta;
            const vmesy = startY + (endY - startY) * crta;

            //narise sliko z izracunanim mestom, da je v sredini
            ctx.drawImage(img, vmesx - img.width / 2, vmesy - img.height / 2);

            if (crta >= 1) {
                x += 2;
                y += 2;
                crta = 0;
            }

            requestAnimationFrame(moveImage);
        } else {
            animating = false;
            document.getElementById("start").disabled = false;
            document.getElementById("slika").disabled = true;
            document.getElementById("oboje").disabled = false;
            document.getElementById("erase").disabled = true;
            document.getElementById('change').src = 'img/monitor.png';
        }
    }

    document.getElementById('slika').addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        x = 0;
        y = 1;
        crta = 0;

        let input = document.querySelector("#myRange").value;
        speed = input;

        if (!animating) {
            animating = true;
            this.disabled = true;
            document.getElementById("start").disabled = true;
            document.getElementById("oboje").disabled = true;
            document.getElementById("erase").disabled = true;
            document.getElementById('change').src = 'img/monitor.gif';
            moveImage();
        }
    });
});


class SpriteAnimator {
    constructor(imageSrc, frameHeight, totalFrames, frameRate, canvasId) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.frameHeight = frameHeight;
        this.totalFrames = totalFrames;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.image.onload = () => {
            this.startAnimation();
        };

        this.image.onerror = () => {
            console.error("Failed to load image:", imageSrc);
        };
    }

    startAnimation() {
        this.currentFrame = 0;
        this.intervalId = setInterval(() => this.updateFrame(), 1000 / this.frameRate);
    }

    updateFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            this.image,
            0, this.currentFrame * this.frameHeight,
            this.image.width, this.frameHeight,
            0, 0,
            this.canvas.width, this.canvas.height
        );

        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new SpriteAnimator("img/sprite.png", 340, 7, 120, "spriteCanvas");
});

//Oboje

document.addEventListener("DOMContentLoaded", function () {
    let x = 0;
    let y = 1;
    let animating = false;
    let crta = 0;
    let prevX = null;
    let prevY = null;


    ctx.beginPath();
    
    function animatePath() {
        const resitev = [234,2, 234,10, 202,10, 202,42, 186,42, 186,138, 170,138, 170,122, 154,122, 154,138, 138,138, 138,202, 154,202, 154,218, 138,218, 138,250, 122,250, 122,266, 26,266, 26,282, 74,282, 74,298, 90,298, 90,314, 74,314, 74,330, 90,330, 90,346, 58,346, 58,362, 106,362, 106,346, 122,346, 122,330, 138,330, 138,362, 186,362, 186,282, 202,282, 202,330, 218,330, 218,346, 202,346, 202,378, 186,378, 186,394, 218,394, 218,410, 234,410, 234,442, 202,442, 202,458, 266,458, 266,474, 250,474, 250,482];

        let speed = document.querySelector("#myRange").value;
        
        if (x < resitev.length - 2) {
            const startX = resitev[x];
            const startY = resitev[y];
            const endX = resitev[x + 2];
            const endY = resitev[y + 2];

            const dolzinaCrte = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            crta += speed / dolzinaCrte;
            if (crta > 1) crta = 1;

            const vmesx = startX + (endX - startX) * crta;
            const vmesy = startY + (endY - startY) * crta;

            ctx.strokeStyle = "rgb(32, 32, 32)";
            ctx.lineWidth = 5;

            ctx.lineTo(vmesx, vmesy);
            ctx.stroke();

            if (prevX !== null && prevY !== null) {
                ctx.clearRect(prevX - img.width / 2, prevY - img.height / 2, img.width, img.height);
            }
            ctx.drawImage(img, vmesx - img.width / 2, vmesy - img.height / 2);
            
            ctx.fillStyle = "rgb(32, 32, 32)";
            ctx.fillRect(startX - ctx.lineWidth / 2, startY - ctx.lineWidth / 2, ctx.lineWidth, ctx.lineWidth);
            
            prevX = vmesx;
            prevY = vmesy;
            
            if (crta >= 1) {
                x += 2;
                y += 2;
                crta = 0;
            }

            requestAnimationFrame(animatePath);
        } else {
            ctx.closePath();
            animating = false;
            document.getElementById('change').src = 'img/monitor.png';
            document.getElementById("start").disabled = false;
            document.getElementById("oboje").disabled = true;
            document.getElementById("erase").disabled = false;
            document.getElementById("slika").disabled = false;
        }
    }

    document.getElementById('oboje').addEventListener('click', function () {
        ctx.reset();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.moveTo(234,2);

        x = 0;
        y = 1;
        crta = 0;
        prevX = null;
        prevY = null;
        
        if (!animating) {
            animating = true;
            document.querySelectorAll("button").forEach(btn => btn.disabled = true);
            this.disabled = true;
            document.getElementById('change').src = 'img/monitor.gif';
            animatePath();
        }
    });
});
