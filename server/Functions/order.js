function create_order(params) {
    return(
        NeonDB.then((pool) => 
            pool.query(``)
            .then(result => result.rowCount > 0 ? true : false)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function update_order(params) {
    return(
        NeonDB.then((pool) => 
            pool.query(``)
            .then(result => result.rowCount > 0 ? true : false)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}