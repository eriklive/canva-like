import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';

class KonvaObject {
  private _layer: Konva.Layer = new Konva.Layer();
  private _objects: Array<Konva.Path> = [];
  private _colors: Array<FormControl> = [];

  addLayer(layer: Konva.Layer) {
    this._layer = layer;

    if (layer.hasChildren()) {
      layer.children?.forEach((child, childIndex) => {
        const colorControl = new FormControl(child.attrs.fill);
        console.log(child.attrs.fill);
        colorControl.valueChanges.subscribe((update) => {
          this._changeColor(update, childIndex);
        });
        this._colors.push(colorControl);
      });
    }
  }

  addObject(object: Konva.Path) {
    this._objects.push(object);
  }

  public get layer() {
    return this._layer;
  }

  public get objects() {
    return this._objects;
  }

  public get colorControls() {
    return this._colors;
  }

  private _changeColor(color: string, childIndex: number) {
    this._layer.getChildren()[childIndex].attrs.fill = color;
    this._layer.draw();
  }
}

class Shield extends KonvaObject {
  constructor(id: number) {
    super();

    const object = new Konva.Path({
      x: 26,
      y: 4,
      data: 'M55.713,0c20.848,13.215,39.682,19.467,55.846,17.989 c2.823,57.098-18.263,90.818-55.63,104.891C19.844,109.708-1.5,77.439,0.083,17.123C19.058,18.116,37.674,14.014,55.713,0L55.713,0 z M55.735,7.055c18.454,11.697,35.126,17.232,49.434,15.923c2.498,50.541-16.166,80.39-49.241,92.846 C23.986,104.165,5.091,75.603,6.493,22.211C23.29,23.091,39.768,19.46,55.735,7.055L55.735,7.055z',
      width: 112,
      height: 123,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 2,
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    this.addLayer(
      new Konva.Layer({
        draggable: true,
      }).add(object)
    );

    this.addObject(object);
  }
}

class GoogleLogo extends KonvaObject {
  constructor(id: number) {
    super();

    const part_one = new Konva.Path({
      x: 200,
      y: 4,
      data: 'M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z',
      width: 112,
      height: 123,

      fill: '#4285F4',
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    const part_two = new Konva.Path({
      x: 200,
      y: 4,
      data: 'M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z',
      width: 112,
      height: 123,

      fill: '#34A853',
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    const part_three = new Konva.Path({
      x: 200,
      y: 4,
      data: 'M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z',
      width: 112,
      height: 123,

      fill: '#FBBC05',
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    const part_four = new Konva.Path({
      x: 200,
      y: 4,
      data: 'M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z',
      width: 112,
      height: 123,

      fill: '#EA4335',
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    this.addLayer(
      new Konva.Layer({
        draggable: true,
      })
        .add(part_one)
        .add(part_two)
        .add(part_three)
        .add(part_four)
    );

    this.addObject(part_one);
    this.addObject(part_two);
    this.addObject(part_three);
    this.addObject(part_four);
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
  public objects: Array<KonvaObject> = [];
  public currentTarget: number = -1;
  public transformer = new Konva.Transformer();
  public indexes: number = 0;

  ngAfterViewInit(): void {
    this.resetCanva();
  }

  public get stage(): Konva.Stage {
    return this._stage;
  }

  public set stage(params) {
    this._stage = params;
  }

  public get objetoSelecionado(): boolean {
    return this.currentTarget > -1;
  }

  public resetCanva() {
    this.currentTarget = -1;

    this.stage = new Konva.Stage({
      container: 'container', // id of container <div>
      width: 500,
      height: 500,
    });

    this.layers = [];
  }

  public add(figuraParaDesenhar: string) {
    var forma: KonvaObject;

    switch (figuraParaDesenhar) {
      case 'ESCUDO':
        forma = new Shield(this.indexes++);
        break;
      case 'GOOGLE':
        forma = new GoogleLogo(this.indexes++);
        break;
      default:
        return;
    }

    this.layers.push(forma.layer);
    this.stage.add(forma.layer);
    this.objects.push(forma);

    const addTransformer = (e: any) => {
      if (this.currentTarget === -1) {
        // Callback para sempre que selecionarem uma forma, a gente pegar qual o id dado àquela forma
        this.currentTarget = Number(e.target.attrs.id);

        this._addTransformer(forma.layer, forma.objects);
      } else {
        this.transformer.nodes([]);
        this.currentTarget = -1;
      }
    };

    forma.layer.on('click', addTransformer);
    forma.layer.draw();
  }

  private _addTransformer(layer: Layer, formas: Array<any>) {
    layer.add(this.transformer);
    this.transformer.nodes([...formas]);
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
