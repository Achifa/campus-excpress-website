const { query_tool } = require("./query")

function create_token(email,user_id,token,date) {
    return(
        query_tool(
            'INSERT', 
            '', 
            'email_token', 
            {

            },
            [

            ],
            [
                'email','user_id','token','date'
            ],
            [
                `'${email}'`, `'${user_id}'`, `'${token}'`, `'${date}'`
            ]

        )
    )
}

function create_token_for_pwd(email,user_id,token,date) {
    return(
        query_tool(
            'INSERT', 
            '', 
            'password_token', 
            {

            },
            [

            ],
            [
                'email','token','date','user_id'
            ],
            [
                `'${email}'`, `'${token}'`, `'${date}'`, `'${user_id}'`
            ]

        )
    )
}

function create_otp(params) {
    
}


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


module.exports ={
    create_token,
    create_token_for_pwd
}