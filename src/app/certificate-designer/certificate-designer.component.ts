import { AfterViewInit, Component } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { CLASSES_TYPES_ENUM } from 'src/shared/enums/ClassesTypes.enum';
import GoogleLogo from 'src/shared/classes/GoogleLogo';
import KonvaDefault from 'src/shared/classes/KonvaDefault';
import KonvaText from 'src/shared/classes/KonvaText';
import Shield from 'src/shared/classes/Shield';
import { FONTS_ARRAY } from 'src/shared/consts/Fonts.array';
import { SHAPES_ARRAY, SHAPES_ENUM } from 'src/shared/consts/Shapes.array';
import { DefaultCertificateTemplate } from 'src/shared/classes/DefaultCertificateTemplate';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-certificate-designer',
  templateUrl: './certificate-designer.component.html',
  styleUrls: ['./certificate-designer.component.scss'],
})
export class CertificateDesignerComponent implements AfterViewInit {
  private _stage: any;
  public layers: Array<Konva.Layer> = [];
  public objects: Array<KonvaDefault | KonvaText> = [];
  public currentTarget: number = -1;
  public transformer = new Konva.Transformer();
  public indexes: number = 0;
  public generalFont: FormControl = new FormControl();

  public fonts = FONTS_ARRAY;
  public shapes = SHAPES_ARRAY;
  public shapesEnum = SHAPES_ENUM;

  ngAfterViewInit(): void {
    this.resetCanva();
    this.addCertificate();

    this.generalFont.valueChanges.subscribe((value) => {
      console.log(value);
      this.objects.forEach((object) => object.fontControl.patchValue(value));
    });
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

  public addCertificate() {
    const certificate = new DefaultCertificateTemplate(this);

    certificate.factory();
  }

  public addCertificateWithExample() {
    this.resetCanva();

    const certificate = new DefaultCertificateTemplate(this);

    certificate.factory({
      person_one: 'Joe Doe',
      person_two: 'Jane doe',
      date: '01/01/2022',
      name: 'Mark hamill',
      institution_name: 'Example institution',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
    });
  }

  public resetCanva() {
    this.currentTarget = -1;

    this.stage = new Konva.Stage({
      container: 'certificate', // id of container <div>
      width: 1000,
      height: 500,
      background: '#fff',
    });

    this.layers = [];
  }

  public add(figureName: SHAPES_ENUM) {
    let object: KonvaDefault;

    switch (figureName) {
      case SHAPES_ENUM.SIMPLE_SHIELD_ONE:
        object = new Shield(this.indexes++);
        break;
      case SHAPES_ENUM.GOOGLE:
        object = new GoogleLogo(this.indexes++);
        break;
      case SHAPES_ENUM.TEXT:
        object = new KonvaText(this.indexes++);
        break;
      default:
        return;
    }

    this.layers.push(object.layer);
    this.stage.add(object.layer);
    this.objects.push(object);

    this.configTransform(object);
  }

  public configTransform(object: KonvaDefault) {
    const addTransformer = (e: any) => {
      if (this.currentTarget === -1) {
        // Callback para sempre que selecionarem uma forma, a gente pegar qual o id dado àquela forma
        this.currentTarget = Number(e.target.attrs.id);
        this._addTransformer(object.layer, object.objects);
      } else {
        this.transformer.nodes([]);
        this.currentTarget = -1;
      }
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
