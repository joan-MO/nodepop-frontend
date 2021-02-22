const BASE_URL = 'http://localhost:8000';
const TOKEN_KEY = 'token';
export default {

    getAnnouncements: async function (){
        const response = await fetch(`${BASE_URL}/api/announcements?_expand=user`);
        if (response.ok) {
            const data = await response.json();
            return data.map(announcement => {
                const user = announcement.user || {};  
                console.log(user);    
                return { 
                    id: announcement.id,
                    name: announcement.name,
                    sale: announcement.sale,
                    price: announcement.price,
                    image: announcement.photo || null,
                    tags: announcement.tags || null
                    //canBeDeleted: currentUser ? currentUser.userId === tweet.userId : false*/
                }
                
            });
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },
    post: async function(url, postData, json=true) {
        return await this.request('POST', url, postData, json);
    },

    delete: async function(url) {
        return await this.request('DELETE', url, {});
    },

    put: async function(url, putData, json=true) {
        return await this.request('PUT', url, putData, json);
    },

    request: async function(method, url, postData, json=true) {
        const config = {
            method: method,
            headers: {},
            body: null
        };
        if (json) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData);  // convierte el objeto de usuarios en un JSON
        } else {
            config.body = postData;
        }
        
        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, config);
        const data = await response.json();  // respuesta del servidor sea OK o sea ERROR.
        if (response.ok) {
            return data;
        } else {            
            // TODO: mejorar gestión de errores
            // TODO: si la respuesta es un 401 no autorizado, debemos borrar el token (si es que lo tenemos);
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    registerUser: async function(user) {
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    login: async function(user) {
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url, user);
    },

    
    saveToken: async function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function() {
        return localStorage.getItem(TOKEN_KEY);
    },


}