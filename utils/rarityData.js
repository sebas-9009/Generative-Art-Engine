"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const layersDir = `${basePath}/layers`;

console.log(path.join(basePath, "/src/config.js"));
const { layerConfigurations } = require(path.join(basePath, "/src/config.js"));

const { getElements } = require("../src/main.js");
const { background } = require("../src/config.js");

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
  "Aqua",
  "Blue",
  "Brown",
  "Dark Brown",
  "Green",
  "Lime",
  "Pink",
  "Purple",
  "Red",
  "Yellow",
  // Head
  "Normal",
  "Beanie",
  "Elf",
  "Headphone",
  "Piercing",
  "Wings",
  // Eyes
  "Confused",
  "Crazy",
  "Cute",
  "Sleeping",
  // Face
  "Normal",
  "Orange",
  "Pink",
  "Purple",
  "Yellow",
  // Fur
  "Black",
  "Green",
  "Red",
  "White",
  // Mouth
  "Happy",
  "Grin",
  "Mad",
  // Outfit
  "Kimono",
  "Shirt",
  "Hoodie",
  "Beach"
];

const rareProperties = [
  //Background
  "Forest",
  // Head
  "Birthday",
  "Hat",
  "Police",
  "Viking",
  // Eyes
  "Blue",
  "Brown",
  "Mad",
  "Sad",
  // Face
  "Devil",
  "Manga",
  "Robot",
  // Fur
  "Aqua",
  "Bricks",
  "Grass",
  "Pattern",
  // Mouth
  "Sad",
  "Surprised",
  "Teeth",
  // Outfit
  "Caution",
  "Christmas",
  "Fancy",
  "Lego",
  "Suit"
];

const legendaryProperties = [
  // Head
  "Alpaca",
  "Halo",
  "Horns",
  "Santa",
  // Eyes
  "Devil",
  "Heart",
  "Stoned",
  // Face
  "Buu",
  "Paint",
  "Runes",
  "Zombie",
  // Fur
  "Candy",
  "Cloth",
  "Coffee",
  "Cotton Candy",
  "Ice",
  "Leaves",
  "Runes",
  // Mouth
  "Alien",
  "Tongue",
  // Outfit
  "Biker",
  "Chain",
  "Police",
  "Surgeon"
];

const exoticProperties = [
  //Background
  "Lucky",
  // Head
  "Headband",
  "Lucky",
  "Luffy",
  "Marge",
  "Pokemon",
  "SS",
  // Eyes
  "Dollar",
  "Lucky",
  "Solana",
  // Face
  "Lucky",
  "Rock",
  "Cyborg",
  // Fur
  "Hairy",
  "Lucky",
  "Rainbow",
  "Rock",
  // Mouth
  "Inappropriate",
  "Uwu",
  "Zombie",
  // Outfit
  "Akatsuki",
  "Barcelona",
  "Lucky",
  "Luffy"
];

const mythicProperties = [
  //Background
  "Space",
  // Head
  "Astronaut",
  "SSGSS",
  // Eyes
  "Laser",
  "Sharingan",
  "Sage Mode Six Paths",
  // Face
  "Diamond",
  "Stars",
  "Sunset",
  // Fur
  "Diamond",
  "Fireworks",
  "Sunset",
  // Mouth
  "Gold",
  // Outfit
  "Astronaut",
  "Goku",
  "Hokage"
];

let backgroundDict = {
  "Aqua": 2,
  "Blue": 2,
  "Brown": 2,
  "Dark Brown": 2,
  "Green": 2,
  "Lime": 2,
  "Pink": 2,
  "Purple": 2,
  "Red": 2,
  "Yellow": 2,
  "Forest": 4,
  "Lucky": 16,
  "Space": 32
}
let eyeDict = {
  "Confused": 2,
  "Crazy": 2,
  "Cute": 2,
  "Sleeping": 2,
  "Blue": 4,
  "Brown": 4,
  "Mad": 4,
  "Sad": 4,
  "Devil": 8,
  "Heart": 8,
  "Stoned": 8,
  "Dollar": 16,
  "Lucky": 16,
  "Solana": 16,
  "Laser": 32,
  "Sage Mode Six Paths": 32,
  "Sharingan": 32
}
let faceDict = {
  "Pink": 2,
  "Normal": 2,
  "Orange": 2,
  "Purple": 2,
  "Yellow": 2,
  "Manga": 4,
  "Devil": 4,
  "Robot": 4,
  "Buu": 8,
  "Zombie": 8,
  "Paint": 8,
  "Runes": 8,
  "Cyborg": 16,
  "Lucky": 16,
  "Rock": 16,
  "Diamond": 32,
  "Stars": 32,
  "Sunset": 32
}

let outfitDict = {
  "Kimono" : 2,
  "Shirt" : 2,
  "Hoodie" : 2,
  "Beach" : 2,
  "Caution" : 4,
  "Christmas" : 4,
  "Fancy" : 4,
  "Lego" : 4,
  "Suit" : 4,
  "Biker" : 8,
  "Chain" : 8,
  "Police" : 8,
  "Surgeon" : 8,
  "Akatsuki" : 16,
  "Barcelona" : 16,
  "Lucky" : 16,
  "Luffy" : 16,
  "Astronaut" : 32,
  "Goku" : 32,
  "Hokage" : 32
}

let furDict = {
  "Black" : 2,
  "Green" : 2,
  "Red" : 2,
  "White" : 2,
  "Aqua": 4,
  "Bricks": 4,
  "Grass": 4,
  "Pattern": 4,
  "Candy" : 8,
  "Cloth" : 8,
  "Coffee" : 8,
  "Cotton Candy" : 8,
  "Ice" : 8,
  "Leaves" : 8,
  "Runes" : 8,
  "Hairy" : 16,
  "Lucky" : 16,
  "Rainbow" : 16,
  "Rock" : 16,
  "Diamond" : 32,
  "Fireworks" : 32,
  "Sunset" : 32
}

let mouthDict = {
  "Happy" : 2,
  "Grin" : 2,
  "Mad" : 2,
  "Sad" : 4,
  "Surprised" : 4,
  "Teeth" : 4,
  "Alien" : 8,
  "Tongue" : 8,
  "Inappropriate" : 16,
  "Uwu" : 16,
  "Zombie" : 16,
  "Gold" : 32
}

let headDict = {
  "Normal" : 2,
  "Beanie" : 2,
  "Elf" : 2,
  "Headphone" : 2,
  "Piercing" : 2,
  "Wings" : 2,
  "Birthday" : 4,
  "Hat" : 4,
  "Police" : 4,
  "Viking" : 4,
  "Alpaca" : 8,
  "Halo" : 8,
  "Horns" : 8,
  "Santa" : 8,
  "Headband" : 16,
  "Lucky" : 16,
  "Luffy" : 16,
  "Marge" : 16,
  "Pokemon" : 16,
  "SS" : 16,
  "Astronaut" : 32,
  "SSGSS" : 32
}

// Initialize Llama Points Dictionary
let llamaPoints = {
}

data.forEach((element) => {
  let attributes = element.attributes;
  //console.log(attributes);
  let editionNumber = element.edition;
  let elementPoints = 0;
  let attributeName = "";

  llamaPoints[editionNumber] = 0;

  attributes.forEach((attribute) => {
      //Background Check
      if (attribute.trait_type == "Background"){
        attributeName = attribute.value;
        if (backgroundDict.hasOwnProperty(attributeName)){
          
          llamaPoints.key = editionNumber;
          llamaPoints[editionNumber] = llamaPoints[editionNumber] + parseInt(backgroundDict[attributeName]);
        }
        else {
          throw 'Background in json ' + editionNumber + ' is not found';
        }
      }

      //Eye Check
      if (attribute.trait_type == "Eye"){
        attributeName = attribute.value;
        if (eyeDict.hasOwnProperty(attributeName)){
          llamaPoints.key = editionNumber;
          llamaPoints[editionNumber] = llamaPoints[editionNumber] + parseInt(eyeDict[attributeName]);
        }
        else {
          throw 'Eye in json ' + editionNumber + ' is not found';
        }
      }

      //Face Check
      if (attribute.trait_type == "Face"){
        attributeName = attribute.value;
        if (faceDict.hasOwnProperty(attributeName)){
          llamaPoints.key = editionNumber;
          llamaPoints[editionNumber] = llamaPoints[editionNumber] + parseInt(faceDict[attributeName]);
        }
        else {
          throw 'Face in json ' + editionNumber + ' is not found';
        }
      }

      //Mouth Check
      if (attribute.trait_type == "Mouth"){
        attributeName = attribute.value;
        if (mouthDict.hasOwnProperty(attributeName)){
          llamaPoints.key = editionNumber;
          llamaPoints[editionNumber] = llamaPoints[editionNumber] + parseInt(mouthDict[attributeName]);
        }
        else {
          throw 'Mouth in json ' + editionNumber + ' is not found';
        }
      }

      //Fur Check
      if (attribute.trait_type == "Fur"){
        attributeName = attribute.value;
        if (furDict.hasOwnProperty(attributeName)){
          llamaPoints.key = editionNumber;
          llamaPoints[editionNumber] = llamaPoints[editionNumber] + parseInt(furDict[attributeName]);
        }
        else {
          throw 'Fur in json ' + editionNumber + ' is not found';
        }
      }

      //Outfit Check
      if (attribute.trait_type == "Outfit"){
        attributeName = attribute.value;
        if (outfitDict.hasOwnProperty(attributeName)){
          llamaPoints.key = editionNumber;
          llamaPoints[editionNumber] = llamaPoints[editionNumber] + parseInt(outfitDict[attributeName]);
        }
        else {
          throw 'Outfit in json ' + editionNumber + ' is not found';
        }
      }

      //Head Check
      if (attribute.trait_type == "Head"){
        attributeName = attribute.value;
        if (headDict.hasOwnProperty(attributeName)){
          llamaPoints.key = editionNumber;
          llamaPoints[editionNumber] = llamaPoints[editionNumber] + parseInt(headDict[attributeName]);
        }
        else {
          throw 'Head in json ' + editionNumber + ' is not found';
        }
      }
  });

});

// Remove the last key from llama points
if (llamaPoints.hasOwnProperty("key")){
  delete llamaPoints["key"]
}

// Debug llamaPoints
//console.log(llamaPoints);

// Initialize Llama Rarity Dictionary
let llamaRarity = {}

// Grab all point values from point dictionary and convert to rarities
for (const [key, value] of Object.entries(llamaPoints)) {
  //Assign the same key to both dictionaries
  llamaRarity.key = llamaPoints.key

  //Convert point values to rarity
  if (llamaPoints[key] >= 0 && llamaPoints[key] <= 25){
    llamaRarity[key] = "Rare";
  }

  else if (llamaPoints[key] >= 26 && llamaPoints[key] <= 35){
    llamaRarity[key] = "Legendary";
  }

  else if (llamaPoints[key] >= 36 && llamaPoints[key] <= 55){
    llamaRarity[key] = "Exotic";
  }

  else if (llamaPoints[key] >= 56){
    llamaRarity[key] = "Mythic";
  }
  else {
    throw "Something went wrong converting points to rarities";
  }

  // Debug
  // console.log(key, value);
  // console.log(llamaRarity[key]);
}

// Remove the last key from llama points
if (llamaRarity.hasOwnProperty("key")){
  delete llamaRarity["key"]
}

// Debug llama rairity
//console.log(llamaRarity);

// Count number of Rares, Legendaries, Exotics, and Mythics

var rareCount = 0;
var legendaryCount = 0;
var exoticCount = 0;
var mythicCount = 0;

for (const [key] of Object.entries(llamaRarity)) {
  if (llamaRarity[key] == "Rare"){
    rareCount ++;
  }

  else if (llamaRarity[key] == "Legendary"){
    legendaryCount++;
  }

  else if (llamaRarity[key] == "Exotic"){
    exoticCount++
  }

  else if (llamaRarity[key] == "Mythic"){
    mythicCount++;
  }
  else {
    throw "Something went wrong counting the number of rarities";
  }
}

console.log("For a collection of " + data.length + " the distribution is: " + '\n'
+ "Rare: " + rareCount + '\n'
+ "Legendary: " + legendaryCount + '\n'
+ "Exotic: " + exoticCount + '\n'
+ "Mythic: " + mythicCount + '\n'
)

// let attributeRarityDict = {
//   "I should not be here": 0, //???
//   "Common": 1,
//   "Rare": 2,
//   "Legendary": 3,
//   "Exotic": 4,
//   "Mythic": 5
// };

let attributeRarityDict = {
  "I should not be here": 0, //???
  "Common": 2,
  "Rare": 4,
  "Legendary": 8,
  "Exotic": 16,
  "Mythic": 32
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

  //Iterate over attributes
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;

    //console.log("The value is " + value + " which is of type " + typeof value);

    if (commonProperties.includes(value)){
      rarityDict[editionNumber] = "Common";
      elementPoints += 2;
    }

    else if (rareProperties.includes(value)){
      rarityDict[editionNumber] = "Rare";
      elementPoints += 4;
    }

    else if (legendaryProperties.includes(value)){
      rarityDict[editionNumber] = "Legendary";
      elementPoints += 8;
    }

    else if (exoticProperties.includes(value)){
      rarityDict[editionNumber] = "Exotic";
      elementPoints += 16;
    }

    else if (mythicProperties.includes(value)){
      rarityDict[editionNumber] = "Mythic";
      elementPoints += 32;
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

var tenCount = 0;
var fifteenCount = 0;
var twentyFiveCount = 0;
var fiftyCount = 0;

// Print the rarities
for (var key in rarityDict){

  if (rarityDict[key] >= 0 && rarityDict[key] <= 25){
    tenCount++;
  }

  else if (rarityDict[key] >= 26 && rarityDict[key] <= 35){
    fifteenCount++;
  }

  else if (rarityDict[key] >= 36 && rarityDict[key] <= 55){
    twentyFiveCount++
  }

  else if (rarityDict[key] >= 56){
    fiftyCount++
  }

  //console.log("The edition " + key + " has total points of " + rarityDict[key]);
}

//console.log("For a collection of 3477 we encountered \n" + tenCount + " Rares \n" + fifteenCount + " Legendaries \n" + twentyFiveCount + " Exotics \n" + fiftyCount + " Mythics")

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
  //console.log(`Trait type: ${layer}`);
  for (var trait in rarityData[layer]) {
    //console.log(rarityData[layer][trait]);
  }
  //console.log();
}

