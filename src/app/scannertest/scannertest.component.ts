import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scannertest',
  templateUrl: './scannertest.component.html',
  styleUrls: ['./scannertest.component.css']
})

export class ScannertestComponent implements AfterViewInit {
  Quagga = require('quagga');
  private _scannerIsRunning = false;
  private _deviceSelect: any;

  constructor() { }

  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
    });
    this._deviceSelect = document.getElementById('videoSource') as HTMLInputElement;
    this.getDevice();
  }

  // --- Scanner ---

  // private startScanner(constraintsIn: any) {
  private startScanner(constraintIn: any) {
    const Quagga = this.Quagga;
    try {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          // target: document.querySelector('#scannerContainer'),
          constraints: constraintIn,
          aspectRatio: { min: 1, max: 2 }
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader"
          ]
        },
        locate: "true"
      });
    }
    catch (err) {
      console.log(err);
      return
    }
    finally {
      console.log("Initialization finished. Ready to start");
      Quagga.start();

      // Set flag to is running
      this._scannerIsRunning = true;
    }


    Quagga.onProcessed((result: any) => {
      const Quagga = this.Quagga;
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter((box: any) => {
            return box !== result.box;
          }).forEach((box: any) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });

    Quagga.onDetected((result: any) => {
      console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
    });

  }

  // --- Video Select ---

  public getDevice() {
    this._deviceSelect.innerHTML = '';
    this._deviceSelect.appendChild(document.createElement('option'));
    let count = 1;
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = device.deviceId;
            const label = device.label || `Camera ${count++}`;
            const textNode = document.createTextNode(label);
            option.appendChild(textNode);
            this._deviceSelect.appendChild(option);
          }
        });
      });
  }

  public changeDevice(myEvent: any) {
    // this.startScanner
    if (this._deviceSelect.value === '') {
      this.startScanner({
        height: 400,
        width: 400,
        facingMode: 'environment'
      });
    }
    else {
      this.startScanner({
        height: 400,
        width: 400,
        deviceId: { exact: this._deviceSelect.value }
      })
    }
  }
}

