import fs from 'fs'

import path from 'path'

// path for config setup

console.log('initialzing the config path')
const configPath = 'config.json'
const premiumPath = "db.json"

//load config at startup

let config = {}

if (fs.existsSync(configPath)){
    console.log('config file found...trying to read...')
    try {

        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        console.log('config file read successful !')
    } catch (e){

        console.log('error while reading the config file...verify config.json.')

        config = { users: {}}
    } 

} else {

    console.log('config file not found...')

    config = { users: {}}

}

//auto save 

const saveConfig = () => {
    console.log('saving config in file...')
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log('successfully saved config.')
}


//managing premium user

let premiums = {}

if (fs.existsSync(premiumPath)){
    try {

        premiums = JSON.parse(fs.readFileSync(premiumPath, 'utf-8'))
        console.log('premium user load successfully !')

    } catch (e){

        console.log('error while reading the config file...verify config.json.')

        premiums = { premiumUser : {}}
    } 
} else {
    premiums = { premiumUser: {}}
    console.log('PSF not found')
}

const savePremium = () => {
console.log('...PSS...')//premium save successfully
fs.writeFileSync(premiumPath, JSON.stringify(premiums, null, 2))
console.log('successfully SPU ') //save premium user
}
export default {
    config,
    premiums,

    saveP(){
        savePremium()
    },
    save(){
        saveConfig()
    }
}