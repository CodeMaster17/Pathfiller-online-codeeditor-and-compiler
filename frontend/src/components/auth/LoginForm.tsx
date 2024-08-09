import React, { useState, useTransition } from 'react';
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

const LoginForm = () => {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })



  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // eslint-disable-next-line no-unused-vars
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      Login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data && 'success' in data) {
            form.reset();
            setSuccess(data as any);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  
  return (
    <div className='flex h-[100vh] w-full items-center justify-center bg-blueBackground'>
      <div className='flex h-[70%] w-[50%] bg-white rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
        <div className='w-1/2 p-4'>
          <img src='https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5598.jpg?size=626&ext=jpg' width={500} height={500} alt='loginform' className='size-[100%] rounded-l-2xl' />
        </div>
        <div className='w-1/2 flex items-center justify-center pr-8 pl-4 rounded-r-lg'>
          <div className=' w-full'>
            <div className='border-b-2 pb-4'>
              {/* <h1 className='text-center text-3xl font-semibold'>Managing made <span className='font-bold underline decoration-4 underline-offset-8'>EZ</span>.</h1> */}
              <h1 className='text-3xl font-semibold'>Login</h1>
              <h3 className='text-sm text-gray-400 mt-2 font-semibold'>Login with your given email & password</h3>
            </div>
            {/* <div className='my-12 flex justify-center'>
              <Image src="/mlsaLogo.png" alt='mlsa logo' width={100} height={100} />
            </div> */}

            <div className='mt-5'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} disabled={isPending} className='border-gray-300'/>
                        </FormControl>
                        {/* <FormDescription>
                          This is your kiit email id.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Password" {...field} disabled={isPending} className='border-gray-300'/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  {/* <Checkbox id="terms1" className='w-4 h-4 border-gray-400'/><FormLabel className='pl-2'>Remember me</FormLabel> */}
                  <Button type="submit" className='h-10 w-full bg-blueActiveTab hover:bg-bluePrimary text-white'>Login</Button>
                </form>
              </Form>
              {/* <div>
                <h3 className='mt-5 flex justify-center text-sm font-light'>Forgot Password ?</h3>
              </div> */}
            </div>

          </div>
        </div>
        
        
      </div>
    </div>
  )
}

export default LoginForm