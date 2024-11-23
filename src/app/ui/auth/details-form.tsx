'use client'
import { onDetailsSubmit } from '@/app/lib/actions';
import { BasicDetailsDataObject, Branches, Domains, LevelsOfStudy, Streams } from '@/app/lib/definitions'
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

export default function AcademicDetailsForm() {
    const [basicDetailsObject, setBasicDetailsObject]=useState<BasicDetailsDataObject>(
        {
            stream:0,
            branch:0,
            domain:0,
            college:"",
            level_of_study:0,
            number:0
        }
    );

    const [branchesToSelect, setBranchesToSelect]=useState<String[]>([""]);
    const [domainsToSelect, setDomainsToSelect]=useState<String[]>([""]);

    const [errormessage,setErrorMessage]=useState("");

    function handleStreamChange(e:any){
      const {name,value}=e.target;
        const newDataObject={
            ...basicDetailsObject
        };
        

        newDataObject.stream=Number(value);
        newDataObject.branch=0;
        newDataObject.domain=0;
        setBasicDetailsObject(newDataObject);

        console.log(newDataObject)

        if(Number(value)>0){
        const newArrayToUseForBranches=Branches[Number(value-1)]
        setBranchesToSelect(newArrayToUseForBranches)
        const newArrayToUseForDomains=Domains[Number(value-1)]
        setDomainsToSelect(newArrayToUseForDomains)
        }else{
          setBranchesToSelect([""])
          setDomainsToSelect([""])
        }

        setErrorMessage("")

      
    }
    
    function handleChange(e:any){
      
        const {name,value}=e.target;
        let newDataObject={...basicDetailsObject};
        newDataObject[String(name)]=Number(value);
        console.log(newDataObject);
        setBasicDetailsObject(newDataObject);
        setErrorMessage("")
    }
    function handleTextChange(e:any){
      const {name,value}=e.target;
      let newDataObject={...basicDetailsObject};
      newDataObject[String(name)]=value;
      setBasicDetailsObject(newDataObject);
      setErrorMessage("")
    }

    async function handleSubmit(basicDetailsObject:BasicDetailsDataObject){
      if(basicDetailsObject.stream!==null&&basicDetailsObject.stream!==undefined&&basicDetailsObject.stream!==0&&
        basicDetailsObject.branch!==0&&basicDetailsObject.branch!==null&&basicDetailsObject.branch!==undefined&&
        basicDetailsObject.domain!==0&&basicDetailsObject.domain!==null&&basicDetailsObject.domain!==undefined
        ){
          console.log("Before saving to database",basicDetailsObject);

          const saveDetails = await onDetailsSubmit(basicDetailsObject);
          console.log(saveDetails)
          if(saveDetails==="LogIn to continue"){
            setErrorMessage("LogIn to continue")
            console.log("LogIn to continue",basicDetailsObject)
            
          } else if(saveDetails==="Saved Successfully"){
            redirect('/');
          } 

        } else if(
          basicDetailsObject.stream===null||basicDetailsObject.stream===undefined||basicDetailsObject.stream===0
        ){
          setErrorMessage("Please select Stream")
          console.log("Please select Stream",basicDetailsObject)
          
        } else if(
          basicDetailsObject.branch===null||basicDetailsObject.branch===undefined||basicDetailsObject.branch===0
        ){
          setErrorMessage("Please select Branch")
          console.log("Please select Branch",basicDetailsObject)
        } else if(
          basicDetailsObject.domain===0 || basicDetailsObject.domain!==undefined||basicDetailsObject.domain===0
        ){
          setErrorMessage("Please select Domain")
          console.log("Please select Domain",basicDetailsObject)
        } 
        
    }

  return (
    <div>
    <div className='flex flex-row justify-around dark:text-black'>
    <div>

      <div className='flex flex-col  p-4'>

      <label htmlFor='number' className='p-2 font-bold'>Number</label>
            <input 
            className='p-2 rounded-xl border-2 border-lightblue '
            type='tel' 
            name='number' 
            id='number' 
            placeholder='Enter your Number'
            onChange={(e)=>handleChange(e)}
            >

            </input>
            <br></br>

            <label htmlFor='college' className='p-2 font-bold'>College</label>
            <input 
            className='p-2 rounded-xl border-2 border-lightblue '
            type='text' 
            name='college' 
            id='college' 
            placeholder='Enter your College name'
            onChange={(e)=>handleTextChange(e)}
            >

            </input>
            <br></br>

      <label htmlFor='level_of_study' className='p-2 bg-gradient-to-r from-lightblue via-middleblue to-darkblue text-transparent bg-clip-text font-extrabold'>Level of Study</label>
            <select name='level_of_study' id='level_of_study' className='border-4 rounded-xl p-2'
             onChange={(e)=>handleChange(e)} >
                <option>Select</option>
              {
                LevelsOfStudy.map((level,index)=>{
                  return <option key={index+1} value={index+1}>{level}</option>
                })
              }
                
               
            </select>
            <br></br>
          
          

          <label htmlFor='stream' className='p-2 bg-gradient-to-r from-lightblue via-middleblue to-darkblue text-transparent bg-clip-text font-extrabold'>Stream</label>
            <select name='stream' id='stream' className='border-4 rounded-xl p-2'
             onChange={(e)=>handleStreamChange(e)}>
                <option value={0}>Select</option>

              {
                Streams.map((stream,index)=>{
                  return <option key={index+1} value={index+1}>{stream}</option>
                })
              }
                
               
            </select>
            <br></br>
        
            <label htmlFor='branch' className='p-2 bg-gradient-to-r from-lightblue via-middleblue to-darkblue text-transparent bg-clip-text font-extrabold'>Branch</label>
            <select name='branch' id='branch' className='border-4 rounded-xl p-2'
             onChange={(e)=>handleChange(e)}>
              <option>Select</option>
              {
                branchesToSelect.map((branch,index)=>{
                  return <option key={index+1} value={index+1}>{branch}</option>
                })
              }
                
               
            </select>
            <br></br>

            <label htmlFor='domain' className='p-2 bg-gradient-to-r from-lightblue via-middleblue to-darkblue text-transparent bg-clip-text font-extrabold'>Interested Domain</label>
            <select name='domain' id='domain' className='border-4 rounded-xl p-2'
             onChange={(e)=>handleChange(e)} >
                <option>Select</option>
              {
                domainsToSelect.map((domain,index)=>{
                  return <option key={index+1} value={index+1}>{domain}</option>
                })
              }
                
               
            </select>
            <br></br>
            <p className='mt-2'></p>

            

            
            <br></br>
            {
              errormessage!==""&&
              <p className='text-red-700'>{errormessage}</p>
            }
            <div className='flex flex-row justify-around mt-2'>
            <button className='flex flex-row justify-around bg-blue-500 p-2 mt-2 mr-4 rounded-xl bg-gradient-to-r from-lightblue via-middleblue to-darkblue text-white font-extrabold'
            onClick={()=>handleSubmit(basicDetailsObject)}>Submit</button>
            </div>
            

        {/* </form> */}
      </div>

      
    
        
    </div>
    </div>
      
    </div>
  )
}


export function MobileNumberForm(){



  return(
    <>
    <label htmlFor='number' className=''>Mobile Number</label>
    <input type='tel' pattern='[0-9]{10}' placeholder='Enter your number' className='border-4'/>
    </>
  )
}
