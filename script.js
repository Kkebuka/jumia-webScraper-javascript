document.getElementById('scrap-btn').addEventListener('click', async() => {
    try{
        const response = await fetch('/scrape', {method: 'GET'});
        if(response.ok){
            const data = await response.json();
            console.log('Scraped data', data);
        } else{
            console.log('Failed to trigger Puppeteer script', response.statusText);
        }
         
    } catch (err) {
        console.log('Error triggering Puppeteer script', err);
             }
});