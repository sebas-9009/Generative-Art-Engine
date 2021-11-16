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
  "Luffy",
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
   "Hokage",
];

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

// Initialize counter variables
// var commonCount = 0;
// var rareCount = 0;
// var legendaryCount = 0;
// var exoticCount = 0;
// var mythicCount = 0;

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

  console.log("The edition " + key + " has total points of " + rarityDict[key]);
}

console.log("For a collection of 3477 we encountered \n" + tenCount + " Rares \n" + fifteenCount + " Legendaries \n" + twentyFiveCount + " Exotics \n" + fiftyCount + " Mythics")

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

