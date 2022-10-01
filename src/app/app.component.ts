import { AfterViewInit, Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { CLASSES_TYPES_ENUM } from 'src/shared/classes/ClassesTypes.enum';
import GoogleLogo from 'src/shared/classes/GoogleLogo';
import KonvaDefault from 'src/shared/classes/KonvaDefault';
import KonvaText from 'src/shared/classes/KonvaText';
import Shield from 'src/shared/classes/Shield';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private _stage: any;
  public layers: Array<Konva.Layer> = [];
  public objects: Array<KonvaDefault | KonvaText> = [];
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

  public get isSomethingSelected(): boolean {
    return this.currentTarget > -1;
  }

  public get selectedObject(): KonvaDefault | KonvaText | null {
    if (this.isSomethingSelected) return this.objects[this.currentTarget];

    return null;
  }

  public get showTextControl(): boolean {
    return this.selectedObject?.type === CLASSES_TYPES_ENUM.TEXT;
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

  public add(figureName: string) {
    var object: KonvaDefault;

    switch (figureName) {
      case 'ESCUDO':
        object = new Shield(this.indexes++);
        break;
      case 'GOOGLE':
        object = new GoogleLogo(this.indexes++);
        break;
      case 'TEXT':
        object = new KonvaText(this.indexes++);
        break;
      default:
        return;
    }

    console.log(object);

    this.layers.push(object.layer);
    this.stage.add(object.layer);
    this.objects.push(object);

    this._configTransform(object);
  }

  private _configTransform(object: KonvaDefault) {
    const addTransformer = (e: any) => {
      if (this.currentTarget === -1) {
        // Callback para sempre que selecionarem uma forma, a gente pegar qual o id dado àquela forma
        this.currentTarget = Number(e.target.attrs.id);
        this._addTransformer(object.layer, object.objects);
      } else {
        this.transformer.nodes([]);
        this.currentTarget = -1;
      }

      console.log(this.selectedObject);
    };

    object.layer.on('click', addTransformer);
    object.layer.draw();
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
