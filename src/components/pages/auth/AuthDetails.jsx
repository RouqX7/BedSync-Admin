import React, {useEffect, useState} from "react";
import {onAuthStateChanged,signOut} from "firebase/auth";
import { auth } from "../../firebase";

const AuthDetails = () => {
    const [authUser,setAuthUser] = useState(null);


    useEffect(() => { 
        const listen = onAuthStateChanged(auth,(user) =>{
                if (user) {
                    setAuthUser(user)
                } else {
                    setAuthUser(null);
                }
        });
        return () => {
            listen();
        }

    }, []);

    const UserSignOut = () => {
        signOut(auth).then(() => {
            console.log("sign out succesful")
        }).catch(error => console.log(error))
    }
    
  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={UserSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;