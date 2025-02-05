import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/navigation/back-button"

export default function CustomerDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton />
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>C1</AvatarFallback>
              </Avatar>
              <span>お客様: 山田 太郎</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

