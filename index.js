import puppeteer from "puppeteer";
import fs from "fs"
import express from "express"

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json()); 

app.post('/scrape', async (req, res) => {
  try {
    const keyword = req.body.keyword;
    console.log(keyword)
    if (!keyword) {
        res.status(400).json({ error: "Keyword is required" });
        return;
    }
    
    console.log(`Received keyword: ${keyword}`);
    
    const data = await goodInfo(keyword); 
    console.log(`Scraping successful. Returning data.`);
    res.json(data);
  } catch (error) {
    console.error(`Error scraping data: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


async function goodInfo(keyword) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    
    const page = await browser.newPage();
    // await page.setViewport({ width: 1246    , height: 900 });

    await page.goto('https://jumia.com.ng', {
        waitUntil: "domcontentloaded",
    });
    

    await page.locator('input#fi-q').fill(keyword);

    await page.click('button.btn');


    let nextPage= true;
    const allInfo = [];

    await page.waitForNavigation();
    
    while(nextPage){
        

        // await page.waitForSelector('.img', { timeout: 3000 });
        // await page.waitForSelector('.aim');
        
        // console.log('waiting for nav')

        // await page.waitForNetworkIdle();
       
        // await page.evaluate(() => {
            // console.log('scroll-down')
            // window.scrollBy(0, window.innerHeight); // Scroll down by the height of the viewport

            // setTimeout(() => {
                // console.log('scroll-up')
                // window.scrollBy(0, -window.innerHeight);
                // window.scrollBy(0, window.innerHeight);  
            // }, 3000);
        // });
        
        await page.waitForNetworkIdle();

        
        console.log("one")
        await page.evaluate(() => {
            const scrollStep = 100; // adjust this value to control the scroll speed
            const scrollInterval = 100; // adjust this value to control the scroll interval
          
            return new Promise((resolve) => {
              let currentScrollPosition = 0;
              let intervalId = setInterval(() => {
                window.scrollTo(0, currentScrollPosition);
                currentScrollPosition += scrollStep;
          
                if (currentScrollPosition >= document.body.scrollHeight) {
                  clearInterval(intervalId);
                  resolve();
                }
              }, scrollInterval);
            });
          });
       
          console.log('four')

        const detailsOnPage =await page.evaluate(() => {
            
            
            const TotalDetails = document.querySelectorAll('.core');
            
            const info = Array.from(TotalDetails).map((singleDetail) => {
                const imageSrc = singleDetail.querySelector('.img').getAttribute('src');
                const name = singleDetail.querySelector('.name').innerHTML;
                const newPrice = singleDetail.querySelector('.prc').innerHTML;
                // console.log(name, newPrice)
                return{imageSrc, name, newPrice};
            });
            console.log(info)
            return info;
        });
    
        allInfo.push(...detailsOnPage);
        
        try {
            const nextPageLink = await page.waitForSelector('a[aria-label="Next Page"]', { timeout: 10000 });
            await nextPageLink.click();
            await page.waitForNavigation();
        } catch (error) {
            console.log("Next page link not found. Exiting loop.");
            nextPage = false;
        }

    }

    console.log(allInfo);
    
    
    await browser.close();
    return allInfo
}
