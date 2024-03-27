import axios from "axios";


export const HttpService = axios.create({

    baseURL: 'https://eminav-001-site1.itempurl.com/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }


});