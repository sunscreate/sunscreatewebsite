import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"

interface ReviewRequestEmailProps {
  customerName: string
  reviewUrl: string
}

export function ReviewRequestEmail({ customerName, reviewUrl }: ReviewRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>サービスのご利用ありがとうございました</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{customerName}様、サービスのご利用ありがとうございました</Heading>
          <Text style={text}>
            この度は、SunsCreateのサービスをご利用いただき、誠にありがとうございます。
            サービスの品質向上のため、ご感想やご意見をお聞かせいただけますと幸いです。
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={reviewUrl}>
              レビューを書く
            </Button>
          </Section>
          <Text style={text}>
            ボタンがクリックできない場合は、以下のURLをブラウザに貼り付けてください：
            <br />
            <Link href={reviewUrl} style={link}>
              {reviewUrl}
            </Link>
          </Text>
          <Text style={footer}>
            ※このメールは送信専用のため、返信いただいてもお答えできません。
            ご不明な点がございましたら、お手数ですが当社Webサイトのお問い合わせフォームよりご連絡ください。
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "normal",
  textAlign: "center" as const,
  margin: "30px 0",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const button = {
  backgroundColor: "#0284c7",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "0 auto",
}

const link = {
  color: "#0284c7",
  textDecoration: "underline",
}

const footer = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "21px",
  marginTop: "40px",
  textAlign: "center" as const,
}

