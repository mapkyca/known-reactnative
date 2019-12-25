import FormData from 'react-native/Libraries/Network/FormData';
import './shim.js';
import crypto from 'crypto'

 
export default class API {
    
    /**
     * Initialise the api
     */
    constructor (baseurl, username, apikey) {
        
        // Normalise url
        
        // Normalise action
        
        
        this.baseurl = baseurl;
        this.username = username;
        this.apikey = apikey;
        
    }
    
    /**
     * Call an api endpoint
     */
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
    
    /**
     * Log in to your site, using the normal way, with an option of two factor auth (tbi)
     */
    getAPIToken(username, password, twofactor) {
        
        this.baseurl = this.baseurl.trim();
        this.baseurl = this.baseurl.replace(/\/$/, "");
        this.baseurl = this.baseurl.replace(/\s/, "");
        
        // Retrieve tokens
        return fetch(this.baseurl + '/session/login/', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                //'Content-Type': 'application/json'
            }
        })
          .then((tokenresponse) => tokenresponse.json())
          .then((tokenresponseJson) => {
              
            console.log(tokenresponseJson);
    
            // See if we're already logged in
            if (tokenresponseJson['api-token'] != '' && tokenresponseJson['api-token'] !== null) {
                return tokenresponseJson;
            }
    
            var params = {
                email: username, 
                password: password,
                __bTk: tokenresponseJson.csrf[0].token,
                __bTs: tokenresponseJson.csrf[0].time,
                __bTa: tokenresponseJson.csrf[0].action
            };
            
            if (twofactor !== '' && twofactor !== null) {
                params['2fa'] = twofactor;
            }
            
            var formdata = new FormData();
            
            for (var k in params) {
                formdata.append(k, params[k]);
            }
        
            var query = {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    //'Content-Type': 'application/json'
                },
                body: formdata
            };

            return fetch(this.baseurl + '/session/login/', query)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //console.log(responseJson);
                        //console.log("Response: " + JSON.stringify(responseJson));
                        return responseJson;
                    })
                    .catch((error) => {
                        console.warn(error)
                    });
                    
        })
        .catch((tokenerror) => {
            console.warn(tokenerror)
        });
        
    }
}