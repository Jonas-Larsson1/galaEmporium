export default async function editClubPage(clubId){
    
    let club = await (await fetch(`/api/club/${clubId}`)).json()
    // let currentClubName = club.clubId.name     

    console.log(club)

    const userId = await (await fetch ("/api/login")).json()
    if (userId.loggedIn) {
            
        return `
        <form id="edit-form">
        <label for="name">Change name</label><br>
        <input type="text" id="edit-name" name="name" value="${club.name}"><br>
        
        <label for="description">Change description</label><br>
        <input type="text" id="edit-description" name="description" value="${club.description}"><br>
        
        
        <label for="img">Change image</label><br>
        <input type="text" id="edit-image" name="image" value="${club.image}"><br>
        
        <input type="submit" id="edit-submit" value="Submit" onclick="updateClub('${clubId}'); return false;">
        </form>
        `  
        } else {
            return `
                <p>You need to be logged in to create/edit the club</p>
            `
        } 
    } 
        
async function updateClub(clubId){

    const updatedData = {
        name: $('[name="name"]').val(),
        description: $('[name="description"]').val(),
        image: $('[name="image"]').val()
    }

    const clubIdHref = clubId

    let club = await fetch(`/api/club/${clubId}`, {
        method: "put" ,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })

    let hash = `#club?${clubIdHref}`;

    const res = await club.json();
    console.log(hash)

    window.location.hash = hash;
} 
    
window.updateClub = updateClub;
