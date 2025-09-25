import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../Schema/LoginFormSchema"
import agent from "../api/agent"
import { useLocation, useNavigate } from "react-router";
import type { RegisterSchema } from "../Schema/RegisterSchema";
import { toast } from "react-toastify";

export const useAccount=()=>
{
    const queryClient=useQueryClient();
    const navigate=useNavigate();
    const location=useLocation();
    const loginUser=useMutation({
        mutationFn:async (creds:LoginSchema)=>{
            await agent.post('/login?useCookies=true',creds);
        },
        onSuccess:async()=> 
        {
            await queryClient.invalidateQueries(
                {
                    queryKey:['user']
                })
                await navigate('/activities')
        }
    }); 
    const registerUser=useMutation(
        {
            mutationFn:async(creds:RegisterSchema)=>{
                await agent.post('/account/register',creds)
            },
            onSuccess:()=>
            {
                toast.success('Registeration Successfull- You can now Login');
                navigate('/login');
            }
        }
    )
    const logoutUser=useMutation(
        {
            mutationFn:async()=>
            {
                await agent.post('/account/logout');
            },
            onSuccess:()=>{
                queryClient.removeQueries({queryKey:['user']});
                queryClient.removeQueries({queryKey:['activities']});
                navigate('/')
            }
        }
    )
const{data:currentUser,isLoading: loadingUserInfo}=useQuery({
    queryKey:['user'],
    queryFn:async()=>
    {
    const response=await agent.get<User>('/account/user-info');
    return response.data;
    },
    enabled:!queryClient.getQueryData(['user']) 
    && location.pathname!=='/login'
    && location.pathname!=='/register'
})

    return{
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }
}