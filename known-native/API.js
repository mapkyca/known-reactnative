import { FormData} from 'react-native';
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
    
    call(action, params = {}, method = 'GET', content_type = 'application/json') {
        
        console.log("Calling " + action);
        
        this.baseurl = this.baseurl.trim();
        this.baseurl = this.baseurl.replace(/\/$/, "");
        this.baseurl = this.baseurl.replace(/\s/, "");
        
        var hmac = crypto.createHmac('sha256', this.apikey);
        hmac.update(action);
        
        var query = {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': content_type,
                'X-KNOWN-USERNAME': this.username,
                'X-KNOWN-SIGNATURE': hmac.digest('base64')
            }, 
        };
        if (method == 'POST') {
            if (content_type == 'application/json')
                query.body = JSON.stringify(params);
            else
                query.body = params;
        }
        
        console.log("Query: ");console.log(query);
        
        return fetch(this.baseurl + action, query)
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log("Response: " + JSON.stringify(responseJson));
                    return responseJson;
                })
                .catch((error) => {
                    console.warn(error)
                })
    }
}