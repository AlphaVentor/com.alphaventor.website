


export class AeroColor {


    static BLACK = new AeroColor(0, 0, 0);


    constructor(red, green, blue, transparency = -2) {
        super();
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = transparency;
    }

   
    /**
     * 
     * @param {HTMLElement} target 
     */
    applyAsBackground(target) {
        if(this.a > -1){
            target.style.backgroundColor = `rgb(${this.r},${this.g},${this.b},${this.a})`;
        }
        else{
            target.style.backgroundColor = `rgb(${this.r},${this.g},${this.b})`;
        }
    }

}