"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { MODE } = require(path.join(basePath, "src/blendMode.js"));
const description =
  "The llama legion is lucky to have you and you were lucky enough to join the llama legion.";
const baseUri = "image.png";

const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "background" },
      { name: "face" },
      { name: "fur" },
      { name: "eye" },
      { name: "mouth" },
      { name: "nose" },
      { name: "outfit" },
      { name: "ears" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
};

const background = {
  generate: true,
  brightness: "80%",
};

const extraMetadata = {
  "symbol": "",
  "properties": {
    "files": [
      {
        "uri": "image.png",
        "type": "image/png"
      }
    ],
    "category": "image",
    "creators":[
      {
        "address": "FBtvjETjSWELeBf7FZ1AaRmDv2QwXwSzDVyHr2USbui8",
        "share": 100
      }
    ]
  },
  "collection" :{
    "name": "Lucky Llama Legion",
    "family": "Lucky Llama Legion"
  },
  "seller_fee_basis_points": 250,
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
};
