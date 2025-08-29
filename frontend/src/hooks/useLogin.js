import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn } from '../lib/api';
import toast from 'react-hot-toast';

function useLogin() {
    const queryClient = useQueryClient();
    const {mutate , isPending, error} = useMutation({
      mutationKey:["loginMutation"],
      mutationFn: signIn,
      onSuccess: () => {
        toast.success("Login Successfull");
        queryClient.invalidateQueries({queryKey: ["authUser"]});
      }
    })

    return {loginMutation: mutate, isPending, error}
}

export default useLogin