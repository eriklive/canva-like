import { AfterViewInit, Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import GoogleLogo from 'src/shared/classes/GoogleLogo';
import KonvaDefault from 'src/shared/classes/KonvaDefault';
import Shield from 'src/shared/classes/Shield';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private _stage: any;
  public layers: Array<Konva.Layer> = [];
  public objects: Array<KonvaDefault> = [];
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
    var forma: KonvaDefault;

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
