const search = document.getElementById('search');
const list = document.getElementById('match-list');

//this will search or fetch the json file 
let searchStates = async searchText => {
    const res = await fetch('../data/state.json');
    const state = await res.json();

    //get the same input of the state from the json
    let match = state.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });
    if(searchText.length === 0){
        match = [];
        list.innerHTML = '';
    }
    
    showInHTML(match);
}

//show the state capital in list

const showInHTML = match => {
    if(match.length > 0){
        const html = match.map(matchs => `
            <div class='card card-body mb-1'>
            <h4>${matchs.name} (${matchs.abbr}) <span class='text-warning'> ${matchs.capital} </span> </h4>
            <small>Lat: ${matchs.lat} , Long: ${matchs.long}</small>
            </div>
        `)
        .join('');
        list.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));