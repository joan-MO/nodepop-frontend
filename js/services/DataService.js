
export default {

    getAnnouncements: async function (){
        const response = await fetch('http://localhost:8000/api/announcements');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    }

}