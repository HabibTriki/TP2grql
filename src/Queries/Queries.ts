import { GraphQLError } from "graphql";

export const CV= {
    user : ({user}, _ ,{db}) =>{
        return user ;
    }, 
    skills : ({skills},_,{db})=>{
        return skills;
    },
}

export const Query = {
    CVsFetch : (_ , __ , {db})=>{
        return db.CVs;
    },
    CVByID : ( _ , {id}, {db})=>{
        const cvfound =  db.CVs.find(Cv => Cv.id === id);
        if(!cvfound) throw new GraphQLError("CVnot found" ,
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
        return cvfound;
    },
    skills : (_,__,{db})=>{
        return db.skills;
    },
}

export const skill = {
    CVs : ({id},_,{db})=>{
        return db.CVs.find(CV=> CV.skills.some(skill => skill.id === id));
    },
}


