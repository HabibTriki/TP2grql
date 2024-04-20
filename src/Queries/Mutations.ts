import { GraphQLError } from "graphql";

export const Mutation = {
    CreateCV: (_,{input} : any,{pubsub , db})=>{
        const {name , age , job , skillsId , userId } = input;
        const id = db.CVs.length + 1;
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
        const CV= { 
            id,
            name,
            age ,
            job ,
            skills ,
            user,
        };
        db.CVs.push(CV);
        pubsub.publish("UpdateCVs" , CV);
        return CV;
    },
    UpdateCV: ( _ , {id , input} :any, {pubsub , db}) =>{
        const {skillIds , userId} = input;
        const CVByIdd = db.CVs.find(CV=> CV.id === id);
        if(CVByIdd == -1) throw new GraphQLError("CVnot found" , {
            extensions: {
                http: {
                    status: 404,
                    headers: {
                    "x-custom-header": "some-value",
                    },
                },
            }
        });
        let CV= db.CVs[CVByIdd];
        let newSkills =[]
        if (skillIds)
        { 
        newSkills = db.skills.filter((skill) => skillIds.includes(skill.id));
        CV.skills = newSkills;
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
            CV[user] = user ;
        }
        }
        for(let key in input){
            if( key != skillIds && key != userId )
              CV[key] = input[key];
        }
        pubsub.publish("UpdateCVs" , CV);
        return CV; 
    },
    DeleteCV: ( _ , {id} : {id : number} , {pubsub , db}) =>{
        const CVIndex = db.CVs.findIndex(CV=> CV.id === id);
        if(CVIndex == -1) throw new GraphQLError("CVwith ${id} not found" , {
            extensions: {
                http: {
                    status: 404,
                    headers: {
                    "x-custom-header": "some-value",
                    },
                },
            }
        });
        const deletedCV= db.CVs.splice(CVIndex, 1)[0];
        db.skills.forEach((CVSkill) => {
        if (CVSkill.id === id) {
            const skillIndex = db.skills.findIndex((skill) => skill.id === CVSkill.id);
            if (skillIndex !== -1) {
            db.skills[skillIndex].CVs = db.skills[skillIndex].CVs.filter((CV) => CV.id !== id);
            }
        }
        });
        db.skills = db.skills.filter((CVSkill) => CVSkill.id !== id);
        const userIndex = db.users.findIndex((user) => user.id === deletedCV.user.id);
        if (userIndex !== -1) {
        db.users[userIndex].CVs = db.users[userIndex].CVs.filter((CV) => CV.id !== id);
        }
        pubsub.publish("UpdateCVs" , deletedCV);
        return true;
    }
}