import { GraphQLError } from "graphql";
export const Mutation = {

  createCV: (_, { input }:any, { pubSub, db }) => {
    const { name, age, job, skillIds, userId } = input;
    const id = db.cvs.length + 1;
    const skills = db.skills.filter((skill) => skillIds.includes(skill.id));
    console.log(skills);
    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      throw new GraphQLError (`user d'id ${userId} n'existe pas`
      ,
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

    const newCV = {
      id,
      name,
      age,
      job,
      skills,
      user,
    };
    db.cvs.push(newCV);

    pubSub.publish('CVUpdates', newCV);
    return newCV;
  },

  updateCV: (_, { id, input }:any, { pubSub, db }) => {
    const {  skillIds, userId } = input;
    const cvIndex = db.cvs.findIndex((cv) => cv.id === id);
    if (cvIndex === -1) {
      throw new GraphQLError(` cv d'id ${id} n'existe pas.`,
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
    let cv = db.cvs[cvIndex];
    let newSkills =[]
    if ( skillIds )
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

    pubSub.publish('CVUpdates', cv );
    return cv;
  },


  deleteCV: (_, { id }: { id: number }, { db, pubSub }) => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    const deletedCV = db.cvs.splice(index, 1)[0];
    pubSub.publish('CVUpdates', deletedCV);
    return true;
  }
}


