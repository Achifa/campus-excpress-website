function create_item(params) {
    return(
        NeonDB.then((pool) => 
            pool.query(``)
            .then(result => result.rowCount > 0 ? true : false)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function update_item(params) {
    return(
        NeonDB.then((pool) => 
            pool.query(``)
            .then(result => result.rowCount > 0 ? true : false)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}