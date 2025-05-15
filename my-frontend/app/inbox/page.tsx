import Conversation from "../Components/inbox/Conversation"
import { getUserId } from "../lib/action"
import apiService from "../services/apiServices";

export type UserType={
    id:string;
    name:string;
    avatar_url:string;

}
export type ConversationType={
    id:string;
    users:UserType[];
}

const InboxPage= async()=>{
    const userId= await getUserId();
    if(!userId){
        return(
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>you need to be authenticated</p>
            </main>
        )
    }

    const { data: conversation } = await apiService.get('/api/chat/');
    console.log(conversation,"conversation ");
    
    
    return(
        <main  className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl">Inbox</h1>
            {conversation.map((conversation: ConversationType) => (
  <Conversation
    key={conversation.id}
    userId={userId}
    conversation={conversation}
  />
))}

           

        </main>
    )
}
export default InboxPage