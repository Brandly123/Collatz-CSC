"use strict";

let calcx = 3;
let start = performance.now();
let ip = 1000;
let done = 0;

let best = 0;
let tickdelay = 3;

function collatzStep() {
    ip *= 1.01;
    ip += 1;
    const maxIterations = Math.floor(ip);
    let iterations = 0;
    
    const timeCheck = performance.now() - start;
    start = performance.now();
    tickdelay --;
    if (tickdelay > 0 || (timeCheck <= 50 && done <= 3)) {
        document.getElementById("calculated").innerHTML = 
            `#${done+1}: ${timeCheck.toFixed(2)}ms/50ms stress; stress magnitude of ${Math.log10(ip ** 0.8).toFixed(2)}`;
    } else {
            best += ip;
            done += 1;
        ip /= 2;
        tickdelay = 2;

        document.getElementById("calculated").innerHTML = 
            ((best/4)**0.4).toLocaleString() + ` Score`;
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

    if(done <= 3) requestAnimationFrame(collatzStep);
}

requestAnimationFrame(collatzStep);
