/// <reference path="../../../definitions/jquery/jquery.d.ts" />
/// <reference path="../../../definitions/pixi-typescript/index.d.ts" />

 class Homme {

    private _renderer : PIXI.WebGLRenderer;
    private _stage    : PIXI.Container;
    private _graphic  : PIXI.Graphics;
    private _ticker   : PIXI.ticker.Ticker;
    private _$container: JQuery;

    private _frequency_1: number;
    private _direction_1: number;
    private _width_1: number;

    private _frequency_2: number;
    private _direction_2: number;
    private _width_2: number;
    
    constructor() {
        
        this._$container = $( '#js-frame' );
        
        this._renderer = new PIXI.WebGLRenderer(this._$container.width(), this._$container.height(), {transparent: true} );
        this._graphic = new PIXI.Graphics();
        this._stage = new PIXI.Container();
        this._ticker = new PIXI.ticker.Ticker();
        
        this._frequency_1 = 5;
        this._width_1 = 250;
        this._direction_1 = 0;

        this._frequency_2 = 5;
        this._width_2 = 60;
        this._direction_2 = 0;
        
        this._stage.addChild(this._graphic);

        this._$container.prepend(this._renderer.view);

        //this._ticker.FPS = 24;
        this._ticker.add( this.animate.bind( this ));
        this._ticker.start();
    }

    private animate():void {

        if(this._renderer) {
            this.draw();
            this._renderer.render(this._stage);
        }
    }

    private draw():any {

        //velocity
        if(this._direction_1 == 0) {
            //velociti up
            this._frequency_1 -= .21;
            this._width_1 += 1.3;
        } else {
            //velociti down
            this._frequency_1 += .21;
            this._width_1 -= .3;
        }
        //wave top
        if(this._frequency_1 < -10){ this._direction_1 = 1}
        //wave bottom
        if(this._frequency_1 > 10){ this._direction_1 = 0}


        if(this._direction_2 == 0) {
            this._frequency_2 -= .1;
            this._width_2 += 1.3;
        } else {
            this._frequency_2 += .1;
            this._width_2 -= .3;
        }
        if(this._frequency_2 > 5){ this._direction_2 = 0}
        if(this._frequency_2 < -5){ this._direction_2 = 1}


        this._graphic.clear();

        // waves
        this._drawWave(this._$container.height() / 2, this._frequency_1, this._width_1, 0x5BCEE6);
        this._drawWave((this._$container.height() / 2) + 5, this._frequency_2, this._width_2, 0x9EEAF9);

        this._graphic.endFill();
    }

    private _drawWave( posX: number, frequency: number, xp: number, color: number ): void {
        
        // waves        
        this._graphic.beginFill(color);
        this._graphic.moveTo(0, posX );
        for(var x = 0; x <= this._$container.width(); x++){

            var y = frequency * Math.sin((Math.PI/xp) * x) + posX ;
            this._graphic.lineTo(x, y);
        }
        this._graphic.lineTo(this._$container.width(), posX );
        this._graphic.lineTo(this._$container.width(), this._$container.height());
        this._graphic.lineTo(0, this._$container.height());
    }
}

new Homme();