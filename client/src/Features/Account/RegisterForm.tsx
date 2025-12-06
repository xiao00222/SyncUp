import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/Hooks/useAccount"
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../App/Shared/Components/TextInput";
import { Link } from "react-router";
import { RegisterSchema } from "../../lib/Schema/RegisterSchema";
function RegisterForm() {
    const {registerUser}= useAccount();
    const {control,setError,handleSubmit,formState:{isValid,isSubmitting}}=useForm<RegisterSchema>(
        {
            mode:'onTouched',
            resolver:zodResolver(RegisterSchema)
        }
    );
    const onSubmit=async(data:RegisterSchema)=>{
        await registerUser.mutateAsync(data,{
            onError:(error)=>{
                if(Array.isArray(error)){
                    error.forEach(err=>{
                        if(err.includes('Email')) setError('email',{message:err});
                        else if(err.includes('Password')) setError('password',{message:err});
                        
                    })
                }
            }
        })
    }
  return (
    <>
    <Paper component='form' onSubmit={handleSubmit(onSubmit)}
    sx={{display:'flex', flexDirection:'column',p:3,maxWidth:'md', mx:'auto',borderRadius:3}}>
        <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
            <LockOpen fontSize="large"/>
            <Typography variant="h4">Register</Typography>
        </Box>
        <TextInput label='Email' control={control} name="email"/>
        <TextInput label='DisplayName' control={control} name="displayName"/>
        <TextInput label='Password' type="password" control={control} name="password"/>
        <Button type="submit" disabled={!isValid||isSubmitting} variant="contained" size="large">
            Register
        </Button>
        <Typography>Already have an account?
            <Typography sx={{ml:2}} component={Link} to='/login' color="primary">Signin</Typography>
        </Typography>
    </Paper>
    
    </>
  )
}

export default RegisterForm