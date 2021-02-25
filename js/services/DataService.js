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
                    tags: announcement.tags || null,
                    //canBeDeleted: currentUser ? currentUser.userId === tweet.userId : false*/
                    //viewDetail: announcement.id
                }
                
            });
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    getAnnouncementById: async function(id){
        const currentUser = await this.getUser();
        const response = await fetch(`${BASE_URL}/api/announcements/${id}`);
        if (response.ok) {
            const data = await response.json(); 
                return { 
                    id: data.id,
                    name: data.name,
                    sale: data.sale,
                    price: data.price,
                    image: data.photo || null,
                    tags: data.tags || null,
                    canBeDeleted: currentUser ? currentUser.userId === data.userId : false
                    //viewDetail: announcement.id
                }
                
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
            config.body = JSON.stringify(postData); 
        } else {
            config.body = postData;
        }
        
        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, config);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {            
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

    isUserLogged: async function() {
        const token = await this.getToken();
        return token !== null;
    },

    saveAnnouncement: async function(announcement) {
        const url = `${BASE_URL}/api/announcements`;
        if (announcement.photo) {
            const imageURL = await this.uploadImage(announcement.photo);
            announcement.photo = imageURL;
        }
        return await this.post(url, announcement);
    },

    uploadImage: async function(image) {
        const form = new FormData();
        form.append('file', image);
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        return response.path || null;
    },

    getUser: async function() {
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                return null;
            }
            const payload = tokenParts[1]; // cogemos el payload, codificado en base64
            const jsonStr = atob(payload); // descodificamos el base64
            const { userId, username } = JSON.parse(jsonStr); // parseamos el JSON del token descodificado
            return { userId, username };
        } catch (error) {
            return null;
        }
    },

    deleteAnnouncement: async function(announcement) {
        const url = `${BASE_URL}/api/announcements/${announcement.id}`;
        return await this.delete(url);
    }



}