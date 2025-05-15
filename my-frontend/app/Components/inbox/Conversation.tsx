// components/inbox/Conversation.tsx
'use client'

import { useRouter } from 'next/navigation';
import { ConversationType } from '@/app/inbox/page'; // OR move types to a separate file
import React from 'react';

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

function Conversation({ conversation, userId }: ConversationProps) {
  const router = useRouter();
  const otherUser = conversation.users.find(user => user.id !== userId);
  // if (!otherUser) {
    // return null; // Avoid rendering if no other user found
  // }
  return (
    <div className='px-6 py-4 cursor-pointer border border-gray-300 rounded-xl'>
      <p className='mb-6 text-xl'>{otherUser?.name || 'Unnamed User'}</p>
      <p
        onClick={() => router.push(`/inbox/${conversation.id}`)}
        className='text-[#d50027]'
      >
        Go to conversation
      </p>
    </div>
  );
}

export default Conversation;
