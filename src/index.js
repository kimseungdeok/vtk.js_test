import '@kitware/vtk.js/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkSphereSource from '@kitware/vtk.js/Filters/Sources/SphereSource';
import vtkCursor3D from '@kitware/vtk.js/Filters/Sources/Cursor3D';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';

// import controlPanel from './controlPanel.html';
const controlPanel = `
<table>
<tr>
  <td>Focal X</td>
  <td>
    <input type="range" name="" id="focalPointX" min="-10" max="10" step="1" value="0">
  </td>
</tr>
<tr>
  <td>Focal Y</td>
  <td>
    <input type="range" name="" id="focalPointY" min="-10" max="10" step="1" value="0">
  </td>
</tr>
<tr>
  <td>Focal Z</td>
  <td>
    <input type="range" name="" id="focalPointZ" min="-10" max="10" step="1" value="0">
  </td>
</tr>
<tr>
  <td>Model Bounds X Min</td>
  <td>
    <input type="range" name="" id="modelBoundsXMin" min="-10" max="10" step="1" value="-10">
  </td>
</tr>
<tr>
  <td>Model Bounds X Max</td>
  <td>
    <input type="range" name="" id="modelBoundsXMax" min="-10" max="10" step="1" value="10">
  </td>
</tr>
<tr>
  <td>Model Bounds Y Min</td>
  <td>
    <input type="range" name="" id="modelBoundsYMin" min="-10" max="10" step="1" value="-10">
  </td>
</tr>
<tr>
  <td>Model Bounds Y Max</td>
  <td>
    <input type="range" name="" id="modelBoundsYMax" min="-10" max="10" step="1" value="10">
  </td>
</tr>
<tr>
  <td>Model Bounds Z Min</td>
  <td>
    <input type="range" name="" id="modelBoundsZMin" min="-10" max="10" step="1" value="-10">
  </td>
</tr>
<tr>
  <td>Model Bounds Z Max</td>
  <td>
    <input type="range" name="" id="modelBoundsZMax" min="-10" max="10" step="1" value="10">
  </td>
</tr>
<tr>
  <td>Outline</td>
  <td>
    <input type="checkbox" name="" id="outline" checked>
  </td>
</tr>
<tr>
  <td>Axes</td>
  <td>
    <input type="checkbox" name="" id="axes" checked>
  </td>
</tr>
<tr>
  <td>X Shadows</td>
  <td>
    <input type="checkbox" name="" id="xShadows" checked>
  </td>
</tr>
<tr>
  <td>Y Shadows</td>
  <td>
    <input type="checkbox" name="" id="yShadows" checked>
  </td>
</tr>
<tr>
  <td>Z Shadows</td>
  <td>
    <input type="checkbox" name="" id="zShadows" checked>
  </td>
</tr>
<tr>
  <td>Wrap</td>
  <td>
    <input type="checkbox" name="" id="wrap">
  </td>
</tr>
<tr>
  <td>TranslationMode</td>
  <td>
    <input type="checkbox" name="" id="translationMode">
  </td>
</tr>
`

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [0, 0, 0],
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------
const cursor3D = vtkCursor3D.newInstance();
cursor3D.setFocalPoint([0, 0, 0]);
cursor3D.setModelBounds([-10, 10, -10, 10, -10, 10]);
const cursor3DMapper = vtkMapper.newInstance();
cursor3DMapper.setInputConnection(cursor3D.getOutputPort());
const cursor3DActor = vtkActor.newInstance();
cursor3DActor.setMapper(cursor3DMapper);

const sphereSource = vtkSphereSource.newInstance();
const sphererMapper = vtkMapper.newInstance();
sphererMapper.setInputConnection(sphereSource.getOutputPort());
const sphereActor = vtkActor.newInstance();
sphereActor.setMapper(sphererMapper);

renderer.addActor(cursor3DActor);
renderer.addActor(sphereActor);
renderer.resetCamera();
renderWindow.render();

// -----------------------------------------------------------
// UI control handling
// -----------------------------------------------------------

fullScreenRenderer.addController(controlPanel);
const focalPointRanges = ['focalPointX', 'focalPointY', 'focalPointZ'].map(
  (id) => document.getElementById(id)
);
const handleFocalPointInput = (e) => {
  cursor3D.setFocalPoint([
    focalPointRanges[0].value,
    focalPointRanges[1].value,
    focalPointRanges[2].value,
  ]);
  renderer.resetCameraClippingRange();
  renderWindow.render();
};
focalPointRanges.forEach((input) =>
  input.addEventListener('input', handleFocalPointInput)
);
const modelBoundsRanges = [
  'modelBoundsXMin',
  'modelBoundsXMax',
  'modelBoundsYMin',
  'modelBoundsYMax',
  'modelBoundsZMin',
  'modelBoundsZMax',
].map((id) => document.getElementById(id));
const handleModelBoundsInput = (e) => {
  cursor3D.setModelBounds([
    modelBoundsRanges[0].value,
    modelBoundsRanges[1].value,
    modelBoundsRanges[2].value,
    modelBoundsRanges[3].value,
    modelBoundsRanges[4].value,
    modelBoundsRanges[5].value,
  ]);
  renderer.resetCameraClippingRange();
  renderWindow.render();
};
modelBoundsRanges.forEach((input) =>
  input.addEventListener('input', handleModelBoundsInput)
);
const checkBoxes = [
  'outline',
  'axes',
  'xShadows',
  'yShadows',
  'zShadows',
  'wrap',
  'translationMode',
].map((id) => document.getElementById(id));
const handleCheckBoxInput = (e) => {
  cursor3D.set({ [e.target.id]: e.target.checked });
  renderer.resetCameraClippingRange();
  renderWindow.render();
};
checkBoxes.forEach((checkBox) =>
  checkBox.addEventListener('input', handleCheckBoxInput)
);