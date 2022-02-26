

export const getDisscount = (game) =>{
    return (game.disccount > 0) ?  (game.price - (game.price * game.disccount) / 100).toFixed(2) : game.price;
}


export const getTotal = (games = []) => {
    let total = 0;
    if(games.length > 0){
        games.forEach((game) => {
            total += Number(getDisscount(game));
        })
    }

    return total.toFixed(2);
}
