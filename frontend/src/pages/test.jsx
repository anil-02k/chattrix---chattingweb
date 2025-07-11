import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from "../lib/api";

export const test = () => {

    const queryClient=useQueryClient();
    const [outgoingFriendReqsIds,setOutgoingRequestsIds]=useState(new Set());

    const {data: friends =[], isLoading: loadingFriends}=useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
    })

    const {data:recommendedUsers=[],isLoading,LoadingUsers}=useQuery({
        queryKey:["users"],
        queryFn: getRecommendedUsers,
    })

    const {data:outgoingFriendReqs} = useQuery({
        queryFn:["outgoingFriendReqs"],
        queryFn: getOutgoingFriendReqs,
    })

    const {muted: setRequestMutation, isPending}= useMutation({
        mutationFn:sendFriendRequest,
        onSuccess: ()=> queryClient.invalidateQueries({queryKey:["outgoingFriendReqs"]})
    })

    useEffect(() => {
        const (outgoingFriendReqs && outgoingFriendReqs.length > 0){
            outgoingFriendReqs.forEach((req)=>{
                outgoingFriendReqs.add(re)
            })
        }
    })
    
      return () => {
        second;
      };
    }, [third]);
    
  return <div>test</div>;
};
