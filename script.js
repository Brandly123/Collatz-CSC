"use strict";

let calcx = 3;
let start = performance.now();
let ip = 1000;
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

    if(timeCheck > 40 || stressamount){
        ip *= 1.001;
    } else if(timeCheck > 20){
        ip *= 1.01;
    } else {
        ip += 1;
        ip *= 1.03;
    }
    stressamount++;
    if (tickdelay > 0 || (timeCheck <= 30 + done*40 && done <= 1)) stressamount --;
    if (stressamount < 10) {
        document.getElementById("calculated").innerHTML = 
            `#${done+1}: ${timeCheck.toFixed(2)}ms/${30 + done*40}ms stress; stress magnitude of ${Math.log10(ip ** 0.75).toFixed(2)} (exceeded stress frames: ${stressamount}/10)`;
    } else {
        stressamount = 0;
            best += ip;
            done += 1;
        ip /= 2;
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
