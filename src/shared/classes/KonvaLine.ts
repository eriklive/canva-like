import Konva from 'konva';
import { LineConfig } from 'konva/lib/shapes/Line';
import { CLASSES_TYPES_ENUM } from '../enums/ClassesTypes.enum';
import KonvaDefault from './KonvaDefault';

export default class KonvaLine extends KonvaDefault {
  constructor(id: number, config?: LineConfig) {
    super();

    var line = new Konva.Line({
      points: [5, 5, 100, 5],
      stroke: 'black',
      strokeWidth: 5,
      lineCap: 'round',
      lineJoin: 'round',
      id: id.toString(),
      ...config,
    });

    this.addLayer(
      new Konva.Layer({
        draggable: true,
      }).add(line)
    );

    this.addObject(line);

    this.type = CLASSES_TYPES_ENUM.LINE;

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
