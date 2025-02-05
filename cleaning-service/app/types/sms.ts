export interface SMSResponse {
  success: boolean
  messageId?: string
  error?: string
}

export interface SMSRequest {
  phoneNumber: string
  message: string
}

