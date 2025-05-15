import ConversationDetails from "@/app/Components/inbox/ConservationDetails";
import { getAccessToken, getUserId } from "@/app/lib/action";
import apiService from "@/app/services/apiServices";

const ConversationPage = async({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const token = await getAccessToken();
  
  if (!userId || !token) {
    return (
      <main className="max-w-[1500px] mx-auto px-6 py-12">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p className="text-yellow-700">You need to be authenticated to view this conversation.</p>
        </div>
      </main>
    );
  }

  try {
    const response = await apiService.get(`/api/chat/${params.id}`);
    
    // Handle the case where conversation might be nested in the response
    const conversation = response.data.conversation || response.data;
    
    if (!conversation || !conversation.id) {
      return (
        <main className="max-w-[1500px] mx-auto px-6 py-12">
          <div className="bg-red-50 border border-red-200 p-4 rounded-md">
            <p className="text-red-700">Conversation not found or invalid data format.</p>
          </div>
        </main>
      );
    }

    return (
      <main className="max-w-[1500px] mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Conversation</h1>
        <ConversationDetails
          userId={userId}
          token={token}
          conversation={conversation}
        />
      </main>
    );
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return (
      <main className="max-w-[1500px] mx-auto px-6 py-12">
        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
          <p className="text-red-700">Error loading conversation. Please try again later.</p>
        </div>
      </main>
    );
  }
};

export default ConversationPage;