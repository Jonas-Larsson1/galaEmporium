export const isClubOwner = async (clubId) => {
    const currentUser = await (await fetch('/api/login')).json()
    const club = await (await fetch(`/api/club/${clubId}`)).json()
    return club.owners.includes(currentUser.loggedIn)
}