import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/Hooks/useAccount"
import { LoginFormSchema, type LoginSchema } from "../../lib/Schema/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../App/Shared/Components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";

function LoginForm() {
    const {loginUser}= useAccount();
    const Navigate=useNavigate();
    const location=useLocation();
    const {control,handleSubmit,formState:{isValid,isSubmitting}}=useForm<LoginSchema>(
        {
            mode:'onTouched',
            resolver:zodResolver(LoginFormSchema)
        }
    );
    const onSubmit=async(data:LoginSchema)=>{
        await loginUser.mutateAsync(data,{
            onSuccess:()=>{
                Navigate(location.state?.from||'/activites');
            }
        });
    }
  return (
    <>
    <Paper component='form' onSubmit={handleSubmit(onSubmit)}
    sx={{display:'flex', flexDirection:'column',p:3,maxWidth:'md', mx:'auto',borderRadius:3}}>
        <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
            <LockOpen fontSize="large"/>
            <Typography variant="h4">Sign In</Typography>
        </Box>
        <TextInput label='Email' control={control} name="email"/>
        <TextInput label='Password' type="password" control={control} name="password"/>
        <Button type="submit" disabled={!isValid||isSubmitting} variant="contained" size="large">
            Login
        </Button>
        <Typography>Dont have an account?
            <Typography sx={{ml:2}} component={Link} to='/register' color="primary">Signup</Typography>
        </Typography>
    </Paper>
    </>
  )
}

export default LoginForm    