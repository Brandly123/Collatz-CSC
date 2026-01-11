"use strict";

let calcx = 3;
let start = performance.now();
let ip = 10000;
let done = 0;

let best = 0;
let tickdelay = 3;
let stressamount = 0;

function collatzStep() {
    const maxIterations = Math.floor(ip);
    let iterations = 0;
    
    const timeCheck = performance.now() - start;
    start = performance.now();
    tickdelay --;

    if(stressamount > 2){
        ip *= 1.005;
    } else if(timeCheck > 20){
        ip *= 1.02;
    } else {
        ip *= 1.1;
    }
    stressamount++;
    if (tickdelay > 0 || (timeCheck <= 40 && !done)) stressamount --;
    if (stressamount < 10) {
        document.getElementById("calculated").innerHTML = 
            `${timeCheck.toFixed(2)}ms/40ms stress; stress magnitude of ${Math.log10(ip ** 0.7).toFixed(2)} (exceeded stress frames: ${stressamount}/10)`;
    } else {
        stressamount = 0;
        best += ip;
        done += 1;
        tickdelay = 2;

        document.getElementById("calculated").innerHTML = 
            ((best/2)**0.5).toLocaleString() + ` Score`;
    }
    
    while (iterations < maxIterations) {
        let x = calcx;
        // Fixed: proper odd/even + early termination
        while (x >= calcx) {
            x = (3 * x + 1) >>> 0;
            while ((x & 1) === 0) x >>>= 1;
        }
        calcx += 2;
        iterations++;
    }

    if(done <= 1) requestAnimationFrame(collatzStep);
}

requestAnimationFrame(collatzStep);
