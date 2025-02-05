"use server"

import { sendNotificationEmail } from "@/app/actions/send-notification"

export async function notifyNewMessage(recipientEmail: string, senderName: string, messagePreview: string) {
  return await sendNotificationEmail(
    recipientEmail,
    `${senderName}さんから新しいメッセージ`,
    `${senderName}さんからメッセージが届きました。\n\n${messagePreview}\n\nチャットを確認するにはログインしてください。`,
  )
}

