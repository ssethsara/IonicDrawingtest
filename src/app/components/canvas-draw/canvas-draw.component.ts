import { Component, ViewChild, Renderer ,OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-canvas-draw',
  templateUrl: './canvas-draw.component.html',
  styleUrls: ['./canvas-draw.component.scss'],
})
export class CanvasDrawComponent implements OnInit {

  

  @ViewChild('myCanvas') canvas: any;
  

  context:any;
  
  canvasElement: any;
  lastX: number;
  lastY: number;


  //Display Values
  foundColor:String;
  accuracyPoints:number=0;  
  inaccuracyPoints:number=0; 

//Brush Settings
  currentColour: string = '#0026ff';
  brushSize: number = 2;

  //Change This image to any black and white image
  testImage="../../assets/SinhalaLetter.jpg";

  constructor(public platform: Platform, public renderer: Renderer) {
      console.log('Hello CanvasDraw Component');
  }

  ngOnInit(){

  }

  ngAfterViewInit(){

      this.canvasElement = this.canvas.nativeElement;
      this.context = this.canvasElement.getContext('2d');
      
      this.make_base(this.context);  
      this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
      this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
      
  }

  //To Display Based Image (testImage)
    make_base(context)
    {
        var platformSizeWidth= this.platform.width();
        var platformSizeHeight= this.platform.height();
        if(platformSizeWidth<platformSizeHeight){
            platformSizeHeight=platformSizeWidth;
        }
        var img = document.createElement('img');
        img.height=100;
        img.width=100;
        img.onload = function() {
             context.drawImage(img, 1, 1,platformSizeWidth,platformSizeHeight);
        };
        img.src=this.testImage;
    }

  //First touched position assign  
  handleStart(ev){

      this.lastX = ev.touches[0].pageX;
      this.lastY = ev.touches[0].pageY-130;
  }

  //Identify touch movement 
  handleMove(ev){
      let ctx = this.canvasElement.getContext('2d');
      let currentX = ev.touches[0].pageX;
      let currentY = ev.touches[0].pageY-130;

      //Touched color detection
      this.foundColor=this.CheckColor(currentX,currentY);
      
      //Give Points on Accuracy
      if(this.foundColor=="#000000"){
          this.inaccuracyPoints++;
      }
      if(this.foundColor=="#ffffff"){
        this.accuracyPoints++;
       }


    //Draw line with on canvas
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(currentX, currentY);
      ctx.closePath();
      ctx.strokeStyle = this.currentColour;
      ctx.lineWidth = this.brushSize;
      ctx.stroke();       


      this.lastX = currentX;
      this.lastY = currentY;

     
  }

  //Convert RGB to Hex color code
   rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

//Identify Touched color
CheckColor(currentX,currentY){
    var context = this.canvasElement.getContext('2d');
    var pixelData = context.getImageData(currentX, currentY, 1, 1).data;  var hex = "#" + ("000000" + this.rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
  

    return hex;
    }

}
