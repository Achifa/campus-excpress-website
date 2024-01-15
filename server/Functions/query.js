const { NeonDB } = require("../db")

function query_db(pool, type, specification, table, condition, set, table_list, table_values) {

    if(type.toLowerCase() === 'select'){

        return(
            condition.bool === 1
            ? 
                pool.query(`${type} ${specification} FROM ${table} WHERE ${condition.search_word[0]} = '${condition.identifier[0]}'` ).then(result => result).catch(err => err)
            :
            condition.bool === 2
            ?
                pool.query(`${type} ${specification} FROM ${table} WHERE ${condition.search_word[0]} = '${condition.identifier[0]}' AND ${condition.search_word[1]} = '${condition.identifier[1]}'` ).then(result => result).catch(err => err)
            :
                pool.query(`${type} ${specification} FROM ${table} ` ).then(result => result).catch(err => err)
        )
    }else if(type.toLowerCase() === 'delete'){
        condition.bool === 1
        ? 
            pool.query(`${type} FROM ${table} WHERE ${condition.search_word[0]} = '${condition.identifier[0]}'` ).then(result => result).catch(err => err)
        :
        condition.bool === 2
        ?
            pool.query(`${type} FROM ${table} WHERE ${condition.search_word[0]} = '${condition.identifier[0]}' AND ${condition.search_word[1]} = '${condition.identifier[1]}'` ).then(result => result).catch(err => err)
        :
            ''

    }else if(type.toLowerCase() === 'update'){
        condition.bool === 1
        ? 
            pool.query(`${type} ${table} SET ${set.map(item => `${Object.keys(item)}=${Object.values(item)}`).join()}  WHERE ${condition.search_word[0]} = '${condition.identifier[0]}'` ).then(result => result).catch(err => err)
        :
        condition.bool === 2
        ? 
            pool.query(`${type} ${table} SET ${set.map(item => `${Object.keys(item)}=${Object.values(item)}`).join()}  WHERE ${condition.search_word[0]} = '${condition.identifier[0]}'  AND ${condition.search_word[1]} = '${condition.identifier[1]}'` ).then(result => result).catch(err => err)
        :
            ''
    }else if(type.toLowerCase() === 'insert'){

        return pool.query(
            `
            ${type} 
            INTO 
            ${table}(
                id,
                ${table_list.map(item => item).join()}
            ) 
            VALUES(
                DEFAULT,
                ${table_values.map(item => item).join()}
            )
            ` 
        )
        .then(result => result.rowCount)
        .catch(err => err)
         
    }

    
}

function query_tool(type, specification, table, condition, set, table_list, table_values) {
    return(
        NeonDB.then((pool) => query_db(pool, type, specification, table, condition, set, table_list, table_values)).catch(err => (err))
    )
}

// {
//     bool: 0,
//     search_word: [],
//     identifier: [],
//     set: [{fname: fname}],
//     table_list: [],
//     table_values: []

// }

// query_db(
//     type /* for all actions */, 
//     specification /* for select action*/, 
//     table_name /* for all actions */, 
//     {
//         bool: 0,
//         search_word: [],
//         identifier: [],
//         //for delete and select and update

//     }, 
//     [
//         //for updates only
//         //array of object... keys stands for table column to be updated and the value is the column value that will be inserted
//     ], 
//     [
//         //for insert... database table columns availble
//     ], 
//     [
//         //for insert... values to be inserted into database table columns availbele
//     ]
// )

module.exports = {query_tool}