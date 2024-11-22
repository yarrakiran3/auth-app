"use server"
import { signOut ,signIn, auth} from "../../../auth"
import { AuthError } from "next-auth";
import { BasicDetailsDataObject ,LoginFormDataObject } from "./definitions";
import { sql } from "@vercel/postgres";


// SignIn actions 

export async function logIn(formData:LoginFormDataObject){
    const email=formData.mail.trim().normalize()
    const password=formData.password.trim().normalize()
    try{
        // console.log(formData)
        // Run the SQL query to check if the user exists
        const user=await checkUserFromCredentialsUser(email,password);

        if(!user||user===undefined||user===null||user===0){

            return "Invalid Credentials"

        }else{
            
            const login=await signIn('credentials',{email,password,redirectTo:'/'});
        }
        
        
    } catch(error){
        if(error instanceof AuthError){
            console.log(error.type)
            switch (error.type) {

                case 'CredentialsSignin':

                  return 'Invalid credentials.';
                default:
                  return 'Something went wrong.';
              }
            
        }
        throw error;
    }

    
    
   

}

export async function logOut(){
    
    console.log("Getting Logged Out")
    await signOut({redirectTo:"/"});
}

export async function handleGitLogin() {
    const siginingin=await signIn("github");
    if(siginingin){
        let session = await auth();

    }
}

export async function handleGoogleLogin() {
    await signIn("google",{redirectTo:"/"})
}

export async function handleLinkedInLogin() {
    await signIn("linkedin",{redirectTo:"/"})
}

// SignUp actions from here

export async function CredentialsSignUp(name:string,mail:string,password:string){
    const email=mail.trim().normalize();
      const checkuser=await getUserFromCredentialsUsers(email);
        if(checkuser&&checkuser!==null&&checkuser!==undefined&&checkuser>0){
            return "Account Already Exists"
        } else {
            // Save to DB
            const saveuser=saveUserToCredentialsUsers(name,email,password)
            console.log("User saved Successfully")
            const signin= await signIn('credentials',{email,password,redirectTo:"/auth/userdetails",});
        }
    
   

}



export async function handleGitSignUp() {
    console.log("This is from handleGitSignUp before await")
    const user =await signIn("github",{redirectTo:"/auth/userdetails"})
    console.log("This is from handleGitSignUp")
        // console.log(user)
    // save the login details to database
}

export async function handleGoogleSignUp() {
    // Check for User - if exists then dont let to sign up
    
    await signIn("google",{redirectTo:"/auth/userdetails"})
}

export async function handleLinkedInSignUp() {
    await signIn("linkedin",{redirectTo:"/auth/userdetails"})
}

export async function onDetailsSubmit(detailsObject:BasicDetailsDataObject) {
    'use server'
    const session = await auth();

    if(session&&session!==null&&session!=undefined)
        {
            const mail=session.user?.email;
            const provider=session.user?.id;

            
            let savedetails:any;
            if(provider!=="credentials")
            {
                try{
                        savedetails=await sql`
                        update oauth_users 
                        set stream=${Number(detailsObject.stream)},
                            branch=${Number(detailsObject.branch)},
                            domain=${Number(detailsObject.domain)},
                            level_of_study=${String(detailsObject.level_of_study).trim()},
                            college=${detailsObject.college},
                            number=${detailsObject.number}
                        where mail=${String(mail)} and provider=${provider}
                        `;
                        // console.log("Saved Suesfully");

                }catch(error){
                console.log("Error saving details to auth users",error);
                
                }

            } else {
                try{
                    savedetails=await sql`
                update credentials_users 
                set stream=${Number(detailsObject.stream)},
                    branch=${Number(detailsObject.branch)},
                    domain=${Number(detailsObject.domain)},
                    level_of_study=${Number(detailsObject.level_of_study)},
                    college=${detailsObject.college},
                    number=${detailsObject.number}
                where mail=${String(mail)};
                `
                }catch(error){
                    console.log("Error saving details to credentials users",error);
                    
                }
                
            }


           
            if(savedetails&&savedetails!==null&&savedetails!==undefined&&savedetails.rowCount>0){
                return "Saved Successfully"
            } else {
                return "Not saved to DB";
            }
        
        

        } else {

            return "LogIn to continue"
        }
}

// DB API's
export async function getUserFromCredentialsUsers(mail:string) {
    try{
        const usercheck = await sql`
                select user_id from credentials_users where mail = ${mail} 
            `;
            return usercheck.rowCount;
    } catch(error){
        console.log(error);
        throw new Error('Failed to fetch user, Issue with query or db')
    }
}

export async function checkUserFromCredentialsUser(mail:string,password:string) {
    try{
        const usercheck = await sql`
                select user_id from credentials_users 
                where mail = ${mail} and password = ${password}`;
            return usercheck.rowCount;
            
    } catch(error){
        console.log(error);
        throw new Error('Failed to fetch user, Issue with query or db')
    }
}

export async function saveUserToCredentialsUsers(name:string,mail:string,password:string) {
    try{
        

        const saveuser = await sql`
                insert into credentials_users (name,mail,password)
                values (${name},${mail},${password})
            `;

        return saveuser.rowCount;
    } catch(error){
        console.log(error);
        throw new Error('Failed to fetch user, Issue with query or db')
    }
}


export async function getUserFromOAuthUsers(mail:string,provider:string) {
    try{
          const usercheck=await sql`
          select user_id from oauth_users where mail=${mail} and provider=${provider};
          `
          console.log("Sucesfully cheked the db");

        return usercheck.rowCount;
        
    } catch(error){
        console.log(error);
        throw new Error('Failed to fetch user from credentials users, Issue with query or db')
    }
}


export async function saveUserToOAuthUsers(mail:string,name:string,provider:string) {
    try{
        
        const saveuser = await sql`
        insert into oauth_users (mail,name,provider)
        values (${mail},${name},${provider});
        `;

        return saveuser
    } catch(error){
        console.log(error);
        throw new Error('Failed to fetch user from oauth users, Issue with query or db')
    }
}


export async function fetchUserDetails(email:string,provider:string){

    if(provider==="credentials"){

        try{
            const user = await sql`
                select mail,name,number,stream,branch,domain,college,level_of_study from credentials_users where mail = ${email} 
            `;
            return user.rows[0];
        }catch(error){
            console.log(error);
            throw new Error("Falied to fetch user from credentials table")
        }
    } else {
        try{
            const user = await sql`
                select mail,name,number,stream,branch,domain,college,level_of_study from oauth_users where mail = ${email} 
            `;
            return user.rows[0];
        }catch(error){
            console.log(error);
            throw new Error("Falied to fetch user from oauth table ")
        }

    }
    
}


