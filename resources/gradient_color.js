log('This is an example Sketch script.');

var documentName = context.document.displayName();
log('The current document is named: ' + documentName);

var selectedLayers = context.selection;
var selectedCount = selectedLayers.count();

var getColor = function(selectionType, layer) {
  var color

  if (selectionType === "fill") {
    if (layer instanceof MSTextLayer) {
      color = layer.textColor()
    } else {
      color = layer.style().fills().firstObject().color()
    }
  } else {
    color = layer.style().borders().firstObject().color()
  }

  return color
}

var getColorNum = function(num1, num2, index) {
  var color_num = ((num2 - num1) / (selectedCount-1)) * index  + num1
  return color_num
}

// function inputBlock() {
//   let alert = buildDialog('Create Color Scale', 'How many steps do you want in the scale?')

//   alert.addTextLabelWithValue('Steps')
//   alert.addTextFieldWithValue('5')
//   alert.addButtonWithTitle('OK')
//   alert.addButtonWithTitle('Cancel')

//   return alert;
// }


////// Normal Text Info
// var app = [NSApplication sharedApplication];
// [app displayDialog:"This is an alert box!" withTitle:"Alert Box Title"];
var doc = context.document;
var result = [doc askForUserInput:"How many copies do you want?" initialValue:"10"];


if (selectedCount == 0) {
  log('No layers are selected.');
} else {
  log('Selected layers:');

  var first_layer_color = getColor("fill", selectedLayers[0])
  var last_layer_color = getColor("fill", selectedLayers[selectedCount-1])

  for (var k = 0; k < result ; k++) {
    var layer = selectedLayers[k].duplicate();
    layer.select_byExpandingSelection(true, true);
    //log(k)
    selectedLayers = context.selection;
  }

  
  selectedCount = selectedLayers.count();
  log(selectedCount)

  for (var i = 0; i < selectedCount; i++) {
    var layer = selectedLayers[i];
    var selectedColor = getColor("fill", layer)
    var r, g, b;

    var r = Math.round(getColorNum(first_layer_color.red(), last_layer_color.red(), i ) * 255)
    var g = Math.round(getColorNum(first_layer_color.green(), last_layer_color.green(), i ) * 255)
    var b = Math.round(getColorNum(first_layer_color.blue(), last_layer_color.blue(), i ) * 255)
    //var red = Math.round(selectedColor.red() * 255)
    var fill = layer.style().fills().firstObject();
    fill.color = MSColor.colorWithRed_green_blue_alpha( r / 255, g / 255, b / 255, 1.0);
    //log(red)
  }
};