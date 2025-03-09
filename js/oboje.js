/*oboje

//useless code u can delete dis file - Ben

document.addEventListener("DOMContentLoaded", function () {
    let x = 0;
    let y = 1;
    let animating = false;
    let crta = 0;
    let prevX = null;
    let prevY = null;
    
    const img = new Image();
    img.src = 'img/hdmi.png';
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
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
});*/