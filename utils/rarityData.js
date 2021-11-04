"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const layersDir = `${basePath}/layers`;

console.log(path.join(basePath, "/src/config.js"));
const { layerConfigurations } = require(path.join(basePath, "/src/config.js"));

const { getElements } = require("../src/main.js");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];

// intialize layers to chart
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
    // get elements for each layer
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${layer.name}/`);
    elements.forEach((element) => {
      // just get name and weight for each element
      let rarityDataElement = {
        trait: element.name,
        chance: element.weight.toFixed(0),
        occurrence: 0, // initialize at 0
      };
      elementsForLayer.push(rarityDataElement);
    });

    // don't include duplicate layers
    if (!rarityData.includes(layer.name)) {
      // add elements for each layer to chart
      rarityData[layer.name] = elementsForLayer;
    }
  });
});

// fill up rarity chart with occurrences from metadata


// Comment out original code

//////////////////////




// data.forEach((element) => {
//   let attributes = element.attributes;

//   attributes.forEach((attribute) => {
//     let traitType = attribute.trait_type;
//     let value = attribute.value;

//     let rarityDataTraits = rarityData[traitType];
//     rarityDataTraits.forEach((rarityDataTrait) => {
//       if (rarityDataTrait.trait == value) {
//         // keep track of occurrences
//         rarityDataTrait.occurrence++;
//       }
//     });
//   });
// });





////////////////



/// Start Test Code



const commonProperties = [
  //Background
  "aqua-background",
  "blue-background",
  "brown-background",
  "dark-brown-background",
  "green-background",
  "lime-background",
  "pink-background",
  "purple-background",
  "red-background",
  "yellow-background",
  // Ears
  "beanie-ears",
  "elf-ears",
  "headphone-ears",
  "piercing-ears",
  "wing-ears",
  // Eyes
  "confused-eye",
  "regular-eye",
  "sleepy-eye",
  // Face
  "regular-face",
  // Fur
  "green-fur",
  "red-fur",
  "white-fur",
  // Mouth
  "grin-mouth",
  "regular-mouth",
  // Outfit
  "japanese-outfit",
  "shirt-outfit"
];

const rareProperties = [
  // Ears
  "birthday-ears",
  "fancy-ears",
  "police-ears",
  "viking-ears",
  // Eyes
  "brown-eye",
  "crazy-eye",
  "mad-eye",
  "sad-eye",
  // Face
  "devil-face",
  "manga-face",
  "yellow-face",
  // Fur
  "aqua-fur",
  "bricks-fur",
  "grass-fur",
  "manga-fur",
  "pattern-fur",
  // Mouth
  "alien-mouth",
  "mad-mouth",
  "sad-mouth",
  "surprised-mouth",
  "teeth-mouth",
  // Outfit
  "christmas-outfit",
  "security-outfit",
  "sparkle-outfit",
  "suit-outfit"
];

const legendaryProperties = [
  // Ears
  "halo-ears",
  "horns-ears",
  "santa-ears",
  "yarn-ears",
  // Eyes
  "blue-eye",
  "devil-eye",
  "heart-eye",
  "stoner-eye",
  // Face
  "majin-face",
  "police-face",
  "runes-face",
  "rust-face",
  "zombie-face",
  // Fur
  "cotton-candy-fur",
  "leaves-fur",
  "runes-fur",
  // Mouth
  "tongue-mouth",
  // Outfit
  "chain-outfit"
];

const exoticProperties = [
  // Ears
  "anime-ears",
  "marge-ears",
  "goku-ears",
  "lucky-ears",
  "luffy-ears",
  // Eyes
  "lucky-eye",
  "money-eye",
  "solana-eye",
  // Face
  "rock-face",
  // Fur
  "hairy-fur",
  "lucky-fur",
  "rainbow-fur",
  "rock-fur",
  // Mouth
  "curse-mouth",
  "uwu-mouth",
  "zombie-mouth",
  // Outfit
  "blocks-outfit",
  "luffy-outfit"
];

const mythicProperties = [
  // Ears
  "super-saiyan-ears",
  // Eyes
  "laser-eye",
  "sharingan-eye",
  "sage-eye",
  // Face
  "stars-face",
  "sunset-face",
  // Fur
  "diamond-fur",
  "fireworks-fur",
  "sunset-fur",
  // Mouth
  "gold-mouth",
  // Outfit
  "goku-outfit",
];

let attributeRarityDict = {
  "I should not be here": 0,
  "Common": 1,
  "Rare": 2,
  "Legendary": 3,
  "Exotic": 4,
  "Mythic": 5
};

let rarityDict = {};

// Helper function to get key with value
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

// fill up rarity chart with occurrences from metadata
data.forEach((element) => {
  let attributes = element.attributes;
  let editionNumber = element.edition;
  let elementPoints = 0;
  
  // Initialize previous rarity
  let previousRarity = 0;
  let rarityValue = 0;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;

    //console.log("The value is " + value + " which is of type " + typeof value);

    if (commonProperties.includes(value)){
      rarityDict[editionNumber] = "Common";
      elementPoints += 1;
    }

    else if (rareProperties.includes(value)){
      rarityDict[editionNumber] = "Rare";
      elementPoints += 2;
    }

    else if (legendaryProperties.includes(value)){
      rarityDict[editionNumber] = "Legendary";
      elementPoints += 4;
    }

    else if (exoticProperties.includes(value)){
      rarityDict[editionNumber] = "Exotic";
      elementPoints += 8;
    }

    else if (mythicProperties.includes(value)){
      rarityDict[editionNumber] = "Mythic";
      elementPoints += 50;
    }

    // Compare the previous rarity (initially 0) to the current rarity. If current is larger then overwrite the rarityValue
    //console.log("The previous Value is " + previousRarity)
    //console.log("The rarity dict is " + rarityDict[editionNumber]);
    //console.log("It is getting compared to " + attributeRarityDict[rarityDict[editionNumber]])
    if (attributeRarityDict[rarityDict[editionNumber]] > previousRarity){

      // Rarity value will equal the number associated with common, rare etc
      rarityValue = attributeRarityDict[rarityDict[editionNumber]];
      //console.log(rarityValue);

    }
    previousRarity = rarityValue;

    let rarityDataTraits = rarityData[traitType];
    rarityDataTraits.forEach((rarityDataTrait) => {
      if (rarityDataTrait.trait == value) {
        // keep track of occurrences
        rarityDataTrait.occurrence++;
      }
    });
  });

  // The rarity of the NFT
  //console.log("The Rarity Value is " + rarityValue);
  //console.log("The dictionary is set to " + getKeyByValue(attributeRarityDict, rarityValue));
  //rarityDict[editionNumber] = getKeyByValue(attributeRarityDict, rarityValue);
  rarityDict[editionNumber] = elementPoints;
});

// Initialize counter variables
// var commonCount = 0;
// var rareCount = 0;
// var legendaryCount = 0;
// var exoticCount = 0;
// var mythicCount = 0;

var fiveCount = 0;
var tenCount = 0;
var fifteenCount = 0;
var twentyCount = 0;
var fiftyCount = 0;


// Print the rarities
for (var key in rarityDict){

  if (rarityDict[key] >= 0 && rarityDict[key] <= 10){
    fiveCount++;
  }

  else if (rarityDict[key] >= 11 && rarityDict[key] <= 15){
    tenCount++;
  }

  else if (rarityDict[key] >= 16 && rarityDict[key] <= 40){
    fifteenCount++;
  }

  else if (rarityDict[key] >= 41 && rarityDict[key] <= 55){
    twentyCount++
  }

  else if (rarityDict[key] >= 56){
    fiftyCount++
  }

  console.log("The edition " + key + " has total points of " + rarityDict[key]);
}

console.log("For a collection of 1000 we encountered " + fiveCount + " Commons " + tenCount + " Rares " + fifteenCount + " Legendaries " + twentyCount + " Exotics " + fiftyCount + " Mythics")

/// End Test Code




// convert occurrences to percentages
for (var layer in rarityData) {
  for (var attribute in rarityData[layer]) {
    // convert to percentage
    rarityData[layer][attribute].occurrence =
      (rarityData[layer][attribute].occurrence / editionSize) * 100;

    // show two decimal places in percent
    rarityData[layer][attribute].occurrence =
      rarityData[layer][attribute].occurrence.toFixed(2) + "% out of 100%";
  }
}

// print out rarity data
for (var layer in rarityData) {
  console.log(`Trait type: ${layer}`);
  for (var trait in rarityData[layer]) {
    console.log(rarityData[layer][trait]);
  }
  console.log();
}

