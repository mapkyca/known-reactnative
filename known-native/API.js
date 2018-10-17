
import './shim.js';
const crypto = require('crypto-browserify');
 
export default class API {
    
    constructor (baseurl, username, apikey) {
        
        // Normalise url
        
        // Normalise action
        
        
        this.baseurl = baseurl;
        this.username = username;
        this.apikey = apikey;
        
    }
    
    call(action, params = {}, method = 'GET') {
        
        var hmac = crypto.createHmac('sha256', this.apikey);
        hmac.update(action);
        
        var query = {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-KNOWN-USERNAME': this.username,
                'X-KNOWN-SIGNATURE': hmac.digest('base64')
            }, 
        };
        if (method == 'POST') {
            query.params = params;
        }
        
        return fetch(this.baseurl + action, query)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("fetch: " + JSON.stringify(responseJson))
                    return responseJson;
                })
                .catch((error) => {
                    console.error(error)
                })
    }
}