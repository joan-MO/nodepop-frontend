
export default {

    getAnnouncements: async function (){
        const response = await fetch('http://localhost:8000/api/announcements?_expand=user');
        if (response.ok) {
            const data = await response.json();
            return data.map(announcement => {
                const user = announcement.user || {};      
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
    }

}