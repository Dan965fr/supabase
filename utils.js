import supabase from './db.js';


export async function authenticate(username,password){
    const {data,error} = await supabase
        .from('users')
        .select('*')
        .eq('username',username)
        .eq('password',password)
        .single()
    if(error || !data) return null;
    return data;

}