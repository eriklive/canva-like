import Konva from 'konva';
import { CLASSES_TYPES_ENUM } from '../enums/ClassesTypes.enum';
import KonvaDefault from './KonvaDefault';

export default class KonvaText extends KonvaDefault {
  constructor(id: number) {
    super();

    const text = new Konva.Text({
      x: 2,
      y: 15,
      text: this.textControl.value,
      fontSize: 30,
      fontFamily: this.fontControl.value,
      fill: '#fffff',
      draggable: false,
      id: id.toString(),
    });

    this.addLayer(
      new Konva.Layer({
        draggable: true,
      }).add(text)
    );

    this.addObject(text);

    this.type = CLASSES_TYPES_ENUM.TEXT;

    this._configureControls();
  }

  private _configureControls() {
    /**
     * Here we are changing both because sometimes, we need to change one and
     * another times we need to change another. To avoid complications,
     * we are changing both right away.
     *
     * (this.layer.getChildren()[0] as any).textArr[0].PROPERTY = VALUE;
     * this.layer.getChildren()[0].attrs.PROPERTY = VALUE;
     */

    this.textControl.valueChanges.subscribe((value) => {
      (this.layer.getChildren()[0] as any).textArr[0].text = value;
      this.layer.getChildren()[0].attrs.text = value;

      this.layer.draw();
    });

    this.fontControl.valueChanges.subscribe((value) => {
      (this.layer.getChildren()[0] as any).textArr[0].font = value;
      this.layer.getChildren()[0].attrs.fontFamily = value;

      this.layer.draw();
    });
  }
}
