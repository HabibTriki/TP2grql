import { GraphQLError } from "graphql";

export const cv = {
    user : ({user}, _ ,{db}) =>{
        return user ;
    }, 
    skills : ({skills},_,{db})=>{
        return skills;
    },
}

export const query = {
    cvsFetch : (_ , __ , {db})=>{
        return db.cvs;
    },
    cvId : (_ , {id}, {db})=>{
        const cvFound =  db.cvs.find(cv => cv.id === id);
        if(!cvFound) throw new GraphQLError("Cv not found" ,
        {
            extensions: {
                http: {
                    status: 404,
                    headers: {
                    "x-custom-header": "some-value",
                    },
                },
            }
        });
        return cvFound;
    },
    skills : (_,__,{db})=>{
        return db.skills;
    },
}

export const skill = {
    cvs : ({id},_,{db})=>{
        return db.cvs.find(cv => cv.skills.some(skill => skill.id === id));
    },
}


