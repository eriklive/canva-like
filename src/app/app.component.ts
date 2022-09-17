import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';

class Circulo {
  private _layer = new Konva.Layer();
  private _object: Konva.Circle;

  constructor(id: number) {
    this._object = new Konva.Circle({
      x: 250,
      y: 250,
      radius: 245,
      fill: '#8dbf2e',
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
      id: id.toString(),
      name: id.toString(),
    });

    this._layer.add(this._object);
  }

  public get layer() {
    return this._layer;
  }

  public get objeto() {
    return this._object;
  }
}

class Escudo {
  private _layer = new Konva.Layer();
  private _object: any;

  constructor(id: number) {
    this._object = new Konva.Path({
      class: 'escudo',
      x: 26,
      y: 4,
      data: 'M55.713,0c20.848,13.215,39.682,19.467,55.846,17.989 c2.823,57.098-18.263,90.818-55.63,104.891C19.844,109.708-1.5,77.439,0.083,17.123C19.058,18.116,37.674,14.014,55.713,0L55.713,0 z M55.735,7.055c18.454,11.697,35.126,17.232,49.434,15.923c2.498,50.541-16.166,80.39-49.241,92.846 C23.986,104.165,5.091,75.603,6.493,22.211C23.29,23.091,39.768,19.46,55.735,7.055L55.735,7.055z',
      width: 112,
      height: 123,
      draggable: true,
      fill: '#8dbf2e',
      stroke: 'black',
      strokeWidth: 2,
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
      name: id.toString(),
    });

    this._layer.add(this._object);
  }

  public get layer() {
    return this._layer;
  }

  public get objeto() {
    return this._object;
  }
}

class Shield {
  public draw(id: number): Konva.Path {
    return new Konva.Path({
      class: 'escudo',
      x: 26,
      y: 4,
      data: 'M55.713,0c20.848,13.215,39.682,19.467,55.846,17.989 c2.823,57.098-18.263,90.818-55.63,104.891C19.844,109.708-1.5,77.439,0.083,17.123C19.058,18.116,37.674,14.014,55.713,0L55.713,0 z M55.735,7.055c18.454,11.697,35.126,17.232,49.434,15.923c2.498,50.541-16.166,80.39-49.241,92.846 C23.986,104.165,5.091,75.603,6.493,22.211C23.29,23.091,39.768,19.46,55.735,7.055L55.735,7.055z',
      width: 112,
      height: 123,
      draggable: true,
      fill: '#8dbf2e',
      stroke: 'black',
      strokeWidth: 2,
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
      name: id.toString(),
    });
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private _stage: any;
  public layers: Array<Konva.Layer> = [];
  public currentTarget: number = -1;
  public transformer = new Konva.Transformer();
  public indexes: number = 0;
  public colorControl = new FormControl('');

  ngAfterViewInit(): void {
    this.resetCanva();
    this._addListeners();
  }

  private _addListeners() {
    this.colorControl.valueChanges.subscribe((update) =>
      this.changeColor(update)
    );
  }

  public get stage(): Konva.Stage {
    return this._stage;
  }

  public set stage(params) {
    this._stage = params;
  }

  public resetCanva() {
    this.stage = new Konva.Stage({
      container: 'container', // id of container <div>
      width: 500,
      height: 500,
    });
  }

  public adicionar(figuraParaDesenhar: string) {
    // const layer = new Konva.Layer();

    var forma: Escudo | Circulo;

    switch (figuraParaDesenhar) {
      case 'ESCUDO':
        forma = new Escudo(this.indexes++);
        break;
      case 'CIRCULO':
        forma = new Circulo(this.indexes++);
        break;
      default:
        return;
    }

    this.layers.push(forma.layer);
    this.stage.add(forma.layer);

    const addTransformer = (e: any) => {
      if (this.currentTarget === -1) {
        // Callback para sempre que selecionarem uma forma, a gente pegar qual o id dado àquela forma
        this.currentTarget = Number(e.target.attrs.id);

        this._addTransformer(forma.layer, forma.objeto);
        this._updateColorPicker(e);
      } else {
        this.transformer.nodes([]);
        this.currentTarget = -1;
      }
    };

    forma.layer.on('click', addTransformer);

    forma.layer.draw();
  }

  private _addTransformer(layer: Layer, forma: any) {
    layer.add(this.transformer);

    this.transformer.nodes([forma]);
  }

  private _updateColorPicker(e: any) {
    this.colorControl.patchValue(e.target.attrs.fill);
  }

  public changeColor(color: string) {
    const layer = this._findLayer();
    layer.getChildren()[0].attrs.fill = color;
    layer.draw();
  }

  public moveDown(): void {
    const layer = this._findLayer();
    layer.moveDown();
  }

  public moveUp(): void {
    const layer = this._findLayer();
    layer.moveUp();
  }

  public destroy() {
    const layer = this._findLayer();
    layer.remove();
  }

  private _findLayer(): Layer {
    let layer;

    if (this.currentTarget != -1) {
      const layers = this.stage.getLayers();

      layer = layers.find((layer) => {
        if (layer.children) {
          return Number(layer.children[0].attrs.id) === this.currentTarget;
        }

        return false;
      });
    }

    if (!layer) throw new Error('Inválido');

    return layer;
  }

  public download() {
    console.log(this.stage.toJSON());
  }

  public exportImage() {
    try {
      this.transformer.nodes([]);

      var dataURL = this.stage.toDataURL({
        pixelRatio: 2,
      });

      var link = document.createElement('a');

      link.download = 'name.jpg';
      link.href = dataURL;
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (e) {
      console.log(e);
    }
  }
}
