import { GraphQLError } from "graphql";

export const mutation = {
    cvCreate : (_,{input} : any,{pubsub , db})=>{
        const {name , age , job , skillsId , userId } = input;
        const id = db.cvs.length + 1;
        const user = db.users.find(user => user.id === userId);
        if(!user) throw new GraphQLError("User not found" , {
            extensions: {
                http: {
                    status: 404,
                    headers: {
                    "x-custom-header": "some-value",
                    },
                },
            }
        });
        const skills = db.skills.filter(skill => skillsId.includes(skill.id));
        const cv = { 
            id,
            name,
            age ,
            job ,
            skills ,
            user,
        };
        db.cvs.push(cv);
        pubsub.publish("CVUpdates" , cv);
        return cv;
    },
    cvUpdate : ( _ , {id , input} :any, {pubsub , db}) =>{
        const {skillIds , userId} = input;
        const cvIdd = db.cvs.find(cv => cv.id === id);
        if(cvIdd == -1) throw new GraphQLError("Cv not found" , {
            extensions: {
                http: {
                    status: 404,
                    headers: {
                    "x-custom-header": "some-value",
                    },
                },
            }
        });
        let cv = db.cvs[cvIdd];
        let newSkills =[]
        if (skillIds)
        { 
        newSkills = db.skills.filter((skill) => skillIds.includes(skill.id));
        cv.skills = newSkills;
        }
        
        if ( userId)
        {
            const user = db.users.find((user) => user.id === userId);
        if (!user) {
        throw new GraphQLError(`user d'id ${userId} n'existe pas.`,
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
        }
        else {
            cv[user] = user ;
        }
        }
        for(let key in input){
            if( key != skillIds && key != userId )
              cv[key] = input[key];
        }
        pubsub.publish("CVUpdates" , cv);
        return cv ; 
    },
    cvDelete : ( _ , {id} : {id : number} , {pubsub , db}) =>{
        const cvIndex = db.cvs.findIndex(cv => cv.id === id);
        if(cvIndex == -1) throw new GraphQLError("Cv with ${id} not found" , {
            extensions: {
                http: {
                    status: 404,
                    headers: {
                    "x-custom-header": "some-value",
                    },
                },
            }
        });
        const deletedCV = db.cvs.splice(cvIndex, 1)[0];
        db.skills.forEach((cvSkill) => {
        if (cvSkill.id === id) {
            const skillIndex = db.skills.findIndex((skill) => skill.id === cvSkill.id);
            if (skillIndex !== -1) {
            db.skills[skillIndex].cvs = db.skills[skillIndex].cvs.filter((cv) => cv.id !== id);
            }
        }
        });
        db.skills = db.skills.filter((cvSkill) => cvSkill.id !== id);
        const userIndex = db.users.findIndex((user) => user.id === deletedCV.user.id);
        if (userIndex !== -1) {
        db.users[userIndex].cvs = db.users[userIndex].cvs.filter((cv) => cv.id !== id);
        }
        pubsub.publish("CVUpdates" , deletedCV);
        return true;
    }
}