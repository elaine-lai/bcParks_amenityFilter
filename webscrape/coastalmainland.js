// const puppeteer = require('puppeteer');

import puppeteer from 'puppeteer';
const url = 'https://camping.bcparks.ca/';

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));


async function goPassFirstPage(p){
  await p.evaluate(() => {
    //accept consent for cookies
    document.querySelector("#consentButton").click()

    //click on dropdown for equipment
    document.querySelector("#equipment-field").click()

    //select 1 tent
    document.querySelector("#mat-option-0 > span").click()

    //search button
    document.querySelector("#actionSearch").click()
  }).catch(() => {console.log("error going to next page.")})
}


//mass list of campsites in Southern Interior
async function returntoSouthern(p){
  const allSP = await p.$('#breadcrumb > li:nth-child(2) > button')
  allSP.click();
  p.waitForNavigation()
}

async function mapView(p){
  const map = await p.$('#map-view-button-button')
  map.click();
  p.waitForNavigation()
}

async function listView(p){
  const list = await p.$('#list-view-button-button')
  list.click();
  p.waitForNavigation()
}

async function firstLetterIsDigit(the_string){
  const firstLetter = the_string.charAt(0)
  var hasNumber = /\d/;  
  // console.log(hasNumber.test(firstLetter))
  if(hasNumber.test(firstLetter)){
    return true
  }
  return false
}

let finalSouthernData = [{}] // array of objects

async function getSouthernData(){
  const browser = await puppeteer.launch({headless: false}); //launch browser
  const page = await browser.newPage(); //initialize page variable
  await page.goto(url); //go to url
  await page.goto(url, {waitUntil: "domcontentloaded"}); //wait for page to load

  await page.waitForNavigation({waitUntil: 'networkidle0'});
  
  goPassFirstPage(page);

  await page.waitForNavigation({waitUntil: 'networkidle0'});
  await delay(2000);  
  //click the list buttonmat
  listView(page);

  
  await page.waitForSelector("#ListView > div > div.list-wrapper > mat-accordion", { timeout: 5_000 });

  //click every single park and go back home
  // const allParksNames = Array.from(await page.$$('#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel > mat-expansion-panel-header'))

  //COASTAL
  page.evaluate(() => {
    document.querySelector('#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel:nth-child(3) > mat-expansion-panel-header').click() //1 = southern interior
  })
  
  await delay(4000);

  //list of available coastal mainland campsites
  const southernSubparks = Array.from(await page.$$('#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel > mat-expansion-panel-header'))
  var hasNumber = /\d/;   

  //THIS LENGTH IS ONLY FOR WHATEVERS SHOWING, need to click VIEW MORE
  for(let i = 0; i < southernSubparks.length; i++){
    const theObject = new Object();
    //wait for whole southern interior list to show up
    page.waitForSelector('#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel > mat-expansion-panel-header')
    let subparkIdentifierButton = '#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel:nth-child(' + (i+1) +') > mat-expansion-panel-header'
    //get the numerical order of the southern subparks
    const campgroundText = await (await southernSubparks[i].getProperty('innerText')).jsonValue()
    //create object and put object into object list above
    finalSouthernData.push(theObject)
    theObject.area = 'Coastal Mainland'
    theObject.campground = campgroundText
    console.log("=== " + campgroundText + " ===" )
    page.waitForNavigation();
    await delay(4000);

    //click each subpark chronologically 
    const clickEachCampground = await page.$(subparkIdentifierButton)
    clickEachCampground.click();
    
    //show the sub campgrounds (campground: big bar lake, subcampground: lakeshore)
    await delay(4000);
    page.waitForSelector('#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel > mat-expansion-panel-header')
    const subcampgroundList = Array.from(await page.$$('#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel > mat-expansion-panel-header'))

    //iterating through the campgrounds subcampgrounds (lakeshore)
    for (let i = 0; i < subcampgroundList.length; i++){
      let subCampgroundText = await (await subcampgroundList[i].getProperty('innerText')).jsonValue()
      console.log("\n~~~" + subCampgroundText + " ~~~") //subcampground name
      subCampgroundText = subCampgroundText.replace("Campsite\n" , "") 
      // console.log("NEW NAME: " + subCampgroundText + "\n")
      theObject.subcampground = subCampgroundText
      const firstLet = subCampgroundText.charAt(0)

      //if campgrounds name STARTS with a number, need to skip checking others
      if (firstLet >= 0 && firstLet <= 9){
        console.log(subCampgroundText + " first letter starts with a number!")
        theObject.subcampground = "null"

        //go to maps 
        mapView(page);
        page.waitForNavigation()

        //get list of amenities
        page.waitForSelector('#MapView > div > div:nth-child(1) > app-map-icon-legend.ng-star-inserted > mat-expansion-panel > div.mat-expansion-panel-content > div.mat-expansion-panel-body > div.expansion-panel-content > div')
        page.waitForNavigation()
        
        await delay(2000);
        const mapIconLegend = await page.$$('#MapView > div > div:nth-child(1) > app-map-icon-legend:nth-child(7) > mat-expansion-panel > div.mat-expansion-panel-content > div.mat-expansion-panel-body > div.expansion-panel-content > div');
        let amenitiesList = []
        for (let t of mapIconLegend){
          amenitiesList.push(await t.evaluate(x => x.textContent));
        }
        await delay(4000);
        theObject.amenities = amenitiesList
        console.log("THATS ALL THE AMENITIES!")
        console.log(theObject)

        //RETURNING BACK TO LIST OF SOUTHERN INTERIOR!
        console.log("returning back to list of coastal interior!!")
        page.waitForSelector('#breadcrumb > li:nth-child(2) > button')
        await delay(6000);
        returntoSouthern(page);
        page.waitForNavigation()
        console.log("returned from yes first letter number!")
        
        await delay(6000);
        listView(page);
        console.log("finito, going to next iteration!")
        await delay(6000);
        break; //skip the rest of the code in this iteration
      }else{
        console.log(subCampgroundText + " first letter NOT start with a number!")
        //otherwise, continue
        await delay(4000);
        await page.waitForSelector('#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel')
        // let subCampgroundButton = '#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel:nth-child(' + (i+1) +') > mat-expansion-panel-header'
        const clickEachSubcampground = await page.$('#ListView > div > div.list-wrapper > mat-accordion > mat-expansion-panel:nth-child(' + (i+1) +') > mat-expansion-panel-header')
        clickEachSubcampground.click();
        page.waitForNavigation()
        await delay(4000);

        //back to maps
        mapView(page);
        page.waitForNavigation()

        //CAMPSITE AMENITIES
        page.waitForSelector('#MapView > div > div:nth-child(1) > app-map-icon-legend.ng-star-inserted > mat-expansion-panel > div.mat-expansion-panel-content > div.mat-expansion-panel-body > div.expansion-panel-content > div')
        page.waitForNavigation()
        
        await delay(2000);
        const mapIconLegend = await page.$$('#MapView > div > div:nth-child(1) > app-map-icon-legend:nth-child(7) > mat-expansion-panel > div.mat-expansion-panel-content > div.mat-expansion-panel-body > div.expansion-panel-content > div');
        let amenitiesList = []
        for (let t of mapIconLegend){
          amenitiesList.push(await t.evaluate(x => x.textContent));
        }
        await delay(4000);
        theObject.amenities = amenitiesList
        console.log("THATS ALL THE AMENITIES!")
        console.log(theObject)

        //RETURNING BACK TO LIST OF COASTAL MAINLAND
        console.log("returning back to list of coastal mainland!!")
        await delay(6000);
        page.waitForSelector('#breadcrumb > li:nth-child(2) > button')
        returntoSouthern(page);
        console.log("returned from non number letter!")
        
        await delay(4000);
        listView(page);
        console.log("finito, going to next iteration!")
        await delay(4000);
      }
      await delay(6000);
    }
  }
  console.log(finalSouthernData)
  await browser.close();
}

getSouthernData();