import { Component, OnInit } from "@angular/core";
import { Vector3, HemisphericLight, Engine, Scene, Mesh, ArcRotateCamera, MeshBuilder } from "babylonjs";
import { GridMaterial } from "babylonjs-materials";

@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
   styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
   title = "Viewer3d";
   scene: Scene;
   pathPoints: Vector3[] = [];
   options: any;
   lines: any;
   currentStartPoint: Vector3;
   currentEndPoint: Vector3;
   firstPoint: Vector3;
   snapPoint: Vector3;
   snapOk: boolean = false;
   tracking: boolean = false;

   ngOnInit(): void {
      // Get the canvas element from the DOM.
      const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

      // Associate a Babylon Engine to it.
      const engine = new Engine(canvas);

      this.scene = new Scene(engine);

      var camera = new ArcRotateCamera("Camera", (3 * Math.PI) / 2, Math.PI / 8, 50, Vector3.Zero(), this.scene);

      camera.attachControl(canvas, true);

      var light = new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene);

      var mat = new GridMaterial("groundMaterial", this.scene);

      var ground = Mesh.CreateGround("ground1", 20, 20, 2, this.scene);
      ground.material = mat;

      this.pathPoints = [];

      const myPoints = [];
      this.options = {
         points: myPoints,
         updatable: true,
      };
      this.lines = BABYLON.MeshBuilder.CreateLines("lines", this.options);

      // Render every frame
      engine.runRenderLoop(() => {
         this.scene.render();
      });
   }
}
