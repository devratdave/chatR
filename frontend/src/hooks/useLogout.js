import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut } from '../lib/api.js';
import toast from 'react-hot-toast';

function useLogout() {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn:logOut,
        onSuccess:() => {
            toast.success("logout successfull");
            queryClient.invalidateQueries({queryKey: ["authUser"]});
        }
    })
    return {logoutMutation:mutate}
}

export default useLogout