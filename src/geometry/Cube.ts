import { vec3, vec4 } from "gl-matrix";
import Drawable from "../rendering/gl/Drawable";
import { gl } from "../globals";

class Cube extends Drawable {
    indices: Uint32Array;
    positions: Float32Array;
    normals: Float32Array;
    center: vec4;

    constructor(center: vec3) {
        super();

        this.center = vec4.fromValues(center[0], center[1], center[2], 1);
    }

    create() {
    
        this.indices = new Uint32Array([
            0, 1, 2,
            0, 2, 3,
            2, 3, 4,
            2, 4, 5,
            4, 5, 6,
            4, 6, 7,
            6, 7, 0,
            6, 0, 1,
            0, 3, 4,
            0, 4, 7,
            1, 2, 5,
            1, 5, 6,
        ]);

        const SQRT_3 = Math.sqrt(3);
        this.normals = new Float32Array([
            -SQRT_3, -SQRT_3, -SQRT_3, 0,
            SQRT_3, -SQRT_3, -SQRT_3, 0,
            SQRT_3, SQRT_3, -SQRT_3, 0,
            -SQRT_3, SQRT_3, -SQRT_3, 0,
            -SQRT_3, SQRT_3, SQRT_3, 0,
            SQRT_3, SQRT_3, SQRT_3, 0,
            SQRT_3, -SQRT_3, SQRT_3, 0,
            -SQRT_3, -SQRT_3, SQRT_3, 0,
        ]);
        this.positions = new Float32Array([
            -1, -1, -1, 1,
            1, -1, -1, 1,
            1, 1, -1, 1,
            -1, 1, -1, 1,
            -1, 1, 1, 1,
            1, 1, 1, 1,
            1, -1, 1, 1,
            -1, -1, 1, 1,
        ]);

        for (let i = 0; i < this.positions.length; i += 4) {
            this.positions[i] += this.center[0];
            this.positions[i + 1] += this.center[1];
            this.positions[i + 2] += this.center[2];
        }
    
        this.generateIdx();
        this.generatePos();
        this.generateNor();
    
        this.count = this.indices.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);
    
        console.log(`Created cube`);
    }
}

export default Cube;