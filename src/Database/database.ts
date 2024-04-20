interface Cv{
    id : number ,
    name : String,
    age : Number,
    job : String,
    skills : Skill[],
    user : User
}

interface Skill {
    id: number;
    designation: string;
}

interface User {
    id : number ,
    name : String,
    email : String,
    role : Role 
}

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

const skills: Skill[] = [
    { id: 1, designation: "JavaScript" },
    { id: 2, designation: "TypeScript" },
  { id: 3, designation: "GraphQL" },
  { id: 4, designation: "HTML" },
  { id: 5, designation: "CSS" },
  { id: 6, designation: "React" },
  { id: 7, designation: "Angular" }
];

const users: User[] = [
    { id: 1, name: "Habib Triki", email: "Habib@example.com", role: Role.USER },
    { id: 2, name: "Aymen Koched", email: "Aymen@example.com", role: Role.ADMIN }
];

const CVs: Cv[] = [
    {
        id: 1,
        name: "Développeur Frontend",
        age: 25,
        job: "Développeur Web",
        skills: [skills[0], skills[1]], 
        user: users[0] 
    },
    {
        id: 2,
        name: "Spécialiste Backend",
        age: 30,
        job: "Ingénieur Logiciel",
        skills: [skills[2]], 
        user: users[1] 
    }
];

export const db = {
    skills,
    users,
    CVs
};