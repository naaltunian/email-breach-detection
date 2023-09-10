const fs = require('fs')
const readlineSync = require('readline-sync')
require('dotenv').config()

async function main() {
    const email = readlineSync.question('What is your email?');
    const truncateSelect = ['yes', 'no']
    const truncateIndex = readlineSync.keyInSelect(truncateSelect, 'Do you want the full breach response?')
    
    const url = new URL(`${process.env.HIBP_BASE_URL}/${email}`)
    if (truncateIndex === 0) {
        url.searchParams.set('truncateResponse', 'false')
    }

    const response = await fetch(url, {
        headers: {
            'hibp-api-key': process.env.HIBP_KEY,
            'user-agent': 'nick\'s app'
        }
    })

    if (response.status !== 200) {
        console.log('No breaches')
        return
    }

    const data = await response.json()

    fs.writeFileSync('output.json', JSON.stringify(data))
}

main()