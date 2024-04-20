interface CV {
  id: number;
  name: string;
  age: string;
  job: string;
  skills: Skill[];
  user: User;
}

interface Skill {
  id: number;
  designation: string;
  }

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;

}

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
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
    { id: 1, name: "Ala achach", email: "Ala@example.com", role: Role.USER },
    { id: 2, name: "Aymen Koched", email: "Aymen@example.com", role: Role.ADMIN },
    { id: 3, name: "Omar", email: "Omar@example.com", role: Role.USER },
    { id: 4, name: "Samer", email: "Samer@example.com", role: Role.USER }
];

const cvs: CV[] = [
  {
    id: 1,
        name: "Développeur Frontend",
        age: "25",
        job: "Développeur Web",
        skills: [skills[0], skills[1]], 
        user: users[0] 
    },
    {
        id: 2,
        name: "Spécialiste Backend",
        age: "30",
        job: "Ingénieur Logiciel",
        skills: [skills[2]], 
        user: users[1] 
    },
    {
      id: 3,
      name: "Data Scientist",
      age: "28",
      job: "Machine Learning Engineer",
      skills: [skills[3], skills[4], skills[5]],
      user: users[2]
    },
    {
      id: 4,
      name: "Full Stack Developer",
      age: "27",
      job: "Software Engineer",
      skills: [skills[0], skills[1], skills[2], skills[5]],
      user: users[3]
    }
];


export const db = {
  skills,
  users,
  cvs,
};
