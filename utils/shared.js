export function isolate(context, fn) {
    context.save();
    context.beginPath();
    fn();
    context.closePath();
    context.restore();
}

export function loadImage( src ) {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.src = src;
    });
}

export function isFunc( any ) {
    return typeof any === "function";
}

export function splice( arr, item ) {
    const index = arr.indexOf( item );
    if( index < 0 ) return;
    arr.splice( index, 1 );
}

export function random( arr ) {
    const index = Math.floor( Math.random() * arr.length );
    return arr[ index ];
}