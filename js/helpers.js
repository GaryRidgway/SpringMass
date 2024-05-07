function normalizeVector(vectorObject) {
    const vo = vectorObject;
    const max = Math.abs(vo.x + vo.y);
    const x = vo.x/max;
    const y = vo.y/max;

    return {x:x, y:y};
}


function distance(a, b) {
    const a1 = a.x - b.x;
    const b1 = a.y - b.y;

    return Math.sqrt( a1*a1 + b1*b1 );
}