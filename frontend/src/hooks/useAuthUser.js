import { useQuery } from '@tanstack/react-query'
import { authUser } from '../lib/api.js'

function useAuthUser() {
    const authUserQuery = useQuery({
        queryKey : ["authUser"],
        queryFn: authUser,
        retry: false,
    })
    return {isLoading:authUserQuery.isLoading , authUser: authUserQuery.data?.user}
}

export default useAuthUser