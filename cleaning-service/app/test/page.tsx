import { EmailTest } from "../../components/email-test"

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">メール送信テスト</h1>
      <div className="max-w-md mx-auto">
        <EmailTest />
      </div>
    </div>
  )
}

