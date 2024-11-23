
import React from 'react'
import { auth } from '../../../auth'
import { fetchUserDetails } from '../lib/actions';
import { Branches, Domains, FetchingUserDetailsObject, LevelsOfStudy, Streams } from '../lib/definitions';
import { getAccountCompletionPercentage } from '../lib/useful-functions';
import Link from 'next/link';

export default async function ProfilePage() {
  let session:any;
  let userdetails:any;
  let percentage:any;
    try{
      session = await auth();
          if(session){
          userdetails= await fetchUserDetails(session.user.email,session.user.id);
          console.log(userdetails);
          percentage=getAccountCompletionPercentage(userdetails);
          }
    
      } catch(error){
        console.log(error);
      }
  

  if(session&&session!==null&&session!=undefined){

    return(
      <>
       <UserProfile userdetails={userdetails}/>
      </>
    )  
  }

  return (
    <div>
      
      <p>Please Sign in to continue</p>
    </div>
  )
}

function UserProfile({userdetails}:{userdetails:FetchingUserDetailsObject}){

  return(
    <div className='md:p-12 p-2 dark:text-white '>
    
    <ProfileUI userdetails={userdetails}/>
    </div>
  )
}


function ProfileUI({userdetails}:{userdetails:FetchingUserDetailsObject}){

  return (
    <>
    <div className="relative flex size-full min-h-screen flex-col  group/design-root overflow-x-hidden" >
      <div className="flex items-center  p-4 pb-2 justify-between">
        <Link href={"../"}>
        <div className="text-[#111517] flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </div>
        </Link>
        <h2 className="text-[#111517] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Profile</h2>
      </div>
      <div className="@container">
        <div className="@[480px]:px-4 @[480px]:py-3">
          {/* <div
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-[218px]"
            // style='background-image: url("https://cdn.usegalileo.ai/sdxl10/41309407-3157-4597-842c-dd9a8a663b27.png");'
          ></div> */}
        </div>
      </div>
      <h1 className="text-[#111517] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5">Hi, {userdetails.name}!</h1>
      <p className="text-[#111517] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Let&apos;s make the most of your college journey.</p>
      <div className="flex p-4 @container">
        <div className="flex w-full flex-col gap-4 items-start">
          <div className="flex gap-4 flex-col items-start">
            {/* <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              // style={{backgroundImage:URL("")}}
            ></div> */}
            <div className="flex flex-col justify-center">
              <p className="text-[#111517] text-[22px] font-bold leading-tight tracking-[-0.015em]"> </p>
              <p className="text-[#647987] text-base font-normal leading-normal"> 
                {
                userdetails.college!==null&&userdetails.college!==""&&userdetails.college!==undefined
                &&userdetails.level_of_study!==null&&userdetails.level_of_study!==0&&userdetails.level_of_study!==undefined&&
                <>{LevelsOfStudy[Number(userdetails.level_of_study)-1]+" "+"student"} at {userdetails.college}</>
                }</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 bg-white px-4 py-3">
        <div className="text-[#111517] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-12" data-icon="EnvelopeOpen" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M228.44,89.34l-96-64a8,8,0,0,0-8.88,0l-96,64A8,8,0,0,0,24,96V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A8,8,0,0,0,228.44,89.34ZM96.72,152,40,192V111.53Zm16.37,8h29.82l56.63,40H56.46Zm46.19-8L216,111.53V192ZM128,41.61l81.91,54.61-67,47.78H113.11l-67-47.78Z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-[#111517] text-base font-medium leading-normal">{userdetails.mail}</p>
          <p className="text-[#647987] text-sm font-normal leading-normal">Verified</p>
          <p className="text-[#647987] text-sm font-normal leading-normal">Email</p>
        </div>
      </div>
      <div className="flex gap-4 bg-white px-4 py-3">
        <div className="text-[#111517] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-12" data-icon="DeviceTablet" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M192,24H64A24,24,0,0,0,40,48V208a24,24,0,0,0,24,24H192a24,24,0,0,0,24-24V48A24,24,0,0,0,192,24ZM56,72H200V184H56Zm8-32H192a8,8,0,0,1,8,8v8H56V48A8,8,0,0,1,64,40ZM192,216H64a8,8,0,0,1-8-8v-8H200v8A8,8,0,0,1,192,216Z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          {userdetails.number!==null&&<p className="text-[#111517] text-base font-medium leading-normal">{""+userdetails.number}</p>}{userdetails.number===null&&<p className="text-[#111517] text-base font-medium leading-normal">{"Not Added"}</p>}
          {userdetails.number!==null&&<p className="text-[#647987] text-sm font-normal leading-normal">Verified</p>}{userdetails.number===null&&<p className="text-[#647987] text-sm font-normal leading-normal">Not Verified</p>}
          <p className="text-[#647987] text-sm font-normal leading-normal">Phone</p>
        </div>
      </div>
      <div className="flex gap-4 bg-white px-4 py-3">
        <div className="text-[#111517] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-12" data-icon="BookOpen" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M224,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h64a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-1 flex-col justify-center">
        {userdetails.stream!==null&&<p className="text-[#111517] text-base font-medium leading-normal">{""+Streams[Number(userdetails.stream)-1]}</p>}{userdetails.stream===null&&<p className="text-[#111517] text-base font-medium leading-normal">{"Not Added"}</p>}
          <p className="text-[#647987] text-sm font-normal leading-normal">Stream</p>
        </div>
      </div>
      <div className="flex gap-4 bg-white px-4 py-3">
        <div className="text-[#111517] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-12" data-icon="BookOpen" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M224,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h64a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-1 flex-col justify-center">
        {userdetails.branch!==null&&<p className="text-[#111517] text-base font-medium leading-normal">{""+Branches[Number(userdetails.stream)-1][Number(Number(userdetails.branch)-1)]}</p>}{userdetails.branch===null&&<p className="text-[#111517] text-base font-medium leading-normal">{"Not Added"}</p>}
          <p className="text-[#647987] text-sm font-normal leading-normal">Branch</p>
        </div>
      </div>
      <div className="flex gap-4 bg-white px-4 py-3">
        <div className="text-[#111517] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-12" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <div className="flex flex-1 flex-col justify-center">
        {userdetails.domain!==null&&<p className="text-[#111517] text-base font-medium leading-normal">{""+Domains[Number(userdetails.stream)-1][Number(userdetails.domain)-1]}</p>}{userdetails.domain===null&&<p className="text-[#111517] text-base font-medium leading-normal">{"Not Added"}</p>}
          <p className="text-[#647987] text-sm font-normal leading-normal">Domain</p>
        </div>
      </div>
      <div className="flex px-4 py-3">
        <Link href={'/auth/userdetails'}>
        <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#f0f3f4] text-[#111517] text-sm font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Edit Profile</span>
        </button>
        </Link>
      </div>
      <div className="flex flex-col gap-3 p-4 ">
        <div className="flex gap-6 justify-between">
          <p className="text-[#111517] text-base font-medium leading-normal">Profile Completion</p>
          <p className="text-[#111517] text-sm font-normal leading-normal ">{""+getAccountCompletionPercentage(userdetails)}%</p>
        </div>

        <div className="rounded bg-[#dce1e5] w-full">
          <div className={`h-2 rounded bg-lightblue w-[${getAccountCompletionPercentage(userdetails)}%]`} >
          </div>
        </div>

        <p className="text-[#647987] text-sm font-normal leading-normal">Complete to unlock personalized content</p>
      </div>
      <div className="h-5 bg-white"></div>
    </div>
    </>
    )

}
  
  


