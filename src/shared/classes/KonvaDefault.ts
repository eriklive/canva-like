import { FormControl } from '@angular/forms';
import Konva from 'konva';
import { CLASSES_TYPES_ENUM } from '../enums/ClassesTypes.enum';
export default class KonvaDefault {
  private _layer: Konva.Layer = new Konva.Layer();
  private _objects: Array<Konva.Path | Konva.Text> = [];
  private _colors: Array<FormControl> = [];
  private _type: CLASSES_TYPES_ENUM = CLASSES_TYPES_ENUM.OBJECT;
  private _text: FormControl = new FormControl('Simple Text');
  private _font: FormControl = new FormControl('Arial');

  addLayer(layer: Konva.Layer) {
    this._layer = layer;

    if (layer.hasChildren()) {
      layer.children?.forEach((child, childIndex) => {
        const colorControl = new FormControl(child.attrs.fill);
        colorControl.valueChanges.subscribe((update) => {
          this._changeColor(update, childIndex);
        });

        this._colors.push(colorControl);
      });
    }
  }

  public addObject(object: Konva.Path | Konva.Text) {
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

  public get type() {
    return this._type;
  }

  public set type(type: CLASSES_TYPES_ENUM) {
    this._type = type;
  }

  public get textControl() {
    return this._text;
  }

  public get fontControl() {
    return this._font;
  }

  private _changeColor(color: string, childIndex: number) {
    this._layer.getChildren()[childIndex].attrs.fill = color;
    this._layer.draw();
  }
}
