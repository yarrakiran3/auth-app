import { number, string } from "zod";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  export type CredentialsUser={
    user_id:Number;
    mail:String;
    name:String;
    password:String;
    number:Number;
    stream:Number;
    branch:Number;
    domain:Number
  }

  export type FetchingUserDetailsObject={
    
    mail:String;
    name:String;
    number:Number;
    stream:Number;
    branch:Number;
    domain:Number;
    college:String;
    level_of_study:Number;
    [key:string]:any;
  }

export type LoginFormDataObject={
  mail:string;
  password:string;
  
  [key:string]:any
}

export type SignUpFormDataObject={
  name:string;
  mail:string;
  password:string;
  repassword:string;
  [key:string]:any
}

export type BasicDetailsDataObject={
  number:number;
  college:string;
  level_of_study:number;
  stream:number;
  branch:number;
  domain:number;
  [key:string]:any
}


// We have used values startng from 1 in the front end -- use the same 
export const Streams=[
  "Engineering",
  "Commerce",
  "Arts & Humanity"
]

export const EnginerringBranches = [
"Mechanical Engineering",
"Civil Engineering",
"Electrical Engineering",
"Computer Science and Engineering (CSE)",
"Electronics and Communication Engineering (ECE)",
"Chemical Engineering",
"Aerospace/Aeronautical Engineering",
"Automobile Engineering",
"Biotechnology Engineering",
"Information Technology (IT) "
]

export const CommerceBranches =[
  "Accounting and Finance",
  "Business Administration/Management",
  "Economics",
  "Banking and Insurance",
  "Taxation",
  "Auditing",
  "Entrepreneurship",
  "Human Resource Management (HRM)",
  "Digital Marketing"
]

export const ArtsBranches=[
  "History",
  "Political Science",
  "Sociology",
  "Psychology",
  "Philosophy",
  "Anthropology",
  "English Literature",
  "Linguistics",
  "Geography",
  "Economics",
  "Education ",
  "Journalism and Mass Communication"
]

export const Branches=[EnginerringBranches, CommerceBranches, ArtsBranches]

export const EngineeringDomains=[
  "Artificial Intelligence (AI) and Machine Learning",
  "Data Science and Analytics",
  "Cybersecurity",
  "Cloud Computing",
  "Robotics and Automation",
  "Software Development",
  "Renewable Energy Engineering",
  "Embedded Systems and IoT (Internet of Things)",
  "Biotechnology and Biomedical Engineering",
  "Aerospace Engineering",
  "Environmental Engineering"
]

export const CommerceDomains=[
  "Financial Planning and Wealth Management",
  "Digital Marketing",
  "FinTech (Financial Technology)",
  "Investment Banking and Private Equity",
  "Business Analytics",
  "Accounting and Auditing",
  "Supply Chain Management",
  "Risk Management and Compliance",
  "E-commerce Management",
  "Corporate Law"

]

export const ArtsDomains=[
  "Media and Communication Studies",
  "UX/UI Design",
  "Psychology and Counseling",
  "Cultural and Creative Industries",
  "Content Creation and Copywriting",
  "Journalism and Digital Media",
  "Public Policy and Administration",
  "International Relations and Diplomacy",
  "Sustainability and Environmental Studies",
  "Social Work and NGO Management",
  "Business Intelligence (BI)",
  "Project Management",
  "Creative Design and Animation",
  "LegalTech",
  "EdTech and Online Learning"
]

export const Domains=[EngineeringDomains,CommerceDomains, ArtsDomains]

export const LevelsOfStudy=["Undergraduate","Postgraduate Level","PhD","Diploma/Certificate Program"]