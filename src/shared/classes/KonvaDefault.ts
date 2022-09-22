import { FormControl } from '@angular/forms';
import Konva from 'konva';

export default class KonvaDefault {
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
