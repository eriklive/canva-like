import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';

class Circulo {
  public draw(id: number): Konva.Circle {
    return new Konva.Circle({
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
  }
}

class Escudo {
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
  public _stage: any;
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
    const layer = new Konva.Layer();

    this.layers.push(layer);
    this.stage.add(layer);

    var forma: any;

    switch (figuraParaDesenhar) {
      case 'ESCUDO':
        forma = new Escudo().draw(this.indexes++);
        break;
      case 'CIRCULO':
        forma = new Circulo().draw(this.indexes++);
        break;
    }

    layer.add(forma);

    const addTransformer = (e: any) => {
      // Callback para sempre que selecionarem uma forma, a gente pegar qual o id dado àquela forma
      this.currentTarget = Number(e.target.attrs.id);

      this._addTransformer(layer, forma);
      this._updateColorPicker(e);

      console.log(e);
    };

    forma.on('click', addTransformer);

    layer.draw();
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
}
